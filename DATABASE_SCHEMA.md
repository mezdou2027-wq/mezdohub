# MezdoHub — Production Database Schema Specification
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Architect:** Chief Technology Officer & Lead Database Architect, MezdoHub  
**Engine:** PostgreSQL 16 (Managed via Supabase / AWS RDS)  
**Encoding:** UTF-8 (`ar-MA` / `fr-FR` collation support)  

---

## 1. Schema Design Philosophy

The MezdoHub data layer is structured around the following foundational principles:
1. **Relational Integrity Over Denormalization:** Enforce strict foreign key constraints, check constraints, and custom enumerations to guarantee data validity across all multi-tenant boundaries.
2. **Identity Decoupling:** Keep authentication primitives (`auth.users`) completely separate from business profiles (`public.profiles`), enabling flexible schema evolution without breaking session tokens.
3. **Auditability by Default:** Maintain immutable record versioning (`created_at`, `updated_at`, `audit_logs`) across all write-sensitive tables.
4. **Row-Level Security Readiness:** Design every entity with unambiguous tenant and ownership keys (`user_id`, `company_id`, `candidate_id`) to enable zero-overhead RLS evaluation.

---

## 2. Extensions & Custom Types (Enums)

```sql
-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- Universal Unique Identifiers
CREATE EXTENSION IF NOT EXISTS "citext";          -- Case-insensitive emails & text
CREATE EXTENSION IF NOT EXISTS "pgcrypto";        -- Cryptographic hashing utilities

-- SCHEMAS
CREATE SCHEMA IF NOT EXISTS audit;                -- Segregated audit trail schema

-- CUSTOM ENUMS
CREATE TYPE user_role AS ENUM (
    'candidate', 
    'employer', 
    'admin', 
    'superadmin'
);

CREATE TYPE education_level AS ENUM (
    'sans_diplome',
    'qualification',
    'bac',
    'technicien_ita',
    'technicien_specialise_ista',
    'deug_deup_bts',
    'licence_fondamentale',
    'licence_professionnelle',
    'master_specialise',
    'ingenieur_etat',
    'doctorat'
);

CREATE TYPE contract_type AS ENUM (
    'cdi',
    'cdd',
    'anapec',
    'stage_preembauche',
    'stage_pfe',
    'freelance_mission'
);

CREATE TYPE job_status AS ENUM (
    'draft',
    'pending_review',
    'published',
    'paused',
    'closed',
    'archived'
);

CREATE TYPE application_status AS ENUM (
    'submitted',
    'dossier_in_review',
    'forwarded_to_hr',
    'interview_requested',
    'accepted_offer',
    'rejected',
    'withdrawn'
);

CREATE TYPE dossier_package AS ENUM (
    'standard_free',
    'direct_hr_routing',
    'full_dossier_service',
    'dv_lottery_vip'
);

CREATE TYPE notification_type AS ENUM (
    'application_status_changed',
    'interview_invite',
    'dossier_ready',
    'job_alert_match',
    'company_verification_approved',
    'system_announcement'
);
```

---

## 3. Core Relational Tables DDL

### Table 1: `public.profiles`
*Extends `auth.users` with shared personal identity and RBAC role.*

```sql
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email citext UNIQUE NOT NULL,
    role user_role DEFAULT 'candidate'::user_role NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_phone_format CHECK (phone ~ '^[0-9+ ]{9,20}$')
);

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_city ON public.profiles(city);
```

### Table 2: `public.candidates`
*Specialized professional credentials and job-seeker attributes.*

```sql
CREATE TABLE public.candidates (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    education_level education_level DEFAULT 'technicien_specialise_ista'::education_level NOT NULL,
    specialization VARCHAR(150) NOT NULL,
    institution VARCHAR(150),
    graduation_year SMALLINT,
    years_experience SMALLINT DEFAULT 0 NOT NULL,
    languages JSONB DEFAULT '{"ar": "native", "fr": "intermediate"}'::JSONB NOT NULL,
    target_sectors TEXT[] DEFAULT ARRAY['automotive', 'logistics', 'offshoring'] NOT NULL,
    lifemap_diagnostic_result JSONB,
    actively_seeking BOOLEAN DEFAULT TRUE NOT NULL,
    allow_employer_contact BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_candidates_education ON public.candidates(education_level);
CREATE INDEX idx_candidates_specialization ON public.candidates(specialization);
```

### Table 3: `public.companies`
*Legal employer entities operating in Moroccan industrial zones & services.*

```sql
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    name VARCHAR(200) NOT NULL,
    legal_ice VARCHAR(20) UNIQUE,              -- Identifiant Commun de l’Entreprise (Morocco)
    commercial_register_rc VARCHAR(50),        -- Registre de Commerce (RC)
    tax_id_if VARCHAR(50),                     -- Identifiant Fiscal (IF)
    industry_sector VARCHAR(100) NOT NULL,
    industrial_zone VARCHAR(100),              -- e.g., 'TAC', 'TFZ', 'Melloussa', 'Casashore'
    city VARCHAR(100) NOT NULL,
    website_url TEXT,
    logo_url TEXT,
    company_size VARCHAR(50) DEFAULT '11-50',
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_companies_ice ON public.companies(legal_ice);
CREATE INDEX idx_companies_verified ON public.companies(is_verified);
```

### Table 4: `public.resumes`
*Document vault storing versioned candidate ATS resumes and portfolios.*

```sql
CREATE TABLE public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID NOT NULL REFERENCES public.candidates(profile_id) ON DELETE CASCADE,
    title VARCHAR(150) DEFAULT 'Mon CV Principal' NOT NULL,
    file_storage_path TEXT NOT NULL,           -- S3 / R2 key e.g. 'resumes/{candidate_id}/{uuid}.pdf'
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) DEFAULT 'application/pdf' NOT NULL,
    is_primary BOOLEAN DEFAULT TRUE NOT NULL,
    parsed_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    parsed_experience_years NUMERIC(4, 1),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_resume_size CHECK (file_size_bytes <= 10485760) -- Max 10MB
);

CREATE INDEX idx_resumes_candidate ON public.resumes(candidate_id);
```

### Table 5: `public.jobs`
*Job vacancies published by verified employers or aggregated with direct HR channels.*

```sql
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    contract_type contract_type DEFAULT 'cdi'::contract_type NOT NULL,
    min_education education_level DEFAULT 'technicien_ita'::education_level NOT NULL,
    experience_required_years SMALLINT DEFAULT 0 NOT NULL,
    city VARCHAR(100) NOT NULL,
    workplace_location VARCHAR(150),           -- Specific plant / zone
    min_salary_mad INT,
    max_salary_mad INT,
    is_salary_disclosed BOOLEAN DEFAULT TRUE NOT NULL,
    description TEXT NOT NULL,
    key_requirements TEXT[] NOT NULL,
    benefits TEXT[] DEFAULT ARRAY[]::TEXT[],
    direct_hr_email VARCHAR(150),
    status job_status DEFAULT 'pending_review'::job_status NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    views_count INT DEFAULT 0 NOT NULL,
    applications_count INT DEFAULT 0 NOT NULL,
    published_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_jobs_slug ON public.jobs(slug);
CREATE INDEX idx_jobs_status_city ON public.jobs(status, city);
CREATE INDEX idx_jobs_company ON public.jobs(company_id);
```

### Table 6: `public.applications`
*Candidate applications, dossiers, and employer hiring lifecycle tracking.*

```sql
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES public.candidates(profile_id) ON DELETE CASCADE,
    resume_id UUID NOT NULL REFERENCES public.resumes(id) ON DELETE RESTRICT,
    package_type dossier_package DEFAULT 'standard_free'::dossier_package NOT NULL,
    cover_letter TEXT,
    status application_status DEFAULT 'submitted'::application_status NOT NULL,
    rejection_reason TEXT,
    employer_rating SMALLINT,                  -- 1 to 5 rating by recruiter
    internal_notes TEXT,                       -- Confidential recruiter or admin notes
    status_updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT uq_candidate_job UNIQUE (job_id, candidate_id) -- Prevent double applications
);

CREATE INDEX idx_applications_job ON public.applications(job_id);
CREATE INDEX idx_applications_candidate ON public.applications(candidate_id);
CREATE INDEX idx_applications_status ON public.applications(status);
```

### Table 7: `public.notifications`
*Multi-channel notification inbox for candidates and employers.*

```sql
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    read_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_notifications_recipient_unread ON public.notifications(recipient_id, is_read);
```

---

## 4. Automatic Timestamp Update Trigger

```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all mutable tables
CREATE TRIGGER set_timestamp_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_timestamp_candidates BEFORE UPDATE ON public.candidates FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_timestamp_companies BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_timestamp_resumes BEFORE UPDATE ON public.resumes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_timestamp_jobs BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_timestamp_applications BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

---
*Schema design specification certified for Phase 2 implementation.*

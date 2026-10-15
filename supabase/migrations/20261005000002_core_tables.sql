-- ==============================================================================
-- MEZDOHUB MIGRATION 002: CORE RELATIONAL TABLES, CONSTRAINTS & INDEXES
-- Version: 1.0.0
-- Dependencies: Migration 001
-- ==============================================================================

BEGIN;

-- 1. Profiles Table (Extends auth.users with personal info & role)
CREATE TABLE IF NOT EXISTS public.profiles (
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

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(city);

-- 2. Candidates Table (Credentials, OFPPT diplomas, sectors)
CREATE TABLE IF NOT EXISTS public.candidates (
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

CREATE INDEX IF NOT EXISTS idx_candidates_education ON public.candidates(education_level);
CREATE INDEX IF NOT EXISTS idx_candidates_specialization ON public.candidates(specialization);

-- 3. Companies Table (Verified employers, ICE, industrial zones)
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    name VARCHAR(200) NOT NULL,
    legal_ice VARCHAR(20) UNIQUE,
    commercial_register_rc VARCHAR(50),
    tax_id_if VARCHAR(50),
    industry_sector VARCHAR(100) NOT NULL,
    industrial_zone VARCHAR(100),              -- e.g. TAC, TFZ, Melloussa, Casashore
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

CREATE INDEX IF NOT EXISTS idx_companies_ice ON public.companies(legal_ice);
CREATE INDEX IF NOT EXISTS idx_companies_verified ON public.companies(is_verified);

-- 4. Resumes Table (Document storage vault & ATS skills)
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID NOT NULL REFERENCES public.candidates(profile_id) ON DELETE CASCADE,
    title VARCHAR(150) DEFAULT 'Mon CV Principal' NOT NULL,
    file_storage_path TEXT NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) DEFAULT 'application/pdf' NOT NULL,
    is_primary BOOLEAN DEFAULT TRUE NOT NULL,
    parsed_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    parsed_experience_years NUMERIC(4, 1),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT chk_resume_size CHECK (file_size_bytes <= 10485760) -- Max 10MB
);

CREATE INDEX IF NOT EXISTS idx_resumes_candidate ON public.resumes(candidate_id);

-- 5. Jobs Table (Job listings with Moroccan salary in MAD)
CREATE TABLE IF NOT EXISTS public.jobs (
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
    workplace_location VARCHAR(150),
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

CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_status_city ON public.jobs(status, city);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON public.jobs(company_id);

-- 6. Applications Table (Dossier routing & hiring status)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES public.candidates(profile_id) ON DELETE CASCADE,
    resume_id UUID NOT NULL REFERENCES public.resumes(id) ON DELETE RESTRICT,
    package_type dossier_package DEFAULT 'standard_free'::dossier_package NOT NULL,
    cover_letter TEXT,
    status application_status DEFAULT 'submitted'::application_status NOT NULL,
    rejection_reason TEXT,
    employer_rating SMALLINT,
    internal_notes TEXT,
    status_updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT uq_candidate_job UNIQUE (job_id, candidate_id)
);

CREATE INDEX IF NOT EXISTS idx_applications_job ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_candidate ON public.applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- 7. Notifications Table (Candidate & Employer alerts)
CREATE TABLE IF NOT EXISTS public.notifications (
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

CREATE INDEX IF NOT EXISTS idx_notifications_recipient_unread ON public.notifications(recipient_id, is_read);

-- 8. Bind Automatic Timestamp Update Triggers
DROP TRIGGER IF EXISTS set_timestamp_profiles ON public.profiles;
CREATE TRIGGER set_timestamp_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_candidates ON public.candidates;
CREATE TRIGGER set_timestamp_candidates BEFORE UPDATE ON public.candidates FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_companies ON public.companies;
CREATE TRIGGER set_timestamp_companies BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_resumes ON public.resumes;
CREATE TRIGGER set_timestamp_resumes BEFORE UPDATE ON public.resumes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_jobs ON public.jobs;
CREATE TRIGGER set_timestamp_jobs BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_applications ON public.applications;
CREATE TRIGGER set_timestamp_applications BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

COMMIT;

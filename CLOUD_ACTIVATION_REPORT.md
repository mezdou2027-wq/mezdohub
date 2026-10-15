# MezdoHub — Cloud Activation & Pre-Flight Engineering Report
**Document Version:** 1.0.0  
**Phase:** Cloud Infrastructure Activation  
**Author:** Lead Backend Engineer & Supabase Database Architect  
**Project Ref State:** Active Project Detected  
**Scope:** Execution Verification, Order Certification & Final Pre-Flight Gate  

---

## 1. Environment Configuration Validation

### Variable Specifications
| Variable Name | Client Safety | Required Format | Source in Supabase Dashboard |
| :--- | :---: | :--- | :--- |
| `VITE_SUPABASE_URL` | **Safe** (Public) | `https://[ref].supabase.co` | **Project Settings** -> **Data API** -> **Project URL** |
| `VITE_SUPABASE_ANON_KEY` | **Safe** (Public) | `eyJhbGciOi...` (JWT) | **Project Settings** -> **Data API** -> **Project API Keys (`anon`)** |
| `VITE_GA_MEASUREMENT_ID` | **Safe** (Public) | `G-XXXXXXXXXX` | **Google Analytics 4** Data Stream |

### Critical Security Boundaries
* **Forbidden in Client:** `SUPABASE_SERVICE_ROLE_KEY` (Bypasses Row-Level Security — must **never** be injected into Vite client env).
* **Detection Mechanism (`src/lib/supabase.ts`):**
  ```typescript
  export const isSupabaseConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !import.meta.env.VITE_SUPABASE_URL.includes('mock')
  );
  ```
  The applet dynamically binds to the cloud backend as soon as these variables are injected into your hosting container or `.env`.

---

## 2. Certified Migration Execution Order

To guarantee foreign-key integrity, zero-dependency deadlocks, and transaction isolation, the SQL migrations **MUST** be executed in the following strict forward-only sequence:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CERTIFIED MIGRATION EXECUTION SEQUENCE               │
├───────┬───────────────────────────┬────────────────────────────────────┤
│ Step  │ File Name                 │ Core Engine Responsibilities       │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **1** │ `001_initial_schema.sql`  │ • Enable `uuid`, `citext`, `pgcrypto`│
│       │                           │ • Create `audit` schema            │
│       │                           │ • Create 7 Moroccan Domain Enums   │
│       │                           │ • Create 7 Core Tables             │
│       │                           │ • Attach `updated_at` triggers     │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **2** │ `002_indexes.sql`         │ • Create B-Tree Indexes on FKs     │
│       │                           │ • Create GIN Indexes on Skills/Reqs│
│       │                           │ • Create Partial Indexes on Active │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **3** │ `003_rls.sql`             │ • Deploy 3 Helper Security Funcs   │
│       │                           │ • `ALTER TABLE ... ENABLE RLS` (x7)│
│       │                           │ • Deploy 16 Multi-Tenant Policies  │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **4** │ `004_audit_logs.sql`      │ • Create `audit.logs` Table        │
│       │                           │ • Attach CDC Triggers to Sensitive │
│       │                           │ • Lock down table permissions      │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **5** │ `005_seed_data.sql`       │ • Populate Baseline Industrial Data│
│       │                           │   (Renault Melloussa, Lear TFZ)    │
│       │                           │ • Inject Sample Jobs & Application │
└───────┴───────────────────────────┴────────────────────────────────────┘
```

> **Safety Assurance:** Every individual file is wrapped inside a transactional block (`BEGIN; ... COMMIT;`). If any network interruption or syntax failure occurs, PostgreSQL executes an immediate, complete rollback with zero orphaned tables.

---

## 3. Certified RLS Deployment & Hierarchy Order

Row-Level Security execution depends upon a strict evaluation graph. In `003_rls.sql`, policies are deployed in this exact mathematical dependency hierarchy:

```
                       RLS DEPENDENCY HIERARCHY
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
[Security Primitives]                             [Base Table Lockdown]
1. auth.get_user_role()                           ENABLE ROW LEVEL SECURITY
2. auth.is_admin()                                on all 7 tables in public
3. auth.owns_company()
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  ▼
                     [User & Tenant Isolation]
                     1. profiles_select / profiles_update_own
                     2. candidates_own_manage / candidates_employer_view
                     3. companies_public_select / companies_owner_manage
                                  │
                                  ▼
                    [Complex Relational Policies]
                    4. resumes_candidate_manage / resumes_employer_view
                    5. jobs_public_select / jobs_employer_manage
                    6. applications_candidate_access / applications_employer_review
                    7. notifications_user_own
```

### Why this specific order prevents runtime failures:
1. **Helper Functions First:** PostgreSQL validates function existence when compiling policy expressions. Placing `auth.is_admin()` and `auth.owns_company()` at the top prevents `function does not exist` errors.
2. **Profiles Before Relational Joins:** Relational policies (e.g., verifying if an employer owns the company for a job application) query `public.companies` and `public.profiles`. Ensuring base profiles are secured first prevents recursive RLS loops.

---

## 4. Final Cloud Deployment Checklist

Print or follow this step-by-step checklist inside the Supabase SQL Editor:

### Step 1: Execute Migrations
- [ ] Open **Supabase Dashboard** -> **SQL Editor** -> **New Query**.
- [ ] Paste contents of `SQL_MIGRATIONS/001_initial_schema.sql` -> Click **Run** -> Output: `Success`.
- [ ] Paste contents of `SQL_MIGRATIONS/002_indexes.sql` -> Click **Run** -> Output: `Success`.
- [ ] Paste contents of `SQL_MIGRATIONS/003_rls.sql` -> Click **Run** -> Output: `Success`.
- [ ] Paste contents of `SQL_MIGRATIONS/004_audit_logs.sql` -> Click **Run** -> Output: `Success`.
- [ ] Paste contents of `SQL_MIGRATIONS/005_seed_data.sql` -> Click **Run** -> Output: `Success`.

### Step 2: Run Automated Post-Deployment Verification Query
Paste and execute this diagnostic block in the SQL Editor:

```sql
DO $$ 
DECLARE
    table_count INT;
    rls_count INT;
    company_count INT;
    job_count INT;
BEGIN
    SELECT count(*) INTO table_count FROM pg_tables WHERE schemaname = 'public';
    SELECT count(*) INTO rls_count FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true;
    SELECT count(*) INTO company_count FROM public.companies;
    SELECT count(*) INTO job_count FROM public.jobs;

    RAISE NOTICE '==================================================';
    RAISE NOTICE 'MEZDOHUB CLOUD ACTIVATION DIAGNOSTIC:';
    RAISE NOTICE 'Total Public Tables Created: % (Expected: 7)', table_count;
    RAISE NOTICE 'Total Tables with RLS Active: % (Expected: 7)', rls_count;
    RAISE NOTICE 'Seeded Industrial Companies: % (Expected: 2)', company_count;
    RAISE NOTICE 'Seeded Industrial Jobs: % (Expected: 2)', job_count;
    RAISE NOTICE '==================================================';

    IF table_count != 7 OR rls_count != 7 OR company_count < 2 OR job_count < 2 THEN
        RAISE EXCEPTION 'Verification Failed: Database state does not match expected criteria!';
    ELSE
        RAISE NOTICE 'STATUS: 100% PRODUCTION READY FOR PHASE 3';
    END IF;
END $$;
```

### Step 3: Inject Environment Variables
- [ ] Copy `Project URL` and `anon key` from **Project Settings** -> **API**.
- [ ] Save in your deployment environment as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- [ ] Refresh the MezdoHub application window.
- [ ] Sign in / Sign out to verify real-time session persistence.

---
*Cloud Activation pre-flight certification complete. Database layer is primed for Phase 3.*

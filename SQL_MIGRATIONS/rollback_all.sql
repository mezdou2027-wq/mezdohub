-- ==============================================================================
-- MEZDOHUB MIGRATIONS ROLLBACK SCRIPT
-- Destination: SQL_MIGRATIONS/rollback_all.sql
-- WARNING: DESTRUCTIVE ACTION - EXECUTE ONLY FOR DISASTER RECOVERY OR RESET
-- ==============================================================================

BEGIN;

-- 1. Drop Triggers
DROP TRIGGER IF EXISTS audit_applications_changes ON public.applications;
DROP TRIGGER IF EXISTS audit_companies_verification ON public.companies;
DROP TRIGGER IF EXISTS audit_profiles_changes ON public.profiles;

DROP TRIGGER IF EXISTS set_timestamp_profiles ON public.profiles;
DROP TRIGGER IF EXISTS set_timestamp_candidates ON public.candidates;
DROP TRIGGER IF EXISTS set_timestamp_companies ON public.companies;
DROP TRIGGER IF EXISTS set_timestamp_resumes ON public.resumes;
DROP TRIGGER IF EXISTS set_timestamp_jobs ON public.jobs;
DROP TRIGGER IF EXISTS set_timestamp_applications ON public.applications;

-- 2. Drop Audit Layer
DROP TABLE IF EXISTS audit.logs CASCADE;
DROP FUNCTION IF EXISTS audit.record_table_change() CASCADE;
DROP SCHEMA IF EXISTS audit CASCADE;

-- 3. Drop Public Tables (Reverse Dependency Order)
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.jobs CASCADE;
DROP TABLE IF EXISTS public.resumes CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.candidates CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 4. Drop Security & Helper Functions
DROP FUNCTION IF EXISTS auth.owns_company(UUID) CASCADE;
DROP FUNCTION IF EXISTS auth.is_admin() CASCADE;
DROP FUNCTION IF EXISTS auth.get_user_role() CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

-- 5. Drop Custom Enums
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS dossier_package CASCADE;
DROP TYPE IF EXISTS application_status CASCADE;
DROP TYPE IF EXISTS job_status CASCADE;
DROP TYPE IF EXISTS contract_type CASCADE;
DROP TYPE IF EXISTS education_level CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

COMMIT;

-- ==============================================================================
-- MEZDOHUB MIGRATION 002: PERFORMANCE & CONSTRAINT INDEXES
-- Destination: SQL_MIGRATIONS/002_indexes.sql
-- Dependencies: 001_initial_schema.sql
-- ==============================================================================

BEGIN;

-- 1. Profiles Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_created ON public.profiles(created_at DESC);

-- 2. Candidates Indexes
CREATE INDEX IF NOT EXISTS idx_candidates_education ON public.candidates(education_level);
CREATE INDEX IF NOT EXISTS idx_candidates_specialization ON public.candidates(specialization);
CREATE INDEX IF NOT EXISTS idx_candidates_seeking ON public.candidates(actively_seeking) WHERE actively_seeking = TRUE;
CREATE INDEX IF NOT EXISTS idx_candidates_sectors ON public.candidates USING GIN (target_sectors);

-- 3. Companies Indexes
CREATE INDEX IF NOT EXISTS idx_companies_ice ON public.companies(legal_ice);
CREATE INDEX IF NOT EXISTS idx_companies_verified ON public.companies(is_verified);
CREATE INDEX IF NOT EXISTS idx_companies_city_zone ON public.companies(city, industrial_zone);

-- 4. Resumes Indexes
CREATE INDEX IF NOT EXISTS idx_resumes_candidate ON public.resumes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_resumes_primary ON public.resumes(candidate_id) WHERE is_primary = TRUE;
CREATE INDEX IF NOT EXISTS idx_resumes_skills ON public.resumes USING GIN (parsed_skills);

-- 5. Jobs Indexes (Critical for search & filtering)
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_status_city ON public.jobs(status, city);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON public.jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_published ON public.jobs(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_jobs_contract ON public.jobs(contract_type);
CREATE INDEX IF NOT EXISTS idx_jobs_requirements ON public.jobs USING GIN (key_requirements);

-- 6. Applications Indexes (Critical for candidate & employer lookups)
CREATE INDEX IF NOT EXISTS idx_applications_job ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_candidate ON public.applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON public.applications(created_at DESC);

-- 7. Notifications Indexes
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_unread ON public.notifications(recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON public.notifications(created_at DESC);

COMMIT;

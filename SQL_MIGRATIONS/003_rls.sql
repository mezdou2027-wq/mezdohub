-- ==============================================================================
-- MEZDOHUB MIGRATION 003: ROW LEVEL SECURITY (RLS) POLICIES
-- Destination: SQL_MIGRATIONS/003_rls.sql
-- Dependencies: 001_initial_schema.sql, 002_indexes.sql
-- ==============================================================================

BEGIN;

-- 1. Helper Security Functions
CREATE OR REPLACE FUNCTION auth.get_user_role()
RETURNS user_role AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'superadmin')
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION auth.owns_company(company_uuid UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.companies 
        WHERE id = company_uuid 
        AND primary_owner_id = auth.uid()
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 2. Enable RLS on All Tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 3. Profiles Policies
DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;
CREATE POLICY "profiles_select_authenticated" ON public.profiles
    FOR SELECT TO authenticated
    USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all" ON public.profiles
    FOR ALL TO authenticated
    USING (auth.is_admin());

-- 4. Candidates Policies
DROP POLICY IF EXISTS "candidates_own_manage" ON public.candidates;
CREATE POLICY "candidates_own_manage" ON public.candidates
    FOR ALL TO authenticated
    USING (auth.uid() = profile_id)
    WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "candidates_employer_view" ON public.candidates;
CREATE POLICY "candidates_employer_view" ON public.candidates
    FOR SELECT TO authenticated
    USING (
        auth.get_user_role() = 'employer' 
        AND (
            allow_employer_contact = true
            OR profile_id IN (
                SELECT candidate_id FROM public.applications a
                JOIN public.jobs j ON a.job_id = j.id
                WHERE auth.owns_company(j.company_id)
            )
        )
    );

DROP POLICY IF EXISTS "candidates_admin_all" ON public.candidates;
CREATE POLICY "candidates_admin_all" ON public.candidates
    FOR ALL TO authenticated
    USING (auth.is_admin());

-- 5. Companies Policies
DROP POLICY IF EXISTS "companies_public_select" ON public.companies;
CREATE POLICY "companies_public_select" ON public.companies
    FOR SELECT TO anon, authenticated
    USING (is_verified = true);

DROP POLICY IF EXISTS "companies_owner_manage" ON public.companies;
CREATE POLICY "companies_owner_manage" ON public.companies
    FOR ALL TO authenticated
    USING (primary_owner_id = auth.uid())
    WITH CHECK (primary_owner_id = auth.uid());

DROP POLICY IF EXISTS "companies_admin_all" ON public.companies;
CREATE POLICY "companies_admin_all" ON public.companies
    FOR ALL TO authenticated
    USING (auth.is_admin());

-- 6. Resumes Policies
DROP POLICY IF EXISTS "resumes_candidate_manage" ON public.resumes;
CREATE POLICY "resumes_candidate_manage" ON public.resumes
    FOR ALL TO authenticated
    USING (candidate_id = auth.uid())
    WITH CHECK (candidate_id = auth.uid());

DROP POLICY IF EXISTS "resumes_employer_view" ON public.resumes;
CREATE POLICY "resumes_employer_view" ON public.resumes
    FOR SELECT TO authenticated
    USING (
        id IN (
            SELECT a.resume_id FROM public.applications a
            JOIN public.jobs j ON a.job_id = j.id
            WHERE auth.owns_company(j.company_id)
        )
    );

DROP POLICY IF EXISTS "resumes_admin_all" ON public.resumes;
CREATE POLICY "resumes_admin_all" ON public.resumes
    FOR ALL TO authenticated
    USING (auth.is_admin());

-- 7. Jobs Policies
DROP POLICY IF EXISTS "jobs_public_select" ON public.jobs;
CREATE POLICY "jobs_public_select" ON public.jobs
    FOR SELECT TO anon, authenticated
    USING (status = 'published' AND expires_at > NOW());

DROP POLICY IF EXISTS "jobs_employer_manage" ON public.jobs;
CREATE POLICY "jobs_employer_manage" ON public.jobs
    FOR ALL TO authenticated
    USING (auth.owns_company(company_id))
    WITH CHECK (auth.owns_company(company_id));

DROP POLICY IF EXISTS "jobs_admin_all" ON public.jobs;
CREATE POLICY "jobs_admin_all" ON public.jobs
    FOR ALL TO authenticated
    USING (auth.is_admin());

-- 8. Applications Policies
DROP POLICY IF EXISTS "applications_candidate_access" ON public.applications;
CREATE POLICY "applications_candidate_access" ON public.applications
    FOR ALL TO authenticated
    USING (candidate_id = auth.uid())
    WITH CHECK (candidate_id = auth.uid());

DROP POLICY IF EXISTS "applications_employer_review" ON public.applications;
CREATE POLICY "applications_employer_review" ON public.applications
    FOR SELECT TO authenticated
    USING (
        job_id IN (
            SELECT id FROM public.jobs WHERE auth.owns_company(company_id)
        )
    );

DROP POLICY IF EXISTS "applications_employer_update_status" ON public.applications;
CREATE POLICY "applications_employer_update_status" ON public.applications
    FOR UPDATE TO authenticated
    USING (
        job_id IN (
            SELECT id FROM public.jobs WHERE auth.owns_company(company_id)
        )
    )
    WITH CHECK (
        job_id IN (
            SELECT id FROM public.jobs WHERE auth.owns_company(company_id)
        )
    );

DROP POLICY IF EXISTS "applications_admin_all" ON public.applications;
CREATE POLICY "applications_admin_all" ON public.applications
    FOR ALL TO authenticated
    USING (auth.is_admin());

-- 9. Notifications Policies
DROP POLICY IF EXISTS "notifications_user_own" ON public.notifications;
CREATE POLICY "notifications_user_own" ON public.notifications
    FOR ALL TO authenticated
    USING (recipient_id = auth.uid())
    WITH CHECK (recipient_id = auth.uid());

DROP POLICY IF EXISTS "notifications_admin_insert" ON public.notifications;
CREATE POLICY "notifications_admin_insert" ON public.notifications
    FOR INSERT TO authenticated
    WITH CHECK (auth.is_admin() OR auth.uid() IS NOT NULL);

COMMIT;

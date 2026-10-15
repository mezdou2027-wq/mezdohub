# MezdoHub — Supabase Database Implementation & Deployment Guide
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Auditor:** Chief Technology Officer & Lead Backend Engineer  
**Target Engine:** Supabase PostgreSQL 16 (EU Region: Paris / Frankfurt)  

---

## 1. Migration Sequence Inventory

All SQL files reside in the `/supabase/migrations/` directory and must be executed in strict forward-only numerical sequence:

| Sequence | File Name | Execution Target | Verification Query |
| :---: | :--- | :--- | :--- |
| **001** | `20261005000001_initial_primitives.sql` | Extensions (`uuid`, `citext`, `pgcrypto`), `audit` schema, custom ENUMs, `handle_updated_at()` trigger. | `SELECT typname FROM pg_type WHERE typname = 'user_role';` |
| **002** | `20261005000002_core_tables.sql` | 7 Core relational tables (`profiles`, `candidates`, `companies`, `resumes`, `jobs`, `applications`, `notifications`), indexes, foreign keys, triggers. | `SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public';` |
| **003** | `20261005000003_rls_policies.sql` | Enable RLS on all 7 tables, deploy security helper functions (`auth.is_admin()`, `auth.owns_company()`), deploy 16 RBAC access policies. | `SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';` |
| **004** | `20261005000004_audit_logging.sql` | Dedicated `audit.logs` table, Change Data Capture (CDC) triggers on applications and companies, revoke destructive privileges. | `SELECT grantee, privilege_type FROM information_schema.table_privileges WHERE table_name = 'logs';` |
| **005** | `20261005000005_seed_data.sql` | Deterministic benchmark seed data: Tangier employers (Renault, Lear), OFPPT candidate profile, resume, industrial jobs, and sample application. | `SELECT count(*) FROM public.jobs;` (Returns >= 2) |

---

## 2. Deployment Instructions

### Method A: Automated Deployment via Supabase CLI (Recommended)

1. **Install Supabase CLI & Authenticate:**
   ```bash
   npx supabase login
   ```

2. **Link to MezdoHub Cloud Project:**
   ```bash
   npx supabase link --project-ref [YOUR_SUPABASE_PROJECT_REF]
   ```

3. **Push All Migrations to Cloud Database:**
   ```bash
   npx supabase db push
   ```
   *The CLI executes files `001` through `005` inside transactional blocks in chronological order.*

---

### Method B: Manual Deployment via Supabase Web Dashboard SQL Editor

If executing migrations directly inside the Supabase Web Dashboard:
1. Open the Supabase Project Dashboard -> Navigate to **SQL Editor**.
2. Open `supabase/migrations/20261005000001_initial_primitives.sql` -> Paste into SQL Editor -> Click **Run**.
3. Open `supabase/migrations/20261005000002_core_tables.sql` -> Paste -> Click **Run**.
4. Open `supabase/migrations/20261005000003_rls_policies.sql` -> Paste -> Click **Run**.
5. Open `supabase/migrations/20261005000004_audit_logging.sql` -> Paste -> Click **Run**.
6. Open `supabase/migrations/20261005000005_seed_data.sql` -> Paste -> Click **Run**.

---

## 3. Database Security & Verification Checklist

Execute these queries in the Supabase SQL editor to verify database integrity:

```sql
-- 1. VERIFY ALL 7 CORE TABLES EXIST AND HAVE RLS ENABLED
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'candidates', 'companies', 'resumes', 'jobs', 'applications', 'notifications');
-- Expected: All 7 rows return rowsecurity = true

-- 2. VERIFY AUDIT SCHEMA AND LOGGING TABLE
SELECT table_schema, table_name 
FROM information_schema.tables 
WHERE table_schema = 'audit';
-- Expected: 1 row ('audit', 'logs')

-- 3. VERIFY FOREIGN KEYS & CASCADE RULES
SELECT
    tc.table_name, kcu.column_name,
    ccu.table_name AS foreign_table_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public';
-- Expected: All 9 foreign key constraints return with matching ON DELETE CASCADE or RESTRICT rules

-- 4. VERIFY IMMUTABILITY LOCK ON AUDIT LOGS
SELECT privilege_type, is_grantable 
FROM information_schema.table_privileges 
WHERE table_name = 'logs' AND grantee = 'authenticated';
-- Expected: Only 'SELECT' is permitted; zero 'UPDATE' or 'DELETE' grants
```

---

## 4. Phase 2 Boundary Sign-Off

* **No UI Changes Made:** Public pages, Job Marketplace UI, CRM UI, and Notification UI remain untouched.
* **Pure Data Foundation:** Delivered pristine SQL DDL, indexes, RLS models, audit capture, and seed records.
* **Ready for Phase 3 (Candidate Accounts):** The frontend can now safely bind candidate profile mutations directly to `public.candidates` and `public.resumes`.

---
*Certified for production database provisioning by Lead Backend Engineer.*

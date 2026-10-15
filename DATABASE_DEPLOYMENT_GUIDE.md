# MezdoHub — Database Deployment & Operational Guide
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Auditor:** Chief Technology Officer & Lead Backend Engineer  
**Target:** Production & Staging PostgreSQL 16 Environments  

---

## 1. Migration Execution Order

Deploy the scripts located in `/SQL_MIGRATIONS/` in strict sequential order:

```
SQL_MIGRATIONS/
├── 001_initial_schema.sql       # 1. Extensions, Enums, 7 Core Tables, Triggers
├── 002_indexes.sql              # 2. Performance B-Tree, GIN, and Partial Indexes
├── 003_rls.sql                  # 3. Security Functions & 16 Row-Level Security Policies
├── 004_audit_logs.sql           # 4. Forensic Audit Table, CDC Triggers & Grant Lockdown
├── 005_seed_data.sql            # 5. Production Seed Benchmark (Renault, Lear, Tangier Jobs)
└── rollback_all.sql             # [DISASTER RECOVERY ONLY] Complete Schema Teardown
```

---

## 2. Deployment Workflows

### Option A: Direct Deployment via Supabase Web Dashboard (Zero Setup)
1. Log in to the [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your MezdoHub project -> Click **SQL Editor** in the left sidebar.
3. Click **New Query**.
4. Copy and paste the entire contents of `001_initial_schema.sql` -> Click **Run**.
5. Repeat step 4 for `002_indexes.sql`, `003_rls.sql`, `004_audit_logs.sql`, and `005_seed_data.sql`.
6. Verify output message displays `Success. No rows returned` or insertion confirmations.

---

### Option B: Automated CI/CD Deployment via Supabase CLI
```bash
# 1. Authenticate Supabase CLI
npx supabase login

# 2. Link Local Workspace to Cloud Instance
npx supabase link --project-ref [YOUR_SUPABASE_PROJECT_REF]

# 3. Apply Migrations to Remote PostgreSQL
npx supabase db push
```

---

## 3. Post-Deployment Smoke Test
Run the following SQL snippet inside the SQL Editor to verify complete table and policy creation:

```sql
SELECT 
    schemaname, 
    tablename, 
    rowsecurity AS rls_enabled 
FROM pg_tables 
WHERE schemaname IN ('public', 'audit')
ORDER BY schemaname, tablename;
```
*Expected Result:* 7 tables in `public` with `rls_enabled = true`, and 1 table (`logs`) in `audit`.

---
*Guide certified for execution by Lead Backend Engineer.*

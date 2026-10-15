# MezdoHub — Database Migration Strategy & Execution Plan
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Architect:** Chief Technology Officer & Lead Database Architect  
**Tools:** Supabase CLI / Drizzle Kit / Flyway  
**Target Database:** PostgreSQL 16 (EU Region: Paris / Frankfurt)  

---

## 1. Migration Strategy Overview

MezdoHub employs an **Incremental Forward-Only Migration Strategy**. 

* Every schema alteration is versioned as an immutable SQL migration file (`migrations/YYYYMMDDHHMMSS_name.sql`).
* Migrations are executed in transactional blocks (`BEGIN; ... COMMIT;`), ensuring zero partial schema drift upon runtime syntax errors.
* Local development environments run identical migration scripts against local Dockerized PostgreSQL instances using the Supabase CLI.

---

## 2. Phased Migration Execution Timeline

```
                               MIGRATION TIMELINE
                                       │
     ┌──────────────────┬──────────────┴──────────────┬──────────────────┐
     ▼                  ▼                             ▼                  ▼
[001: Primitives]  [002: Core Schema]            [003: Security & RLS] [004: Seed Data]
• Extensions       • Profiles & Candidates       • Enable RLS on all   • Pre-seeded Tangier
• Custom Types     • Companies & Jobs            • Deploy Table          Employers (Renault,
• Audit Schema     • Resumes & Applications        Policies              Lear, Aptiv, etc.)
• Updated_At Trigg • Notifications               • Deploy Helper Funcs • System Admin User
```

---

## 3. Migration Scripts Specification

### Migration 001: Extensions, Enums & Base Functions
*File:* `migrations/20261005000001_initial_primitives.sql`
* Contains: `uuid-ossp`, `citext`, `pgcrypto`, `user_role`, `education_level`, `contract_type`, `job_status`, `application_status`, `dossier_package`, `notification_type`, and `public.handle_updated_at()`.

### Migration 002: Core Relational Tables & Constraints
*File:* `migrations/20261005000002_core_tables.sql`
* Contains: `public.profiles`, `public.candidates`, `public.companies`, `public.resumes`, `public.jobs`, `public.applications`, `public.notifications`.
* Includes all foreign keys (`ON DELETE CASCADE` / `RESTRICT`), check constraints, and performance indexes.

### Migration 003: Row-Level Security Policies & RBAC
*File:* `migrations/20261005000003_rls_policies.sql`
* Contains: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`, helper functions (`auth.get_user_role()`, `auth.is_admin()`, `auth.owns_company()`), and all 16 discrete RLS policies.

### Migration 004: Baseline Seed Data & Industrial Taxonomy
*File:* `migrations/20261005000004_seed_taxonomy.sql`
* Pre-seeds verified employers (e.g., Renault Melloussa, Lear Automotive, Teleperformance Tangier, Aptiv Kenitra) and default system admin identities.

---

## 4. Rollback & Disaster Recovery Procedures

Because production PostgreSQL schemas should avoid destructive rollbacks that drop columns containing live user data, MezdoHub follows the **Expand-and-Contract Migration Pattern**:

1. **Phase A (Expand):** Add new columns as nullable or with defaults. Code is updated to read from new columns.
2. **Phase B (Backfill):** Asynchronous background worker copies legacy data to new columns.
3. **Phase C (Contract):** Legacy column is deprecated and removed in a subsequent release.

### Point-in-Time Recovery (PITR)
* Continuous WAL (Write-Ahead Logging) archiving enables Point-in-Time Recovery with a 14-day lookback window.
* RPO (Recovery Point Objective): < 5 minutes.
* RTO (Recovery Time Objective): < 30 minutes.

---
*Migration Plan certified for automated CI/CD pipeline execution.*

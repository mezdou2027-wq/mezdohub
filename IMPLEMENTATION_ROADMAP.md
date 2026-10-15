# MezdoHub — 10-Phase Implementation Roadmap
**Document Version:** 1.0.0  
**Date:** October 5, 2026  
**Author:** Chief Technology Officer (CTO), MezdoHub  
**Reference Foundations:** `BUSINESS_AND_TECHNICAL_AUDIT.md` & `PRODUCTION_ARCHITECTURE.md`  

---

## Executive Overview

This roadmap defines the sequential, 10-phase engineering execution plan for MezdoHub. Each phase builds upon the security, data model, and operational foundations established by prior phases.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              MEZDOHUB 10-PHASE MASTER TIMELINE                         │
├───────────────┬─────────────────┬─────────────────┬──────────────────┬─────────────────┤
│ Phase 1: Auth │ Phase 2: DB     │ Phase 3: Cand.  │ Phase 4: Emp.    │ Phase 5: Resumes│
│ Identity & RBAC│ Schemas & RLS  │ Profile & App   │ Company & Post   │ Vault & S3      │
├───────────────┼─────────────────┼─────────────────┼──────────────────┼─────────────────┤
│ Phase 6: CRM  │ Phase 7: Market │ Phase 8: Notif. │ Phase 9: Payments│ Phase 10: AI    │
│ Lead Pipeline │ Dynamic Sourcing│ WhatsApp & Mail │ CMI & Stripe     │ Match & Assist  │
└───────────────┴─────────────────┴─────────────────┴──────────────────┴─────────────────┘
```

---

## Phase 1 — Authentication & Identity Matrix
- **Objective:** Establish a secure, multi-role authentication system separating Candidate, Employer, and Admin identities with session persistence, email verification, password reset, and protected routes.
- **Deliverables:**
  - Supabase Auth client integration with fallback mock provider for offline/sandbox development.
  - Role-based access control (RBAC) token claims (`candidate`, `employer`, `admin`).
  - Auth modal / views: Sign In, Sign Up (with Role Selector), Forgot Password, Password Reset, and Verification banner.
  - Session persistence layer (`HttpOnly` cookies / LocalStorage token store).
  - Protected Route wrapper component restricting views by role.
  - `AUTH_IMPLEMENTATION.md` documentation.
- **Dependencies:** None (Baseline foundation).
- **Success Criteria:** Users can register as Candidate or Employer, log in, recover forgotten passwords, retain active sessions on browser reload, and Admins are protected behind authorization guards.
- **Risks:** Cookie handling in iframe preview environments, session desynchronization.
- **Estimated Complexity:** Medium.

---

## Phase 2 — Database Infrastructure & Row-Level Security (RLS)
- **Objective:** Deploy managed PostgreSQL 16 schemas (via Supabase / Cloud SQL) and enforce Row-Level Security policies to prevent cross-tenant data leakage.
- **Deliverables:**
  - DDL migration scripts for `profiles`, `candidates`, `employers`, `jobs`, `applications`, and `audit_logs`.
  - Database RLS policies isolating candidate records and employer jobs.
  - Drizzle ORM / Supabase client schema definitions in TypeScript.
  - Automated seeding scripts for Tangier manufacturing companies.
- **Dependencies:** Phase 1 (Auth identity tokens required for `auth.uid()` RLS evaluation).
- **Success Criteria:** Zero cross-tenant data access; zero public exposure of PII tables.
- **Risks:** Policy misconfiguration blocking legitimate candidate applications.
- **Estimated Complexity:** High.

---

## Phase 3 — Candidate Self-Service Accounts & Application Tracker
- **Objective:** Enable candidate profile management, education/OFPPT credential verification, and live tracking of submitted applications.
- **Deliverables:**
  - Candidate Dashboard UI with application status timeline (`submitted`, `under_review`, `hired`).
  - Profile editor: Moroccan phone verification, city, diploma specialization, languages.
  - Saved jobs bookmarking and history.
  - Account deletion (Right to Erasure) self-serve button.
- **Dependencies:** Phase 1 (Auth), Phase 2 (Database).
- **Success Criteria:** Candidates can edit their profiles, review the status of their dossiers in real time, and request account deletion.
- **Risks:** Data synchronization delays between status updates.
- **Estimated Complexity:** Medium.

---

## Phase 4 — Employer Portal & Verified Company Profiles
- **Objective:** Provide industrial employers with self-service company onboarding, ICE validation, and job applicant review pipelines.
- **Deliverables:**
  - Employer Dashboard with applicant review kanban board.
  - Company profile manager: ICE, RC, address in Tangier/Morocco industrial zones, HR contact details.
  - Direct candidate messaging and interview scheduling trigger.
  - Company verification badge system.
- **Dependencies:** Phase 1 (Auth), Phase 2 (Database).
- **Success Criteria:** Employers can log in, view only candidates who applied to their postings, and update applicant statuses.
- **Risks:** Fake employer registrations attempting to harvest candidate phone numbers (mitigated via admin verification flag).
- **Estimated Complexity:** High.

---

## Phase 5 — Secure Resume Vault & Cloud Storage
- **Objective:** Transition resume generation and storage from ephemeral client-side blobs to private, virus-scanned S3/Cloudflare R2 object storage.
- **Deliverables:**
  - Cloudflare R2 bucket integration with pre-signed PUT/GET URLs.
  - Server-side PDF generation fallback for low-spec mobile devices.
  - Public immutable portfolio slug generator (e.g., `mezdohub.com/cv/karim-tanger`).
  - Automated 60-day lifecycle auto-purge worker for DV Lottery photos.
- **Dependencies:** Phase 2 (Database), Phase 3 (Candidate Accounts).
- **Success Criteria:** Resumes upload within 2 seconds, download links expire after 15 minutes, zero unauthorized access to PDF binaries.
- **Risks:** Large PDF files crashing client uploads on weak 3G/4G connections.
- **Estimated Complexity:** Medium.

---

## Phase 6 — Omnichannel CRM & Lead Operations Engine
- **Objective:** Transform the rudimentary `OwnerAdminPortal` into an enterprise-grade Lead Management & Dispatch system.
- **Deliverables:**
  - Live lead triage stream for DV Lottery VIP, Factory Dossiers, and B2B inquiries.
  - 1-click WhatsApp deep-link dispatcher with localized Moroccan templates.
  - Multi-agent audit logging tracking which admin accessed candidate contact numbers.
  - Encrypted CSV/XLSX export for accounting and operational teams.
- **Dependencies:** Phase 1, Phase 2, Phase 3, Phase 5.
- **Success Criteria:** Internal operators process and dispatch dossiers in under 3 minutes per lead with full audit trails.
- **Risks:** CNDP compliance violation if CSV exports are unencrypted.
- **Estimated Complexity:** Medium.

---

## Phase 7 — Dynamic Job Marketplace & Programmatic SEO
- **Objective:** Replace static hardcoded listings with a dynamic, filterable job marketplace and programmatic SSR landing pages for maximum Google search indexing.
- **Deliverables:**
  - Real-time job filtering (City: Tangier/Kenitra/Casablanca, Sector: Automotive/Aeronautics/Call Center, Contract: CDI/ANAPEC).
  - Employer self-service job post submission with payment checkout.
  - Programmatic slug generation (`/jobs/:city/:company-:title`) with `JobPosting` Schema.org JSON-LD.
  - Automated XML sitemap generation.
- **Dependencies:** Phase 2 (Database), Phase 4 (Employer Accounts).
- **Success Criteria:** 100% of published jobs indexed by Google Jobs within 48 hours; sub-100ms search filter response times.
- **Risks:** Web scrapers overwhelming search endpoints (mitigated by edge rate-limiting).
- **Estimated Complexity:** High.

---

## Phase 8 — Multi-Channel Notification Engine (WhatsApp & Transactional Email)
- **Objective:** Build an asynchronous event-driven notification queue informing candidates and employers of critical application status updates.
- **Deliverables:**
  - Redis + BullMQ background worker queue.
  - Meta WhatsApp Business Cloud API integration for application milestones.
  - Resend / SendGrid transactional email templates (Arabic / French).
  - In-app notification center with real-time websocket badge updates.
- **Dependencies:** Phase 1, Phase 3, Phase 4, Phase 6.
- **Success Criteria:** 99%+ delivery rate of transactional confirmation messages within 10 seconds of submission.
- **Risks:** WhatsApp Business API account template rejection; spam flags.
- **Estimated Complexity:** High.

---

## Phase 9 — Commercial Payment Gateway (CMI & Stripe)
- **Objective:** Monetize high-intent services (DV Lottery VIP verification, Direct HR Dossiers, Featured Employer Job Listings) through local and international cards.
- **Deliverables:**
  - Moroccan CMI (Centre Monétique Interbancaire) / Payzone integration for domestic Moroccan debit cards.
  - Stripe Checkout integration for diaspora and international payments (EUR, USD).
  - Automated tax invoice generation with company ICE and fiscal breakdown.
  - Webhook handlers updating dossier priority and listing visibility upon payment confirmation.
- **Dependencies:** Phase 2, Phase 4, Phase 6.
- **Success Criteria:** Secure payment processing with zero drop-off, sub-3-second webhook confirmation, full fraud prevention.
- **Risks:** Moroccan bank 3D-Secure failure rates during high-traffic campaigns.
- **Estimated Complexity:** Very High.

---

## Phase 10 — Intelligent Career Copilot & ATS Match Optimizer
- **Objective:** Deploy local-context AI intelligence assisting Moroccan youth in diagnosing career fits, optimizing resumes against Moroccan job descriptions, and multilingual interview prep.
- **Deliverables:**
  - ATS Resume Keyword Matcher comparing user CV against target job specifications.
  - Interactive French/English job interview simulator for Tangier BPO/automotive roles.
  - Algorithmic candidate-to-job recommendation engine.
- **Dependencies:** Phase 3, Phase 5, Phase 7.
- **Success Criteria:** Candidates receive actionable, localized CV enhancement suggestions within 5 seconds; 35%+ increase in employer interview invite rates.
- **Risks:** Hallucinated career advice; latency spikes.
- **Estimated Complexity:** High.

---
*Roadmap Approved for Immediate Execution Starting with Phase 1.*

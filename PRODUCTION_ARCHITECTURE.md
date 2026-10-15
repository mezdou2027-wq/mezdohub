# MezdoHub — Production Architecture & Data Governance Blueprint
**Document Version:** 1.0.0  
**Date:** October 5, 2026  
**Author:** Chief Technology Officer (CTO) & Lead Solution Architect, MezdoHub  
**Status:** Approved for Engineering Implementation  
**Audience:** Executive Leadership, Engineering Team, Security Auditors, Compliance Officers  

---

## Executive Architectural Summary

Following the baseline findings of `BUSINESS_AND_TECHNICAL_AUDIT.md`, MezdoHub must transition from its current client-side prototype (`localStorage`-dependent SPA) to an **enterprise-grade, secure, multi-tenant cloud platform**.

This document serves as the **definitive engineering specification** for MezdoHub's production architecture. It addresses two critical mandates:
1. **Data Governance & Privacy Specification:** Rigorous answers to data collection, physical storage locations, access control hierarchies, retention periods, and deletion mechanisms in strict adherence to Moroccan Law 09-08 (CNDP) and European GDPR standards.
2. **End-to-End Technical Architecture:** Definitive technology selections (resolving PostgreSQL vs. Firebase vs. Supabase vs. Node.js), system components, security topology, hosting infrastructure, scaling strategies, and detailed cost projections.

---

# PART I: Data Governance, Privacy & Compliance Matrix

This section establishes the definitive data life cycle policy for all candidate, employer, and visitor records on MezdoHub.

```
                              DATA LIFE CYCLE TOPOLOGY
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
  [COLLECTION]                      [STORAGE]                         [CONTROL]
  • Identity & Contact              • AWS / GCP eu-west-3            • Candidate Self-Service
  • CV / ATS Content                  (Frankfurt / Paris)            • Verified Employer Portal
  • Biometric Pixels (Ephemeral)    • Row-Level Security (RLS)       • Super Admin (MFA Only)
  • Employer Metadata               • Encrypted at Rest (AES-256)    • Automated Hard-Delete
```

### 1. What Data Do We Collect? (`ما البيانات التي سنجمعها؟`)

Data is categorized into four distinct classification tiers:

| Tier | Category | Exact Attributes Collected | Purpose & Legal Basis |
| :--- | :--- | :--- | :--- |
| **Tier 1: Identity & Contact** | Candidate Profile | Full legal name, verified mobile/WhatsApp number (`+212...`), email address, city/province (e.g., Tangier, Kenitra). | Sourcing, identity verification, application routing, direct communication. |
| **Tier 2: Professional Profile** | Credentials & Career | Education level (Bac, OFPPT Technicien Spécialisé, Licence, Master), diploma specialization, current employer/status, target industrial roles, language proficiencies (FR/EN/DE/AR). | Matching algorithms, dossier synthesis, job eligibility filtering. |
| **Tier 3: Documents & Uploads** | Binary Assets | ATS Resumes (PDF/DOCX), letters of motivation, portfolio links. *Special Case:* DV-2027 lottery candidate photos. | Review by recruiters and submission to official portals. |
| **Tier 4: Employer & Organization** | B2B Entity Data | Legal company name, ICE (Identifiant Commun de l’Entreprise), RC (Registre de Commerce), company size, office address, HR contact credentials, billing information. | Employer verification, legal invoicing, commercial partnerships. |
| **Tier 5: Telemetry & Device** | Operational Logs | Anonymized IP hash, User-Agent, GA4 event timestamps, referral UTM tags, session duration. | Platform health, security auditing, spam mitigation, conversion attribution. |

> **Critical Biometric Exemption Policy:** MezdoHub **DOES NOT** store biometric facial recognition vectors. The DV-2027 Photo Checker executes in-browser canvas validation (aspect ratio, resolution, and file size). If a user purchases the VIP white-glove filing service, the image is stored in private object storage solely until submission to the US State Department portal, after which it is marked for destruction.

---

### 2. Where Will It Be Stored? (`أين ستخزن؟`)

Data is segregated across isolated, hardened persistence layers:

1. **Relational Data (Profiles, Applications, Jobs, CRM):**
   * **Engine:** Managed PostgreSQL 16 (AWS RDS or Supabase Cloud Enterprise).
   * **Location:** EU Region (`eu-west-3` Paris or `eu-central-1` Frankfurt) — ensuring sub-40ms latency to Morocco via transit cables (EurAfrica & SeaMeWe) and strict GDPR/CNDP data center compliance.
   * **Encryption:** AES-256 at rest (AWS KMS) and TLS 1.3 in transit.
2. **Document & Media Storage (Resumes, Generated PDFs):**
   * **Engine:** Amazon S3 or Cloudflare R2 (S3-compatible, zero egress fees).
   * **Access Policy:** Private buckets with zero public access. All file downloads require time-limited (15-minute) pre-signed URLs generated server-side.
3. **Cache & Session Management:**
   * **Engine:** Managed Redis (Upstash or Redis Cloud) for rate-limiting, session caching, and background job queue buffering.
4. **Audit & Access Logs:**
   * **Engine:** CloudWatch / Datadog with immutable write-once log retention.

---

### 3. Who Can See It? Access Control Hierarchy (`من يراها؟`)

MezdoHub enforces strict **Zero-Trust Role-Based Access Control (RBAC)** alongside **Row-Level Security (RLS)** at the database level:

```
                               ACCESS CONTROL MATRIX
                                         │
    ┌────────────────────┬───────────────┴───────────────┬────────────────────┐
    ▼                    ▼                               ▼                    ▼
[CANDIDATE]         [EMPLOYER]                     [INTERNAL HR/OPS]      [PUBLIC/GUEST]
Own Profile Only     Assigned Applicants Only       Full CRM View          Public Job Ads
Own Documents Only   Company Job Postings Only      Support Escalations    Anonymized Metrics
Audit History Log    No Unrelated Candidates        No Database Root Keys  Zero PII
```

* **The Candidate:** Sees exclusively their own account, submitted applications, generated resumes, and diagnostic history. Cannot view other applicants or internal employer notes.
* **The Employer / Recruiter:** Sees only candidates who have **explicitly applied** to their job listings or whose profiles were forwarded via authorized talent matching. Cannot access candidate telephone numbers until formal review status is triggered.
* **MezdoHub Operations & Support (Admins):** Access via multi-factor authentication (MFA) through the Admin Portal to manage incoming leads and resolve support requests. All staff access is logged with immutable audit trails.
* **Public / Unauthenticated Visitors:** Zero access to Personally Identifiable Information (PII). Can view public job descriptions, migration guides, and free client-side calculators.

---

### 4. Data Retention Policy (`كم تحتفظ بها المنصة؟`)

In compliance with data minimization principles:

| Data Type | Retention Period | Automated Action at Expiration |
| :--- | :--- | :--- |
| **Active Candidate Profiles** | Active + 24 months from last login | Account flagged as dormant; notification email dispatched; purged at 36 months. |
| **VIP DV-2027 Photos & Application Data** | 60 days post-official filing deadline | **Hard deleted** automatically from object storage once confirmation number is issued. |
| **Failed / Incomplete Leads** | 90 days from creation | Soft-deleted at 60 days; permanent database purge at 90 days. |
| **Employer Job Postings** | 180 days post-closing | Archived for historical analytics with candidate associations severed. |
| **Transactional Billing Records** | 5 years (10 years for corporate tax records) | Retained in cold storage in compliance with Moroccan Commercial Code (Code de Commerce). |
| **Server Logs & IP Telemetry** | 30 days rolling window | Automated FIFO truncation. |

---

### 5. How Is Data Deleted? (`كيف نحذفها؟`)

MezdoHub guarantees the **Right to Erasure (Right to be Forgotten)**:

1. **Self-Service Candidate Deletion:**
   * Candidates can navigate to `Account Settings > Privacy & Data > Delete Account`.
   * Triggering deletion executes a database cascade: profile, application history, resumes, and saved preferences are purged within 60 seconds.
2. **Physical Asset Removal:**
   * S3 / R2 lifecycle policies trigger an immediate asynchronous worker (`DeleteObjectCommand`) removing all binary resume files from the bucket and invalidating CDN caches.
3. **Database Purge Mechanism:**
   * Records are hard-deleted (`DELETE FROM candidates WHERE id = :id;`). 
   * Backup snapshots are overwritten on a rolling 14-day schedule, ensuring total physical destruction across all disaster recovery nodes within two weeks.
4. **Third-Party Telemetry Cleanup:**
   * Deletion calls trigger a Google Analytics User Deletion API request using the client ID.

---

# PART II: Technology Stack Selection & Definitive Answers

### Definitive Stack Verdict: Resolving Architectural Dilemmas

```
+---------------------------------------------------------------------------------+
|                                 DECISION MATRIX                                 |
+-------------------+----------------------------+--------------------------------+
| Question          | Selected Verdict           | Technical Justification        |
+-------------------+----------------------------+--------------------------------+
| PostgreSQL?       | YES (Primary Relational)   | Essential for complex SQL      |
|                   |                            | schemas, multi-table joins,    |
|                   |                            | ACID transactions & RLS.       |
+-------------------+----------------------------+--------------------------------+
| Firebase?         | NO (Rejected for Core DB)  | NoSQL document model is a poor |
|                   |                            | fit for relational jobs/leads. |
|                   |                            | High lock-in, weak SQL queries.|
+-------------------+----------------------------+--------------------------------+
| Supabase?         | YES (Recommended Platform) | Managed PostgreSQL, built-in   |
|                   |                            | GoTrue Auth, Row-Level         |
|                   |                            | Security, S3 storage, realtime.|
+-------------------+----------------------------+--------------------------------+
| Node.js?          | YES (Backend Runtime)      | Universal TypeScript, Express/ |
|                   |                            | NestJS ecosystem, optimal for  |
|                   |                            | PDF generation & integrations. |
+-------------------+----------------------------+--------------------------------+
```

### Detailed Evaluation of Choices

#### 1. Why PostgreSQL and Not Firebase for MezdoHub?
* **Relational Integrity:** MezdoHub’s domain is inherently relational: `Employers` post `Jobs`, `Candidates` submit `Applications` containing `Resumes`, which generate `CRM Leads` tracked by `Admins`. Attempting to model this in Firebase Firestore requires deeply nested documents, denormalization, and expensive client-side joins that degrade performance and inflate costs.
* **Row-Level Security (RLS):** PostgreSQL natively allows security rules at the database engine level (e.g., `CREATE POLICY employer_access ON applications FOR SELECT USING (job_id IN (SELECT id FROM jobs WHERE employer_id = auth.uid()));`). Firebase rules are brittle and difficult to test at scale.

#### 2. Why Supabase as the PostgreSQL Engine?
* Supabase provides a hosted, enterprise-ready PostgreSQL instance paired with:
  1. Built-in Authentication (JWTs, Google, Email, Magic Links).
  2. S3-Compatible Object Storage (for CVs and documents).
  3. Edge Functions (Deno/Node.js) for serverless webhooks.
  4. Realtime Websockets (instant notifications for new applicants).
* **Zero Vendor Lock-In:** Because Supabase is pure PostgreSQL, MezdoHub can migrate to raw AWS RDS or self-hosted PostgreSQL via a single `pg_dump` command at any time.

#### 3. Why Node.js / TypeScript for the Backend?
* **Code Sharing:** Shared TypeScript validation schemas (Zod) between frontend forms and backend API controllers.
* **Ecosystem Maturity:** Robust libraries for PDF generation (`pdf-lib`, `puppeteer`), payment integrations (Stripe, CMI), and communication gateways (Twilio, SendGrid).

---

# PART III: Production System Architecture

```
                               PRODUCTION TOPOLOGY
                                        │
                         [ Cloudflare Global Edge ]
                         (DNS, WAF, SSL, DDoS L7)
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           ▼                                                         ▼
[ Next.js Web Application ]                               [ Node.js API Service ]
• Vercel Enterprise / Cloud Run                           • Express / NestJS API
• SSR & Dynamic SSG Pages                                 • Async Queue Workers (BullMQ)
• Public UI & Client Portals                              • Transaction & Payment Webhooks
           │                                                         │
           └────────────────────────────┬────────────────────────────┘
                                        │
       ┌────────────────────────────────┼────────────────────────────────┐
       ▼                                ▼                                ▼
[ Supabase PostgreSQL 16 ]     [ Cloudflare R2 / S3 ]          [ Upstash Redis ]
• Relational Tables            • Candidate Resumes (PDF)       • Rate Limiting (Token Bucket)
• Row-Level Security (RLS)     • Generated ATS Dossiers        • Job Queue (BullMQ)
• Database Triggers & Auth     • Private Signed URLs           • Session & Route Caching
```

---

## 1. Authentication & Identity Management

* **Provider:** Supabase Auth (GoTrue Engine) issuing RFC 7519 compliant JSON Web Tokens (JWT).
* **Authentication Vectors:**
  1. **Passwordless Magic Links & Email/Password:** For standard candidate and employer accounts.
  2. **Social OAuth 2.0:** Google Sign-In and LinkedIn (vital for professional Moroccan profiles).
  3. **Phone / WhatsApp OTP (Planned Q3):** Twilio Verify API for fast mobile login.
* **Session Lifecycle:**
  * Access Tokens: Short-lived (15 minutes), stored in memory.
  * Refresh Tokens: Long-lived (30 days), stored in `HttpOnly`, `SameSite=Strict`, `Secure` cookies.
  * Multi-Factor Authentication (MFA): Mandatory TOTP (Google Authenticator) for all admin roles.

---

## 2. Relational Database Schema Design (PostgreSQL)

```sql
-- CORE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- ENUMS
CREATE TYPE user_role AS ENUM ('candidate', 'employer', 'admin', 'superadmin');
CREATE TYPE job_type AS ENUM ('cdi', 'cdd', 'anapec', 'stage', 'freelance');
CREATE TYPE application_status AS ENUM ('submitted', 'under_review', 'interview_scheduled', 'rejected', 'hired');
CREATE TYPE package_tier AS ENUM ('free', 'direct_hr', 'full_dossier', 'dv_vip');

-- 1. USERS TABLE (Linked to auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email citext UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role user_role DEFAULT 'candidate'::user_role NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. CANDIDATE PROFILES
CREATE TABLE public.candidates (
    profile_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    education_level VARCHAR(100) NOT NULL,
    specialization VARCHAR(150),
    years_experience INT DEFAULT 0,
    languages JSONB DEFAULT '{"ar": "native", "fr": "intermediate"}'::JSONB,
    current_resume_url TEXT,
    lifemap_diagnostic JSONB,
    is_actively_looking BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. EMPLOYER ENTITIES
CREATE TABLE public.employers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT,
    company_name VARCHAR(200) NOT NULL,
    legal_ice VARCHAR(20),
    industry VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    website_url TEXT,
    verified_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. JOBS DIRECTORY
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES public.employers(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(250) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    contract_type job_type DEFAULT 'cdi'::job_type NOT NULL,
    min_salary INT,
    max_salary INT,
    description TEXT NOT NULL,
    requirements TEXT[] NOT NULL,
    hr_contact_email VARCHAR(150),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
);

-- 5. CANDIDATE APPLICATIONS & DOSSIERS
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES public.candidates(profile_id) ON DELETE CASCADE,
    package_type package_tier DEFAULT 'free'::package_tier NOT NULL,
    resume_file_url TEXT NOT NULL,
    cover_letter_text TEXT,
    status application_status DEFAULT 'submitted'::application_status NOT NULL,
    internal_admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. AUDIT & ACCESS LOGS
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID NOT NULL,
    ip_address_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

---

## 3. Resume & Document Storage Architecture

* **Engine:** Cloudflare R2 Object Storage.
* **Storage Hierarchy:**
  ```
  mezdohub-vault/
  ├── resumes/
  │   └── {candidate_uuid}/
  │       └── cv_ats_{timestamp}.pdf
  ├── dossiers/
  │   └── {application_uuid}/
  │       └── dossier_complet.pdf
  └── temp-dv-photos/
      └── {ticket_uuid}/
          └── photo_600x600.jpg (Lifecycle: Auto-delete 60 days)
  ```
* **Security & Ingestion Flow:**
  1. Frontend requests an authorized upload pre-signed URL from `/api/v1/resumes/upload-ticket`.
  2. Backend validates candidate JWT and limits file size to <= 5MB (MIME type: `application/pdf`).
  3. Client uploads directly to Cloudflare R2 via signed `PUT` (bypassing backend server memory).
  4. S3 event triggers a background virus scan (ClamAV) before attaching the URL to the candidate's database record.

---

## 4. CRM & Administrative Engine

The production `OwnerAdminPortal` transitions from a client-side viewer into a full **Lead Operations Control Center**:

```
                         ADMIN CRM WORKFLOW ENGINE
                                     │
    ┌────────────────────────────────┼────────────────────────────────┐
    ▼                                ▼                                ▼
Incoming Queue                Status Machine                   Dispatch Engine
• DV Lottery VIP Inquiries    • New / Unverified              • 1-Click WhatsApp Direct
• HR Dossier Requests         • Processing Dossier            • Automated Webhook Trigger
• B2B Employer Submissions    • Forwarded to HR Recruiter     • CSV/XLSX Encrypted Export
• Payment Validation          • Closed / Placed               • Audit Log Recording
```

* **WhatsApp Deep-Link Engine:** Admin triggers pre-filled official templates directly to candidates using verified business phone strings (`wa.me/2126XXXXXXXX?text=...`).
* **Multi-Admin Isolation:** Audit logging records which operator viewed, downloaded, or altered candidate status.

---

## 5. Notification Architecture

MezdoHub utilizes an asynchronous, decoupled notification queue:

* **Engine:** Redis + BullMQ running on Node.js workers.
* **Channels:**
  1. **Transactional Email:** Powered by Resend / SendGrid (DKIM, SPF, DMARC authenticated).
     * Welcome sequence, application confirmations, and password resets.
  2. **WhatsApp Business Messaging:** Powered by Meta WhatsApp Business Cloud API.
     * Instant confirmation when a candidate's dossier is reviewed or submitted to an employer.
  3. **In-App Realtime Push:** Supabase Realtime channels notifying candidates when application status transitions (e.g., from `submitted` to `interview_scheduled`).

---

## 6. Analytics & Telemetry Topology

* **Google Analytics 4 (GA4):**
  * Core measurement via client-side `analytics.ts` dispatching standard ecommerce and conversion events (`generate_lead`, `complete_registration`, `file_download`).
* **Server-Side Conversion Tracking (Google Measurement Protocol):**
  * In addition to client-side tags, the Node.js backend mirrors high-value conversions directly to Google via the REST Measurement Protocol. This ensures 100% attribution accuracy even when users employ aggressive browser ad-blockers or privacy extensions.
* **Server Performance Telemetry:**
  * Sentry for frontend and backend exception monitoring.
  * Logflare / Datadog for API response time and database connection pool metrics.

---

# PART IV: Security, Scalability & Infrastructure Sizing

## 1. Security Architecture & Threat Mitigation

```
+-----------------------------------------------------------------------------------+
|                            MULTI-LAYERED DEFENSE MATRIX                           |
+----------------------+--------------------+---------------------------------------+
| Layer                | Technology         | Mitigation Target                     |
+----------------------+--------------------+---------------------------------------+
| Perimeter / Edge     | Cloudflare WAF     | DDoS Layer 7, SQL Injection,          |
|                      | & Rate Limiter     | Credential Stuffing, Bot Scraping     |
+----------------------+--------------------+---------------------------------------+
| Network Transport    | TLS 1.3 Strict     | Man-in-the-Middle (MITM), Snooping    |
+----------------------+--------------------+---------------------------------------+
| Database             | PostgreSQL RLS     | Multi-tenant data leakage, lateral    |
|                      | & Supabase Auth    | privilege escalation                  |
+----------------------+--------------------+---------------------------------------+
| Application Logic    | Zod Schema Guard   | Parameter Tampering, Buffer Overflows |
+----------------------+--------------------+---------------------------------------+
| Administrative       | TOTP MFA + RBAC    | Account Takeover, Rogue Employee Leaks|
+----------------------+--------------------+---------------------------------------+
```

* **Rate Limiting:** Maximum 60 requests per minute per IP for standard endpoints; 5 requests per minute for sensitive endpoints (`/api/v1/auth/*`, `/api/v1/leads/submit`).
* **Input Sanitization:** Strict Zod parsing on all endpoints. Text inputs are stripped of HTML tags using DOMPurify to eliminate Cross-Site Scripting (XSS).

---

## 2. Scalability Strategy

The architecture is designed to handle rapid traffic surges (e.g., during the annual October DV Lottery release or major Moroccan public sector competition announcements):

1. **Edge Caching for Static Assets & Job Slugs:**
   * Static pages and public job listings are cached at Cloudflare Edge locations in Casablanca and European nodes with a 5-minute stale-while-revalidate policy.
2. **Stateless Compute Tier:**
   * Next.js and Node.js instances run containerized inside autoscaling groups (Google Cloud Run or AWS ECS Fargate), scaling from 1 to 20 instances within 90 seconds based on CPU/memory utilization.
3. **Database Connection Pooling:**
   * Supabase / Supavisor connection pooling maintains persistent connections, preventing PostgreSQL process exhaustion during sudden spikes to 10,000+ concurrent users.

---

# PART V: Infrastructure Cost Estimates (12-Month Projections)

The financial model is optimized for capital efficiency, leveraging generous free tiers and pay-as-you-scale managed services:

### Monthly Operational Cost Breakdown

| Component | MVP / Early Stage (0–10k Users/mo) | Growth Stage (10k–100k Users/mo) | Scale Stage (100k–500k Users/mo) |
| :--- | :--- | :--- | :--- |
| **Compute & Frontend (Vercel / Cloud Run)** | $20 / month (Pro tier) | $50 / month | $150 / month |
| **Database (Supabase Enterprise / RDS)** | $25 / month (Pro tier) | $25 / month + $10 storage | $100 / month (Dedicated compute) |
| **Document Storage (Cloudflare R2)** | $0 (Within 10GB free tier) | $5 / month | $20 / month (Zero egress fees) |
| **Edge DNS & WAF (Cloudflare Pro)** | $0 (Free plan) | $20 / month (Pro plan) | $20 / month |
| **Caching & Queue (Upstash Redis)** | $0 (Free tier) | $10 / month | $30 / month |
| **Transactional Email (Resend)** | $0 (Free tier, 3,000 emails) | $20 / month (50,000 emails) | $80 / month |
| **WhatsApp Business API (Meta)** | ~$10 / month (Pay-per-conversation)| ~$60 / month | ~$250 / month |
| **Monitoring & Sentry** | $0 (Developer tier) | $26 / month (Team plan) | $60 / month |
| **Domain & SSL** | $1.50 / month ($18/yr) | $1.50 / month | $1.50 / month |
| **TOTAL ESTIMATED MONTHLY COST** | **~$56.50 / month** | **~$218.50 / month** | **~$712.50 / month** |

### Profitability Threshold
At the MVP stage ($56.50/month), MezdoHub reaches operational break-even by converting just **6 candidates per month** for the DV Lottery VIP Service (99 MAD ≈ $10) or **4 candidates** for the Direct HR Dossier Service (149 MAD ≈ $15).

---

# Summary & Implementation Directives

This document formally establishes that MezdoHub will utilize:
1. **PostgreSQL 16 via Supabase Enterprise** as its authoritative relational database.
2. **Node.js / Next.js with TypeScript** as its unified runtime.
3. **Cloudflare R2** for private, zero-egress document storage.
4. **Cloudflare Global Edge** for WAF, DDoS protection, and SSL termination.
5. **Strict Data Minimization & 60-Day DV Purge Policies** ensuring total CNDP / GDPR regulatory compliance.

*This specification serves as the architectural foundation for subsequent engineering sprints.*

---
*Approved by:*  
**Chief Technology Officer (CTO) & Solution Architect**  
*MezdoHub Engineering Leadership*

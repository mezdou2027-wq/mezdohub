# MezdoHub — Database Verification & Testing Checklist
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Auditor:** Lead Quality Assurance & Database Architect  

---

## 1. Schema & Structure Verification Checklist

Execute these checks after running migrations to confirm database structural integrity:

- [ ] **Extensions Active:**
  ```sql
  SELECT extname FROM pg_extension WHERE extname IN ('uuid-ossp', 'citext', 'pgcrypto');
  ```
  *(Must return 3 rows).*

- [ ] **Custom Enums Defined:**
  ```sql
  SELECT typname FROM pg_type WHERE typname IN (
    'user_role', 'education_level', 'contract_type', 'job_status', 
    'application_status', 'dossier_package', 'notification_type'
  );
  ```
  *(Must return 7 rows).*

- [ ] **Core Tables Created:**
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'candidates', 'companies', 'resumes', 'jobs', 'applications', 'notifications');
  ```
  *(Must return 7 rows).*

- [ ] **Audit Trail Schema & Table:**
  ```sql
  SELECT table_schema, table_name FROM information_schema.tables 
  WHERE table_schema = 'audit' AND table_name = 'logs';
  ```
  *(Must return 1 row).*

---

## 2. Constraints & Integrity Checks

- [ ] **Phone Number Regex Check:**
  * Try inserting phone `abc1234` into `public.profiles`.
  * *Expected Result:* SQL error violating constraint `chk_phone_format`.

- [ ] **Max Resume Size Boundary:**
  * Try inserting resume with `file_size_bytes = 15000000` (> 10MB) into `public.resumes`.
  * *Expected Result:* SQL error violating constraint `chk_resume_size`.

- [ ] **Candidate Double Application Guard:**
  * Try inserting two identical `(job_id, candidate_id)` pairs into `public.applications`.
  * *Expected Result:* SQL error violating unique constraint `uq_candidate_job`.

- [ ] **Company ICE Unique Constraint:**
  * Try inserting two companies with identical `legal_ice`.
  * *Expected Result:* SQL error violating unique constraint on `legal_ice`.

---

## 3. Row-Level Security (RLS) Penetration Tests

- [ ] **Unauthenticated Access to Applications:**
  * Query `SELECT * FROM public.applications;` as `anon`.
  * *Expected Result:* 0 rows returned.

- [ ] **Candidate Cross-Access to Other Resumes:**
  * Query `SELECT * FROM public.resumes;` as authenticated Candidate A.
  * *Expected Result:* Only returns resumes where `candidate_id = auth.uid()`.

- [ ] **Employer Restricted to Own Applicants:**
  * Query `SELECT * FROM public.applications;` as authenticated Employer B.
  * *Expected Result:* Only returns applications submitted to jobs owned by Employer B's company.

- [ ] **Public Job Search Visibility:**
  * Query `SELECT * FROM public.jobs WHERE status = 'published';` as unauthenticated guest (`anon`).
  * *Expected Result:* Successfully returns published jobs whose `expires_at > NOW()`.

---

## 4. Audit Trail & Trigger Tests

- [ ] **Change Data Capture on Applications:**
  * Update `status = 'interview_requested'` on an application record.
  * Check `SELECT * FROM audit.logs WHERE entity_name = 'applications' ORDER BY id DESC LIMIT 1;`.
  * *Expected Result:* Trigger records old value (`dossier_in_review`) and new value (`interview_requested`) along with SHA-256 IP hash.

- [ ] **Audit Tamper-Proof Lockdown:**
  * Attempt `DELETE FROM audit.logs;` or `UPDATE audit.logs SET action = 'tampered';`.
  * *Expected Result:* SQL error: `permission denied for table logs`.

---
*Checklist approved for Quality Assurance verification.*

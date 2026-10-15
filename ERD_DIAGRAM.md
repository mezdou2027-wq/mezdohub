# MezdoHub — Entity-Relationship Diagram (ERD) & Data Model
**Document Version:** 1.0.0  
**Phase:** Phase 2 — Data Foundation  
**Architect:** Chief Technology Officer & Lead Database Architect  
**Notational Standard:** Crow's Foot Entity-Relationship Matrix  

---

## 1. Visual ASCII Entity-Relationship Diagram (ERD)

```
+---------------------------------------------------------------------------------------------------------+
|                                    MEZDOHUB PRODUCTION ERD TOPOLOGY                                     |
+---------------------------------------------------------------------------------------------------------+

      [ auth.users ] (Supabase Auth Core)
             |
             | 1:1 (ON DELETE CASCADE)
             v
      +---------------------+
      |   public.profiles   |<------------------------------------+
      +---------------------+                                     |
      | id: UUID [PK]       |                                     |
      | email: citext       |                                     |
      | role: user_role     |                                     |
      | full_name: varchar  |                                     |
      | phone: varchar      |                                     |
      | city: varchar       |                                     |
      +---------------------+                                     |
         |               |                                        |
    1:1  |          1:N  |                                        | 1:N
         v               v                                        v
+------------------+   +-------------------+              +----------------------+
|public.candidates |   | public.companies  |              | public.notifications |
+------------------+   +-------------------+              +----------------------+
|profile_id: [PK,FK|   | id: UUID [PK]     |              | id: UUID [PK]        |
|education: enum   |   | primary_owner_id  |              | recipient_id: [FK]   |
|specialization: vc|   | name: varchar     |              | type: enum           |
|languages: jsonb  |   | legal_ice: varchar|              | title: varchar       |
|actively_seek: bool   | is_verified: bool |              | is_read: bool        |
+------------------+   +-------------------+              +----------------------+
    |          |                 |
    | 1:N      |                 | 1:N
    |          |                 v
    |          |         +-----------------+
    |          |         |   public.jobs   |
    |          |         +-----------------+
    |          |         | id: UUID [PK]   |
    |          |         | company_id: [FK]|
    |          |         | title: varchar  |
    |          |         | slug: varchar   |
    |          |         | contract: enum  |
    |          |         | status: enum    |
    |          |         +-----------------+
    |          |                  |
    |          |                  | 1:N
    v          v                  v
+--------------------+   +---------------------+
|   public.resumes   |   | public.applications |
+--------------------+   +---------------------+
| id: UUID [PK]      |   | id: UUID [PK]       |
| candidate_id: [FK] |<--| candidate_id: [FK]  |
| file_path: text    |   | job_id: UUID [FK]   |
| mime_type: varchar |<--| resume_id: UUID [FK]|
| is_primary: bool   |   | status: enum        |
+--------------------+   | package_type: enum  |
                         +---------------------+
```

---

## 2. Cardinality & Foreign Key Relationship Matrix

| Primary Table (Parent) | Foreign Key Column | Target Table (Child) | Cardinality | Delete Cascade Rule | Business Justification |
| :--- | :--- | :--- | :---: | :--- | :--- |
| `auth.users` | `id` | `public.profiles` | **1 : 1** | `ON DELETE CASCADE` | Deleting user identity permanently wipes profile. |
| `public.profiles` | `id` | `public.candidates` | **1 : 1** | `ON DELETE CASCADE` | Candidate credentials cannot exist without profile. |
| `public.profiles` | `primary_owner_id` | `public.companies` | **1 : N** | `ON DELETE RESTRICT` | Employer cannot be deleted while company exists. |
| `public.candidates` | `candidate_id` | `public.resumes` | **1 : N** | `ON DELETE CASCADE` | Deleting candidate wipes all associated CVs. |
| `public.companies` | `company_id` | `public.jobs` | **1 : N** | `ON DELETE CASCADE` | Removing company purges its job listings. |
| `public.jobs` | `job_id` | `public.applications` | **1 : N** | `ON DELETE CASCADE` | Removing job purges active applications. |
| `public.candidates` | `candidate_id` | `public.applications` | **1 : N** | `ON DELETE CASCADE` | Candidate deletion cascades applications. |
| `public.resumes` | `resume_id` | `public.applications` | **1 : N** | `ON DELETE RESTRICT` | Primary resume cannot be deleted if active application links it. |
| `public.profiles` | `recipient_id` | `public.notifications` | **1 : N** | `ON DELETE CASCADE` | Deleting user wipes notification inbox. |

---

## 3. Data Integrity & Constraint Highlights

* **Candidate Application Uniqueness (`uq_candidate_job`):**
  * `UNIQUE (job_id, candidate_id)` prevents a candidate from spamming multiple applications to the exact same job posting.
* **Company Registration Integrity (`legal_ice`):**
  * `UNIQUE` constraint on `legal_ice` ensures no two companies register with the same Moroccan corporate tax identifier.
* **Resume Size Boundary (`chk_resume_size`):**
  * Database-level CHECK constraint enforcing `file_size_bytes <= 10485760` (10 MB maximum), preventing storage overflow attacks.
* **Phone Number Regex Check (`chk_phone_format`):**
  * `CHECK (phone ~ '^[0-9+ ]{9,20}$')` ensures valid international Moroccan formatting.

---
*Entity-Relationship Diagram certified for production data modeling.*

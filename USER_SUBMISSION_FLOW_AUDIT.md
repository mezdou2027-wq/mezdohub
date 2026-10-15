# MezdoHub — User Submission Flows & Data Pipeline Audit
**Document Version:** 1.0.0  
**Audit Date:** October 6, 2026  
**Auditor:** Lead Product Data Architect & Systems Auditor  
**Governance Scope:** Full operational audit of all data collection forms and submission pipelines on MezdoHub.  

---

## 1. Executive Summary & Flow Matrix

This audit answers the 6 mandatory questions for **every single form** on the platform:
1. Where does the submission go?
2. Who receives it?
3. Is it reviewed manually?
4. Is it sent to employers?
5. Is it free or paid?
6. What happens after submission?

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MEZDOHUB SUBMISSION FLOW MASTER MATRIX                          │
├──────────────────────┬─────────────┬─────────────┬─────────────┬───────────┬───────────┤
│ Form / Flow Name     │ Destination │ Recipient   │ Manual Rev. │ Sent to ER│ Free/Paid │
├──────────────────────┼─────────────┼─────────────┼─────────────┼───────────┼───────────┤
│ 1. DV Lottery Assist │ CRM Storage │ Mezdo Admin │ YES (100%)  │ NO (Gov)  │ Free/VIP  │
│ 2. Direct HR Routing │ CRM Storage │ Mezdo Admin │ YES (100%)  │ YES (HR)  │ VIP (Paid)│
│ 3. Partner Inquiry   │ CRM Storage │ Mezdo Admin │ YES (100%)  │ B2B Inter.│ Free      │
│ 4. Newsletter Lead   │ CRM Storage │ Mezdo Admin │ Automated   │ NO        │ Free      │
│ 5. ATS CV Generator  │ CLIENT-ONLY │ USER ONLY   │ NO (Private)│ NO        │ FREE 100% │
│ 6. Salary & Tax Calc │ CLIENT-ONLY │ NONE        │ NO (Private)│ NO        │ FREE 100% │
└──────────────────────┴─────────────┴─────────────┴─────────────┴───────────┴───────────┘
```

---

## 2. Form 1: DV Lottery Assistance Form (`DvLotteryHub.tsx`)

* **Component Location:** `src/components/DvLotteryHub.tsx` (Lines 283–379).
* **Fields Collected:** `fullName`, `phone`, `city`, `educationLevel`, `maritalStatus`, `hasPassport`, `packageType`.

### 1. Where does the submission go?
* The lead object is written to `localStorage` under key `mezdohub_crm_leads`. When Supabase Cloud is synced, it routes to `public.applications`.
* A GA4 custom conversion event (`trackLeadConversion`) is dispatched to Google Analytics.

### 2. Who receives it?
* Exclusively the **MezdoHub Founder / Admin Operations Lead** via the protected Owner Admin CRM portal (`/?tab=owner-crm`).

### 3. Is it reviewed manually?
* **YES, 100% manually.** The admin team verifies the applicant's educational qualification (Bac / OFPPT minimum) and inspects the uploaded biometric photo.

### 4. Is it sent to employers?
* **NO.** This service pertains strictly to the US Diversity Visa program managed by the US Department of State. No employer ever sees this data.

### 5. Is it free or paid?
* **Dual Tier:**
  * Basic verification & self-service feedback: **Free of charge**.
  * Done-for-you manual photo correction & registration assistance: **Paid VIP Service (25 to 100 MAD)**.

### 6. What happens after submission?
* The user sees an on-screen confirmation card: *"تم استلام طلبك بنجاح!"*.
* Within 3 to 15 minutes, the candidate receives a personalized WhatsApp message from official MezdoHub support (`06XXXXXXXX`) confirming receipt and outlining the next steps.

---

## 3. Form 2: Direct HR Routing & Done-For-You Modal (`LocalNicheJobsHub.tsx`)

* **Component Location:** `src/components/LocalNicheJobsHub.tsx` (Lines 520–615).
* **Fields Collected:** `name`, `phone`, `city`, `diploma`, `selectedCompany` (e.g., Renault, Lear), `targetRole`, `selectedPackage` (`direct-hr` or `full-dossier`).

### 1. Where does the submission go?
* Stored in `localStorage` under `mezdohub_crm_leads` and persisted to the Owner CRM database.
* Event logged in analytics under `job_direct_hr`.

### 2. Who receives it?
* The MezdoHub Talent Operations Lead receives the initial submission.

### 3. Is it reviewed manually?
* **YES, 100% manually.** A career advisor reviews the candidate's CV, checks compatibility with the plant's hiring criteria (e.g., Renault age bracket, ISTA specialization), and formats the cover letter.

### 4. Is it sent to employers?
* **YES.** Following manual candidate review and confirmation via WhatsApp, the optimized application dossier is forwarded directly to the verified recruitment email inbox of the plant (e.g., `recrutement.tanger@renault.com`, `morocco.jobs@lear.com`).

### 5. Is it free or paid?
* **Paid VIP Service (49 MAD to 100 MAD)** for candidate coaching and direct routing; candidates who wish to apply for free are provided with the direct HR email address on-screen for direct self-submission.

### 6. What happens after submission?
* Candidate receives a WhatsApp notification with a copy of their formatted dossier and confirmation of dispatch to the HR team.

---

## 4. Form 3: Launch Partners & B2B Inquiry Form (`LaunchPartnersHub.tsx`)

* **Component Location:** `src/components/LaunchPartnersHub.tsx` (Lines 180–240).
* **Fields Collected:** `companyName`, `contactPerson`, `email`, `phone`, `partnershipType` (Hiring / Advertising / Educational).

### 1. Where does the submission go?
* Stored in `mezdohub_crm_leads` and routed to the Founder CRM dashboard.

### 2. Who receives it?
* MezdoHub Commercial Partnerships Lead.

### 3. Is it reviewed manually?
* **YES, 100% manually.**

### 4. Is it sent to employers?
* **NO.** These are incoming requests FROM employers or institutions wanting to partner with MezdoHub.

### 5. Is it free or paid?
* **Initial inquiry is 100% Free.** Commercial terms (sponsored listings or talent access) are discussed subsequently.

### 6. What happens after submission?
* The partner is contacted within 24 business hours with the official PDF Presentation Deck and partnership proposal.

---

## 5. Form 4: Newsletter & Community Signup (`MezdoHomePortal.tsx`)

* **Component Location:** `src/components/MezdoHomePortal.tsx` (Lines 30–45, 600–620).
* **Fields Collected:** `emailInput`.

### 1. Where does the submission go?
* Stored in `localStorage` under `mezdohub_subscribers`.

### 2. Who receives it?
* Added to the MezdoHub weekly dispatch mailing list.

### 3. Is it reviewed manually?
* Automated storage; audited weekly for deliverability.

### 4. Is it sent to employers?
* **NO.**

### 5. Is it free or paid?
* **100% Free.**

### 6. What happens after submission?
* Green success banner appears immediately. The user receives weekly curated employment summaries and career updates.

---

## 6. Form 5: Client-Side Generators (CV Builder & Financial Calculators)

* **Components:** `MoroccanCvAndMotivationBuilder.tsx`, `FreelanceFinanceHub.tsx`.

### 1. Where does the submission go?
* **NOWHERE EXTERNALLY.** All calculations, salary deductions, and PDF vector compilations execute **100% locally in the user's browser memory (Client-Side)**.

### 2. Who receives it?
* **THE USER ONLY.** No data is transmitted across the internet.

### 3. Is it reviewed manually?
* No.

### 4. Is it sent to employers?
* No (unless the user manually emails their downloaded PDF to a company).

### 5. Is it free or paid?
* **100% Completely Free with Zero Paywalls.**

### 6. What happens after submission?
* The user's device immediately downloads a pristine vector PDF file (`CV_Name_MezdoHub.pdf`) or displays the real-time calculated net amount.

---
*Report certified by Lead Product Data Architect for Systems Compliance.*

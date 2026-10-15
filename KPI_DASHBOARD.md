# MezdoHub — Product Analytics & Executive KPI Dashboard
**Document Version:** 1.0.0  
**Phase:** Growth Analytics & North Star Metrics  
**Author:** Lead Product Analyst & Growth Strategist  
**Measurement Framework:** Pirate Metrics (AARRR: Acquisition, Activation, Retention, Referral, Revenue)  

---

## 1. Executive North Star Metric

> **North Star Metric (NSM):**  
> **"Weekly Qualified Career Actions" (WQCA)**  
> *Definition: A user successfully downloading an ATS Resume, validating a DV Lottery photo, or submitting a job application dossier.*

If this number grows week-over-week, candidates are achieving tangible value, driving organic word-of-mouth and downstream monetization.

---

## 2. Definitive KPI Architecture Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                   MEZDOHUB PRODUCT KPI MONITORING ENGINE               │
├───────────────────────┬──────────────┬──────────────┬──────────────────┤
│ Metric Category       │ Baseline (M1)│ Target (M3)  │ Scale (M12)      │
├───────────────────────┼──────────────┼──────────────┼──────────────────┤
│ Daily Active Users    │ 500 DAU      │ 2,500 DAU    │ 12,000 DAU       │
│ Weekly Active Users   │ 3,200 WAU    │ 14,000 WAU   │ 65,000 WAU       │
│ Monthly Active Users  │ 12,000 MAU   │ 50,000 MAU   │ 220,000 MAU      │
│ DAU / MAU Stickiness  │ 15%          │ 18%          │ 22%              │
└───────────────────────┴──────────────┴──────────────┴──────────────────┘
```

---

## 3. Product Funnel & Conversion Benchmarks

### Funnel 1: ATS Resume Builder
* **Visitor-to-Editor Conversion:** Target: **35%** (Users who land on CV tool and start typing).
* **Resume Generation Rate:** Target: **65%** (Users who complete and click "Télécharger PDF").
* **Freemium-to-VIP Conversion:** Target: **3.8%** (Users who purchase direct HR routing or factory motivation letter pack).

### Funnel 2: DV-2027 Lottery Photo Checker
* **Upload-to-Check Rate:** Target: **78%** (Visitors who drag-and-drop their portrait photo).
* **Failure-to-Assistance Rate:** Target: **8.5%** (Users who fail the 600x600 test and request VIP manual retouching).
* **Viral Referral Rate:** Target: **1.4x K-Factor** (Each user shares the checker to at least 1 friend or WhatsApp group).

### Funnel 3: Industrial Job Board & Application Tracker
* **Listing View-to-Apply Click:** Target: **12%** (Users who click "Postuler" on Tangier factory listings).
* **Dossier Package Selection:**
  * Free Standard: **88%**
  * Direct HR Routing (49 MAD): **9%**
  * Full Dossier VIP Usines (149 MAD): **3%**

### Funnel 4: PayPal to CIH / Auto-Entrepreneur Calculators
* **Calculation Completion Rate:** Target: **85%**.
* **Affiliate Click-Through Rate (CTR):** Target: **14%** (Clicks on recommended banking alternatives like Wise / Payoneer).
* **Affiliate Account Funded Conversion:** Target: **2.2%**.

---

## 4. Lead Generation & Employer Benchmarks

| Metric Name | Daily Target | Monthly Target | Primary Source |
| :--- | :---: | :---: | :--- |
| **New Candidate Registrations** | 80 / day | 2,400 / month | Organic Google + TikTok |
| **CVs Added to Talent Pool** | 65 / day | 1,950 / month | ATS Resume Generator |
| **Direct HR Applications Submitted** | 30 / day | 900 / month | Job Marketplace |
| **WhatsApp VIP Subscribers** | 15 / day | 450 / month | Landing Page CTAs |
| **Verified Employer Leads Captured** | 2 / week | 8 / month | Recruiter Landing Pages |

---

## 5. Revenue KPI Targets & Milestones

```
┌────────────────────────────────────────────────────────────────────────┐
│                     MONTHLY RECURRING REVENUE TARGETS                  │
├─────────────────────┬──────────────┬──────────────┬────────────────────┤
│ Revenue Milestone   │ Month 3      │ Month 6      │ Month 12           │
├─────────────────────┼──────────────┼──────────────┼────────────────────┤
│ B2C Micro-Payments  │ 6,500 MAD    │ 18,000 MAD   │ 45,000 MAD         │
│ B2B Job Sponsoring  │ 3,000 MAD    │ 9,800 MAD    │ 25,000 MAD         │
│ B2B Sourcing Subs   │ 0 MAD        │ 11,920 MAD   │ 35,000 MAD         │
│ Affiliate Bounties  │ 2,500 MAD    │ 6,000 MAD    │ 18,000 MAD         │
├─────────────────────┼──────────────┼──────────────┼────────────────────┤
│ TOTAL MONTHLY REVENUE│ 12,000 MAD  │ 45,720 MAD   │ 123,000 MAD        │
└─────────────────────┴──────────────┴──────────────┴────────────────────┘
```

---

## 6. Real-Time Tracking Implementation Plan (GA4 + Supabase)

To track these KPIs automatically with zero third-party software cost:

1. **Google Analytics 4 Custom Events:**
   * `cv_generated` (Params: `diploma_type`, `sector`, `language`)
   * `dv_photo_tested` (Params: `status_passed`, `resolution_valid`)
   * `job_applied` (Params: `job_id`, `company_name`, `package_type`)
   * `calculator_used` (Params: `type`, `amount_mad`)
   * `vip_service_clicked` (Params: `service_name`, `price_mad`)
2. **PostgreSQL Supabase Analytical Views:**
   * Create automated SQL reporting views on `public.applications`, `public.resumes`, and `audit.logs` to aggregate daily submission velocity and conversion ratios directly into the Admin CRM.

---
*Product KPI Dashboard Certified by Lead Product Analyst for Performance Governance.*

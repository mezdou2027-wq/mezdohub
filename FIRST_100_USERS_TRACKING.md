# MezdoHub — First 100 Users Analytics & Conversion Architecture
**Document Version:** 1.0.0  
**Phase:** Growth Analytics, Event Schema & Funnel Instrumentation  
**Author:** Lead Analytics Engineer & Growth Strategist  
**Target:** 100% Precision Tracking for the "First 100 Users" Milestone  
**Tooling:** Google Analytics 4 (GA4) Custom Events + Supabase SQL Telemetry  

---

## 1. Analytics Architecture: The First 100 Users Pipeline

To monitor user traction from $0 ad-spend social seeding, every core user interaction is mapped to an explicit event schema:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE FIRST 100 USERS FUNNEL TOPOLOGY                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. INCOMING TRAFFIC SOURCE (Facebook Groups, TikTok, WhatsApp, Direct) │
│       │                                                                │
│       ▼                                                                │
│ 2. ARTICLE / TOOL ENGAGEMENT                                           │
│    ├── `article_view` (Time on page > 45s)                             │
│    ├── `dv_photo_uploaded` (HTML5 Canvas Scan initiated)               │
│    └── `cv_editor_started` (Candidate inputs diploma / role)          │
│       │                                                                │
│       ▼                                                                │
│ 3. CORE VALUE ACTIVATION                                               │
│    ├── `dv_photo_result` (Success: Green / Failure: Red)              │
│    ├── `cv_downloaded_pdf` (Real CV generated)                         │
│    └── `job_details_viewed` (Renault, Lear, TFZ card clicks)           │
│       │                                                                │
│       ▼                                                                │
│ 4. MONETIZATION & LEAD SUBMISSION                                      │
│    ├── `lead_form_submitted` (VIP Dossier / HR Direct Routing)         │
│    └── `whatsapp_share_clicked` (K-factor viral amplification)         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Google Analytics 4 (GA4) Custom Event Schema

The following custom events are tracked to measure intent and conversion:

| Event Name | Trigger Condition | Event Parameters | Primary Objective |
| :--- | :--- | :--- | :--- |
| `article_view` | User opens `/articles/01_dv_lottery_...` | `article_id`, `source`, `device_category` | Content Engagement |
| `dv_photo_check` | User drops a photo into Canvas | `result_status` (passed/failed), `fail_reason` | Tool Utility Validation |
| `cv_generated` | User clicks "Télécharger PDF" | `diploma_type`, `job_sector`, `language` | Candidate Activation |
| `job_card_click` | User clicks on job card in `/local-jobs` | `job_id`, `company_name`, `salary_tier` | Job Sourcing Intent |
| `lead_submitted`| User completes contact or VIP order | `package_type` (direct_hr/vip_usines), `city` | Commercial Conversion |
| `viral_share` | User clicks WhatsApp share button | `shared_tool` (dv_checker/cv_builder) | Referral Coefficient |

---

## 3. The "First 100 Users" Milestone KPI Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│               FIRST 100 HIGHLY ENGAGED USERS TARGET MATRIX             │
├───────────────────────────────────┬──────────────┬─────────────────────┤
│ Metric Metric                     │ Target Ratio │ Volume for 100 Users│
├───────────────────────────────────┼──────────────┼─────────────────────┤
│ Unique Visitors (Traffic Base)    │ 100%         │ 350 - 450 Visits    │
│ Engaged Sessions (> 60 seconds)   │ 60%          │ 210 Sessions        │
│ Article 1 Full Read Completion    │ 40%          │ 140 Article Views   │
│ DV Photo Checks Executed          │ 45%          │ 100 Photo Checks    │
│ ATS Resumes Generated (jsPDF)     │ 25%          │ 55 Resumes Made     │
│ Clicks on Tangier Factory Jobs    │ 30%          │ 65 Job Clicks       │
│ WhatsApp Share Button Clicks      │ 15%          │ 35 Viral Shares     │
│ Qualified Lead Inquiries (CRM)    │ 5%           │ 5 - 8 VIP Inquiries │
└───────────────────────────────────┴──────────────┴─────────────────────┘
```

---

## 4. Daily & Weekly Tracking Cadence

### Daily Tracking Dashboard (7-Day Sprint)
Every evening at 22:00 GMT+1, record the following 5 numbers in a tracking sheet:
1. **Daily Unique Visitors (UV):** (Target: 50–70/day).
2. **Top Referrer of the Day:** (Identify which Facebook group or TikTok video converted).
3. **DV Photo Checks Today:** (Target: 15–20/day).
4. **CV Downloads Today:** (Target: 8–12/day).
5. **WhatsApp Shares Today:** (Target: 5/day).

### Weekly Tracking Dashboard (First 30 Days)
1. **Weekly Active Users (WAU):** Target: Week 1 (100) -> Week 2 (250) -> Week 3 (500) -> Week 4 (1,000).
2. **Viral K-Factor Coefficient:** Formula:
   $$\text{K-Factor} = \frac{\text{Direct Visits from Shared WhatsApp Links}}{\text{Total Registered Users}}$$
   *Goal: K > 0.35 (Every 3 users bring in at least 1 new friend).*
3. **Lead Acquisition Velocity:** Total candidates requesting Direct HR Routing or VIP assistance.

---

## 5. UTM Parameter Matrix for Social Attribution

To know with 100% mathematical certainty which post drove each user, append these clean UTM tags:

* **Facebook Post in DV Group:**  
  `https://mezdohub.ma/?tab=dv-lottery&utm_source=facebook&utm_medium=group_post&utm_campaign=dv2027_photo_warning`
* **TikTok Bio Link:**  
  `https://mezdohub.ma/?tab=dv-lottery&utm_source=tiktok&utm_medium=bio&utm_campaign=screen_demo_1`
* **WhatsApp Group Broadcast:**  
  `https://mezdohub.ma/articles/shoroot-soura-qor3at-amrika-2027-maroc?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=peer_share`
* **ISTA / OFPPT CV Template Post:**  
  `https://mezdohub.ma/?tab=cv-builder&utm_source=facebook&utm_medium=ista_group&utm_campaign=renault_cv_template`

---

## 6. Real-Time Lead Alerts & Notification Setup

When a candidate submits a lead or clicks on a VIP service:
1. **Console Telemetry:** Logged via `trackPageView()` and GA4 custom events.
2. **Owner CRM Persistence:** Application and lead details stored securely in `public.applications` or local state, visible inside `/owner-crm`.
3. **Weekly Growth Review:** Verify if the ratio of DV photo checks vs CV builder usage indicates which feature to highlight on the homepage hero banner.

---
*Analytics Architecture Certified by Lead Analytics Engineer for 100-User Launch Monitoring.*

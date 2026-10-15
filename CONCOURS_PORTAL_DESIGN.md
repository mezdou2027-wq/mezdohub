# MezdoHub — "Concours & Public Jobs Hub" Architecture & Product Design
**Document Version:** 1.0.0  
**Role:** Lead Product Manager & UX Architect  
**Scope:** Conceptual Product & UI/UX Design for the Moroccan Civil Service Hub (No immediate code implementation)  

---

## 1. Product Vision & Value Proposition

In Morocco, public civil service competitions (*مباريات الوظيفة العمومية*) attract over **1.2 million applicants annually**. However, candidates suffer from:
1. Fragmented information scattered across obscure ministerial portals.
2. Confusion over strict age restrictions and required diploma equivalencies.
3. Lack of targeted preparation materials and past exam papers (*Épreuves écrites précédentes*).
4. Missing critical application deadlines due to lack of timely alerts.

**The MezdoHub Solution:** A modern, lightning-fast, filtered **Concours & Public Jobs Hub** designed to give candidates crystal-clear visibility, deadline trackers, and direct preparation resources.

---

## 2. Core Functional Specifications & Filter Taxonomy

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CONCOURS HUB INTERACTIVE FILTER MATRIX               │
├─────────────────────┬──────────────────────────────────────────────────┤
│ Filter Dimension    │ Filter Values & Behaviors                        │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 1. Diploma Level    │ • Sans Bac (Niveau scolaire / CQP)               │
│                     │ • Baccalauréat (DGSN, Forces Armées, Douane)     │
│                     │ • Bac+2 (ISTA / Technicien Spécialisé / BTS)    │
│                     │ • Bac+3 (Licence Fondamentale / Professionnelle) │
│                     │ • Bac+5 (Master / Diplôme d'Ingénieur d'État)    │
│                     │ • Doctorat (Professeur de l'Enseignement Sup.)   │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 2. Sector / Branch  │ • التعليم والتربية الوطنية (AREF)                 │
│                     │ • الصحة والتمريض والمستشفيات (Sante / CHU)       │
│                     │ • الأمن والشرطة والجمارك (DGSN / Douane)         │
│                     │ • التكوين المهني والمعاهد (OFPPT / Universités)  │
│                     │ • الإدارات والجماعات الترابية (Communes)         │
│                     │ • المالية والبنوك العامة (Finances / CDG / BAM)  │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 3. Age Restriction  │ • Slider: 18 à 45 ans                            │
│                     │ (Auto-flags if user age exceeds legal limit)     │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 4. Region / Wilaya  │ • All 12 Moroccan Regions (Tanger-Tetouan, etc.) │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 5. Deadline Status  │ • Active (Open for applications)                 │
│                     │ • Ending Soon (< 48 hours remaining - Red Badge) │
│                     │ • Closed (Archived for exam review)              │
└─────────────────────┴──────────────────────────────────────────────────┘
```

---

## 3. Detailed Concours Card Anatomy (Card UX Layout)

Each competition listing is rendered as an accessible, high-contrast card:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [MINISTERIAL LOGO]  وزارة التربية الوطنية والتعليم الأولي والرياضة       │
│ مباراة توظيف أطر التدريس والأطر المختصة (أطر الأكاديميات الجهوية AREF)   │
│                                                                        │
│ 🎓 الدبلوم المطلوب: شهادة الإجازة (Bac+3) | 🎂 أقصى سن قانوني: 30 سنة   │
│ 📍 النطاق الجغرافي: جهوي (12 جهة)        | 💼 الراتب المبدئي: 5,800 DH │
│                                                                        │
│ ⏳ آخر أجل للتسجيل: 15 أكتوبر 2026 (متبقي 6 أيام) [Active Badge: Green] │
│                                                                        │
│ [زر: عرض الشروط والوثائق] [زر: نماذج الامتحانات السابقة] [زر: التسجيل]│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Exam Preparation Resources Module (نماذج الامتحانات والمباريات)

For each major competition, provide a dedicated preparation accordion:
1. **Curated Past Exam Papers:** Downloadable PDF copies of written exam subjects from previous sessions (2020 to 2025).
2. **Scoring Schemes & Corrections:** Suggested solutions and didactic guides.
3. **Oral Interview Preparation Tips:** Common questions asked by the pedagogical and administrative examination jury.

---

## 5. Automated Notification & Deadline Alert Engine

* **WhatsApp Instant Alert:** One-click subscription: *"توصل بإشعار عبر واتساب فور نشر مباريات تخصصك (مثال: مباريات تقنيي OFPPT)"*.
* **Visual Countdown Timer:** Sticky badge showing days/hours remaining before registration servers close.

---
*Product Design certified by Lead Product Manager for Future Implementation Sprint.*

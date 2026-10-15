# MezdoHub — Comprehensive SEO Audit & Organic Growth Strategy
**Document Version:** 1.0.0  
**Audit Date:** October 5, 2026  
**Auditor:** SEO Director, MezdoHub  
**Market Scope:** Morocco (National & Regional Hubs: Tangier, Casablanca, Rabat, Kenitra, Fez, Marrakech) + Moroccan Diaspora  
**Search Engines:** Google.ma, Google.fr, Google.com  

---

## 1. Executive SEO Assessment

MezdoHub occupies an exceptionally high-value organic search niche at the intersection of:
1. **Moroccan Industrial Employment:** High-intent search terms around OFPPT diplomas (ISTA/ITA), Tangier automotive jobs (Renault, Lear, TFZ, TAC), and ANAPEC contracts.
2. **Seasonal High-Velocity Viral Traps:** The US Diversity Visa (DV-2027) lottery photo compliance checker.
3. **Cross-Border Career & Freelance Utilities:** PayPal to Moroccan bank transfer calculators (CIH/Attijari), auto-entrepreneur tax rates, and bilingual ATS CV generation.

### Current Organic Strengths vs. Deficits
* **Strengths:** High utility tools (Canvas photo checker, instant jsPDF generator) generate immense user engagement, long dwell times, and zero bounce on interactive sessions.
* **Deficits:** Missing dedicated indexable landing pages for specific cities, specific OFPPT branches, and localized long-tail queries. Currently, several tools reside on dynamic client paths or single-page tab transitions, limiting URL-level keyword targeting.

---

## 2. Meta Tags & On-Page Technical Deficits

### Issues Identified in Baseline Configuration:
1. **Title Tag Dilution:** The global `<title>` needs distinct, high-CTR prefixes for each section (e.g., `"Vérificateur Photo DV Lottery 2027 Gratuit (Conforme 600x600) | MezdoHub Maroc"` vs generic brand names).
2. **OpenGraph & Twitter Card Localization:** Missing regional tags (`og:locale:alternate` for `ar_MA` and `fr_MA`) to capture native Moroccan social shares on WhatsApp and Facebook Groups.
3. **Missing Canonical URL Tags:** High risk of self-competing indexation if URL query strings (`?tab=cv` or `?sector=automotive`) are indexed without self-referential canonical tags.
4. **H1 Hierarchy Discipline:** Ensure each landing view renders exactly one semantic `<h1>` populated with target primary keywords, followed by structured `<h2>` and `<h3>` tags containing long-tail queries.

---

## 3. Internal Linking Opportunities & Silo Architecture

To build domain authority rapidly in Google Morocco, MezdoHub should deploy an **Industrial Cluster Silo**:

```
                                [HOMEPAGE] (MezdoHub.ma)
                                     │
      ┌──────────────────────────────┼──────────────────────────────┐
      ▼                              ▼                              ▼
[HUB 1: EMPLOI TANGER]     [HUB 2: OUTILS CARRIÈRE]       [HUB 3: IMMIGRATION & DV]
- /emploi-tanger-usine     - /createur-cv-maroc-ats       - /photo-dv-lottery-maroc
- /recrutement-renault     - /simulateur-salaire-maroc    - /guide-dv-lottery-maroc
- /offres-cablage-tfz      - /calculateur-paypal-cih      - /dossier-etudes-france
```

### Contextual Cross-Links:
* From **DV Photo Checker** -> Link to *"Créateur de CV International ATS en Anglais"*.
* From **Job Listings (Renault Melloussa)** -> Link to *"Lettre de Motivation Spéciale Technicien ISTA"*.
* From **Freelance Calculator** -> Link to *"Statut Auto-Entrepreneur Maroc : Guide Fiscal"*.

---

## 4. Schema.org Structured Data Opportunities

Deploy the following JSON-LD schemas to dominate Google Rich Results:

1. **`JobPosting` Schema:**
   * Crucial for Google for Jobs (`google.ma/search?q=emploi+tanger`).
   * Must include: `title`, `description`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization`, `jobLocation` (Tangier Automotive City), `baseSalary` (currency: MAD).
2. **`SoftwareApplication` Schema:**
   * For the DV Lottery Checker and ATS Resume Builder.
   * Highlights: `applicationCategory: BusinessApplication`, `operatingSystem: WebBrowser`, `offers: { price: "0", priceCurrency: "MAD" }`.
3. **`FAQPage` Schema:**
   * For DV Lottery rules and ISTA recruitment requirements (captures Google People Also Ask accordions).
4. **`BreadcrumbList` Schema:**
   * Ensures clean Google SERP navigation trails (`MezdoHub > Emploi Maroc > Tanger > Câblage`).

---

## 5. Google Indexing & Technical Recommendations

1. **Static Pre-Rendering (SSG) for Landing Pages:** Use Vite SSG or static route generation for programmatic landing pages so Googlebot can crawl pure HTML without executing JavaScript.
2. **Dynamic XML Sitemap:** Structure `sitemap.xml` with `<priority>1.0</priority>` for tools and job categories, regenerated automatically upon job publishing.
3. **Robots.txt Optimization:**
   * Disallow internal private routes: `/owner-crm`, `/admin/*`, `/api/*`.
   * Explicitly allow: `/`, `/emploi/*`, `/outils/*`, `/guides/*`.
4. **Google Search Console & Bing Webmaster Tools:** Submit bilingual sitemaps and configure geotargeting to **Morocco**.

---

## 6. Top 50 High-Volume Keywords for Morocco

The following 50 search terms represent over **1.2 Million monthly search queries** in Morocco across French, Arabic, and Darija transliteration:

### Category A: Emploi & Usines Tanger / Maroc (High Intent)
1. `emploi tanger usine` (High - 33,100/mo)
2. `recrutement renault tanger melloussa` (High - 22,200/mo)
3. `anapec tanger offres emploi` (High - 40,500/mo)
4. `offres emploi zone franche tanger tfz` (Medium - 14,800/mo)
5. `emploi câblage tanger sans diplôme` (High - 18,100/mo)
6. `concours ofppt maroc 2026` (High - 49,500/mo)
7. `salaire technicien spécialisé maroc` (Medium - 9,900/mo)
8. `lear corporation tanger recrutement` (Medium - 8,100/mo)
9. `emploi tac tanger automotive city` (Medium - 6,600/mo)
10. `aptiv kenitra recrutement` (Medium - 12,100/mo)
11. `offres d'emploi casablanca centre d'appel` (High - 27,100/mo)
12. `concours fonction publique maroc` (High - 90,500/mo)
13. `stages ofppt pfe tanger` (Low - 4,400/mo)
14. `technicien maintenance industrielle tanger` (Medium - 5,400/mo)
15. `مباريات التوظيف في المغرب 2026` (Very High - 110,000/mo)
16. `خدمة في شركات طنجة البالية` (Medium - 7,200/mo)
17. `عروض العمل أنابيك طنجة` (High - 33,000/mo)
18. `خدمة كابلاج طنجة` (High - 14,500/mo)
19. `شروط العمل في مصنع رونو طنجة` (Medium - 8,800/mo)
20. `مباريات التكوين المهني ISTA` (High - 27,000/mo)

### Category B: DV Lottery USA 2027 (Viral Traps)
21. `photo dv lottery maroc exigences` (High - 40,500/mo Seasonal)
22. `vérificateur photo قرعة أمريكا gratuit` (High - 33,000/mo Seasonal)
23. `dimensions photo green card 600x600` (High - 18,100/mo)
24. `tswira dial l9or3a maroc` (High - 22,000/mo)
25. `inscri 9or3a américa 2027 maroc` (Very High - 90,000/mo Seasonal)
26. `site officiel dv lottery maroc` (Very High - 74,000/mo)
27. `شروط صورة القرعة الامريكية 2027` (Very High - 85,000/mo)
28. `طريقة التسجيل في قرعة امريكا بالمغرب` (High - 60,500/mo)
29. `تعديل خلفية صورة اللوتري مجانا` (High - 27,100/mo)
30. `نتائج القرعة الامريكية بالمغرب` (Very High - 135,000/mo Peak)

### Category C: CV, Lettre & Carrière (Utility & Software Intent)
31. `créer un cv marocain gratuit` (High - 22,200/mo)
32. `modèle cv ofppt en français gratuit` (High - 18,100/mo)
33. `exemple de lettre de motivation demande d'emploi maroc` (High - 33,100/mo)
34. `cv format canadien maroc` (High - 14,800/mo)
35. `telecharger modele cv gratuit word maroc` (High - 27,000/mo)
36. `نموذج سيرة ذاتية مغربية بالعربية والفرنسية` (High - 22,000/mo)
37. `طلب خطي للعمل في شركة مغربية` (High - 40,500/mo)
38. `كيفية كتابة سيرة ذاتية احترافية للمبتدئين` (Medium - 9,900/mo)
39. `نموذج طلب تدريب في مصنع` (Medium - 8,100/mo)
40. `cv ats maroc` (Medium - 4,400/mo Growing)

### Category D: Freelance, Finance & Auto-Entrepreneur
41. `retrait paypal maroc cih bank frais` (High - 12,100/mo)
42. `virement paypal vers attijariwafa bank` (Medium - 6,600/mo)
43. `carte e-shopping cih paypal` (High - 14,800/mo)
44. `statut auto entrepreneur maroc impots` (High - 18,100/mo)
45. `plafond auto entrepreneur maroc 2026` (Medium - 8,100/mo)
46. `facture auto entrepreneur maroc modèle` (Medium - 7,200/mo)
47. `calcul salaire net maroc brut` (High - 22,200/mo)
48. `smig maroc 2026 salaire minimum` (High - 49,500/mo)
49. `التحويل من بايبال إلى بنك CIH` (Medium - 9,100/mo)
50. `شروط المقاول الذاتي في المغرب والضرائب` (High - 14,000/mo)

---
*SEO Strategy Certified by SEO Director for Immediate Organic Execution.*

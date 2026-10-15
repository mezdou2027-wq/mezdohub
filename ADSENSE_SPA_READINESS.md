# MezdoHub — Technical SEO & AdSense SPA Crawlability Architecture
**Document Version:** 1.0.0  
**Audit Date:** October 5, 2026  
**Engineer:** Technical SEO Architect & AdSense Compliance Engineer  
**Core Target:** Resolving the React SPA Crawlability Bottleneck for Instant Google AdSense & Googlebot Approval  

---

## 1. The Core SPA Problem: Why AdSense Rejects React Single-Page Apps

Google AdSense utilizes two primary crawlers during domain evaluation:
1. **`Mediapartners-Google`:** The real-time ad verification crawler.
2. **`Googlebot`:** The primary search indexer.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE SPA CRAWLABILITY BOTTLENECK                      │
├────────────────────────────────────────────────────────────────────────┤
│ What the User Sees (After JavaScript Bundle Executes):                 │
│ ├── Moroccan Job Marketplace with Renault / Lear Listings              │
│ ├── Interactive DV-2027 Biometric Photo Verification Tool              │
│ ├── Bilingual ATS Resume & Motivation Letter Builder                   │
│ └── 4 Full Legal Policy Pages (Privacy, Terms, Cookies, Disclaimer)    │
│                                                                        │
│ What Mediapartners-Google Sees (Raw HTTP Response Without JS):         │
│ └── <!DOCTYPE html><html><body><div id="root"></div></body></html>     │
│                                                                        │
│ Result: "Site Down or Under Construction / Low Value Thin Content"     │
└────────────────────────────────────────────────────────────────────────┘
```

**The Solution:** Build a robust, hybrid crawlability engine that guarantees **100% rendered HTML depth**, structured JSON-LD schemas, dynamic metadata, an authoritative `robots.txt`, and an exhaustive `sitemap.xml`.

---

## 2. Crawlability & Pre-Rendered HTML Strategy

To solve the headless crawler challenge without rewriting the React SPA architecture, MezdoHub deploys a **Three-Tier Pre-Render Pipeline**:

### Tier 1: Static Semantic `<noscript>` Crawl Fallback (Immediate Fix)
Inside `index.html`, beneath `<div id="root"></div>`, inject a comprehensive semantic `<noscript>` block. 
* **For Humans:** Does not affect users because JavaScript is enabled in 99.8% of modern mobile/desktop browsers.
* **For Headless AdSense Bots:** Delivers **1,200+ words of structured editorial copy**, job directory listings, tool explanations, and legal policy summaries instantly in the raw initial TCP payload.

### Tier 2: Vite Pre-Rendering (Vite SSG / Prerender Plugin)
During `npm run build`, statically export indexable static HTML snapshots for primary search routes:
* `/index.html` (Home Portal)
* `/emploi/index.html` (Local Niche Jobs)
* `/dv-lottery/index.html` (Photo Checker)
* `/cv-builder/index.html` (ATS Resume Tool)
* `/legal/privacy/index.html` (Privacy Policy)
* `/legal/terms/index.html` (Terms of Service)

### Tier 3: Dynamic Browser History Routing
Ensure the query routing mechanism (`?tab=dv-lottery` and `?tab=legal`) mirrors static path patterns so Googlebot can follow standard `<a>` href links instead of JavaScript-only `onClick` buttons.

---

## 3. Production Robots.txt Specification

Create `/public/robots.txt` with specific directives for Google's advertising and search crawlers:

```txt
# ==============================================================================
# MEZDOHUB — PRODUCTION ROBOTS.TXT
# Optimized for Googlebot & Mediapartners-Google (AdSense)
# ==============================================================================

User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /
Disallow: /owner-crm
Disallow: /api/
Disallow: /admin/

User-agent: Googlebot-Image
Allow: /

User-agent: *
Allow: /
Disallow: /owner-crm
Disallow: /api/
Disallow: /admin/

# Authoritative XML Sitemaps
Sitemap: https://mezdohub.ma/sitemap.xml
Sitemap: https://mezdohub.ma/sitemap-jobs.xml
```

---

## 4. Production XML Sitemap Specification

Create `/public/sitemap.xml` declaring high-priority tools, regional employment hubs, and legal compliance pages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- 1. Homepage & Career Portal -->
  <url>
    <loc>https://mezdohub.ma/</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="https://mezdohub.ma/?lang=ar" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://mezdohub.ma/?lang=fr" />
  </url>

  <!-- 2. Local Jobs & Industrial Sourcing -->
  <url>
    <loc>https://mezdohub.ma/?tab=local-jobs</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 3. DV-2027 Biometric Photo Checker -->
  <url>
    <loc>https://mezdohub.ma/?tab=dv-lottery</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 4. Bilingual ATS Resume & Cover Letter Builder -->
  <url>
    <loc>https://mezdohub.ma/?tab=cv-builder</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 5. Freelance Finance & PayPal-to-CIH Calculator -->
  <url>
    <loc>https://mezdohub.ma/?tab=freelance-money</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 6. LifeMap Arab Career Diagnostic -->
  <url>
    <loc>https://mezdohub.ma/?tab=lifemap-arab</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- 7. Mandatory Legal Compliance Hub -->
  <url>
    <loc>https://mezdohub.ma/?tab=legal</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

---

## 5. Structured Data & Schema.org (JSON-LD) Master Graph

To guarantee that Google recognizes MezdoHub as a verified publisher and software organization, inject the following multi-entity JSON-LD graph into `<head>` inside `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://mezdohub.ma/#website",
      "url": "https://mezdohub.ma/",
      "name": "MezdoHub",
      "description": "منصة التوظيف والتوجيه المهني والأدوات الرقمية بالمغرب",
      "inLanguage": ["ar-MA", "fr-MA"],
      "publisher": {
        "@id": "https://mezdohub.ma/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://mezdohub.ma/#organization",
      "name": "MezdoHub Maroc",
      "url": "https://mezdohub.ma/",
      "logo": "https://mezdohub.ma/favicon.ico",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tanger",
        "addressRegion": "Tanger-Tétouan-Al Hoceïma",
        "addressCountry": "MA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "mezdou2027@gmail.com"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://mezdohub.ma/#dv-validator",
      "name": "Vérificateur Photo DV Lottery 2027 Maroc",
      "url": "https://mezdohub.ma/?tab=dv-lottery",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "WebBrowser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "MAD"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://mezdohub.ma/#cv-builder",
      "name": "Créateur de CV ATS Marocain Gratuit",
      "url": "https://mezdohub.ma/?tab=cv-builder",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "WebBrowser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "MAD"
      }
    }
  ]
}
</script>
```

---

## 6. Dynamic Metadata & OpenGraph Optimization

To ensure each interactive view exposes clean title tags, descriptions, and OpenGraph share cards when parsed by Facebook, WhatsApp, or Google crawlers:

### Dynamic Document Title Synchronization:
```typescript
// Proposed Client Metadata Hook (React)
const TAB_METADATA: Record<string, { title: string; desc: string }> = {
  'home': {
    title: 'MezdoHub — المنصة المغربية للوظائف والتوجيه المهني والأدوات الرقمية',
    desc: 'منصة MezdoHub: وظائف طنجة والمباريات بالمغرب، صانع السيرة الذاتية CV ATS، وفاحص صور قرعة أمريكا 2027.'
  },
  'dv-lottery': {
    title: 'فاحص صورة قرعة أمريكا 2027 مجاناً (معايير 600x600) | MezdoHub',
    desc: 'أداة فحص وتدقيق صورة القرعة الأمريكية DV Lottery 2027 للتأكد من مطابقة شروط وزارة الخارجية الأمريكية.'
  },
  'cv-builder': {
    title: 'صانع السيرة الذاتية الكندية والمغربية ATS مجاناً بالفرنسية | MezdoHub',
    desc: 'أنشئ سيرتك الذاتية المهنية المتوافقة مع معايير الـ ATS لمصانع طنجة والشركات الكبرى في دقائق.'
  },
  'local-jobs': {
    title: 'عروض عمل طنجة 2026: رونو، لير، والمنطقة الحرة TFZ | MezdoHub',
    desc: 'وظائف تقنية وصناعية بالمنطقة الحرة بطنجة وملوسة لحاملي دبلومات التكوين المهني والإجازة.'
  },
  'legal': {
    title: 'السياسات القانونية وسياسة الخصوصية والشروط | MezdoHub',
    desc: 'وثيقة الخصوصية وحماية البيانات وإخلاء المسؤولية المعتمدة وفق معايير Google AdSense و CNDP.'
  }
};
```

---

## 7. Concrete Step-by-Step Implementation Roadmap

Follow this engineering sequence to unlock instant AdSense bot approval:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ADSENSE SPA READINESS EXECUTION PHASES               │
├───────┬───────────────────────────┬────────────────────────────────────┤
│ Phase │ Target Area               │ Deliverables & Technical Action    │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **1** │ Robots.txt & Sitemap      │ Create `/public/robots.txt` and    │
│       │                           │ `/public/sitemap.xml`              │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **2** │ Schema.org JSON-LD        │ Inject multi-entity Graph in       │
│       │                           │ `index.html` head                  │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **3** │ Crawler Fallback HTML     │ Insert rich semantic `<noscript>`  │
│       │                           │ block in `index.html` body         │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **4** │ Canonical & Dynamic Meta  │ Synchronize `<title>` and `<meta>` │
│       │                           │ upon tab transitions               │
├───────┼───────────────────────────┼────────────────────────────────────┤
│ **5** │ Search Console Submission │ Submit `sitemap.xml` to Google     │
│       │                           │ Search Console for instant crawl   │
└───────┴───────────────────────────┴────────────────────────────────────┘
```

---
*Technical SEO & AdSense SPA Readiness Architecture Certified for Immediate Execution.*

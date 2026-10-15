# MezdoHub — First Revenue Experiment (Sprint Day 2 to Day 7)
**Experiment Title:** "The 25 MAD Biometric Photo Correction Concierge"  
**Target Milestone:** First Paid Transaction within 7 Days  
**Author:** Conversion Optimization Specialist & Head of Monetization  
**Foundation Document:** `DAY_1_INSIGHTS.md` (Observed 66.7% Photo Scanner Failure Rate)  
**Constraints:** Zero Code Changes. Zero Backend Modifications. 100% Existing MezdoHub Tools & WhatsApp.  

---

## 1. The Core Commercial Hypothesis

> **Hypothesis:**  
> When a Moroccan DV Lottery applicant receives a **"FAILED / غير مطابق"** verdict from MezdoHub's photo checker, their emotional state shifts from curiosity to **urgent loss aversion**. Offering immediate, done-for-you manual photo correction for **25 MAD via WhatsApp** will convert at least **1 out of every 10 failed users** without requiring any automated checkout software.

---

## 2. The Simplest Possible Offer Design

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE "RESCUE MY PHOTO" VIP CONCIERGE                 │
├────────────────────────────────────────────────────────────────────────┤
│ • Product Name: خدمة تصحيح وتجهيز صورة قرعة أمريكا VIP                │
│ • Deliverable:                                                         │
│   1. Manual extraction & natural background whitening (No AI artifacts)│
│   2. Exact 600x600 px crop with 56%-69% head centering.               │
│   3. Compressed to < 240 KB in pure 24-bit sRGB JPEG.                  │
│   4. Full compliance certificate ready for dvprogram.state.gov.        │
│ • Turnaround Time: Under 30 minutes.                                   │
│ • Delivery Channel: Direct high-resolution file sent via WhatsApp.     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. High-Converting Pricing Strategy (Morocco Psychological Price Points)

* **Single Applicant Offer:** **25 MAD** (~$2.50 USD)
  * *Psychology:* Less than the price of a café and sandwich in Tangier or Casablanca. Eliminates all purchase friction.
* **Couple / Family Pack (Upsell):** **40 MAD** (2 Photos) or **60 MAD** (Up to 4 Photos).
* **Payment Modalities Accepted (100% Local Moroccan Infrastructure):**
  1. **CIH Bank to CIH Bank Instant Transfer** (Free, 0 DH fee, instant notification).
  2. **Attijariwafa Bank / Wafacash / Cash Plus** (National cash transfer codes).
  3. **Inwi / Maroc Telecom Recharges** (Fallback for unbanked 18-20 year olds).

---

## 4. Entry Point & Call to Action (CTA)

Using the existing form and failure screen on `/?tab=dv-lottery`:

### The Trigger:
When the user uploads a photo that is flagged with red badges:
* `الأبعاد: غير مطابق` or
* `تناسب الصورة: ليست مربعة تماماً` or
* `حجم الملف: كبير جداً`

### The Friction-Free Action:
The user submits their name and WhatsApp number through the existing **خدمة تجهيز ومراجعة ملف القرعة الأمريكية** form (lines 283–378 of `DvLotteryHub.tsx`), or clicks the direct WhatsApp support link.

### The Conversion Copy (What the User Sees):
> **"صورتك غير مطابقة وقد تعرض ملفك للإلغاء الآلي من وزارة الخارجية الأمريكية! ⚠️"**  
> *"لا تخاطر بسنة كاملة من الانتظار: أرسل صورتك الآن لمصممنا عبر واتساب، وسنقوم بتعديلها وضبط مقاساتها 600x600 بدقة بيومترية خلال 30 دقيقة مقابل 25 درهم فقط."*

---

## 5. End-to-End WhatsApp Sales & Delivery Workflow

Once a lead submits their phone number or contacts WhatsApp:

```
[FAILED PHOTO IN SCANNER] 
          │
          ▼
[LEAD ENTERS PHONE NUMBER] ──► (Logged in CRM / mezdohub_crm_leads)
          │
          ▼
[INSTANT WHATSAPP OUTREACH] (Template 1 sent in < 3 minutes)
          │
          ▼
[CUSTOMER SENDS RAW PHOTO VIA DOCUMENT]
          │
          ▼
[DESIGNER FIXES PHOTO IN 10 MINS]
          │
          ▼
[SEND WATERMARKED PREVIEW + RIB / CIH] (Template 2)
          │
          ▼
[CUSTOMER SENDS 25 DH SCREENSHOT]
          │
          ▼
[DELIVER HIGH-RES UNWATERMARKED 600x600 JPG] (Template 3)
```

### Script 1: Instant Outreach Message (Sent to Lead)
> "سلام عليكم أخي/أختي [الاسم]، معك مروان من فريق الدعم التقني لمنصة MezdoHub 🇲🇦.
> 
> لاحظنا أنك درتي فحص لصورة قرعة أمريكا فالموقع وطلعات ليك غير مطابقة للأبعاد أو الخلفية. 
> 
> باش ما تعرضش ملفك للإقصاء من طرف القنصلية الأمريكية، نقدروا نقادو ليك الصورة يدوياً (تعديل الأبعاد لـ 600x600، ضبط تمركز الوجه، وضبط الوزن أقل من 240KB) فـ أقل من 30 دقيقة وبثمن رمزي: **25 درهم فقط**.
> 
> إذا كنتي مهتم، صيفط ليا التصويرة دابا هنا بصيغة Document باش ما تنقصش الجودة ديالها ونبداو ليك التعديل فوراً! ✨"

### Script 2: Watermarked Preview & Payment Request
> "تفضل أخي [الاسم]، ها هي المعاينة ديال صورتك من بعد ما ضبطناها بالمليمتر وفق المعايير الأمريكية الرسمية (نسبة الرأس 62%، الأبعاد 600x600، خلفية بيضاء نقية).
> 
> باش نصيفط ليك الملف النهائي الأصلي بجودة عالية جاهز للرفع فالموقع الرسمي، تفضل الحساب للتحويل (25 درهم):
> 
> 🏦 **CIH Bank:**
> • الاسم: MEZDOU
> • رقم الحساب (RIB): 230 640 XXXXXXXXXXXX 45
> 
> (أو يمكن إرسالها عبر تطبيق CIH Mobile مباشرة أو Cash Plus). صيفط ليا فقط توصيل التحويل وغاتوصلك الصورة ف ثانية! 🤝"

### Script 3: File Delivery & Cross-Sell
> "تم استلام التحويل بنجاح، شكراً لثقتك فـ MezdoHub! 
> 
> ها هو الملف الأصلي النهائي بصيغة JPEG بحجم 142KB وأبعاد 600x600 بكسل. تقدر تدفع بيه دابا فالموقع الرسمي dvprogram.state.gov وأنت مرتاح البال 100%. 🇺🇸
> 
> 🎁 **هدية من المنصة:** إذا كنتي كتقلب على خدمة فالمغرب، تقدر تصاوب سيرة ذاتية ATS احترافية بالمجان عبر هاد الرابط: https://mezdohub.ma/?tab=cv-builder
> 
> بالتوفيق ليك فالقرعة وفمسارك المهني!"

---

## 6. Payment Flow Architecture (Zero Tech Stack)

No Stripe. No CMI. No developer setup required:

| Method | Processing Time | Fee to MezdoHub | Target User |
| :--- | :---: | :---: | :--- |
| **CIH Express / CIH Mobile** | Instant (Real-time) | **0.00 MAD** | 80% of Moroccan youth & students |
| **Cash Plus / Wafacash Code** | 5 to 15 minutes | **0.00 MAD** | Cash-preferred candidates |
| **Orange / Inwi Recharge** | Instant | **0.00 MAD** | Micro-fallback for younger applicants |

---

## 7. Conversion Tracking & Instrumentation

To track the performance of this experiment inside existing systems:

1. **Top-of-Funnel Indicator:**
   * Tracked in GA4 via `dv_photo_check` where `result_status === 'failed'`.
2. **Lead Submission Indicator:**
   * Tracked in `localStorage` under key `mezdohub_crm_leads`.
   * Accessible immediately via the **Owner Admin CRM Portal** (`/?tab=owner-crm`).
3. **Closing Rate Indicator:**
   $$\text{Closing Rate} = \frac{\text{Completed 25 MAD Payments}}{\text{WhatsApp Inquiries Initiated}}$$
   *Target: $\ge 15\%$ conversion.*

---

## 8. The 7-Day Sprint Milestones to First Sale

```
┌────────────────────────────────────────────────────────────────────────┐
│                   FIRST SALE 7-DAY EXPERIMENT TIMELINE                 │
├────────┬───────────────────────────────────────────────────────────────┤
│ Day 2  │ Run Facebook Post #1 & #3 in DV Lottery groups.               │
│        │ Target: 40 visits -> 15 photo checks -> 10 failed scans.      │
├────────┼───────────────────────────────────────────────────────────────┤
│ Day 3  │ Engage first 3 to 5 leads on WhatsApp using Script 1.         │
│        │ Deliver first test photo fix.                                 │
├────────┼───────────────────────────────────────────────────────────────┤
│ Day 4  │ Secure Customer #1: First 25 MAD transferred via CIH.         │
│        │ Screenshot receipt (anonymized) for social proof!             │
├────────┼───────────────────────────────────────────────────────────────┤
│ Day 5  │ Post social proof in WhatsApp status: "First happy applicant!"│
│        │ Target: 3 additional photo fixes (75 MAD).                    │
├────────┼───────────────────────────────────────────────────────────────┤
│ Day 6  │ Upsell Family Pack (40 MAD) to married applicants.           │
├────────┼───────────────────────────────────────────────────────────────┤
│ Day 7  │ Review total revenue: Target 100 to 250 MAD cumulative.       │
└────────┴───────────────────────────────────────────────────────────────┘
```

---
*First Revenue Experiment Blueprint Certified by Conversion Optimization Specialist for Instant Execution.*

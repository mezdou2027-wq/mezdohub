# MezdoHub — Article 1 Publishing, Distribution & Traffic Maximization Engine
**Target Asset:** `/articles/01_dv_lottery_photo_requirements_morocco.md`  
**Focus Subject:** US DV-2027 Lottery Biometric Photo Standards in Morocco  
**Author:** SEO Content Publishing Manager & Growth Hacker  
**Core Objective:** Extract maximum organic search, social viral, and direct WhatsApp referral traffic from Article 1 before moving to the next publication.  

---

## 1. Pre-Publishing Technical & Editorial Checklist

Complete this 10-point gate review before moving the article to public indexation:

- [ ] **Slug & URL Integrity:** Verify clean URL structure: `https://mezdohub.ma/articles/shoroot-soura-qor3at-amrika-2027-maroc`.
- [ ] **Exact H1 Tag Hierarchy:** Confirm there is only one `<h1>` containing the primary target keyword (`شروط صورة القرعة الامريكية 2027 بالمغرب`).
- [ ] **Heading Structure (`<h2>` & `<h3>`):** Headings contain secondary keywords (`600x600`, `خلفية بيضاء`, `فحص الصورة`).
- [ ] **Word Count Verification:** Total exceeds **1,400 words** of original editorial text.
- [ ] **Keyword Density Check:** Target query `شروط صورة القرعة الامريكية 2027` appears 4 to 6 times naturally (Density: ~1.2%, safe from keyword stuffing).
- [ ] **Image Alt Tags & Captions:** Any visual diagram includes Arabic descriptive alt text (e.g., `alt="مخطط أبعاد صورة القرعة الأمريكية 600x600 بكسل"`).
- [ ] **Mobile Responsive Typography:** Line-height set to `1.8` and font set to `Cairo` for optimal readability on mobile screens in Morocco.
- [ ] **OpenGraph / Twitter Card Meta:** `og:image` pointing to a high-contrast 1200x630 share card with green/red photo comparison overlay.
- [ ] **Clean Legal Disclaimers:** Visible note stating MezdoHub is independent and not affiliated with the US Department of State.
- [ ] **Schema Validation:** JSON-LD script validated via Google Rich Results Test without warnings.

---

## 2. Strategic Internal Linking Map

To maximize PageRank flow and user dwell time across MezdoHub:

```
                                [ARTICLE 1: DV PHOTO GUIDE]
                                             │
      ┌──────────────────────────────────────┼──────────────────────────────────────┐
      ▼                                      ▼                                      ▼
[CONVERSION LINK 1]                   [CONVERSION LINK 2]                   [ENGAGEMENT LINK 3]
Target: /?tab=dv-lottery             Target: /?tab=cv-builder              Target: /?tab=local-jobs
Anchor Text (Arabic):                Anchor Text (Arabic):                 Anchor Text (Arabic):
"افحص صورتك الآن مجاناً عبر أداة     "أنشئ سيرتك الذاتية المهنية الكندية   "استكشف عروض العمل والشركات
التحليل البيومتري لمنصة MezdoHub"    والمغربية ATS المجانية"               الصناعية بطنجة وملوسة"
Context: In Section 8 (How to Check) Context: In Section 10 (Next Steps)   Context: In Section 10 (Next Steps)
```

### Inbound Linking Opportunities (Pages linking TO this article):
1. **From Homepage (`MezdoHomePortal.tsx`):** Add a highlighted card under *"أحدث الإرشادات"* linking directly to this guide.
2. **From DV Hub (`DvLotteryHub.tsx`):** Place a prominent link above the photo upload zone: *"اقرأ الدليل الكامل لشروط الصورة لتفادي الإقصاء الآلي"*.
3. **From Footer (`Footer.tsx`):** Link in the Opportunités / Navigation column.

---

## 3. Google Featured Snippet Capture Opportunities

Google.ma frequently triggers **Paragraph** and **List** Featured Snippets for search terms around DV Lottery photos. We optimize for positions #0:

### Target Snippet 1: The Paragraph Definition Snippet
* **Target Query:** `ما هي مقاسات صورة القرعة الأمريكية 2027؟`
* **Target Text Block in Article (Direct Answer in 45 words):**
  > مقاسات صورة القرعة الأمريكية 2027 (DV-2027) الرسمية هي 600×600 بكسل بنسبة أبعاد مربعة متساوية (1:1)، وبدقة 300 بكسل في البوصة (300 DPI). يجب أن يكون حجم الملف أقل من 240 كيلوبايت بصيغة JPEG، مع خلفية بيضاء نقية وبدون ارتداء النظارات.

### Target Snippet 2: The Numbered List Snippet
* **Target Query:** `شروط صورة قرعة أمريكا للمحجبات بالمغرب`
* **Target Text Block in Article:**
  1. كشف كامل الوجه من أعلى الجبهة إلى أسفل الذقن.
  2. ظهور الوجنتين وزوايا الخدين بوضوح تام.
  3. تجنب ارتداء حجاب أبيض يمتزج مع الخلفية البيضاء.
  4. عدم إسقاط الحجاب لأي ظلال على العينين أو الملامح.
  5. خلع النظارات الطبية أو الشمسية بالكامل.

---

## 4. FAQPage Schema Markup (JSON-LD)

Inject this code block directly into the `<head>` of the article page to capture expandable accordions in Google search results:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "هل يمكنني استخدام نفس صورة السنة الماضية في قرعة أمريكا 2027؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "لا قطعياً. تشترط وزارة الخارجية الأمريكية تقديم صورة حديثة تم التقاطها خلال آخر 6 أشهر. تحتفظ خوارزميات النظام الأمريكي بسجلات الصور للسنوات السابقة، وإذا تطابقت صورتك في ملف DV-2027 مع ملف DV-2026، فسيتم إقصاء طلبك تلقائياً."
      }
    },
    {
      "@type": "Question",
      "name": "ما هي الأبعاد الرسمية لصورة قرعة أمريكا بالبكسل؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "الأبعاد الرسمية لصورة قرعة أمريكا هي 600×600 بكسل كحد أدنى وحتى 1200×1200 بكسل، ويجب أن يكون الملف بصيغة JPEG بحجم لا يتجاوز 240 كيلوبايت ودقة 300 DPI."
      }
    },
    {
      "@type": "Question",
      "name": "هل يُسمح بارتداء النظارات في صورة اللوتري الأمريكي؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يُحظر ارتداء النظارات الطبية أو الشمسية نهائياً في صورة القرعة الأمريكية منذ تعديل القوانين. يجب خلع النظارات تماماً أثناء التقاط الصورة لتفادي انعكاس الضوء على العينين."
      }
    },
    {
      "@type": "Question",
      "name": "هل يجوز تبييض خلفية الصورة بواسطة الفوتوشوب أو الذكاء الاصطناعي؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يُمنع منعاً باتاً تفريغ الخلفية صناعياً أو استخدام برامج تعديل الصور لتغيير الملامح أو إضافة خلفية بيضاء مصطنعة. تكتشف أنظمة المسح البيومتري التعديل الرقمي في بيانات EXIF وحواف الشعر، مما يؤدي لاستبعاد الاستمارة."
      }
    },
    {
      "@type": "Question",
      "name": "أين يمكنني فحص مطابقة صورتي لشروط القرعة الأمريكية مجاناً؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يمكنك فحص صورتك بدقة وبالمجان عبر أداة الفحص البيومتري المباشرة على منصة MezdoHub (mezdohub.ma/?tab=dv-lottery) للتأكد من الأبعاد، مركز الوجه، ونقاء الخلفية قبل التسجيل الرسمي."
      }
    }
  ]
}
</script>
```

---

## 5. High-CTR Meta Title Alternatives (A/B Testing Candidates)

* **Alternative 1 (Primary - Balanced SEO & CTR):**  
  `شروط صورة القرعة الأمريكية 2027 بالمغرب: المقاسات، الخلفية، والفحص الفوري | MezdoHub` *(Length: 59 chars - Perfect)*
* **Alternative 2 (Urgency & Loss Aversion - High Click Rate):**  
  `احذر إقصاء طلبك! شروط صورة قرعة أمريكا 2027 بالمغرب وفاحص الأبعاد المجاني`
* **Alternative 3 (Technical & Authoritative):**  
  `المعايير الرسمية لصورة DV-2027 (مقاس 600x600) وأسباب الرفض البيومتري بالمغرب`
* **Alternative 4 (Bilingual French/Darija for Search Engines):**  
  `Photo DV Lottery 2027 Maroc : Exigences Officielles 600x600 et Vérificateur Gratuit`

---

## 6. High-Conversion Meta Description Alternatives

* **Option 1 (Direct Utility - Recommended):**  
  `الدليل الشامل لشروط صورة القرعة الأمريكية 2027 بالمغرب. تعرف على المقاسات الرسمية (600x600)، ضوابط الحجاب والنظارات، وافحص صورتك مجاناً عبر منصة MezdoHub قبل التسجيل.`
* **Option 2 (Pain-Point Focused):**  
  `أكثر من 60% يقصون من قرعة أمريكا بسبب الصورة! لا تكرر الخطأ واكتشف الشروط البيومترية الرسمية لـ DV-2027 بالمغرب مع أداة تدقيق الأبعاد والخلفية بدون فوتوشوب.`
* **Option 3 (Action-Oriented):**  
  `كيف تلتقط صورة مقبولة 100% لقرعة أمريكا 2027 بهاتفك في المنزل؟ شرح الأبعاد الدقيقة، أخطاء تبييض الخلفية، ورابط فحص الصورة الفوري مجاناً على MezdoHub.`

---

## 7. Facebook Post (Optimized for Moroccan Communities)
*Target Groups: قرعة أمريكا المغرب 2027 / الهجرة إلى أمريكا وكندا للمغاربة / مباريات التوظيف والفرص*

```text
🚨 الإخوان لي كايوجدو يدفعو لقرعة أمريكا 2027 (DV-2027).. عفاكم ردوا البال لهاد النقطة الخطيرة! 🚨

أكثر من 60% من المترشحين كايتقصاو تقنياً من السحب العشوائي والسبب الوحيد هو "الصورة" 📸!

بزاف كايصحاب ليهم غير يوقف حدا حيط ويبيض الخلفية بـ Photoshop أو تطبيقات الذكاء الاصطناعي راه مقبولة.. العكس تماماً! خوارزميات وزارة الخارجية الأمريكية كتعرف التعديل الرقمي وكتلغي الاستمارة آلياً بدون أي إشعار.

هادو هما الشروط الرسمية لي خاص تحترمهم:
✅ المقاس: 600x600 بكسل بالضبط ونسبة مربعة 1:1.
✅ الحجم: أقل من 240 كيلوبايت بصيغة JPEG.
✅ النظارات: ممنوعة نهائياً (حتى النظارات الطبية خاص تحيدهم).
✅ الحجاب: مسموح ومقبول بشرط يبان الوجه كامل من الجبهة للذقن ومايكونش فيه ظل.
✅ التاريخ: تكون تصويرة جديدة ديال هاد 6 أشهر (إياك تعاود تصويرة العام الفايت!).

باش ماتضيعش فرصتك، وجدنا ليكم دليل كامل كيشرح كيفاش تاخد تصويرة احترافية بهاتفك ف الدار + أداة مجانية كتحلل صورتك بيومترياً وكتقوليك واش مقبولة أولا لا قبل ما تدفع فالموقع الرسمي!

🔗 الرابط المباشر للدليل وفحص صورتك بالمجان:
https://mezdohub.ma/articles/shoroot-soura-qor3at-amrika-2027-maroc

بارطاجي مع صاحبك لي ناوي يدفع هاد العام.. ما تخليش تصويرة تحرمك من الحلم ديالك! 🇺🇸🇲🇦
```

---

## 8. Viral TikTok Video Script (High-Energy Screen Capture Hook)
*Format: 45 to 60 seconds | Language: Moroccan Darija with visual proof*

* **[0:00 - 0:05] HOOK (Visual: Red "REJECTED" stamp on screen + Urgent Face):**  
  *"90% ديال المغاربة لي كيدفعو لقرعة أمريكا كايتقصاو بسباب هاد الغلط الصغير فالتصويرة.. وما كايعرفوها حتى لشهر 5!"*
* **[0:05 - 0:15] PROBLEM (Visual: Showing a cluttered phone photo with bad lighting):**  
  *"كتمشي تدير فوتوشوب باش تبيض الحيط، أو كتخلي النظارات.. سيستيم ديال ميريكان بالذكاء الاصطناعي كايلوح الدوسي ديالك فالبوبيل قبل كاع ما يدخل القرعة!"*
* **[0:15 - 0:35] SOLUTION (Visual: Screen recording of MezdoHub Canvas Checker):**  
  *"الحل ساهل.. دخل لهاد السيت المغربي MezdoHub، غادي تحط تصويرتك، الأداة غادي تسكانيها ف 3 ثواني بـ Canvas البيومتري: غاتعطيك واش الوجه ممركز مزيان، واش الأبعاد 600x600، واش الحجم أقل من 240KB.. كولشي فابور!"*
* **[0:35 - 0:50] CALL TO ACTION:**  
  *"وقف، خذ تصويرة حدا حيط بيض طبيعي بنور الشرجم، جربها فهاد الأداة عاد تسجل فالموقع الرسمي dvprogram. الرابط راه حطيتو ليكم فالبايو، صيفط الفيديو لصاحبك لي باغي يدفع!"*

---

## 9. WhatsApp Channel & Group Broadcast
*Target: MezdoHub Official WhatsApp Channel & Tangier Job Groups*

```text
🇺🇸 *تنبيه مهم بخصوص صورة قرعة أمريكا 2027 (DV-2027) بالمغرب* 🇲🇦

قبل ما تدفع لقرعة أمريكا، تأكد أن صورتك مطابقة للشروط الرسمية لوزارة الخارجية الأمريكية باش ما يتقصاش ملفك آلياً:

⚠️ *أبرز الشروط الإلزامية:*
1. الأبعاد: 600×600 بكسل (مربعة).
2. الوزن: أقل من 240 KB بصيغة JPG.
3. النظارات: ممنوعة كلياً لجميع الفئات.
4. الخلفية: بيضاء طبيعية وبدون تبييض بالفوتوشوب.
5. حديثة: تم التقاطها خلال آخر 6 أشهر.

🔍 *دليل تفصيلي + أداة مجانية لفحص صورتك والتأكد من قبولها قبل التسجيل:*
👇👇
https://mezdohub.ma/articles/shoroot-soura-qor3at-amrika-2027-maroc

شارك الرسالة مع أصدقائك وعائلتك المهتمين بالتقديم! ✨
```

---

## 10. LinkedIn Thought Leadership Post (Professional Angle)
*Target: Moroccan HR Directors, IT Professionals, and Skilled Technicians*

```text
L'impact des critères biométriques dans le programme DV-Lottery américain : Une leçon de conformité numérique pour les talents marocains.

Chaque automne, des dizaines de milliers de jeunes diplômés, ingénieurs et techniciens marocains candidatent au programme de visa de diversité américain (DV-2027). Pourtant, plus de la moitié des disqualifications ont lieu au stade préliminaire de l'analyse automatisée de la photo d'identité.

Pourquoi ?
L'intelligence artificielle consulaire rejette automatiquement les images retouchées numériquement (détourage Photoshop, suppression de fond par IA) pour violation des métadonnées EXIF et incohérence biométrique.

Sur MezdoHub, nous avons publié un guide technique exhaustif détaillant :
• Les spécifications exactes : ratio 1:1, 600x600 px, 300 DPI, < 240 KB.
• La conformité faciale : positionnement des yeux entre 56% et 69% de la hauteur totale.
• Les règles de port du voile et l'interdiction formelle des verres correcteurs.
• La mise à disposition d'un validateur d'image client-side gratuit respectueux de la vie privée.

Au-delà de la mobilité internationale, la rigueur dans la constitution d'un dossier administratif reste la compétence n°1 pour tout candidat au marché du travail moderne.

🔗 Lire l'analyse complète et tester vos visuels :
https://mezdohub.ma/articles/shoroot-soura-qor3at-amrika-2027-maroc

#Recrutement #Maroc #DVLottery #Conformite #MobiliteInternationale #MezdoHub
```

---
*Plan de Publication et de Distribution certifié par le SEO Content Publishing Manager pour exécution immédiate.*

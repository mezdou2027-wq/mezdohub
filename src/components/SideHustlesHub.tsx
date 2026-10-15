import React, { useState } from 'react';
import { 
  Laptop, 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Palette, 
  ShoppingBag, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ExternalLink,
  Layers,
  CreditCard,
  Zap,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Coins
} from 'lucide-react';

interface SideHustle {
  id: string;
  title: string;
  category: 'design' | 'ecommerce' | 'freelance' | 'affiliate' | 'pod';
  categoryLabelAr: string;
  platform: string;
  difficulty: 'سهل' | 'متوسط' | 'متقدم';
  startupCost: string;
  potentialEarnings: string;
  payoutMethod: string;
  summary: string;
  requirements: string[];
  steps: string[];
  proTips: string;
  toolsRecommended: string[];
  officialPlatformUrl: string;
}

export const SideHustlesHub: React.FC<{ onBack?: () => void; onSelectTab?: (tab: string) => void }> = ({ onBack, onSelectTab }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedHustle, setSelectedHustle] = useState<SideHustle | null>(null);

  const hustles: SideHustle[] = [
    {
      id: 'hustle-canva',
      title: 'الربح من تصاميم Canva وقوالب السوشيال ميديا الرقمية',
      category: 'design',
      categoryLabelAr: 'تصميم وقوالب رقمية',
      platform: 'Canva Creators / Gumroad / Etsy',
      difficulty: 'سهل',
      startupCost: '0 درهم (حساب Canva مجاني أو تعليمي)',
      potentialEarnings: '2,000 إلى 8,000 درهم شهرياً (دخل سلبي تراكمي)',
      payoutMethod: 'PayPal / Wise / حساب بنكي مغربي (CIH أو التجاري)',
      summary: 'تصميم قوالب جاهزة قابلة للتعديل مثل قوالب السير الذاتية (CVs)، بوستات إنستغرام للعيادات والمطاعم، ومخططات الإنتاجية وبيعها مراراً وتكراراً دون شحن أو تكلفة إنتاج.',
      requirements: [
        'حاسوب محمول أو هاتف ذكي مع اتصال إنترنت',
        'ذوق فني في تنسيق الألوان والخطوط (Typography)',
        'حساب في موقع Gumroad أو Payhip لعرض منتجاتك واستلام المدفوعات'
      ],
      steps: [
        'اختر نيشاً محدداً (مثال: قوالب إنستغرام لصالونات التجميل أو قوالب CV للمهندسين).',
        'صمم 10 إلى 15 قالباً مميزاً في Canva بمقاسات قياسية.',
        'استخرج رابط "قالب للتعديل" (Template Link) واحمِه بملف PDF تحميلي.',
        'أنشئ صفحة منتج مجانية على Gumroad وضع سعراً بين 5$ و 15$.',
        'سوّق لمنتجك عبر فيديوهات قصيرة على تيك توك وإنستغرام ريلز.'
      ],
      proTips: 'القوالب باللغة الفرنسية والإنجليزية تحقق مبيعات دولية بالدولار واليورو بأسعار أعلى.',
      toolsRecommended: ['Canva Free/Pro', 'Gumroad', 'Pinterest', 'ChatGPT لتوليد النصوص'],
      officialPlatformUrl: 'https://www.canva.com'
    },
    {
      id: 'hustle-etsy-digital',
      title: 'الربح من بيع المنتجات الرقمية على Etsy (Digital Downloads)',
      category: 'ecommerce',
      categoryLabelAr: 'تجارة إلكترونية رقمية',
      platform: 'Etsy Marketplace',
      difficulty: 'متوسط',
      startupCost: 'أقل من 50 درهم (رسوم إدراج القوائم 0.20$ لكل منتج)',
      potentialEarnings: '3,000 إلى 15,000 درهم شهرياً',
      payoutMethod: 'Wise Business / Payoneer / حساب بنكي دولي',
      summary: 'بيع ملفات رقمية ينزلها الزبائن فورياً بعد الدفع، مثل مخططات تنظيم الوقت (Digital Planners)، جداول إكسل للميزانيات الشخصية، وملفات التلوين للأطفال (Coloring Pages).',
      requirements: [
        'حساب بائع على Etsy أو شريك يملك متجراً موثوقاً',
        'حساب Wise أو Payoneer لاستقبال العملات الأجنبية',
        'معرفة ببرامج التصميم أو برنامج Notion وجداول Google Sheets'
      ],
      steps: [
        'بحث الكلمات المفتاحية الأكثر طلباً على Etsy عبر أداة eRank أو Alura.',
        'تصميم ملفات رقمية عالية الجودة وتصديرها بصيغة PDF قابلة للطباعة.',
        'إنشاء صور عرض (Mockups) احترافية تظهر المنتج كما لو كان حقيقياً.',
        'كتابة عنوان ووصف غني بالكلمات الدلالية SEO مع 13 وسم (Tag).',
        'تفعيل التحميل التلقائي بمجرد إتمام الزبون الأمريكي أو الأوروبي لعملية الدفع.'
      ],
      proTips: 'ركز على المواسم (العودة للمدارس، بداية العام الجديد، حفلات الزفاف) لتحقيق مبيعات مضاعفة.',
      toolsRecommended: ['eRank', 'Canva', 'Placeit Mockups', 'GoodNotes'],
      officialPlatformUrl: 'https://www.etsy.com'
    },
    {
      id: 'hustle-fiverr-upwork',
      title: 'بيع الخدمات المصغرة والعمل الحر الدولي (Fiverr & Upwork)',
      category: 'freelance',
      categoryLabelAr: 'العمل الحر والخدمات المصغرة',
      platform: 'Fiverr / Upwork / Khamsat / Mostaql',
      difficulty: 'متوسط',
      startupCost: '0 درهم (مجاني 100%)',
      potentialEarnings: '4,000 إلى 20,000 درهم شهرياً',
      payoutMethod: 'PayPal / Payoneer / تحويل بنكي مغربي مباشر',
      summary: 'استثمار مهاراتك اليومية في تقديم خدمات يحتاجها أصحاب الأعمال حول العالم: إدخال بيانات، ترجمة فرنسية/إنجليزية/عربية، تفريغ صوتي، تعديل فيديوهات ريلز، أو برمجة مواقع.',
      requirements: [
        'مهارة عملية محددة (تصميم، لغات، إعلاميات، كتابة، إكسل)',
        'معرض أعمال سابق (Portfolio) حتى لو كان مشاريع تجريبية',
        'التزام بالوقت وسرعة الرد على العملاء'
      ],
      steps: [
        'إنشاء ملف شخصي احترافي يركز على المشاكل التي تحلها للعميل وليس فقط مؤهلاتك.',
        'نشر 3 إلى 5 خدمات (Gigs) بأسعار مدروسة تبدأ من 10$ إلى 50$.',
        'تقديم عروض دقيقة ومخصصة على مشاريع Upwork اليومية (Cover Letter).',
        'تسليم الطلب بجودة فائقة لطلب تقييم 5 نجوم (Social Proof).',
        'سحب الأرباح بسهولة عبر بايبال أو بايونير إلى بطاقتك البنكية المغربية.'
      ],
      proTips: 'المغاربة يملكون ميزة تنافسية كبرى بفضل إتقانهم للغتين الفرنسية والإنجليزية معاً.',
      toolsRecommended: ['Notion Portfolio', 'DeepL للترجمة الاحترافية', 'CapCut للفيديو', 'Loom'],
      officialPlatformUrl: 'https://www.fiverr.com'
    },
    {
      id: 'hustle-print-on-demand',
      title: 'الطباعة عند الطلب دون رأس مال (Print on Demand - POD)',
      category: 'pod',
      categoryLabelAr: 'الطباعة عند الطلب',
      platform: 'Redbubble / Teepublic / Merch by Amazon',
      difficulty: 'سهل',
      startupCost: '0 درهم (لا تحتاج شراء قمصان أو شحن)',
      potentialEarnings: '1,500 إلى 10,000 درهم شهرياً',
      payoutMethod: 'PayPal / Wise / Payoneer',
      summary: 'ترفع تصاميم ورسومات أو عبارات ساخرة، وعندما يشتري زبون في أمريكا أو أوروبا، تتكفل المنصة بطباعة التصميم على تيشرت، كؤوس، أو ملصقات، وشحنه وتدفع لك هامش الربح.',
      requirements: [
        'أفكار تصاميم إبداعية وعبارات ملفتة (Quotes)',
        'برنامج تصميم بسيط كـ Canva أو Photoshop لإنتاج ملفات PNG شفافة',
        'فهم لحقوق الملكية الفكرية وتجنب أسماء العلامات التجارية المحمية (Copyright)'
      ],
      steps: [
        'إنشاء متجر مجاني على منصتي Redbubble و Teepublic.',
        'تصميم رسومات بخلفية شفافة بدقة عالية (4500 × 5400 بكسل).',
        'رفع التصميم واختيار المنتجات المناسبة (ملصقات، هوديز، أغطية هواتف).',
        'وضع كلمات دلالية (Tags) تستهدف اهتمامات معينة (محبو القهوة، المبرمجون، عشاق الحيوانات).',
        'تحصيل العمولات تلقائياً في حساب بايبال كل منتصف شهر.'
      ],
      proTips: 'الملصقات (Stickers) هي أكثر المنتجات مبيعاً وأسهلها تحقيقاً للطلبات الأولى.',
      toolsRecommended: ['Canva', 'Photopea مجاني', 'Trademarkia لفحص العلامات التجارية'],
      officialPlatformUrl: 'https://www.redbubble.com'
    },
    {
      id: 'hustle-affiliate-marketing',
      title: 'التسويق بالعمولة للمنصات والأدوات الرقمية (Affiliate Marketing)',
      category: 'affiliate',
      categoryLabelAr: 'التسويق بالعمولة',
      platform: 'Impact / Amazon Associates / Hostinger / Jumia KOL',
      difficulty: 'متوسط',
      startupCost: '0 إلى 200 درهم (مدونة ووردبريس أو صفحة سوشيال ميديا)',
      potentialEarnings: '2,500 إلى 25,000 درهم شهرياً',
      payoutMethod: 'تحويل بنكي مباشر (Wire Transfer) أو PayPal',
      summary: 'ترشيح منتجات أو أدوات استضافة أو دورات تدريبية للجمهور عبر روابط تتبع مخصصة، والحصول على نسبة مئوية من كل عملية شراء أو تسجيل تتم عن طريقك.',
      requirements: [
        'قناة لنشر المحتوى (حساب إنستغرام، قناة تيك توك، مدونة SEO، أو قناة تيليجرام)',
        'بناء ثقة وتقديم مراجعات صادقة للمنتجات والأدوات المفيدة',
        'الاشتراك في شبكات التسويق بالعمولة المعتمدة دولياً'
      ],
      steps: [
        'اختر مجالاً تتقنه (التعليم، أدوات العمل الحر، الاستضافات والمواقع، الأجهزة التقنية).',
        'سجل في برامج العمولة (مثل Hostinger Affiliate، Amazon Associates، برامج المنح واللغات).',
        'احصل على رابطك الفريد (Affiliate Link).',
        'شارك شرحاً توضيحياً أو مراجعة عملية للمنتج مع تضمين الرابط في البايو أو الوصف.',
        'استلم أرباحك بانتظام مباشرة إلى حسابك البنكي.'
      ],
      proTips: 'تسويق البرمجيات والاشتراكات الشهرية (SaaS) يمنحك عمولة متكررة كل شهر من نفس الزبون.',
      toolsRecommended: ['Bitly لتقصير الروابط', 'Notion', 'WordPress / MezdoHub Tools'],
      officialPlatformUrl: 'https://impact.com'
    },
    {
      id: 'hustle-auto-entrepreneur',
      title: 'تقنين العمل الحر: نظام المقاول الذاتي بالمغرب وتوطين الأرباح',
      category: 'freelance',
      categoryLabelAr: 'النظام القانوني والبنكي بالمغرب',
      platform: 'بوابة المقاول الذاتي الرسمية (RNME)',
      difficulty: 'سهل',
      startupCost: '0 درهم (التسجيل وإصدار البطاقة مجاني لدى بريد بنك)',
      potentialEarnings: 'سقف مداخيل قانوني يصل إلى 200,000 درهم/سنة للخدمات',
      payoutMethod: 'فواتير رسمية للشركات + تبرئة ذمة مكتب الصرف والجمارك',
      summary: 'الحصول على صفة قانونية كاملة كفريلانسر مغربي، مع بطاقة مهنية تتيح لك التعامل مع الشركات، فتح حساب بنكي مهني، استلام أموالك من الخارج دون مشاكل مع مكتب الصرف، ودفع ضريبة رمزية جداً (1% للخدمات المصدرة للخارج).',
      requirements: [
        'بطاقة التعريف الوطنية المغربية (CIN)',
        'صورة شمسية شخصية',
        'أن لا تكون موظفاً في القطاع العام'
      ],
      steps: [
        'التسجيل في البوابة الإلكترونية الرسمية rne.ma أو ae.gov.ma.',
        'طباعة استمارة التسجيل والتوجه إلى أقرب وكالة بريد بنك (Barid Al-Maghrib).',
        'استلام بطاقة المقاول الذاتي الذكية خلال 15 يوماً.',
        'فتح حساب بنكي مهني خالي من الرسوم المعقدة (CIH أو Attijari أو البنك الشعبي).',
        'إصدار فواتير قانونية للعملاء والتصريح الفصلي برقم المعاملات كل 3 أشهر.'
      ],
      proTips: 'عند تصدير خدماتك الرقمية للعملاء بالخارج، تستفيد من إعفاءات ضريبية استثنائية ونسبة ضريبة لا تتجاوز 1%.',
      toolsRecommended: ['موقع ae.gov.ma', 'بوابة المديرية العامة للضرائب (DGI)', 'حاسبة MezdoHub للضرائب'],
      officialPlatformUrl: 'https://ae.gov.ma'
    }
  ];

  const filteredHustles = hustles.filter(h => {
    if (activeCategory === 'all') return true;
    return h.category === activeCategory;
  });

  return (
    <div className="space-y-10 animate-fade-in text-right">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO HEADER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Coins className="w-4 h-4" />
            <span>دليل الوظائف الجانبية والربح الرقمي للمغاربة 💡</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            مسارات الدخل الإضافي والعمل الحر من منزلك دون رأس مال
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            تعلم كيف تبدأ وتكسب بالدولار واليورو من Canva و Etsy و Fiverr والطباعة عند الطلب، مع خطوات تقنين أرباحك واستلامها في حسابك البنكي المغربي.
          </p>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            العودة للرئيسية
          </button>
        )}
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. CATEGORY SELECTOR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'all', label: 'جميع المسارات (Tous)' },
          { id: 'design', label: 'التصميم وقوالب Canva' },
          { id: 'ecommerce', label: 'المنتجات الرقمية و Etsy' },
          { id: 'freelance', label: 'الخدمات المصغرة والفريلانس' },
          { id: 'pod', label: 'الطباعة عند الطلب (POD)' },
          { id: 'affiliate', label: 'التسويق بالعمولة' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. HUSTLES CARDS GRID
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHustles.map(h => (
          <div
            key={h.id}
            className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all shadow-xs flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{h.platform}</span>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-black ${
                  h.difficulty === 'سهل'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                }`}>
                  مستوى الصعوبة: {h.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
                {h.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {h.summary}
              </p>

              {/* Financial Snapshot */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">رأس المال المطلوب:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{h.startupCost}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">العائد الشهري المتوقع:</span>
                  <strong className="text-slate-900 dark:text-white">{h.potentialEarnings}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">طريقة سحب الأرباح للمغرب:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{h.payoutMethod}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedHustle(h)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                شرح خطوات العمل وبدء التنفيذ 🚀
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. ACTIONABLE HUSTLE DETAIL MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedHustle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{selectedHustle.categoryLabelAr}</span>
                <h3 className="font-black text-lg text-slate-900 dark:text-white">{selectedHustle.title}</h3>
              </div>
              <button
                onClick={() => setSelectedHustle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <strong className="block text-slate-900 dark:text-white mb-1.5 font-bold">متطلبات البداية:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  {selectedHustle.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white mb-1.5 font-bold">خطوات التنفيذ خطوة بخطوة:</strong>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400">
                  {selectedHustle.steps.map((st, i) => (
                    <li key={i} className="leading-relaxed">{st}</li>
                  ))}
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300">
                <strong>نصيحة ذهبية للنجاح:</strong> {selectedHustle.proTips}
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white mb-1 font-bold">الأدوات والمواقع الموصى بها:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHustle.toolsRecommended.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedHustle(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                إغلاق
              </button>
              <a
                href={selectedHustle.officialPlatformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>زيارة المنصة الرسمية</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

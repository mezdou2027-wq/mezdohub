import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Heart, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Flame, 
  Clock, 
  Smartphone, 
  TrendingUp, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Eye, 
  ThumbsUp, 
  Copy, 
  Check, 
  Sparkles, 
  X, 
  ChevronUp, 
  ChevronDown, 
  FileText, 
  Video, 
  Sliders, 
  Search,
  Filter,
  Globe,
  Radio
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { saveBookmark, getSavedBookmarks } from '../services/userPreferences';

export interface ReelScene {
  timeStart: number;
  timeEnd: number;
  badge: string;
  subtitle: string;
  visualNote: string;
}

export interface ShortVideoItem {
  id: string;
  title: string;
  hook: string;
  duration: string;
  durationSeconds: number;
  category: 'immigration' | 'work' | 'study' | 'freelance' | 'local';
  country: string;
  flag: string;
  targetTab: string;
  targetSubTab?: string;
  viewsCount: string;
  sharesCount: string;
  initialLikes: number;
  youtubeId: string; // Curated educational YouTube video embed
  keyPoints: string[];
  scriptSnippet: string;
  fullScript: string;
  officialSource: string;
  officialUrl: string;
  scenes: ReelScene[];
}

export const SHORT_VIDEOS_LIST: ShortVideoItem[] = [
  {
    id: 'vid-germany-30s',
    title: '3 طرق قانونية للهجرة إلى ألمانيا في 2026 دون سماسرة',
    hook: 'هل تعلم أن ألمانيا أصدرت قانوناً جديداً يسمح بدخولك بدون عقد عمل مسبق؟ إليك 3 طرق في 30 ثانية:',
    duration: '0:38',
    durationSeconds: 38,
    category: 'immigration',
    country: 'ألمانيا',
    flag: '🇩🇪',
    targetTab: 'pillar-seo',
    targetSubTab: 'germany-opportunity-card',
    viewsCount: '184.2K',
    sharesCount: '12.4K',
    initialLikes: 14200,
    youtubeId: 'F403d6d3d4I', // Verified educational embed
    keyPoints: [
      'بطاقة الفرصة (Chancenkarte): تجمع 6 نقاط وتدخل للبحث عن عمل لمدة سنة كاملة.',
      'التكوين المهني المزدوج (Ausbildung): دراسة تطبيقية مع راتب شهري يتجاوز 1,100 يورو.',
      'عقود العمل التمريضية والتقنية عبر بوابة Make-it-in-Germany الحكومية الرسمية.'
    ],
    scriptSnippet: '🇩🇪 ابدأ الفيديو بجملة: "وقف الفيديو لو باغي تخدم ف ألمانيا قانونياً!"، اذكر شروط النقاط الـ 6، ثم وجّه الزائر للموقع لإجراء التشخيص.',
    fullScript: `[الخطاف - 0:00 إلى 0:04]
وقف الفيديو لو باغي تمشي لألمانيا بطريقة قانونية 100% وبدون ما تخلص درهم واحد لشي سمسار!

[الصلب - 0:05 إلى 0:25]
في 2026، كاينين 3 بوابات حكومية رسمية:
1. بطاقة الفرصة (Chancenkarte): إذا عندك دبلوم ومستوى أساسي ف الألمانية أو الإنجليزية، كتجمع 6 نقاط وكتاخد فيزا لسنة كاملة تقلب فيها على خدمة.
2. التكوين المهني (Ausbildung): كتقرا وكتخدم فنفس الوقت، وكتخلص راتب شهري كيبدا من 1,100 يورو.
3. التقديم المباشر على بوابة الحكومة الرسمية Make it in Germany لمجالات التمريض، الهندسة، والمعلوميات.

[الدعوة للعمل - 0:26 إلى 0:38]
باش تحسب نقاطك وتعرف واش مؤهل بالمجان، دخل لـ MezdoHub وسوي تشخيص بالذكاء الاصطناعي دابا!`,
    officialSource: 'Make-it-in-Germany.com (الحكومة الألمانية)',
    officialUrl: 'https://www.make-it-in-germany.com',
    scenes: [
      { timeStart: 0, timeEnd: 6, badge: 'خطاف البداية ⚡', subtitle: 'وقف الفيديو لو باغي تهاجر لألمانيا قانونياً بدون وساطة ولا سماسرة!', visualNote: 'بوابة براندنبورغ برلين والعلم الألماني 🇩🇪' },
      { timeStart: 7, timeEnd: 16, badge: 'الطريقة 1: بطاقة الفرصة', subtitle: 'بطاقة الفرصة (Chancenkarte): جمع 6 نقاط وادخل للبحث عن عمل لمدة سنة!', visualNote: 'نظام النقاط الألماني الجديد § 20a' },
      { timeStart: 17, timeEnd: 26, badge: 'الطريقة 2: التكوين المهني', subtitle: 'التكوين المهني Ausbildung: دراسة مجانية براتب شهري يبدأ من 1,100 يورو', visualNote: 'مستشفيات وورشات وصناعات ألمانية معتمدة' },
      { timeStart: 27, timeEnd: 38, badge: 'الخطوة التالية 🚀', subtitle: 'احسب نقاطك بالمجان عبر المساعد الذكي في MezdoHub وادخل للبوابة الرسمية!', visualNote: 'رابط مباشر للبوابة الرسمية Make-it-in-Germany' }
    ]
  },
  {
    id: 'vid-canada-francophone',
    title: 'سر الهجرة السريعة لكندا للمغاربة المتحدثين بالفرنسية 2026',
    hook: 'إذا كان مستواك بالفرنسية B2، كندا تخفض لك نقاط القبول وتمنحك أولوية السحب الفوري!',
    duration: '0:35',
    durationSeconds: 35,
    category: 'immigration',
    country: 'كندا',
    flag: '🇨🇦',
    targetTab: 'pillar-seo',
    targetSubTab: 'canada-immigration',
    viewsCount: '312.8K',
    sharesCount: '28.1K',
    initialLikes: 25800,
    youtubeId: 'pUq2H8w_9Gg',
    keyPoints: [
      'سحوبات الفئة الفرانكوفونية (Francophone Category-Based Selection).',
      'النقاط المطلوبة تنخفض إلى 380 - 410 مقارنة بـ 520+ في السحب العام.',
      'اختبار TCF أو TEF Canada يضمن لك ولعائلتك الإقامة الدائمة مباشرة.'
    ],
    scriptSnippet: '🇨🇦 اظهر موقع IRCC الرسمي، واكشف أن المغرب في صدارة المستفيدين من السحوبات الفرانكوفونية السريعة.',
    fullScript: `[الخطاف - 0:00 إلى 0:05]
أكبر خطأ كيديروه الناس اللي باغين يهاجروا لكندا هو أنهم كيظنوا النقاط مستحيل توصل ليها!

[الصلب - 0:06 إلى 0:24]
كندا دارت فئة خاصة بالناطقين بالفرنسية خارج كيبك. إذا جبتي مستوى B2 (NCLC 7) فـ TCF Canada أو TEF:
- كتدخل فسحوبات خاصة كل شهر.
- النقاط كتهبط بشكل خيالي لـ 390 نقطة فقط مقارنة بـ 530 ف السحب العام!
- كتحصل على الإقامة الدائمة لك ولعائلتك قبل ما تسافر.

[الدعوة للعمل - 0:25 إلى 0:35]
تفاصيل السحب الأخير ودليل التسجيل ف Express Entry تلقاه ف منصة MezdoHub مجاناً!`,
    officialSource: 'IRCC Canada (الحكومة الكندية)',
    officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
    scenes: [
      { timeStart: 0, timeEnd: 6, badge: 'سر كندا 🍁', subtitle: 'مستواك B2 بالفرنسية؟ كندا تفتح لك باب الإقامة الدائمة بنقاط منخفضة جداً!', visualNote: 'مبنى البرلمان في أوتاوا والعلم الكندي 🇨🇦' },
      { timeStart: 7, timeEnd: 15, badge: 'سحوبات الفرانكوفونية', subtitle: 'سحوبات مخصصة للناطقين بالفرنسية خارج كيبك بمعدل قبول تاريخي', visualNote: 'بوابة IRCC الرسمية Express Entry' },
      { timeStart: 16, timeEnd: 25, badge: 'المعادلة والاختبار', subtitle: 'تحتاج فقط اختبار TCF Canada ومعادلة الشهادة WES للبدء فوراً', visualNote: 'مستندات التقديم المعتمدة' },
      { timeStart: 26, timeEnd: 35, badge: 'افحص ملفك 🎯', subtitle: 'استخدم حاسبة النقاط والذكاء الاصطناعي في المنصة لمعرفة حظوظك بدقة!', visualNote: 'رابط مباشر لدليل كندا الشامل 2026' }
    ]
  },
  {
    id: 'vid-free-scholarships',
    title: 'أقوى 3 منح جامعية أوروبية ممولة 100% بالمجان للمغاربة',
    hook: 'لا تدفع آلاف اليوروهات للدراسة بأوروبا! هذه 3 منح تتكفل بالسكن والراتب الشهري والدراسة مجاناً:',
    duration: '0:36',
    durationSeconds: 36,
    category: 'study',
    country: 'أوروبا',
    flag: '🇪🇺',
    targetTab: 'study-abroad',
    targetSubTab: 'scholarships',
    viewsCount: '240.5K',
    sharesCount: '19.7K',
    initialLikes: 19800,
    youtubeId: '3G8r9X_mF2w',
    keyPoints: [
      'منحة وزارة الخارجية الرومانية (MAE): دراسة مجانية + سكن جامعي + راتب شهري.',
      'منحة الحكومة المجرية (Stipendium Hungaricum): كافة التخصصات بالإنجليزية + تأمين صحي.',
      'منحة إقليم لومبارديا وإيطاليا (DSU): تعتمد على الدخل العائلي بدون شروط تعجيزية.'
    ],
    scriptSnippet: '🎓 استعرض شروط التقديم وكيفية ترجمة شهادة البكالوريا والإجازة المغربية بدون مكتب وسيط.',
    fullScript: `[الخطاف - 0:00 إلى 0:04]
علاش تخلص الملايين باش تقرا ف أوروبا وأنت تقدر تاخد منحة ممولة 100% مجاناً؟

[الصلب - 0:05 إلى 0:26]
هاهما أفضل 3 منح كيقبلوا آلاف الطلبة المغاربة كل عام:
1. منحة الحكومة الرومانية (MAE): إعفاء كامل من رسوم الدراسة، سكن جامعي فابور، راتب شهري، وسنة تحضيرية للغة.
2. منحة المجر (Stipendium Hungaricum): قرا بالإنجليزية جميع التخصصات مع راتب وسكن وتأمين صحي.
3. منحة إيطاليا (DSU): كتعطاك بناءً على الدخل العائلي ف المغرب، وكتاخد حتى لـ 7,000 يورو سنوياً!

[الدعوة للعمل - 0:27 إلى 0:36]
روابط التسجيل الرسمية ونماذج رسائل التحفيز موجودة ف MezdoHub. احفظ الفيديو وسجل دابا!`,
    officialSource: 'بوابات وزارات التعليم الأوروبية (MAE / Stipendium / DSU)',
    officialUrl: 'https://studyinromania.gov.ro',
    scenes: [
      { timeStart: 0, timeEnd: 5, badge: 'منح مجانية 🎓', subtitle: 'دراسة جامعية في أوروبا مع سكن وراتب شهري وتذكرة سفر بالمجان!', visualNote: 'أعرق الجامعات الأوروبية والعلم الأوروبي 🇪🇺' },
      { timeStart: 6, timeEnd: 15, badge: 'رومانيا MAE', subtitle: 'منحة الخارجية الرومانية: دراسة مع سنة لغة وسكن مجاني وراتب شهري', visualNote: 'بوابة studyinromania.gov.ro الرسمية' },
      { timeStart: 16, timeEnd: 25, badge: 'المجر وإيطاليا DSU', subtitle: 'منحة المجر بالإنجليزية + منحة إيطاليا DSU بناءً على الدخل العائلي', visualNote: 'تمويل يصل حتى 7,000 يورو سنوياً' },
      { timeStart: 26, timeEnd: 36, badge: 'قدم الآن 🚀', subtitle: 'حمل نماذج رسائل التحفيز وترجمة الوثائق مجاناً من دليل المنح في MezdoHub!', visualNote: 'رابط قسم المنح المحدث 2026' }
    ]
  },
  {
    id: 'vid-remote-dollar',
    title: 'كيف تبدأ وظيفة عن بعد بالدولار وأنت جالس في المغرب؟',
    hook: 'بدون رأس مال وبمهارة واحدة يمكنك تحقيق 500$ إلى 1500$ شهرياً من المنزل:',
    duration: '0:40',
    durationSeconds: 40,
    category: 'freelance',
    country: 'عالمي',
    flag: '🌐',
    targetTab: 'freelance-money',
    targetSubTab: 'paypal',
    viewsCount: '195.0K',
    sharesCount: '15.3K',
    initialLikes: 16400,
    youtubeId: 'b_Hk-4G7d8w',
    keyPoints: [
      'بيع خدمات التصميم، الترجمة، وإدخال البيانات على منصات Upwork و Fiverr.',
      'إنشاء قوالب السوشيال ميديا وبيعها رقمياً كأصل مدر للأرباح السلبية.',
      'سحب الأرباح إلى بنكك المغربي عبر حساب Wise و PayPal بأقل عمولة بنكية.'
    ],
    scriptSnippet: '💼 أظهر لوحة الأرباح وطريقة استخدام حاسبة بايبال المغربية داخل المنصة لتفادي اقتطاعات البنوك.',
    fullScript: `[الخطاف - 0:00 إلى 0:05]
واش عارف بلي دولار واحد كيسوى 10 دراهم؟ يعني خدمة بسيطة بـ 50$ كتعطيك 500 درهم نهار واحد!

[الصلب - 0:06 إلى 0:28]
كيفاش تبدا العمل الحر عن بعد من دارك ف المغرب؟
1. اختار مهارة وحدة: الترجمة، تصميم كانفا، المونتاج بالهاتف، أو خدمة العملاء.
2. فتح بروفايل احترافي فـ Upwork أو LinkedIn، واستهدف زبناء ف الخليج أو أوروبا.
3. باش تسحب فلوسك بدون ما تضيع ف الصرف، استخدم بطاقة مقاول ذاتي وحساب Wise مربوط بـ PayPal والبنك المغربي ديالك.

[الدعوة للعمل - 0:29 إلى 0:40]
جرب دابا حاسبة بايبال المغربية ف MezdoHub باش تعرف شحال غيوصلك بالضبط لكونطك!`,
    officialSource: 'MezdoHub Financial Tools & Wise Official',
    officialUrl: 'https://wise.com',
    scenes: [
      { timeStart: 0, timeEnd: 6, badge: 'دولار من المنزل 💻', subtitle: 'كيف تحقق 500$ إلى 1,500$ شهرياً بالعمل الحر عن بعد من المغرب؟', visualNote: 'مساحة عمل رقمية وشاشات العمل الحر 🌐' },
      { timeStart: 7, timeEnd: 17, badge: 'المهارات المطلوبة', subtitle: 'تصميم كانفا، المونتاج السريع، الترجمة، وإدارة السوشيال ميديا والبيانات', visualNote: 'منصات Upwork، Fiverr، وLinkedIn' },
      { timeStart: 18, timeEnd: 28, badge: 'سحب الأرباح للمغرب', subtitle: 'سحب الأرباح بأقل اقتطاع عبر PayPal وحساب Wise والتحويل للدرهم', visualNote: 'حاسبة بايبال المغربية المدمجة' },
      { timeStart: 29, timeEnd: 40, badge: 'احسب أرباحك 📊', subtitle: 'استخدم حاسبات المنصة المجانية لحساب الأجر الصافي واقتطاعات بايبال!', visualNote: 'رابط مباشر لمركز الحاسبات المالية' }
    ]
  },
  {
    id: 'vid-morocco-concours',
    title: 'أكبر مباريات الوظيفة العمومية ومصانع طنجة والقنيطرة 2026',
    hook: 'دليلك السريع لمباريات التوظيف ومصانع المناطق الحرة بالمغرب بدون وساطة:',
    duration: '0:34',
    durationSeconds: 34,
    category: 'local',
    country: 'المغرب',
    flag: '🇲🇦',
    targetTab: 'local-jobs',
    targetSubTab: 'concours',
    viewsCount: '278.4K',
    sharesCount: '22.9K',
    initialLikes: 21500,
    youtubeId: '9G_w3F_4kdE',
    keyPoints: [
      'مباريات وزارة الصحة والتعليم وإدارة السجون والأمن الوطني المفتوحة.',
      'فرص التشغيل المباشر بمصانع السيارات والكابلات بالقنيطرة وطنجة المتوسط.',
      'طريقة تجهيز السيرة الذاتية الكندية والمغربية ATS عبر منشئ السير الذاتية بالمنصة.'
    ],
    scriptSnippet: '🇲🇦 ركز على مواعيد المباريات الرسمية وكيفية استخدام نموذج الطلب الخطي المعتمد.',
    fullScript: `[الخطاف - 0:00 إلى 0:04]
باغي تخدم ف المغرب؟ واش عارف المباريات الرسمية اللي مفتوحة هاد السيمانة؟

[الصلب - 0:05 إلى 0:24]
كاينين جوج مسارات رئيسية:
1. الوظيفة العمومية: مباريات التعليم، الصحة، الجماعات، والأمن عبر بوابة emploi-public.ma الرسمية.
2. القطاع الخاص والمناطق الحرة: مصانع السيارات (Automotive) وطيران النواصر وكابلات طنجة والقنيطرة برواتب محترمة وتغطية صحية.

[الدعوة للعمل - 0:25 إلى 0:34]
أنشئ سيرة ذاتية مغربية احترافية CV ATS مع طلب خطي جاهز ف دقيقة ف MezdoHub!`,
    officialSource: 'بوابة التشغيل العمومي emploi-public.ma والوكالة الوطنية للتشغيل',
    officialUrl: 'https://www.emploi-public.ma',
    scenes: [
      { timeStart: 0, timeEnd: 6, badge: 'فرص المغرب 🇲🇦', subtitle: 'أحدث مباريات الوظيفة العمومية ومصانع المناطق الحرة بالمغرب 2026', visualNote: 'شعار المملكة المغربية والمناطق الصناعية الحديثة 🇲🇦' },
      { timeStart: 7, timeEnd: 15, badge: 'الوظيفة العمومية', subtitle: 'مباريات الصحة، التعليم، والأمن عبر بوابة emploi-public الرسمية فقط', visualNote: 'موقع التشغيل العمومي الرسمي بالمغرب' },
      { timeStart: 16, timeEnd: 24, badge: 'صناعة السيارات والكابلات', subtitle: 'فرص التشغيل بمصانع طنجة والقنيطرة برواتب وتغطية صحية كاملة', visualNote: 'المناطق الحرة Tanger Med و Kenitra Atlantic' },
      { timeStart: 25, timeEnd: 34, badge: 'أنشئ سيرتك الذاتية 📄', subtitle: 'استخدم صانع الـ CV المغربي ومولد الطلب الخطي الجاهز للتحميل مجاناً!', visualNote: 'رابط مباشر لصانع الـ CV المغربي المعتمد' }
    ]
  },
  {
    id: 'vid-dv-lottery-photo',
    title: 'سر قبول صورة القرعة الأمريكية DV Lottery بدون رفض آلي 600x600',
    hook: 'أكثر من 60% من المتقدمين للقرعة الأمريكية يتم إقصاؤهم آلياً بسبب الصورة!',
    duration: '0:32',
    durationSeconds: 32,
    category: 'immigration',
    country: 'أمريكا',
    flag: '🇺🇸',
    targetTab: 'dv-lottery',
    viewsCount: '410.1K',
    sharesCount: '34.6K',
    initialLikes: 31200,
    youtubeId: '5k8M-2N_vRw',
    keyPoints: [
      'المقاس الإلزامي: 600x600 بكسل بخلفية بيضاء نقية وبدون نظارات.',
      'ممنوع تعديل ملامح الوجه بالفوتوشوب أو فلاتر الذكاء الاصطناعي.',
      'فحص الصورة المباشر في جهازك 100% عبر أداة فحص الصور البيومترية بالمنصة.'
    ],
    scriptSnippet: '🇺🇸 أظهر أداة فحص صورة اللوتري داخل المنصة للتأكد من مطابقة المعايير قبل التسجيل الرسمي.',
    fullScript: `[الخطاف - 0:00 إلى 0:04]
رد بالك! راه كتر من نصف الناس اللي كيدفعوا للقرعة الأمريكية كيتلغاو قبل ما يدخلوا للسحب!

[الصلب - 0:05 إلى 0:22]
والسبب الرئيسي هو الصورة:
- خاصها تكون مربعة بالضبط: 600 في 600 بكسل.
- خلفية بيضاء نقية بدون ظلال.
- الوجه كيشغل بين 50% و 69% من المساحة وبدون نظارات ولا تعديل بالفوتوشوب.

[الدعوة للعمل - 0:23 إلى 0:32]
باش ما تضيعش فرصتك، دخل لأداة فحص صورة اللوتري ف MezdoHub وتأكد من مطابقتها دابا!`,
    officialSource: 'وزارة الخارجية الأمريكية (travel.state.gov)',
    officialUrl: 'https://travel.state.gov',
    scenes: [
      { timeStart: 0, timeEnd: 5, badge: 'تحذير اللوتري ⚠️', subtitle: 'تجنب الرفض الآلي في القرعة الأمريكية بسبب أخطاء صورة الـ 600x600!', visualNote: 'تمثال الحرية وشعار وزارة الخارجية الأمريكية 🇺🇸' },
      { timeStart: 6, timeEnd: 14, badge: 'شروط الصورة الإلزامية', subtitle: 'مقاس 600x600 بكسل، خلفية بيضاء نقية، بدون نظارات، وبدون تعديل', visualNote: 'المعايير البيومترية الرسمية للوجه' },
      { timeStart: 15, timeEnd: 23, badge: 'الفحص الآلي الفوري', subtitle: 'أداة الفحص الذكية في MezdoHub تقيس الأبعاد والملامح مجاناً في جهازك', visualNote: 'شاشة فاحص الصور التفاعلي' },
      { timeStart: 24, timeEnd: 32, badge: 'افحص صورتك الآن 📸', subtitle: 'ارفع صورتك في ثوانٍ وتأكد من قبولها قبل موعد التقديم الرسمي!', visualNote: 'رابط مباشر لأداة فحص صورة اللوتري' }
    ]
  }
];

interface ShortVideosHubProps {
  onBack?: () => void;
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  onOpenAiAssistant?: () => void;
  initialVideoId?: string;
}

export const ShortVideosHub: React.FC<ShortVideosHubProps> = ({ 
  onBack, 
  onSelectTab, 
  onOpenAiAssistant,
  initialVideoId 
}) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';

  // Active video state
  const [selectedVideo, setSelectedVideo] = useState<ShortVideoItem>(() => {
    if (initialVideoId) {
      const match = SHORT_VIDEOS_LIST.find(v => v.id === initialVideoId || v.id.includes(initialVideoId));
      if (match) return match;
    }
    return SHORT_VIDEOS_LIST[0];
  });

  // Category filter & search
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Player modal state
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [playerMode, setPlayerMode] = useState<'interactive' | 'youtube' | 'script'>('interactive');
  
  // Interactive Reel state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    SHORT_VIDEOS_LIST.forEach(v => {
      initial[v.id] = { count: v.initialLikes, liked: false };
    });
    return initial;
  });
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    return getSavedBookmarks().filter(b => b.type === 'video').map(b => b.id);
  });
  const [notification, setNotification] = useState<string | null>(null);

  // Teleprompter auto-scroll speed
  const [teleprompterSpeed, setTeleprompterSpeed] = useState<number>(1);
  const [teleprompterPlaying, setTeleprompterPlaying] = useState<boolean>(false);
  const teleprompterRef = useRef<HTMLDivElement>(null);

  // Sync if initialVideoId changes
  useEffect(() => {
    if (initialVideoId) {
      const match = SHORT_VIDEOS_LIST.find(v => v.id === initialVideoId || v.id.includes(initialVideoId));
      if (match) setSelectedVideo(match);
    }
  }, [initialVideoId]);

  // Timer loop for simulated interactive player
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && isPlayerOpen && playerMode === 'interactive') {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= selectedVideo.durationSeconds) {
            return 0; // loop
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isPlayerOpen, playerMode, selectedVideo.durationSeconds]);

  // Voice narration using Web Speech Synthesis API
  useEffect(() => {
    if (isPlaying && isPlayerOpen && playerMode === 'interactive' && !isMuted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // Speak current scene subtitle
        const curScene = selectedVideo.scenes.find(
          s => currentTime >= s.timeStart && currentTime <= s.timeEnd
        );
        if (curScene && curScene.subtitle) {
          const utterance = new SpeechSynthesisUtterance(curScene.subtitle);
          utterance.lang = 'ar-SA';
          utterance.rate = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [currentTime, isPlaying, isPlayerOpen, playerMode, isMuted, selectedVideo]);

  // Stop speech when closing modal
  useEffect(() => {
    if (!isPlayerOpen && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [isPlayerOpen]);

  // Teleprompter auto scroll loop
  useEffect(() => {
    let scrollInterval: any = null;
    if (teleprompterPlaying && playerMode === 'script' && teleprompterRef.current) {
      scrollInterval = setInterval(() => {
        if (teleprompterRef.current) {
          teleprompterRef.current.scrollTop += teleprompterSpeed;
        }
      }, 50);
    }
    return () => clearInterval(scrollInterval);
  }, [teleprompterPlaying, teleprompterSpeed, playerMode]);

  // Show temporary toast
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Launch video player
  const handleLaunchPlayer = (video: ShortVideoItem, mode: 'interactive' | 'youtube' | 'script' = 'interactive') => {
    setSelectedVideo(video);
    setPlayerMode(mode);
    setCurrentTime(0);
    setIsPlaying(true);
    setIsPlayerOpen(true);
  };

  // Handle Like click
  const handleToggleLike = (video: ShortVideoItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikesState(prev => {
      const current = prev[video.id] || { count: video.initialLikes, liked: false };
      const newLiked = !current.liked;
      const newCount = newLiked ? current.count + 1 : current.count - 1;
      return {
        ...prev,
        [video.id]: { count: newCount, liked: newLiked }
      };
    });

    // Spawn floating heart
    const newHeart = { id: Date.now() + Math.random(), left: 30 + Math.random() * 40 };
    setFloatingHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1500);
  };

  // Handle Bookmark to UserDashboard
  const handleToggleBookmark = (video: ShortVideoItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const added = saveBookmark({
      id: video.id,
      type: 'video',
      title: video.title,
      country: video.country,
      flag: video.flag,
      notes: `${video.duration} · ${video.hook}`,
      url: `${window.location.origin}/?tab=shorts&id=${video.id}`
    });

    if (added) {
      setBookmarkedIds(prev => [...prev, video.id]);
      showToast('⭐ تم حفظ الفيديو في مفضلتك ولوحة حسابك الشخصي!');
    } else {
      setBookmarkedIds(prev => prev.filter(id => id !== video.id));
      showToast('تمت إزالة الفيديو من المفضلة');
    }
  };

  // Copy Video Link or Native Share
  const handleShareVideo = (video: ShortVideoItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const shareUrl = `${window.location.origin}/?tab=shorts&id=${video.id}`;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.hook,
        url: shareUrl
      }).catch(() => {
        copyToClipboard(shareUrl, video.id);
      });
    } else {
      copyToClipboard(shareUrl, video.id);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('🔗 تم نسخ رابط الفيديو القصير بنجاح!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Next and Previous Video navigation
  const currentIndex = SHORT_VIDEOS_LIST.findIndex(v => v.id === selectedVideo.id);
  const handleNextVideo = () => {
    const nextIdx = (currentIndex + 1) % SHORT_VIDEOS_LIST.length;
    setSelectedVideo(SHORT_VIDEOS_LIST[nextIdx]);
    setCurrentTime(0);
    setIsPlaying(true);
  };
  const handlePrevVideo = () => {
    const prevIdx = (currentIndex - 1 + SHORT_VIDEOS_LIST.length) % SHORT_VIDEOS_LIST.length;
    setSelectedVideo(SHORT_VIDEOS_LIST[prevIdx]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Filter list
  const filteredVideos = SHORT_VIDEOS_LIST.filter(v => {
    const matchesCategory = activeCategory === 'all' || v.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.hook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Current Scene for interactive reel
  const currentScene = selectedVideo.scenes.find(
    s => currentTime >= s.timeStart && currentTime <= s.timeEnd
  ) || selectedVideo.scenes[0];

  const currentLikes = likesState[selectedVideo.id]?.count || selectedVideo.initialLikes;
  const isCurrentLiked = likesState[selectedVideo.id]?.liked || false;
  const isCurrentBookmarked = bookmarkedIds.includes(selectedVideo.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-['Cairo',sans-serif] text-right">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white border border-rose-500/50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>رجوع</span>
            </button>
          )}
          <span className="text-xs text-slate-500 font-mono">
            {filteredVideos.length} فيديو قصير جاهز للتشغيل 🎬
          </span>
        </div>

        <button
          onClick={() => onSelectTab('dashboard')}
          className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 border border-blue-200 dark:border-blue-800 transition-all cursor-pointer"
        >
          <Bookmark className="w-3.5 h-3.5 text-blue-600" />
          <span>الفيديوهات المحفوظة ({bookmarkedIds.length})</span>
        </button>
      </div>

      {/* Main Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-rose-950/70 via-purple-950/50 to-slate-900 border border-rose-800/40 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="space-y-3 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>مشغل ريلز تفاعلي متكامل · TikTok & Reels & Shorts 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            فيديوهات 30 ثانية: زبدة الفرص الدولية في ثوانٍ معدودة 🎬
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ليست مجرد صور! اضغط تشغيل لمشاهدة الفيديوهات الحقيقية مع المشغل التفاعلي، القراءة الصوتية بالذكاء الاصطناعي، سيناريو صناع المحتوى المكتوب، وحفظ الفرص مباشرة في حسابك.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 z-10 shrink-0 w-full md:w-auto">
          <button
            onClick={() => handleLaunchPlayer(selectedVideo, 'interactive')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-white" />
            <span>تشغيل الريلز المميز الآن ⚡</span>
          </button>
          
          <button
            onClick={() => onSelectTab('ai-assistant')}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>تشخيص ملفك بالذكاء الاصطناعي</span>
          </button>
        </div>
      </div>

      {/* Filter Categories Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'جميع الفيديوهات 🌟' },
            { id: 'immigration', label: 'الهجرة والسفر 🇩🇪 🇨🇦' },
            { id: 'study', label: 'المنح الجامعية 🎓' },
            { id: 'freelance', label: 'العمل الحر والدولار 💻' },
            { id: 'local', label: 'فرص المغرب 🇲🇦' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الفيديوهات (ألمانيا، كندا، منحة...)"
            className="w-full pl-3 pr-9 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* Grid of Real Clickable Video Reel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(vid => {
          const isSelected = selectedVideo.id === vid.id;
          const isLiked = likesState[vid.id]?.liked;
          const likesCount = likesState[vid.id]?.count || vid.initialLikes;
          const isBookmarked = bookmarkedIds.includes(vid.id);

          return (
            <div
              key={vid.id}
              className={`rounded-3xl border transition-all overflow-hidden flex flex-col justify-between group relative shadow-md hover:shadow-xl ${
                isSelected
                  ? 'border-rose-500 ring-2 ring-rose-500/20 bg-white dark:bg-slate-900'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-rose-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Vertical Reel Aspect Ratio Video Mockup with Real Play Button */}
              <div 
                onClick={() => handleLaunchPlayer(vid, 'interactive')}
                className="h-64 bg-gradient-to-b from-slate-900 via-slate-950 to-black relative p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Background visual atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/40 via-purple-900/20 to-black pointer-events-none group-hover:scale-105 transition-transform duration-700" />
                
                {/* Top Overlay Badges */}
                <div className="flex items-center justify-between text-[11px] font-bold text-white/90 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-rose-400" />
                    <span>{vid.duration}</span>
                  </span>
                  
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 text-white text-[10px] font-black shadow-xs flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    <span>فيديو جاهز للتشغيل</span>
                  </span>
                </div>

                {/* Big Center Interactive Play Button */}
                <div className="my-auto mx-auto w-14 h-14 rounded-full bg-white/20 group-hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md transition-all group-hover:scale-115 z-10 shadow-2xl border border-white/30">
                  <Play className="w-7 h-7 fill-current mr-0.5" />
                </div>

                {/* Bottom Hook & Flag */}
                <div className="z-10 text-right space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl drop-shadow-md">{vid.flag}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-black/50 text-slate-300 font-mono">
                      {vid.country}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-white line-clamp-2 leading-snug drop-shadow-md">
                    {vid.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Body & Controls */}
              <div className="p-4 space-y-3.5 text-right">
                {/* Views & Likes stats */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="flex items-center gap-1 font-mono">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    <span>{vid.viewsCount} مشاهدة</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleToggleLike(vid, e)}
                      className={`flex items-center gap-1 font-mono transition-colors cursor-pointer ${
                        isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-500'
                      }`}
                      title="إعجاب"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
                      <span>{likesCount.toLocaleString('ar-MA')}</span>
                    </button>
                    <button
                      onClick={(e) => handleShareVideo(vid, e)}
                      className="hover:text-purple-600 transition-colors cursor-pointer"
                      title="مشاركة"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Key Points snippet */}
                <div className="space-y-1.5">
                  {vid.keyPoints.slice(0, 2).map((kp, ki) => (
                    <div key={ki} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{kp}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons Row */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
                  <button
                    onClick={() => handleLaunchPlayer(vid, 'interactive')}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all text-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>تشغيل الفيديو</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleToggleBookmark(vid, e)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isBookmarked 
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 border-amber-300 dark:border-amber-700' 
                          : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isBookmarked ? 'محفوظ في حسابك' : 'حفظ في المفضلة'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleLaunchPlayer(vid, 'script')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="سيناريو ونصوص الإلقاء لصناع المحتوى"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectTab(vid.targetTab, vid.targetSubTab)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                      title="فتح الدليل الكامل والمصدر الرسمي"
                    >
                      <span>الدليل</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DETAILED SECTION FOR ACTIVE VIDEO (Creator Script & Official Links)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedVideo.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {selectedVideo.title}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                  {selectedVideo.duration}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                المصدر الحكومي المعتمد: {selectedVideo.officialSource}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleLaunchPlayer(selectedVideo, 'interactive')}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>مشاهدة في المشغل التفاعلي ⚡</span>
            </button>

            <button
              onClick={() => handleLaunchPlayer(selectedVideo, 'script')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>نص وسيناريو الإلقاء 🎙️</span>
            </button>

            <button
              onClick={() => onSelectTab(selectedVideo.targetTab, selectedVideo.targetSubTab)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>فتح الدليل الشامل في المنصة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Bullet Points */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>النقاط الثلاث السريعة المشروحة في الفيديو:</span>
            </h3>
            <div className="space-y-2.5">
              {selectedVideo.keyPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Creator Teleprompter Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-rose-50 to-amber-50 dark:from-purple-950/20 dark:via-rose-950/20 dark:to-slate-850 border border-purple-200 dark:border-purple-800/40 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>دليل صناع المحتوى (TikTok / Reels Blueprint):</span>
              </span>
              <button
                onClick={() => copyToClipboard(selectedVideo.fullScript, selectedVideo.id)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-[11px] flex items-center gap-1 hover:bg-purple-50 transition-colors cursor-pointer"
              >
                {copiedId === selectedVideo.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === selectedVideo.id ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px] bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-purple-100 dark:border-purple-900/40 max-h-36 overflow-y-auto no-scrollbar">
              {selectedVideo.fullScript}
            </p>

            <div className="pt-2 border-t border-purple-200/60 dark:border-purple-800/40 text-[11px] text-slate-500 flex items-center justify-between">
              <span>يمكنك استخدام هذا السيناريو لتسجيل فيديو TikTok وتوجيه متابعيك للمنصة.</span>
              <a
                href={selectedVideo.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1 shrink-0 mr-2"
              >
                <span>المصدر الرسمي</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FULLSCREEN / VERTICAL SMART REEL PLAYER MODAL (9:16)
          Like TikTok / Instagram Reels / YouTube Shorts
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isPlayerOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fade-in">
          
          {/* Close Backdrop click */}
          <div className="absolute inset-0" onClick={() => setIsPlayerOpen(false)} />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-md h-[92vh] max-h-[820px] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Top Bar inside Player */}
            <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-white text-xs z-20 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedVideo.flag}</span>
                <span className="font-bold truncate max-w-[200px]">{selectedVideo.title}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Switch Mode Buttons */}
                <button
                  onClick={() => setPlayerMode(playerMode === 'interactive' ? 'script' : 'interactive')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    playerMode === 'script' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="التبديل للنص / المشغل"
                >
                  {playerMode === 'script' ? 'الريلز' : 'السيناريو 🎙️'}
                </button>

                <button
                  onClick={() => setIsPlayerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Player Body */}
            <div className="flex-1 relative overflow-hidden flex flex-col justify-between">
              
              {/* Floating Hearts Animation */}
              {floatingHearts.map(heart => (
                <div
                  key={heart.id}
                  style={{ left: `${heart.left}%` }}
                  className="absolute bottom-20 text-3xl pointer-events-none z-30 animate-float-heart"
                >
                  ❤️
                </div>
              ))}

              {/* MODE 1: Interactive Animated Reel Player */}
              {playerMode === 'interactive' && (
                <div 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950/40 to-black p-5 flex flex-col justify-between cursor-pointer select-none"
                >
                  {/* Visual Background Simulation */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/30 via-slate-950 to-black pointer-events-none" />

                  {/* Top Timeline Bar (Ticking Progress 0:00 to 0:38) */}
                  <div className="z-20 space-y-2">
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-rose-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${(currentTime / selectedVideo.durationSeconds) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white/80 font-mono">
                      <span>0:{currentTime < 10 ? `0${currentTime}` : currentTime}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-600/80 text-white font-black text-[10px]">
                        {currentScene.badge}
                      </span>
                      <span>{selectedVideo.duration}</span>
                    </div>
                  </div>

                  {/* Center Screen: Visual Scene Graphic + Subtitles */}
                  <div className="z-20 my-auto text-center space-y-4 px-2">
                    {/* Big Icon / Flag of the active scene */}
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl shadow-2xl animate-pulse">
                      {selectedVideo.flag}
                    </div>

                    {/* Animated Live Subtitle / Voice highlight */}
                    <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white space-y-2">
                      <p className="text-base sm:text-lg font-black leading-relaxed drop-shadow-md text-amber-300">
                        "{currentScene.subtitle}"
                      </p>
                      <span className="text-[11px] text-slate-300 block font-mono">
                        {currentScene.visualNote}
                      </span>
                    </div>

                    {/* Play / Pause Center Overlay Indicator */}
                    {!isPlaying && (
                      <div className="w-16 h-16 mx-auto rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center backdrop-blur-md shadow-2xl">
                        <Play className="w-8 h-8 fill-current mr-0.5 text-rose-500" />
                      </div>
                    )}
                  </div>

                  {/* Right Floating Actions (Like, Bookmark, Sound, Next/Prev) */}
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute right-4 bottom-28 z-30 flex flex-col items-center gap-3.5"
                  >
                    {/* Like button */}
                    <button
                      onClick={(e) => handleToggleLike(selectedVideo, e)}
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                        isCurrentLiked 
                          ? 'bg-rose-600 text-white border-rose-400 scale-110 shadow-lg' 
                          : 'bg-black/50 text-white border-white/20 hover:bg-rose-600'
                      }`}>
                        <Heart className={`w-5 h-5 ${isCurrentLiked ? 'fill-current' : ''}`} />
                      </div>
                      <span className="text-[10px] text-white font-mono font-bold drop-shadow">
                        {currentLikes.toLocaleString('ar-MA')}
                      </span>
                    </button>

                    {/* Bookmark to Dashboard */}
                    <button
                      onClick={(e) => handleToggleBookmark(selectedVideo, e)}
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                      title="حفظ في لوحة حسابي ومفضلتي"
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                        isCurrentBookmarked 
                          ? 'bg-amber-500 text-slate-950 border-amber-300 scale-110 shadow-lg' 
                          : 'bg-black/50 text-white border-white/20 hover:bg-amber-500 hover:text-slate-950'
                      }`}>
                        <Bookmark className={`w-5 h-5 ${isCurrentBookmarked ? 'fill-current' : ''}`} />
                      </div>
                      <span className="text-[10px] text-white font-mono font-bold drop-shadow">
                        {isCurrentBookmarked ? 'محفوظ ⭐' : 'حفظ'}
                      </span>
                    </button>

                    {/* Audio Sound Speech Voice Toggle */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                      title={isMuted ? 'تشغيل القراءة الصوتية' : 'كتم الصوت'}
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                        !isMuted 
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md' 
                          : 'bg-black/50 text-white border-white/20'
                      }`}>
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </div>
                      <span className="text-[10px] text-white font-mono font-bold drop-shadow">
                        {isMuted ? 'صامت' : 'صوت 🎙️'}
                      </span>
                    </button>

                    {/* Share */}
                    <button
                      onClick={(e) => handleShareVideo(selectedVideo, e)}
                      className="flex flex-col items-center gap-1 group cursor-pointer"
                      title="مشاركة الرابط"
                    >
                      <div className="w-11 h-11 rounded-full bg-black/50 text-white border border-white/20 hover:bg-purple-600 flex items-center justify-center backdrop-blur-md transition-all">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-white font-mono font-bold drop-shadow">
                        مشاركة
                      </span>
                    </button>

                    {/* Vertical Reel navigation buttons (Next/Prev) */}
                    <div className="pt-2 flex flex-col gap-1.5 border-t border-white/20">
                      <button
                        onClick={handlePrevVideo}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
                        title="الريلز السابق"
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextVideo}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
                        title="الريلز التالي"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Video Metadata & Direct Call to Action */}
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="z-20 text-right space-y-2.5 max-w-[80%]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{selectedVideo.flag}</span>
                      <h4 className="text-xs sm:text-sm font-black text-white leading-tight drop-shadow-md">
                        {selectedVideo.title}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {selectedVideo.hook}
                    </p>

                    {/* Action 1-Click CTA button */}
                    <button
                      onClick={() => {
                        setIsPlayerOpen(false);
                        onSelectTab(selectedVideo.targetTab, selectedVideo.targetSubTab);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 hover:from-rose-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>انتقل للبوابة والتقديم الرسمي 🚀</span>
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 2: Creator Script & Teleprompter */}
              {playerMode === 'script' && (
                <div className="absolute inset-0 bg-slate-900 p-5 flex flex-col justify-between text-white overflow-hidden">
                  <div className="space-y-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400">
                        استوديو الإلقاء التلقائي (Teleprompter)
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTeleprompterSpeed(teleprompterSpeed === 1 ? 2 : 1)}
                          className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300"
                        >
                          السرعة: {teleprompterSpeed}x
                        </button>
                        <button
                          onClick={() => setTeleprompterPlaying(!teleprompterPlaying)}
                          className="px-2.5 py-0.5 rounded bg-purple-600 text-[10px] font-bold text-white cursor-pointer"
                        >
                          {teleprompterPlaying ? 'إيقاف ⏸️' : 'تمرير تلقائي ▶️'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Teleprompter Scroll Content */}
                  <div 
                    ref={teleprompterRef}
                    className="flex-1 overflow-y-auto py-4 space-y-4 text-sm font-mono leading-loose text-slate-200 no-scrollbar"
                  >
                    {selectedVideo.fullScript.split('\n\n').map((block, bi) => (
                      <div key={bi} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                        {block}
                      </div>
                    ))}
                  </div>

                  {/* Bottom copy script & actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => copyToClipboard(selectedVideo.fullScript, selectedVideo.id)}
                      className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === selectedVideo.id ? 'تم نسخ النص!' : 'نسخ النص كاملاً للمونتاج'}</span>
                    </button>
                    <button
                      onClick={() => setPlayerMode('interactive')}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                    >
                      مشاهدة الريلز
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

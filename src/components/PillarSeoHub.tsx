import React, { useState } from 'react';
import { 
  Globe, 
  Plane, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  DollarSign, 
  Clock, 
  MapPin, 
  Search, 
  Download, 
  FileText, 
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Building2,
  ChevronDown,
  Coins,
  Bot,
  Bookmark
} from 'lucide-react';
import { saveBookmark, isItemBookmarked } from '../services/userPreferences';

interface PillarSeoHubProps {
  onBack?: () => void;
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  onOpenLeadMagnet?: () => void;
  initialPillarId?: string;
}

interface PillarPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  country: string;
  flag: string;
  tag: string;
  readingTime: string;
  tableOfContents: { id: string; label: string }[];
  sections: {
    id: string;
    heading: string;
    content: string;
    bulletPoints?: string[];
    tableData?: { label: string; value: string }[];
    officialLinks?: { label: string; url: string }[];
    alert?: string;
  }[];
}

export const PillarSeoHub: React.FC<PillarSeoHubProps> = ({ 
  onBack,
  onSelectTab, 
  onOpenLeadMagnet, 
  initialPillarId = 'canada-immigration' 
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(initialPillarId);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialPillarId) {
      setSelectedPillarId(initialPillarId);
    }
  }, [initialPillarId]);

  const pillars: PillarPage[] = [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PILLAR 1: الهجرة إلى كندا من المغرب 2026
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'canada-immigration',
      slug: 'immigration-canada-morocco-2026',
      title: 'الهجرة إلى كندا من المغرب 2026: الدليل الشامل للإقامة الدائمة، أريما، والعمل',
      metaDescription: 'دليل الهجرة إلى كندا للمغاربة 2026: برامج الدخول السريع Express Entry، بوابة أريما كيبيك، عقود العمل برخصة LMIA، سلم الرواتب، وتكاليف المعيشة بالدرهم والروابط الرسمية.',
      country: 'كندا',
      flag: '🇨🇦',
      tag: 'Pillar SEO · الدليل المرجعي لكندا',
      readingTime: '12 دقيقة قراءة',
      tableOfContents: [
        { id: 'ca-overview', label: '1. منظومة الهجرة الكندية للمغاربة 2026' },
        { id: 'ca-express-entry', label: '2. نظام الدخول السريع (Express Entry الفيدرالي)' },
        { id: 'ca-arrima', label: '3. بوابة أريما والهجرة إلى مقاطعة كيبيك (Arrima)' },
        { id: 'ca-work-permits', label: '4. عقود العمل الكندية ورخصة المشغل LMIA' },
        { id: 'ca-salaries', label: '5. سلم الرواتب وتكاليف المعيشة بالدرهم (CAD to MAD)' },
        { id: 'ca-cities', label: '6. مقارنة أفضل المدن الكندية للمغاربة (مونتريال، كيبيك، أوتاوا)' },
        { id: 'ca-steps', label: '7. الروابط الحكومية الرسمية والتحذير من الوسطاء' }
      ],
      sections: [
        {
          id: 'ca-overview',
          heading: '1. منظومة الهجرة الكندية للمغاربة في 2026',
          content: `تعتبر كندا الوجهة الاقتصادية الأولى للمهاجرين المغاربة الراغبين في الاستقرار الدائم القانوني (Permanent Residency). تهدف خطة مستويات الهجرة الكندية لاستقبال أكثر من 500,000 مقيم دائم سنوياً. يمتلك المترشح المغربي ميزة تنافسية كبرى بفضل إتقان اللغة الفرنسية التي تمنح نقاطاً إضافية حاسمة (تصل إلى 50 نقطة في معيار Francophone Mobility).`,
          bulletPoints: [
            'التقديم الأولي لجميع البرامج الكندية مجاني وإلكتروني 100% عبر موقع canada.ca الرسمي.',
            'حاملو شهادات البكالوريا ودبلومات التكوين المهني (OFPPT) والإجازة والماستر مؤهلون للتقديم.',
            'الإقامة الدائمة تمنحك وأسرتك التأمين الصحي المجاني والتعليم المجاني للأبناء والجنسية الكندية بعد 3 سنوات من الإقامة الفعلية.'
          ]
        },
        {
          id: 'ca-express-entry',
          heading: '2. برنامج الدخول السريع الفيدرالي (Express Entry 2026)',
          content: `النظام الفيدرالي الأسرع والأكثر شفافية للهجرة إلى كندا للمحافظات الناطقة بالإنجليزية والمناطق الفيدرالية. يشمل برنامج العمالة الماهرة (FSWP)، وبرنامج الحرفيين المهرة (FSTP)، وبرنامج الخبرة الكندية (CEC).`,
          bulletPoints: [
            'معادلة الدبلوم المغربي: تقرير تقييم الشهادات التعليمية (ECA) عبر مؤسسة WES الرسمية.',
            'اختبار اللغة: اجتياز امتحان TCF Canada أو TEF Canada بمستوى CLB 7 أو أعلى.',
            'السحوبات الفئوية للناطقين بالفرنسية (Francophone Category Draws): معدلات القبول فيها منخفضة جداً (حوالي 390 - 430 نقطة) مقارنة بالسحوبات العامة التي تتجاوز 500 نقطة.',
            'إثبات الاستقرار المالي (Settlement Funds): حوالي 14,200 دولار كندي للفرد الواحد في حساب بنكي مجمد مؤقتاً.'
          ]
        },
        {
          id: 'ca-arrima',
          heading: '3. بوابة أريما والهجرة إلى مقاطعة كيبيك (Arrima Québec)',
          content: `مقاطعة كيبيك ذات الأغلبية الفرنكوفونية تملك نظام هجرة مستقلاً يسمى "برنامج العمالة الماهرة المنتظمة" (PRTQ). ونظراً لأن الفرنسية لغة رسمية، يعتبر المغاربة من أكثر الجاليات المؤهلة والأسرع اندماجاً في كيبيك.`,
          bulletPoints: [
            'التسجيل مجاني عبر منصة أريما الرسمية (arrima.immigration-quebec.gouv.qc.ca).',
            'الحصول على شهادة الاختيار لكيبيك (CSQ - Certificat de Sélection du Québec) فور قبول الملف.',
            'تكاليف معيشة في مدن كيبيك ومونتريال وشيربروك أقل بنسبة 25% مقارنة بتورونتو وفانكوفر.'
          ]
        },
        {
          id: 'ca-work-permits',
          heading: '4. عقود العمل الكندية ورخصة المشغل LMIA',
          content: `إذا كان لديك تخصص في المهن المطلوبة (كالميكانيك، اللحام، الكابلاج، التمريض، سائقي الوزن الثقيل، أو تطوير البرمجيات)، يمكنك التقديم على عقود العمل المباشرة مع مشغلين كنديين عبر بنك الوظائف الكندي الحكومي (Job Bank).`,
          bulletPoints: [
            'يشترط في عقد العمل الأجنبي أن يكون معززاً بوثيقة تقييم تأثير سوق العمل الإيجابية (LMIA / EIMT) التي يستخرجها المشغل الكندي.',
            'تتيح لك تأشيرة العمل المغلقة السفر برفقة الزوج/الزوجة (الذي يحصل على تصريح عمل مفتوح) والأبناء (دراسة مجانية).',
            'بعد سنة واحدة من العمل داخل كندا، تصبح مؤهلاً للتقديم على الإقامة الدائمة عبر فئة الخبرة الكندية (CEC).'
          ]
        },
        {
          id: 'ca-salaries',
          heading: '5. جدول الرواتب وتكاليف المعيشة بالدرهم المغربي (CAD to MAD)',
          content: `متوسط الأجور في كندا يُدفع بالساعة كل أسبوعين، والحد الأدنى الفيدرالي في 2026 يتجاوز 17.30 دولار كندي للساعة:`,
          tableData: [
            { label: 'الحد الأدنى للأجور بالساعة', value: '17.30$ CAD (~128 درهم مغربي للساعة)' },
            { label: 'راتب تقني أو حرفي شهرياً', value: '3,800$ - 5,400$ CAD (~28,000 - 40,000 درهم)' },
            { label: 'راتب مهندس أو متخصص IT', value: '5,800$ - 9,000$ CAD (~43,000 - 67,000 درهم)' },
            { label: 'إيجار شقة غرفة وصالة بمونتريال', value: '1,250$ - 1,650$ CAD (~9,500 - 12,500 درهم)' },
            { label: 'تكاليف الأكل والمواصلات شهرياً', value: '550$ - 850$ CAD (~4,000 - 6,300 درهم)' }
          ]
        },
        {
          id: 'ca-cities',
          heading: '6. مقارنة أفضل المدن الكندية للمغاربة',
          content: `اختيار وجهتك الأولى يحدد فرص العثور على سكن ميسور وسرعة الاندماج الاجتماعي:`,
          bulletPoints: [
            'مونتريال (Montréal): أكبر تجمع للجالية المغربية في أمريكا الشمالية، لغة فرنسية، شبكة مواصلات متطورة، ومدارس متعددة الثقافات.',
            'مدينة كيبيك (Québec City): أعلى معدل طلب على اليد العاملة والتقنيين وحرفيي الصناعة، مع تكاليف سكن منخفضة ومجتمع آمن جداً.',
            'أوتاوا غاتينو (Ottawa-Gatineau): منطقة فيدرالية ثنائية اللغة، توفر فرص عمل حكومية وشركات تكنولوجيا عالية الأجور.',
            'كالجاري وإدمونتون (Alberta): رواتب تعد الأعلى في كندا بفضل قطاع الطاقة، مع ضريبة مبيعات منخفضة (5% فقط).'
          ]
        },
        {
          id: 'ca-steps',
          heading: '7. الروابط الحكومية الرسمية والتحذير من الوسطاء',
          content: `نظام الهجرة الكندي رقمي وشفاف. احذر من أي وسيط يدعي "بيع عقود عمل كندية جاهزة" أو يطلب مبالغ مالية مقابل ضمان التأشيرة.`,
          alert: 'وزارة الهجرة الكندية IRCC تؤكد: لا توجد أي جهة خاصة في العالم تملك صلاحية ضمان صدور التأشيرة الكندية، والتقديم الذاتي يحميك من الاحتيال.',
          officialLinks: [
            { label: 'بوابة الهجرة الكندية الرسمية (IRCC)', url: 'https://www.canada.ca/en/services/immigration-citizenship.html' },
            { label: 'بنك الوظائف الكندي الحكومي (Job Bank LMIA)', url: 'https://www.jobbank.gc.ca' },
            { label: 'بوابة أريما لمقاطعة كيبيك (Arrima)', url: 'https://arrima.immigration-quebec.gouv.qc.ca' },
            { label: 'مؤسسة معادلة الشواهد المعتمدة WES', url: 'https://www.wes.org' }
          ]
        }
      ]
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PILLAR 2: الهجرة إلى ألمانيا من المغرب 2026
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'germany-immigration',
      slug: 'immigration-germany-chancenkarte-morocco-2026',
      title: 'الهجرة إلى ألمانيا من المغرب 2026: بطاقة الفرصة Chancenkarte وعقود العمل والـ Ausbildung',
      metaDescription: 'دليل الهجرة إلى ألمانيا للمغاربة 2026: شروط بطاقة الفرصة Chancenkarte § 20a، حساب النقاط، معادلة الدبلوم ZAB، الحساب المغلق Sperrkonto، وعقود التدريب المهني Ausbildung.',
      country: 'ألمانيا',
      flag: '🇩🇪',
      tag: 'Pillar SEO · الدليل المرجعي لألمانيا',
      readingTime: '11 دقيقة قراءة',
      tableOfContents: [
        { id: 'de-overview', label: '1. قانون الهجرة الماهرة الألماني وتسهيلات 2026' },
        { id: 'de-chancenkarte', label: '2. بطاقة الفرصة (Chancenkarte § 20a)' },
        { id: 'de-recognition', label: '3. معادلة الشهادات المغربية (ZAB & Anabin)' },
        { id: 'de-blocked-account', label: '4. الحساب البنكي المغلق (Sperrkonto)' },
        { id: 'de-ausbildung', label: '5. التدريب المهني المزدوج المدفوع (Ausbildung)' },
        { id: 'de-salaries', label: '6. سلم الأجور وتكاليف المعيشة بالدرهم والروابط الرسمية' }
      ],
      sections: [
        {
          id: 'de-overview',
          heading: '1. قانون الهجرة الماهرة الألماني وتسهيلات 2026',
          content: `تعاني ألمانيا من عجز ديمغرافي حاد يتجاوز 400,000 يد عاملة سنوياً في قطاعات الهندسة، التكنولوجيا، الرعاية الصحية والتمريض، والمهن الصناعية والحرفية. دخل قانون الهجرة الماهرة المحدث حيز التنفيذ ليتيح للمغاربة السفر لألمانيا للبحث عن عمل دون اشتراط عقد عمل مسبق.`,
          bulletPoints: [
            'إمكانية السفر لألمانيا والبحث عن عمل لمدة سنة كاملة قابلة للتمديد.',
            'الحق القانوني في العمل لـ 20 ساعة أسبوعياً في أي وظيفة لتغطية مصاريفك أثناء البحث.',
            'إمكانية تحويل بطاقة الفرصة مباشرة إلى إقامة عمل دائمة أو بطاقة زرقاء فور العثور على مشغل.'
          ]
        },
        {
          id: 'de-chancenkarte',
          heading: '2. شروط ومعايير بطاقة الفرصة الألمانية (Chancenkarte)',
          content: `للحصول على تأشيرة بطاقة الفرصة، يجب استيفاء شرطين مسبقين ثم جمع 6 نقاط على الأقل في نظام التقييم الألماني:`,
          bulletPoints: [
            'الشرط المسبق 1: دبلوم جامعي أو دبلوم مهني (OFPPT سنتين فأكثر) معترف به من طرف ZAB.',
            'الشرط المسبق 2: مستوى A1 بالألمانية أو B2 بالإنجليزية.',
            'نقاط السن: 3 نقاط إذا كان عمرك أقل من 35 سنة، ونقطتان إذا كان عمرك بين 35 و 40 سنة.',
            'نقاط الخبرة: 3 نقاط لخبرة 5 سنوات، ونقطتان لخبرة سنتين مصرح بها في CNSS.',
            'نقاط المهن المطلوبة (Shortage List): نقطة إضافية لمهن التكنولوجيا والهندسة والتمريض.'
          ]
        },
        {
          id: 'de-blocked-account',
          heading: '3. الحساب المغلق وتكاليف المعيشة (Sperrkonto)',
          content: `تشترط القنصلية الألمانية بالرباط فتح حساب بنكي مغلق لإثبات القدرة على إعالة نفسك خلال فترة البحث:`,
          tableData: [
            { label: 'مبلغ الحساب المغلق الإلزامي', value: '1,027 يورو شهرياً (12,324€ للسنة ~ 132,000 درهم)' },
            { label: 'الشركات المعتمدة لفتح الحساب', value: 'Coracle أو Expatrio أو Fintiba (عبر الإنترنت)' },
            { label: 'الدخل من العمل الجزئي (20 ساعة)', value: 'حوالي 1,000€ إلى 1,200€ شهرياً (يغطي مصاريفك كاملة)' },
            { label: 'متوسط أجر الموظف بدوام كامل', value: '2,900€ - 4,600€ شهرياً (~31,000 - 49,000 درهم)' }
          ]
        },
        {
          id: 'de-ausbildung',
          heading: '4. التدريب المهني المزدوج المدفوع (Ausbildung)',
          content: `مسار شعبي مخصص للشباب حاملي البكالوريا: يجمع بين الدراسة النظرية في المدرسة والعمل التطبيقي في الشركة.`,
          bulletPoints: [
            'الراتب الشهري أثناء فترة التدريب (3 سنوات): بين 950€ و 1,400€ شهرياً (~10,000 - 15,000 درهم).',
            'التخصصات الأكثر طلباً: التمريض والرعاية الصحية، الفندقة، الميكانيك، الكهرباء الصناعية.',
            'الشرط الأساسي: شهادة اللغة الألمانية بمستوى B1 أو B2 من معهد جوته (Goethe-Institut).'
          ],
          officialLinks: [
            { label: 'البوابة الفيدرالية الرسمية Make it in Germany', url: 'https://www.make-it-in-germany.com' },
            { label: 'قاعدة بيانات معادلة الشواهد Anabin & ZAB', url: 'https://anabin.kmk.org' },
            { label: 'وكالة التوظيف الألمانية الفيدرالية (BA)', url: 'https://www.arbeitsagentur.de' }
          ]
        }
      ]
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PILLAR 3: الدراسة في كندا للمغاربة 2026
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'study-canada',
      slug: 'study-in-canada-morocco-guide-2026',
      title: 'الدراسة في كندا للمغاربة 2026: الجامعات، تصريح CAQ، تكاليف الدراسة، وتأشيرة العمل بعد التخرج',
      metaDescription: 'دليل الدراسة في كندا للطلبة المغاربة 2026: الحصول على القبول الجامعي DLI، استخراج شهادة القبول لكيبيك CAQ، تصريح الدراسة Study Permit، حساب تكاليف المعيشة بالدرهم، وفرص الإقامة الدائمة عبر PGWP.',
      country: 'كندا',
      flag: '🍁',
      tag: 'Pillar SEO · دليل الدراسة في كندا',
      readingTime: '10 دقائق قراءة',
      tableOfContents: [
        { id: 'ca-study-why', label: '1. لماذا تعد كندا الوجهة الدراسية الأفضل للمغاربة؟' },
        { id: 'ca-study-admission', label: '2. كيفية الحصول على القبول الجامعي المعتمد (DLI)' },
        { id: 'ca-study-caq-permit', label: '3. إجراءات شهادة CAQ وتصريح الدراسة الفيدرالي' },
        { id: 'ca-study-costs', label: '4. تكاليف الدراسة ورسوم الجامعات والكليات بالدرهم' },
        { id: 'ca-study-work', label: '5. العمل أثناء الدراسة (24 ساعة أسبوعياً) وتصريح PGWP' },
        { id: 'ca-study-pr', label: '6. كيف تتحول من طالب إلى مقيم دائم في كندا؟' }
      ],
      sections: [
        {
          id: 'ca-study-why',
          heading: '1. لماذا تعد كندا الوجهة الدراسية الأفضل للطلبة المغاربة؟',
          content: `توفر كندا نظاماً تعليمياً مصنفاً بين الأفضل عالمياً، مع جامعات وكليات تطبيقية (CÉGEP & Colleges) تمنح شهادات معترفاً بها دولياً. والأهم من ذلك، أن نظام الهجرة الكندي مصمم لمكافأة الخريجين الدوليين بمنحهم مسارات سريعة للحصول على الإقامة الدائمة والجنسية الكندية.`,
          bulletPoints: [
            'الجامعات الفرنكوفونية في مقاطعة كيبيك (مثل Université de Montréal و Laval) تمنح تخفيضات رسوم للطلبة الفرانكوفونيين.',
            'الحق القانوني للطلبة في العمل أثناء الدراسة بدوام جزئي (تم رفعه رسمياً إلى 24 ساعة أسبوعياً).',
            'إمكانية اصطحاب الزوج/الزوجة بتصريح عمل مفتوح، وتعليم مجاني للأبناء في المدارس الكندية.'
          ]
        },
        {
          id: 'ca-study-admission',
          heading: '2. شروط الحصول على القبول الجامعي المعتمد (DLI)',
          content: `يجب اختيار مؤسسة تعليمية معتمدة رسمياً (Designated Learning Institution - DLI) لضمان أهليتك للحصول على تصريح العمل بعد التخرج:`,
          bulletPoints: [
            'شواهد البكالوريا أو الإجازة أو الماستر مصادق عليها ومترجمة بالفرنسية أو الإنجليزية.',
            'بيانات النقط لآخر سنتين دراسيتين بمعدل مستحسن فما فوق.',
            'إثبات الكفاءة اللغوية: اختبار TCF Canada أو DELF للبرامج بالفرنسية، أو IELTS Academic (6.0+) للبرامج بالإنجليزية.'
          ]
        },
        {
          id: 'ca-study-costs',
          heading: '3. جدول تكاليف الدراسة والمعيشة السنوية بالدرهم المغربي',
          content: `تختلف المصاريف حسب المقاطعة والمؤسسة، وتعتبر الكليات التقنية أقل كلفة من الجامعات الكبرى:`,
          tableData: [
            { label: 'رسوم الكليات والمعاهد التقنية (Colleges)', value: '11,000$ - 16,000$ CAD (~82,000 - 120,000 درهم سنوياً)' },
            { label: 'رسوم الجامعات لمرحلة البكالوريوس/الإجازة', value: '16,000$ - 28,000$ CAD (~120,000 - 210,000 درهم سنوياً)' },
            { label: 'الضمان المالي المعيشي المطلوب رسمياً (IRCC)', value: '20,635$ CAD للسنة الأولى (~153,000 درهم مغربي)' },
            { label: 'الدخل التقريبي من العمل الطلابي (24 ساعة/أسبوع)', value: '1,500$ - 1,800$ CAD شهرياً (~11,000 - 13,500 درهم)' }
          ]
        },
        {
          id: 'ca-study-pr',
          heading: '4. تصريح العمل بعد التخرج (PGWP) والتحول للإقامة الدائمة',
          content: `بعد إنهاء دراستك، تحصل على تصريح عمل مفتوح (Post-Graduation Work Permit) تتراوح مدته بين سنة و 3 سنوات:`,
          bulletPoints: [
            'العمل في أي وظيفة مهنية في كندا لاكتساب خبرة عمل كندية مصنفة (TEER 0, 1, 2, 3).',
            'التقديم الفوري على الإقامة الدائمة عبر فئة الخبرة الكندية (Canadian Experience Class) أو برنامج العمالة الماهرة لكيبيك (PRTQ).',
            'خريجو كندا يحصلون على نقاط إضافية في نظام Express Entry تضمن قبول ملفاتهم في أول سحب.'
          ],
          officialLinks: [
            { label: 'بوابة الهجرة الكندية الرسمية للطلبة (Study Permit)', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html' },
            { label: 'بوابة شهادة القبول لكيبيك (CAQ Online)', url: 'https://www.quebec.ca/education/etudier-au-quebec' }
          ]
        }
      ]
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PILLAR 4: الدراسة في ألمانيا 2026
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'study-germany',
      slug: 'study-in-germany-free-universities-morocco-2026',
      title: 'الدراسة في ألمانيا 2026: الجامعات الحكومية المجانية 0€، شروط القبول، والحساب المغلق Sperrkonto',
      metaDescription: 'دليل الدراسة في ألمانيا للطلبة المغاربة 2026: الجامعات الحكومية المجانية بدون رسوم، شروط القبول، شهادة اللغة الألمانية والإنجليزية، فتح الحساب المغلق، والسنة التحضيرية Studienkolleg.',
      country: 'ألمانيا',
      flag: '🇩🇪',
      tag: 'Pillar SEO · دليل الدراسة في ألمانيا',
      readingTime: '9 دقائق قراءة',
      tableOfContents: [
        { id: 'de-study-free', label: '1. ميزة مجانية الجامعات الألمانية (0€ رسوم دراسية)' },
        { id: 'de-study-studienkolleg', label: '2. السنة التحضيرية (Studienkolleg) لحاملي البكالوريا المغربية' },
        { id: 'de-study-languages', label: '3. متطلبات اللغة (الألمانية B2/C1 أو الإنجليزية IELTS)' },
        { id: 'de-study-sperrkonto', label: '4. الحساب المغلق وتكاليف المعيشة الشهرية' },
        { id: 'de-study-steps', label: '5. خطوات التقديم عبر بوابة Uni-Assist والحصول على التأشيرة' }
      ],
      sections: [
        {
          id: 'de-study-free',
          heading: '1. مجانية التعليم في الجامعات الحكومية الألمانية',
          content: `ألمانيا هي الدولة الصناعية الكبرى الوحيدة التي تلغي الرسوم الدراسية بالكامل في 15 ولاية من أصل 16 لجميع الطلاب المحليين والدوليين على حد سواء. يدفع الطالب فقط رسوماً إدارية رمزية تسمى (Semesterbeitrag) تتراوح بين 150€ و 350€ لكل فصل دراسي، وتتضمن تذكرة مجانية لكافة وسائل النقل في الولاية.`,
          bulletPoints: [
            'الجامعات الألمانية تحتل صدارة التصنيفات العالمية خصوصاً في الهندسة، الطب، والصناعات الدقيقة.',
            'يسمح للطالب بالعمل القانوني لـ 140 يوماً كاملاً أو 280 نصف يوم في السنة، وهو ما يغطي نفقات المعيشة بالكامل.',
            'بعد التخرج، يحصل الطالب المغربي تلقائياً على إقامة بحث عن عمل لمدة 18 شهراً تؤدي للإقامة الدائمة.'
          ]
        },
        {
          id: 'de-study-studienkolleg',
          heading: '2. السنة التحضيرية (Studienkolleg) لحاملي البكالوريا',
          content: `نظراً لاختلاف نظام الثانوية العامة، يشترط لحاملي البكالوريا المغربية قضاء سنة تحضيرية قبل الالتحاق بالجامعة:`,
          bulletPoints: [
            'مسار T-Kurs: مخصص للتخصصات الهندسية، الرياضيات، والمعلوميات.',
            'مسار M-Kurs: مخصص للطب البشري، طب الأسنان، الصيدلة، والبيولوجيا.',
            'مسار W-Kurs: مخصص للاقتصاد، إدارة الأعمال، والعلوم الاجتماعية.',
            'إعفاء حاملي الإجازة أو Deug: خريجو الجامعات المغربية (سنتان فما فوق) يلتحقون مباشرة بالجامعة أو مرحلة الماستر دون سنة تحضيرية.'
          ]
        },
        {
          id: 'de-study-sperrkonto',
          heading: '3. الحساب البنكي المغلق (Sperrkonto 2026)',
          content: `الشرط الوحيد للسفارة الألمانية بالرباط هو إثبات القدرة المالية عبر حساب مغلق:`,
          tableData: [
            { label: 'المبلغ الإجمالي للحساب المغلق لسنة دراسية', value: '11,904€ (~128,000 درهم مغربي)' },
            { label: 'المصروف الشهري المتاح سحبه في ألمانيا', value: '992€ شهرياً (يكفي للسكن والأكل والتأمين الصحي)' },
            { label: 'التأمين الصحي الطلابي الإلزامي (AOK / TK)', value: 'حوالي 120€ شهرياً مع تغطية طبية شاملة 100%' },
            { label: 'متوسط أجر عمل الطلبة بالساعة (Werkstudent)', value: '14€ - 18€ يورو للساعة (~150 - 190 درهم)' }
          ],
          officialLinks: [
            { label: 'بوابة القبول الجامعي الألمانية الموحدة (Uni-Assist)', url: 'https://www.uni-assist.de' },
            { label: 'محرك البحث عن التخصصات والجامعات (DAAD Programs)', url: 'https://www.daad.de/en/study-and-research-in-germany/courses-of-study-in-germany/' }
          ]
        }
      ]
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PILLAR 5: العمل والهجرة إلى أستراليا للمغاربة 2026
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'work-australia',
      slug: 'work-and-immigration-australia-morocco-2026',
      title: 'العمل والهجرة إلى أستراليا للمغاربة 2026: فيزا المهارات 189 و 190 والمهن المطلوبة وسلم الرواتب',
      metaDescription: 'دليل الهجرة والعمل في أستراليا للمغاربة 2026: تأشيرات الكفاءة المستقلة Subclass 189 و 190، قائمة المهن الإستراتيجية MLTSSL، معادلة الشواهد عبر VETASSESS، وحساب النقاط بالدولار الأسترالي والدرهم.',
      country: 'أستراليا',
      flag: '🇦🇺',
      tag: 'Pillar SEO · دليل العمل في أستراليا',
      readingTime: '11 دقيقة قراءة',
      tableOfContents: [
        { id: 'au-overview', label: '1. مميزات الهجرة إلى أستراليا للمغاربة 2026' },
        { id: 'au-visas', label: '2. تأشيرات الكفاءة الرئيسية (Subclass 189, 190, 491)' },
        { id: 'au-skills-assessment', label: '3. تقييم المؤهلات المهنية (Skills Assessment)' },
        { id: 'au-points-test', label: '4. جدول ونظام حساب النقاط الأسترالي (Points Test)' },
        { id: 'au-salaries', label: '5. سلم الرواتب وتكاليف المعيشة بالدرهم المغربي (AUD to MAD)' },
        { id: 'au-steps', label: '6. خطوات التقديم الرسمية وبوابة SkillSelect' }
      ],
      sections: [
        {
          id: 'au-overview',
          heading: '1. مميزات الهجرة والاستقرار في أستراليا للمغاربة',
          content: `تمتلك أستراليا أعلى حد أدنى للأجور في العالم، مع نظام رعاية اجتماعية وتأمين صحي شامل (Medicare) ومناخ معتدل مشابه للمغرب. يتم اختيار المهاجرين وفق نظام النقاط الشفاف والمبني على الكفاءة والخبرة دون الحاجة لوساطة أو عقد عمل مسبق للتأشيرة المستقلة.`,
          bulletPoints: [
            'الحصول على الإقامة الدائمة المباشرة (Permanent Residency) لك ولكافة أفراد عائلتك.',
            'أعلى رواتب عالمية في مجالات الهندسة، البناء، التعدين، التمريض، والزراعة المتقدمة.',
            'الجنسية الأسترالية بعد 4 سنوات من الإقامة القانونية، مع جواز سفر يتيح دخول أكثر من 185 دولة بدون تأشيرة.'
          ]
        },
        {
          id: 'au-visas',
          heading: '2. أهم تأشيرات العمل والهجرة الأسترالية للمغاربة',
          content: `تنقسم تأشيرات المهارات الأسترالية (General Skilled Migration) إلى ثلاثة مسارات رئيسية:`,
          bulletPoints: [
            'تأشيرة 189 (Skilled Independent): إقامة دائمة مباشرة، تتيح لك العيش والعمل في أي ولاية أسترالية دون رعاية من مشغل أو ولاية.',
            'تأشيرة 190 (Skilled Nominated): إقامة دائمة مشروطة برعاية إحدى الولايات الأسترالية، وتمنحك 5 نقاط إضافية في رصيدك.',
            'تأشيرة 491 (Skilled Work Regional): تأشيرة عمل مؤقتة لمدة 5 سنوات للمناطق الإقليمية، تمنحك 15 نقطة إضافية وتتحول لإقامة دائمة بعد 3 سنوات من العمل.'
          ]
        },
        {
          id: 'au-skills-assessment',
          heading: '3. تقييم المؤهلات المهنية (Skills Assessment)',
          content: `الخطوة الأولى والأساسية هي تقديم ملفك للهيئة الأسترالية المسؤولة عن تقييم تخصصك:`,
          bulletPoints: [
            'المهندسون: تقييم عبر منظومة Engineers Australia (تقرير CDR أو شهادة معتمدة).',
            'متخصصو التكنولوجيا والبرمجة: تقييم عبر جمعية الحاسوب الأسترالية (ACS).',
            'المهن الحرفية والتقنية: تقييم عبر منظومة Trades Recognition Australia (TRA).',
            'التخصصات العامة والإدارية والتجارية: تقييم عبر منظومة VETASSESS.'
          ]
        },
        {
          id: 'au-salaries',
          heading: '4. سلم الرواتب وتكاليف المعيشة بالدرهم المغربي (AUD to MAD)',
          content: `أستراليا تسجل أعلى متوسط للأجور عالمياً، والحد الأدنى للأجور في 2026 يبلغ 23.23 دولار أسترالي للساعة:`,
          tableData: [
            { label: 'الحد الأدنى للأجور بالساعة', value: '23.23$ AUD (~155 درهم مغربي للساعة)' },
            { label: 'راتب حرفي أو تقني صناعي شهرياً', value: '5,000$ - 7,500$ AUD (~33,000 - 50,000 درهم)' },
            { label: 'راتب مهندس أو ممرض أو مبرمج', value: '7,500$ - 11,000$ AUD (~50,000 - 73,000 درهم)' },
            { label: 'إيجار شقة في ملبورن أو بريسبان', value: '1,800$ - 2,400$ AUD شهرياً (~12,000 - 16,000 درهم)' },
            { label: 'مصاريف المعيشة والأكل شهرياً', value: '700$ - 1,000$ AUD (~4,600 - 6,600 درهم)' }
          ],
          officialLinks: [
            { label: 'بوابة الهجرة الأسترالية الرسمية (SkillSelect)', url: 'https://immi.homeaffairs.gov.au' },
            { label: 'قائمة المهن الإستراتيجية المطلوبة (MLTSSL)', url: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list' },
            { label: 'هيئة تقييم المهارات الأسترالية VETASSESS', url: 'https://www.vetassess.com.au' }
          ]
        }
      ]
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PILLAR 6: منح الدراسة في أوروبا 2026
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: 'scholarships-europe',
      slug: 'fully-funded-scholarships-europe-morocco-2026',
      title: 'منح الدراسة في أوروبا الممولة بالكامل 100% للمغاربة 2026: إيراسموس، إيفل، المجر، وإيطاليا',
      metaDescription: 'دليل المنح الدراسية الممولة بالكامل 100% للطلبة والباحثين المغاربة 2026: منحة الاتحاد الأوروبي Erasmus Mundus، منحة الحكومة الفرنسية Eiffel، منحة المجر Stipendium Hungaricum، ومنحة إيطاليا DSU مع السكن وتذاكر الطيران.',
      country: 'أوروبا',
      flag: '🇪🇺',
      tag: 'Pillar SEO · دليل المنح الأوروبية',
      readingTime: '10 دقائق قراءة',
      tableOfContents: [
        { id: 'eu-overview', label: '1. خريطة المنح الأوروبية الممولة بالكامل 100%' },
        { id: 'eu-erasmus', label: '2. منحة الاتحاد الأوروبي المرموقة (Erasmus Mundus Joint Masters)' },
        { id: 'eu-eiffel', label: '3. منحة التميز للحكومة الفرنسية (Bourse Eiffel)' },
        { id: 'eu-hungary', label: '4. منحة حكومة المجر (Stipendium Hungaricum)' },
        { id: 'eu-italy-dsu', label: '5. منحة إقليم إيطاليا المجانية (Borsa di Studio DSU)' },
        { id: 'eu-tips', label: '6. أسرار كتابة رسالة الدوافع والتوصية لضمان القبول' }
      ],
      sections: [
        {
          id: 'eu-overview',
          heading: '1. خريطة المنح الأوروبية المجانية للطلبة المغاربة',
          content: `تمنح المفوضية الأوروبية والحكومات الشريكة سنوياً آلاف المنح الدراسية للطلبة المغاربة في مراحل الإجازة، الماستر، والدكتوراه. تمتاز المنح الحكومية المعتمدة بأنها لا تطلب أي مقابل مالي، وتغطي تكاليف الرسوم الدراسية 100%، السكن الجامعي، تذاكر الطيران ذهاباً وإياباً، والتأمين الصحي، مع راتب شهري يتراوح بين 800€ و 1,400€ يورو.`,
          bulletPoints: [
            'التقديم يتم مباشرة عبر البوابات الرسمية دون أي وساطة أو مكاتب خاصة.',
            'حاملو شهادات البكالوريا أو الإجازة من الجامعات المغربية الحكومية والخاصة مؤهلون بالتساوي.',
            'معظم المنح الأوروبية توفر مسارات دراسية كاملة باللغة الإنجليزية.'
          ]
        },
        {
          id: 'eu-erasmus',
          heading: '2. منحة الاتحاد الأوروبي (Erasmus Mundus Joint Masters)',
          content: `أقوى منحة أكاديمية في العالم لمرحلة الماستر. تتيح لك الدراسة في 3 جامعات أوروبية في 3 دول مختلفة خلال سنتين:`,
          bulletPoints: [
            'الراتب الشهري: 1,400€ يورو شهرياً طيلة مدة الدراسة (24 شهراً ~ 15,000 درهم شهرياً).',
            'إعفاء كامل 100% من جميع الرسوم الدراسية وتكاليف المختبرات والكتب.',
            'تأمين صحي دولي شامل وبدل سفر سنوي قدره 3,000€ يورو لتغطية تذاكر الطيران.',
            'التخصصات: أكثر من 160 برنامج ماستر في التكنولوجيا، الهندسة، الصحة، والعلوم الاجتماعية.'
          ]
        },
        {
          id: 'eu-hungary',
          heading: '3. منحة حكومة المجر (Stipendium Hungaricum للمغاربة)',
          content: `تخصص الحكومة المجرية حصة خاصة للمملكة المغربية تبلغ أكثر من 150 منحة سنوية لكافة المراحل (بكالوريا، ماستر، دكتوراه):`,
          bulletPoints: [
            'الدراسة باللغة الإنجليزية بنسبة 100% في أعرق الجامعات المجرية (بودابست، ديبريسين، زيجد).',
            'تغطية الرسوم الجامعية 100% مع توفير سكن جامعي مجاني أو بدل سكن شهري.',
            'فتح باب الترشيح سنوياً من منتصف نوفمبر إلى منتصف يناير عبر بوابة DreamApply.'
          ]
        },
        {
          id: 'eu-italy-dsu',
          heading: '4. منحة الجامعات الإيطالية الحكومية (Borsa di Studio DSU)',
          content: `تعتمد المنحة الإيطالية على معيار الدخل العائلي (ISEE Parificato). وبما أن الدخل في المغرب يقيم بالدرهم، فإن معظم الطلبة المغاربة المقبولين في الجامعات الإيطالية (مثل بوليتيكنيكو ميلانو أو روما سابينزا) يحصلون على المنحة تلقائياً:`,
          tableData: [
            { label: 'المبلغ المالي السنوي للمنحة', value: 'بين 6,000€ و 7,500€ يورو سنوياً (~65,000 - 80,000 درهم)' },
            { label: 'المميزات الإضافية', value: 'وجبة غداء يومية مجانية في مطاعم الجامعة + إعفاء كامل من الرسوم' },
            { label: 'لغة الدراسة المتاحة', value: 'مئات برامج الماستر والبكالوريوس باللغة الإنجليزية بالكامل' }
          ],
          officialLinks: [
            { label: 'دليل برامج إيراسموس موندوس الرسمية (Erasmus Catalogue)', url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en' },
            { label: 'بوابة منحة المجر الرسمية (Stipendium Hungaricum)', url: 'https://stipendiumhungaricum.hu' },
            { label: 'بوابة كامبوس فرانس لمنحة إيفل الفرنسية (Bourse Eiffel)', url: 'https://www.campusfrance.org/fr/le-programme-de-bourses-france-excellence-eiffel' }
          ]
        }
      ]
    }
  ];

  const activePillar = pillars.find(p => p.id === selectedPillarId) || pillars[0];

  return (
    <div className="space-y-8 animate-fade-in text-right font-['Cairo',sans-serif]">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TOP PILLAR SELECTOR SWITCHER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Globe className="w-3.5 h-3.5" />
              <span>موسوعة الأدلة المرجعية الكبرى للمغاربة · Mega Pillar SEO Authority 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              أدلة الهجرة والدراسة والعمل الدولية المرجعية الشاملة
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              بدلاً من تشتتك بين عشرات المقالات الصغيرة، جمعنا لك كل وجهة في صفحة مرجعية واحدة متكاملة تتضمن شروط القبول، حساب النقاط، سلم الرواتب، تكاليف المعيشة بالدرهم، والروابط الحكومية الرسمية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start shrink-0">
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 font-bold text-xs shadow-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
                <span>رجوع</span>
              </button>
            )}

            <button
              onClick={() => {
                const added = saveBookmark({
                  id: activePillar.id,
                  type: 'pillar',
                  title: activePillar.title,
                  country: activePillar.country,
                  flag: activePillar.flag,
                  url: window.location.href
                });
                setIsSaved(added);
              }}
              className={`px-4 py-2.5 rounded-xl border font-bold text-xs shadow-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95 ${
                isSaved || isItemBookmarked(activePillar.id)
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-500'
              }`}
              title="حفظ هذا الدليل في مفضلتي"
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved || isItemBookmarked(activePillar.id) ? 'تم الحفظ في مفضلتي ⭐' : 'حفظ الدليل في مفضلتي'}</span>
            </button>

            {onOpenLeadMagnet && (
              <button
                onClick={onOpenLeadMagnet}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الدليل الشامل PDF</span>
              </button>
            )}

            <button
              onClick={() => onSelectTab('ai-assistant')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-2 transition-all active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>المساعد الذكي للهجرة 🤖</span>
            </button>
          </div>
        </div>

        {/* Pillar Switcher Buttons for all 6 Pillars */}
        <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
          {pillars.map(pillar => {
            const isSelected = selectedPillarId === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-base">{pillar.flag}</span>
                <span>{pillar.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN PILLAR ARTICLE CONTAINER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <article className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Table of Contents Sticky Sidebar (Desktop) */}
        <aside className="lg:col-span-1 hidden lg:block space-y-4">
          <div className="sticky top-24 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>فهرس الدليل السريع:</span>
            </div>
            <nav className="space-y-1.5 text-xs">
              {activePillar.tableOfContents.map(toc => (
                <a
                  key={toc.id}
                  href={`#${toc.id}`}
                  className="block p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors leading-relaxed"
                >
                  {toc.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={onOpenLeadMagnet}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل الدليل الكامل PDF</span>
              </button>

              <button
                onClick={() => onSelectTab('ai-assistant')}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>شخّص ملفك بالمساعد الذكي</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <div className="lg:col-span-3 space-y-8">
          
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
            
            {/* Header info */}
            <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-blue-600">{activePillar.tag}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{activePillar.readingTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {activePillar.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {activePillar.metaDescription}
              </p>
            </div>

            {/* Sections Loop */}
            {activePillar.sections.map(section => (
              <section key={section.id} id={section.id} className="space-y-4 pt-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shrink-0" />
                  <span>{section.heading}</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {section.content}
                </p>

                {/* Bullet Points */}
                {section.bulletPoints && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {section.bulletPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Table Data (if present) */}
                {section.tableData && (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-xs text-right">
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {section.tableData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-3.5 font-bold text-slate-900 dark:text-white w-1/2">{row.label}</td>
                            <td className="p-3.5 text-blue-600 dark:text-blue-400 font-mono font-bold w-1/2">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Alert Box (if present) */}
                {section.alert && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-semibold">{section.alert}</span>
                  </div>
                )}

                {/* Official Links (if present) */}
                {section.officialLinks && (
                  <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block mb-1">
                      الروابط والمصادر الحكومية الرسمية (لا تتطلب أي وسطاء):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {section.officialLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-200 font-bold hover:text-blue-600 flex items-center justify-between transition-colors shadow-2xs"
                        >
                          <span className="truncate">{link.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </section>
            ))}

            {/* Bottom Call to Action */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-xs text-slate-500">
                <span className="font-bold text-slate-900 dark:text-white block">هل ترغب في معرفة البرنامج الأنسب لملفك بدقة؟</span>
                <span>استخدم المساعد الذكي لمطابقة مؤهلاتك (السن، الدبلوم، اللغة، والخبرة) مع 18 برنامجاً دولياً.</span>
              </div>

              <button
                onClick={() => onSelectTab('ai-assistant')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Bot className="w-4 h-4" />
                <span>تشغيل المساعد الذكي الآن</span>
              </button>
            </div>

          </div>

        </div>

      </article>

    </div>
  );
};

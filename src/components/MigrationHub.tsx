import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe, 
  Plane, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Calculator, 
  Compass, 
  Award,
  MapPin,
  Home
} from 'lucide-react';

interface MigrationHubProps {
  onBack?: () => void;
  onSelectTab?: (tab: string, subTab?: string, id?: string) => void;
  initialMainTab?: 'programs' | 'germany-calc' | 'canada-check';
  initialCountry?: string;
}

export interface CountryMigrationProfile {
  id: string;
  name: string;
  flag: string;
  badge: string;
  salary: string;
  visaTypes: string[];
  requirements: string[];
  costOfLiving: {
    monthlyRent: string;
    foodAndLiving: string;
    currency: string;
    totalMadEstimate: string;
  };
  steps: string[];
  topCities: string[];
  officialPortal: string;
  officialUrl: string;
  warning: string;
}

export const MigrationHub: React.FC<MigrationHubProps> = ({ 
  onBack, 
  onSelectTab,
  initialMainTab,
  initialCountry
}) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeMainTab, setActiveMainTab] = useState<'programs' | 'germany-calc' | 'canada-check'>(initialMainTab || 'programs');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry || 'canada');

  React.useEffect(() => {
    if (initialMainTab) {
      setActiveMainTab(initialMainTab);
    }
  }, [initialMainTab]);

  React.useEffect(() => {
    if (initialCountry) {
      setSelectedCountry(initialCountry);
    }
  }, [initialCountry]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOOL 1: GERMANY CHANCENKARTE (OPPORTUNITY CARD) POINTS SIMULATOR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [deQualification, setDeQualification] = useState<number>(4);
  const [deExperience, setDeExperience] = useState<number>(3);
  const [deLanguage, setDeLanguage] = useState<number>(2);
  const [deAge, setDeAge] = useState<number>(2);
  const [deShortage, setDeShortage] = useState<boolean>(true);
  const [deMoroccoTies, setDeMoroccoTies] = useState<boolean>(false);

  const totalDePoints = deQualification + deExperience + deLanguage + deAge + (deShortage ? 1 : 0) + (deMoroccoTies ? 1 : 0);
  const isDeEligible = totalDePoints >= 6;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TOOL 2: CANADA EXPRESS ENTRY SKILLED TRADES CHECKER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [caDiploma, setCaDiploma] = useState<'ofppt' | 'licence' | 'master'>('ofppt');
  const [caExperienceYears, setCaExperienceYears] = useState<number>(3);
  const [caLanguageScore, setCaLanguageScore] = useState<'clb5' | 'clb7' | 'clb9'>('clb7');
  const [caAgeBracket, setCaAgeBracket] = useState<'18-35' | '36-45' | '46+'>('18-35');
  const [caHasJobOffer, setCaHasJobOffer] = useState<boolean>(false);

  const isCaEligible = (caExperienceYears >= 2 && caLanguageScore !== 'clb5') || caHasJobOffer;

  const countries: CountryMigrationProfile[] = [
    // 1. CANADA
    {
      id: 'canada',
      name: 'الهجرة إلى كندا (Canada)',
      flag: '🇨🇦',
      badge: 'إقامة دائمة وعقود عمل',
      salary: '3,200$ - 5,800$ CAD شهرياً (24,000 - 43,000 درهم)',
      visaTypes: [
        'الدخول السريع (Express Entry - FSWP / FSTP)',
        'بوابة أريما للهجرة إلى مقاطعة كيبيك (Arrima Québec)',
        'تصريح العمل المغلق برخصة LMIA / EIMT',
        'برنامج ترشيح المقاطعات الإقليمية (PNP)'
      ],
      requirements: [
        'معادلة الدبلوم المغربي عبر مؤسسة WES أو ICAS (Bac / OFPPT / Licence / Master).',
        'اختبار اللغة الرسمي: TCF Canada للفرنسية أو IELTS General للإنجليزية بدرجة CLB 7+.',
        'سنة واحدة على الأقل من الخبرة المهنية المستمرة في مهنة مصنفة في نظام TEER (0-3).',
        'حساب بنكي يثبت القدرة على الاستقرار المالي (حوالي 14,000$ CAD للفرد الواحد).'
      ],
      costOfLiving: {
        monthlyRent: '1,200$ - 1,800$ CAD (شقة غرفة وصالة)',
        foodAndLiving: '500$ - 700$ CAD شهرياً',
        currency: 'CAD (دولار كندي)',
        totalMadEstimate: '13,000 - 19,000 درهم شهرياً'
      },
      steps: [
        'إجراء معادلة الشهادات الأكاديمية عبر تقرير WES الرسمي.',
        'اجتياز اختبار TCF Canada أو IELTS والحصول على النقاط المطلوبة.',
        'إنشاء ملف مجاني في حوض الترشيح Express Entry أو بوابة Arrima.',
        'انتظار سحوبات وزارة الهجرة واستلام دعوة التقديم الرسمية (ITA).',
        'إيداع الفحص الطبي والسجل العدلي واستلام تأشيرة تأكيد الإقامة الدائمة (COPR).'
      ],
      topCities: ['مونتريال (Montréal)', 'كيبيك سيتي (Québec)', 'أوتاوا (Ottawa)', 'تورونتو (Toronto)', 'كالجاري (Calgary)'],
      officialPortal: 'canada.ca/en/services/immigration-citizenship',
      officialUrl: 'https://www.canada.ca/en/services/immigration-citizenship.html',
      warning: 'احذر من أي مكتب يطلب مبالغ بحجة بيع عقود عمل كندية جاهزة؛ نظام الهجرة الكندي إلكتروني بالكامل ومجاني التقديم الأولي.'
    },

    // 2. AUSTRALIA
    {
      id: 'australia',
      name: 'الهجرة إلى أستراليا (Australia)',
      flag: '🇦🇺',
      badge: 'نظام النقاط SkillSelect',
      salary: '4,500$ - 7,500$ AUD شهرياً (30,000 - 50,000 درهم)',
      visaTypes: [
        'تأشيرة العمالة المستقلة Subclass 189 (Skilled Independent)',
        'تأشيرة ترشيح الولايات Subclass 190 (Skilled Nominated)',
        'تأشيرة المناطق الإقليمية Subclass 491 (Work Regional)',
        'تأشيرة نقص المهارات المؤقتة Subclass 482 (TSS Visa)'
      ],
      requirements: [
        'السن أقل من 45 سنة عند توجيه الدعوة الرسمية.',
        'تقييم المهارات الإيجابي من الهيئة الأسترالية المعتمدة (VETASSESS، Engineers Australia، ACS).',
        'اجتياز اختبار IELTS بمعدل لا يقل عن 6.0 في كل قسم (أو PTE Academic 50+).',
        'تحقيق ما لا يقل عن 65 نقطة في حاسبة النقاط الأسترالية الرسمية.'
      ],
      costOfLiving: {
        monthlyRent: '1,800$ - 2,500$ AUD شهرياً',
        foodAndLiving: '700$ - 1,000$ AUD شهرياً',
        currency: 'AUD (دولار أسترالي)',
        totalMadEstimate: '17,000 - 24,000 درهم شهرياً'
      },
      steps: [
        'التحقق من وجود مهنتك في القائمة الأسترالية للمهن الماهرة (Skilled Occupation List).',
        'إرسال الشهادات والخبرات لهيئة التقييم (Skills Assessment).',
        'تقديم إبداء الاهتمام (Expression of Interest - EOI) عبر بوابة SkillSelect.',
        'استلام الدعوة من إحدى الولايات الأسترالية ودفع الرسوم وتقديم الفحص الطبي.'
      ],
      topCities: ['سيدني (Sydney)', 'ملبورن (Melbourne)', 'بيرث (Perth)', 'بريزبن (Brisbane)', 'أديليد (Adelaide)'],
      officialPortal: 'immi.homeaffairs.gov.au',
      officialUrl: 'https://immi.homeaffairs.gov.au',
      warning: 'أستراليا تطبق أشد معايير التدقيق المهني والأمني؛ أي وثيقة خبرة غير مصرح بها في CNSS/الضرائب تؤدي للرفض التلقائي.'
    },

    // 3. GERMANY
    {
      id: 'germany',
      name: 'الهجرة إلى ألمانيا (Germany)',
      flag: '🇩🇪',
      badge: 'بطاقة الفرصة 2026 والفيزا الزرقاء',
      salary: '2,800€ - 4,500€ شهرياً (30,000 - 48,000 درهم)',
      visaTypes: [
        'بطاقة الفرصة للبحث عن عمل (Chancenkarte § 20a)',
        'تأشيرة العمالة المتخصصة (Fachkräftevisum § 18a/18b)',
        'البطاقة الزرقاء للاتحاد الأوروبي (EU Blue Card)',
        'التدريب المهني المزدوج مدفوع الأجر (Ausbildung)'
      ],
      requirements: [
        'دبلوم مهني (OFPPT) أو شهادة جامعية معترف بها عبر قاعدة بيانات Anabin أو ZAB.',
        'مستوى لغوي: A1/A2 بالألمانية لبطاقة الفرصة، أو B1/B2 للعمل المباشر، أو B2 إنجليزي لمهن الـ IT.',
        'حساب بنكي مغلق (Sperrkonto) بقيمة 1,027 يورو شهرياً (12,324€ للسنة) لتغطية فترة البحث عن عمل.',
        'جمع 6 نقاط على الأقل في حاسبة النقاط الألمانية.'
      ],
      costOfLiving: {
        monthlyRent: '650€ - 1,100€ شهرياً (شقة أو استوديو)',
        foodAndLiving: '350€ - 500€ شهرياً',
        currency: 'EUR (يورو)',
        totalMadEstimate: '11,000 - 17,000 درهم شهرياً'
      },
      steps: [
        'معادلة الدبلوم أو استخراج شهادة المقارنة من ZAB بمبلغ 200 يورو.',
        'حساب النقاط في محاكي Chancenkarte والتأكد من بلوغ 6 نقاط.',
        'فتح الحساب المغلق Sperrkonto عبر Coracle أو Expatrio.',
        'حجز موعد عبر TLScontact الرباط وتقديم الملف القنصلي.'
      ],
      topCities: ['برلين (Berlin)', 'ميونخ (München)', 'فرانكفورت (Frankfurt)', 'هامبورغ (Hamburg)', 'كولونيا (Köln)'],
      officialPortal: 'make-it-in-germany.com',
      officialUrl: 'https://www.make-it-in-germany.com',
      warning: 'بطاقة الفرصة تمنحك الحق القانوني في العمل 20 ساعة أسبوعياً أثناء بحثك عن المشغل الدائم.'
    },

    // 4. FRANCE
    {
      id: 'france',
      name: 'الهجرة إلى فرنسا (France)',
      flag: '🇫🇷',
      badge: 'جواز المواهب وعقود العمل',
      salary: '2,200€ - 3,800€ شهرياً (24,000 - 41,000 درهم)',
      visaTypes: [
        'جواز سفر المواهب (Passeport Talent - Salarié qualifié)',
        'تأشيرة عقد العمل الدائم أو المؤقت (Salarié / Travailleur temporaire)',
        'عقود العمل الموسمي (Travailleur Saisonnier OFII)',
        'تأشيرة إنشاء مقاولة أو شركة تجارية (Créateur d\'entreprise)'
      ],
      requirements: [
        'عقد عمل رسمي مصادق عليه من طرف منصة وزارة العمل الفرنسية (Dreets).',
        'راتب في العقد لا يقل عن الحد الأدنى القانوني (SMIC أو 1.5 ضعف SMIC لجواز المواهب).',
        'شهادة تخصص وخبرة مطابقة لمنصب الشغل المصرح به.',
        'ملف قنصلي خالٍ من السوابق العدلية.'
      ],
      costOfLiving: {
        monthlyRent: '600€ - 1,200€ شهرياً (خارج باريس أقل تكلفة بـ 40%)',
        foodAndLiving: '300€ - 500€ شهرياً',
        currency: 'EUR (يورو)',
        totalMadEstimate: '10,000 - 18,000 درهم شهرياً'
      },
      steps: [
        'البحث عن مشغل عبر France Travail أو LinkedIn أو APEC.',
        'يقوم المشغل الفرنسي بطلب رخصة العمل (Autorisation de travail) إلكترونياً.',
        'صدور رخصة العمل من Dreets وإرسالها إلى مركز TLScontact.',
        'تقديم ملف التأشيرة (VLS-TS) واستلام الملصق في الجواز.',
        'المصادقة على التأشيرة لدى مكتب OFII فور الوصول لفرنسا.'
      ],
      topCities: ['باريس (Paris)', 'ليون (Lyon)', 'تولوز (Toulouse)', 'مارسيليا (Marseille)', 'نانت (Nantes)'],
      officialPortal: 'france-visas.gouv.fr',
      officialUrl: 'https://france-visas.gouv.fr',
      warning: 'المشغل الفرنسي ملزم بنشر إعلان الوظيفة لمدة 3 أسابيع لإثبات غياب كفاءة محلية قبل طلب رخصة استقدام مرشح من المغرب.'
    },

    // 5. USA
    {
      id: 'usa',
      name: 'الهجرة إلى الولايات المتحدة (USA)',
      flag: '🇺🇸',
      badge: 'القرعة الأمريكية وفيز الكفاءات',
      salary: '3,800$ - 7,000$ USD شهرياً (38,000 - 70,000 درهم)',
      visaTypes: [
        'قرعة الهجرة التعددية السنوية (Diversity Visa - DV Lottery)',
        'تأشيرة العمل التخصصية H-1B (برعاية مشغل أمريكي)',
        'تأشيرة الكفاءات الاستثنائية والبحث العلمي (EB-1 / EB-2 NIW)',
        'تأشيرة التبادل الثقافي والتدريب (J-1 Exchange Program)'
      ],
      requirements: [
        'للقرعة الأمريكية: شهادة البكالوريا على الأقل، أو سنتان خبرة في مهنة تخصصية خلال آخر 5 سنوات، وصورة بيومترية دقيقة 600×600.',
        'لتأشيرات العمل: عقد عمل مع شركة أمريكية واستعدادها لدفع رسوم رعاية تأشيرة العمل وكفالتك أمام إدارة الهجرة (USCIS).',
        'سجل جنائي نظيف وفحص طبي شامل من طبيب معتمد من السفارة الأمريكية بالدار البيضاء.'
      ],
      costOfLiving: {
        monthlyRent: '1,400$ - 2,200$ USD شهرياً',
        foodAndLiving: '600$ - 900$ USD شهرياً',
        currency: 'USD (دولار أمريكي)',
        totalMadEstimate: '20,000 - 31,000 درهم شهرياً'
      },
      steps: [
        'التسجيل المجاني في قرعة أمريكا عبر الموقع الرسمي dvprogram.state.gov كل شهر أكتوبر.',
        'التحقق من نتيجة الفوز برقم التأكيد (Confirmation Number) في شهر ماي.',
        'تعبئة استمارة الهجرة DS-260 الإلكترونية وإرفاق الوثائق المدنية.',
        'المقابلة بالقنصلية الأمريكية بالدار البيضاء ودفع رسوم التأشيرة (330$).',
        'استلام البطاقة الخضراء (Green Card) عند الوصول للأراضي الأمريكية.'
      ],
      topCities: ['نيويورك (New York)', 'هيوستن (Houston)', 'شيكاغو (Chicago)', 'دالاس (Dallas)', 'أورلاندو (Orlando)'],
      officialPortal: 'travel.state.gov/content/travel/en/us-visas/immigrate.html',
      officialUrl: 'https://travel.state.gov',
      warning: 'التسجيل في القرعة الأمريكية مجاني 100%؛ احذر من المواقع التي تتقاضى رسوماً بادعاء زيادة فرص الفوز.'
    },

    // 6. NETHERLANDS
    {
      id: 'netherlands',
      name: 'الهجرة إلى هولندا (Netherlands)',
      flag: '🇳🇱',
      badge: 'سنة البحث Zoekjaar والكفاءات',
      salary: '3,200€ - 5,200€ شهرياً (35,000 - 56,000 درهم)',
      visaTypes: [
        'تأشيرة المهاجر عالي المهارات (Kennismigrant / Highly Skilled Migrant)',
        'تأشيرة سنة التوجيه والبحث عن عمل (Orientation Year - Zoekjaar)',
        'تأشيرة الابتكار والشركات الناشئة (Startup Visa)',
        'تصريح العمل العادي (Tewerkstellingsvergunning - TWV)'
      ],
      requirements: [
        'عقد عمل مع مشغل معترف به ومرخص لدى دائرة الهجرة الهولندية (IND Recognised Sponsor).',
        'الراتب في العقد يجب أن يستوفي الحد الأدنى القانوني (حوالي 3,923€ شهرياً لمن هم فوق 30 سنة، و 2,884€ لمن هم أقل من 30 سنة).',
        'لتأشيرة Zoekjaar: أن تكون حاصلاً على ماستر أو دكتوراه من أفضل 200 جامعة عالمية في آخر 3 سنوات.',
        'إتقان اللغة الإنجليزية بطلاقة (أغلب بيئات العمل في هولندا بالإنجليزية بالكامل).'
      ],
      costOfLiving: {
        monthlyRent: '900€ - 1,500€ شهرياً',
        foodAndLiving: '400€ - 600€ شهرياً',
        currency: 'EUR (يورو)',
        totalMadEstimate: '14,000 - 22,000 درهم شهرياً'
      },
      steps: [
        'التقديم على الوظائف في منصات الهولنديّة مثل LinkedIn Netherlands أو Monsterboard.',
        'يقوم المشغل الهولندي بإيداع طلب الإقامة والعمل الموحد (TEV) مباشرة لدى مصلحة IND.',
        'صدور قرار الموافقة خلال أسبوعين إلى 6 أسابيع.',
        'حجز موعد بالسفارة الهولندية بالرباط لاستلام ملصق تصريح الإقامة المؤقت (MVV).'
      ],
      topCities: ['أمستردام (Amsterdam)', 'روتردام (Rotterdam)', 'أوترخت (Utrecht)', 'آيندهوفن (Eindhoven)', 'لاهاي (Den Haag)'],
      officialPortal: 'ind.nl/en',
      officialUrl: 'https://ind.nl/en',
      warning: 'هولندا تعاني من أزمة سكن حادة؛ تأكد من تفاصيل السكن قبل توقيع عقد العمل والسفر.'
    },

    // 7. SWEDEN
    {
      id: 'sweden',
      name: 'الهجرة إلى السويد (Sweden)',
      flag: '🇸🇪',
      badge: 'تصريح العمل والبحث عن وظيفة',
      salary: '30,000 - 50,000 كرونة سويدية (28,000 - 47,000 درهم)',
      visaTypes: [
        'تصريح العمل السويدي المعتمد (Arbetstillstånd - Work Permit)',
        'تأشيرة البحث عن عمل للمتعلمين تعليماً عالياً (Job Seeker Visa)',
        'تصريح عمل رواد الأعمال الحرة (Self-employed Permit)',
        'برامج الإقامة للباحثين والطلبة الأكاديميين'
      ],
      requirements: [
        'عرض عمل من مشغل سويدي تم إعلانه في السويد والاتحاد الأوروبي (EURES) لمدة 10 أيام على الأقل.',
        'راتب شهري لا يقل عن 80% من متوسط الأجور السويدية (حالياً لا يقل عن 27,360 كرونة سويدية شهرياً).',
        'تأمين صحي، تأمين على الحياة، وتأمين تقاعدي يوفره المشغل وفق اتفاقيات العمل الجماعية.',
        'جواز سفر صالح يغطي كامل مدة العقد.'
      ],
      costOfLiving: {
        monthlyRent: '8,000 - 14,000 كرونة سويدية شهرياً',
        foodAndLiving: '4,000 - 6,000 كرونة شهرياً',
        currency: 'SEK (كرونة سويدية)',
        totalMadEstimate: '11,000 - 18,000 درهم شهرياً'
      },
      steps: [
        'تلقي عرض العمل الرسمي وإرسال المشغل لدعوة التقديم الإلكترونية عبر مصلحة الهجرة (Migrationsverket).',
        'تعبئة استمارة التقديم عبر الإنترنت ودفع رسوم الطلب (حوالي 2,200 كرونة).',
        'التقاط البصمات والصورة بمركز VFS Global أو السفارة السويدية بالرباط.',
        'استلام بطاقة تصريح الإقامة وتصريح العمل (Residence Permit Card).'
      ],
      topCities: ['ستوكهولم (Stockholm)', 'غوتنبرغ (Göteborg)', 'مالمو (Malmö)', 'أوبسالا (Uppsala)', 'لوند (Lund)'],
      officialPortal: 'migrationsverket.se/English.html',
      officialUrl: 'https://www.migrationsverket.se/English.html',
      warning: 'السويد تشترط الالتزام الصارم بشروط التأمينات الأربعة؛ أي نقص في تأمينات المشغل قد يهدد تجديد إقامتك.'
    }
  ];

  const current = countries.find(c => c.id === selectedCountry) || countries[0];

  return (
    <div className={`space-y-10 animate-fade-in ${isAr ? 'text-right' : 'text-left font-[\'Inter\',sans-serif]'}`}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. CLEAN TOP BANNER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Globe className="w-4 h-4" />
            <span>الدليل الشامل للهجرة القانونية للمغاربة 2026/2027 🌍</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            دليل الهجرة إلى 7 دول رائدة مع الشروط والرواتب وتكاليف المعيشة
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            معلومات موثوقة ومحدثة بنسبة 100% لكندا، أستراليا، ألمانيا، فرنسا، أمريكا، هولندا، والسويد دون وسطاء، مع محاكيات النقاط الرسمية.
          </p>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>الرجوع للصفحة السابقة</span>
          </button>
        )}
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SUB-TABS NAVIGATION (Tools Selector)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'programs', label: 'أدلة الدول الـ 7 والتأشيرات الرسمية', icon: Globe },
          { id: 'germany-calc', label: 'حاسبة نقاط فيزا ألمانيا 2026 (Chancenkarte)', icon: Calculator },
          { id: 'canada-check', label: 'فاحص شروط كندا (Express Entry / OFPPT)', icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 1: 7-COUNTRY IMMIGRATION PROFILES
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'programs' && (
        <div className="space-y-6">
          
          {/* Country Selection Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {countries.map(country => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  selectedCountry === country.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="font-bold text-xs line-clamp-1">{country.name.split(' ')[2] || country.name}</span>
                <span className={`text-[10px] font-semibold ${selectedCountry === country.id ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}`}>
                  {country.badge.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed Selected Country Dossier */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-7 shadow-xs">
            
            {/* Header of Country Dossier */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{current.flag}</span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {current.name}
                  </h2>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{current.badge}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                <span className="text-slate-500">متوسط الراتب التقديري: </span>
                <strong className="text-slate-900 dark:text-white font-mono block sm:inline">{current.salary}</strong>
              </div>
            </div>

            {/* Grid of Details: Visas, Requirements, Cost of Living, Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Visa Types */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Plane className="w-4 h-4 text-blue-600" />
                  <span>أنواع التأشيرات وبرامج الهجرة الرسمية:</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {current.visaTypes.map((v, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Requirements */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>شروط الأهلية والمعايير الأساسية:</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {current.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 3: Cost of Living */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <span>تكاليف المعيشة التقديرية (بالدرهم والعملة المحلية):</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>إيجار السكن الشهري (غرفة/استوديو):</span>
                    <strong className="text-slate-900 dark:text-white">{current.costOfLiving.monthlyRent}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>الأكل والمواصلات والخدمات:</span>
                    <strong className="text-slate-900 dark:text-white">{current.costOfLiving.foodAndLiving}</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold">
                    <span className="text-blue-600 dark:text-blue-400">إجمالي المصاريف بالدرهم المغربي:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{current.costOfLiving.totalMadEstimate}</strong>
                  </div>
                </div>
              </div>

              {/* Box 4: Top Cities */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>أفضل المدن للعيش والاستقرار وفرص الشغل:</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {current.topCities.map(city => (
                    <span key={city} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs">
                      {city}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Box 5: Application Steps */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>خطوات التقديم الرسمية من المغرب:</span>
              </h4>
              <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-decimal list-inside">
                {current.steps.map((st, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Footer Warning & Direct Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs">
              <div className="flex items-start gap-2.5 text-amber-900 dark:text-amber-300">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">تنبيه الشفافية القانونية:</strong>
                  <p>{current.warning}</p>
                </div>
              </div>

              <a
                href={current.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer self-start sm:self-center"
              >
                <span>البوابة الحكومية الرسمية</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: GERMANY CHANCENKARTE POINTS CALCULATOR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'germany-calc' && (
        <section className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 shadow-xs max-w-3xl mx-auto">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <span>محاكي نقاط بطاقة الفرصة الألمانية 2026 (Chancenkarte)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              تحتاج إلى ما لا يقل عن <strong>6 نقاط</strong> للحصول على تأشيرة البحث عن عمل القانونية بألمانيا.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1">
                  1. الشواهد والدبلومات المهنية (OFPPT / الجامعة):
                </label>
                <select
                  value={deQualification}
                  onChange={e => setDeQualification(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value={4}>اعتراف جزئي / دبلوم تقني متخصص معادل (4 نقاط)</option>
                  <option value={3}>شهادة مهنية في مهنة تعاني من الخصاص (3 نقاط)</option>
                  <option value={1}>دبلوم سنتين بعد الباك (نقطة واحدة)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1">
                  2. سنوات الخبرة المهنية الموثقة:
                </label>
                <select
                  value={deExperience}
                  onChange={e => setDeExperience(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value={3}>5 سنوات خبرة في نفس التخصص خلال آخر 7 سنوات (3 نقاط)</option>
                  <option value={2}>سنتان خبرة على الأقل في آخر 5 سنوات (نقطتان)</option>
                  <option value={0}>أقل من سنتين خبرة (0 نقطة)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1">
                  3. المستوى اللغوي (الألمانية / الإنجليزية):
                </label>
                <select
                  value={deLanguage}
                  onChange={e => setDeLanguage(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value={3}>مستوى B2 في الألمانية (3 نقاط)</option>
                  <option value={2}>مستوى B1 في الألمانية (نقطتان)</option>
                  <option value={1}>مستوى A2 ألماني أو B2 إنجليزي معتمد (نقطة واحدة)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1">
                  4. السن عند تقديم الطلب:
                </label>
                <select
                  value={deAge}
                  onChange={e => setDeAge(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value={2}>أقل من 35 سنة (نقطتان)</option>
                  <option value={1}>بين 35 و 40 سنة (نقطة واحدة)</option>
                  <option value={0}>أكثر من 40 سنة (0 نقطة)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="shortage"
                    checked={deShortage}
                    onChange={e => setDeShortage(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <label htmlFor="shortage" className="text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                    تخصصي من مهن الخصاص بألمانيا (تقني، كهروميكانيك، IT، تمريض) (+1 نقطة)
                  </label>
                </div>
              </div>

            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-4">
              <span className="text-[11px] font-bold uppercase text-blue-600">مجموع نقاطك المحسوبة</span>
              
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl sm:text-5xl font-black ${isDeEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                  {totalDePoints}
                </span>
                <span className="text-sm font-bold text-slate-500">من أصل 6 نقاط مطلوبة</span>
              </div>

              <div className={`p-4 rounded-xl text-xs leading-relaxed font-medium ${
                isDeEligible 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}>
                {isDeEligible ? (
                  <div className="space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>مبروك! ملفك يستوفي الحد الأدنى المطلوب قانونياً (6 نقاط).</span>
                    </p>
                    <p>يمكنك البدء في حجز موعد في السفارة الألمانية وإعداد الحساب البنكي المغلق (Sperrkonto).</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>مجموع نقاطك حالياً أقل من 6.</span>
                    </p>
                    <p>نوصي برفع مستواك في اللغة الألمانية إلى B1 أو مراكمة سنة خبرة إضافية للوصول للنصاب.</p>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 pt-2 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span>نقاط الشواهد:</span>
                  <span className="font-bold">{deQualification} نقاط</span>
                </div>
                <div className="flex justify-between">
                  <span>نقاط الخبرة:</span>
                  <span className="font-bold">{deExperience} نقاط</span>
                </div>
                <div className="flex justify-between">
                  <span>نقاط اللغة:</span>
                  <span className="font-bold">{deLanguage} نقاط</span>
                </div>
                <div className="flex justify-between">
                  <span>نقاط السن:</span>
                  <span className="font-bold">{deAge} نقاط</span>
                </div>
              </div>
            </div>

          </div>

        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 3: CANADA EXPRESS ENTRY SKILLED TRADES CHECKER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'canada-check' && (
        <section className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 shadow-xs max-w-3xl mx-auto">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>فاحص التأهل السريع لكندا (برنامج الحرف الفيدرالية FSTP / Express Entry)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              مخصص لخريجي التكوين المهني (OFPPT / ISTA) والتقنيين وأصحاب المهن الصناعية والحرفية بالمغرب.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1">
                  1. المستوى الدراسي والدبلوم:
                </label>
                <select
                  value={caDiploma}
                  onChange={e => setCaDiploma(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value="ofppt">دبلوم تقني أو تقني متخصص (OFPPT / ISTA سنتان)</option>
                  <option value="licence">إجازة مهنية أو جامعية (Bac+3)</option>
                  <option value="master">ماستر أو دبلوم مهندس دولة (Bac+5)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1">
                  2. سنوات الخبرة في مجال مهنتك:
                </label>
                <select
                  value={caExperienceYears}
                  onChange={e => setCaExperienceYears(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value={3}>3 سنوات فما فوق (مستوفي للشرط الفيدرالي)</option>
                  <option value={2}>سنتان خبرة (الحد الأدنى لبرنامج الحرف)</option>
                  <option value={1}>سنة واحدة فقط (غير كافية لبرنامج الحرف)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 dark:text-slate-200 mb-1">
                  3. نتيجة اختبار اللغة (TCF Canada / IELTS):
                </label>
                <select
                  value={caLanguageScore}
                  onChange={e => setCaLanguageScore(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value="clb7">مستوى CLB 7 فما فوق (B2 قوي - فرص سحب مرتفعة جداً)</option>
                  <option value="clb5">مستوى CLB 5 (الحد الأدنى المقبول في التحدث والاستماع)</option>
                </select>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="jobOffer"
                    checked={caHasJobOffer}
                    onChange={e => setCaHasJobOffer(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <label htmlFor="jobOffer" className="text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                    لدي عرض عمل معتمد من مشغل كندي برخصة LMIA (+50 إلى 200 نقطة)
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-4">
              <span className="text-[11px] font-bold uppercase text-blue-600">نتيجة فحص الأهلية المبدئية</span>
              
              <div className={`p-4 rounded-xl text-xs leading-relaxed font-medium ${
                isCaEligible
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}>
                {isCaEligible ? (
                  <div className="space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>أنت مؤهل مبدئياً للتقديم على برنامج الحرف الفيدرالية الكندية (FSTP)!</span>
                    </p>
                    <p>دبلومك وسنوات خبرتك تؤهلك لفتح ملف Express Entry. احرص على معادلة الدبلوم عبر WES واجتياز امتحان TCF Canada.</p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>تحتاج إلى سنتين خبرة على الأقل أو رفع مستوى اللغة.</span>
                    </p>
                    <p>برنامج الحرف الفيدرالي FSTP يتطلب سنتين من الخبرة المهنية المستمرة خلال آخر 5 سنوات.</p>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300">
                <p><strong>💡 نصيحة الخبراء للمغاربة:</strong></p>
                <p>اللغة الفرنسية (TCF Canada) تمنحك حتى 50 نقطة إضافية في نظام Express Entry حتى لو كنت تملك إنجليزية متوسطة.</p>
              </div>
            </div>

          </div>

        </section>
      )}

    </div>
  );
};

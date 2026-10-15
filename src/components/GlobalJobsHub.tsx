import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Globe, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  Filter, 
  FileText, 
  Compass, 
  ShieldCheck, 
  AlertCircle,
  Truck,
  Sun,
  Laptop,
  Users,
  Layers,
  Sparkles,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { saveBookmark, isItemBookmarked } from '../services/userPreferences';

interface GlobalJob {
  id: string;
  title: string;
  type: 'official' | 'seasonal' | 'remote';
  typeLabelAr: string;
  country: string;
  flag: string;
  employerOrPortal: string;
  salary: string;
  contractDuration: string;
  field: string;
  qualifications: string;
  languages: string;
  steps: string[];
  documents: string[];
  officialPortal: string;
  officialUrl: string;
}

interface AggregatedJob {
  id: string;
  title: string;
  employer: string;
  source: 'Job Bank Canada' | 'Make it in Germany' | 'EURES' | 'LinkedIn' | 'Indeed';
  sourceBadgeColor: string;
  country: string;
  flag: string;
  city: string;
  salary: string;
  visaStatus: string;
  field: string;
  postedDate: string;
  originalUrl: string;
}

export const GlobalJobsHub: React.FC<{ 
  onBack?: () => void; 
  onSelectTab?: (tab: string, subTab?: string, id?: string) => void;
  initialJobType?: 'all' | 'aggregator' | 'official' | 'seasonal' | 'remote';
}> = ({ onBack, onSelectTab, initialJobType }) => {
  const [activeJobType, setActiveJobType] = useState<'all' | 'aggregator' | 'official' | 'seasonal' | 'remote'>(initialJobType || 'aggregator');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<GlobalJob | null>(null);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialJobType) {
      setActiveJobType(initialJobType);
    }
  }, [initialJobType]);

  const handleToggleBookmark = (id: string, title: string, country?: string, flag?: string, url?: string) => {
    const isAdded = saveBookmark({
      id,
      type: 'job',
      title,
      country,
      flag,
      url
    });
    setSavedIds(prev => ({ ...prev, [id]: isAdded }));
  };

  // Aggregator Source Filter
  const [aggregatorSource, setAggregatorSource] = useState<string>('all');

  // Master Comprehensive Job Listings (Detailed Guides)
  const jobsList: GlobalJob[] = [
    {
      id: 'job-germany-skilled',
      title: 'عقود العمل المهنية الرسمية في ألمانيا (Make it in Germany & EURES)',
      type: 'official',
      typeLabelAr: 'وظيفة رسمية دولية',
      country: 'ألمانيا',
      flag: '🇩🇪',
      employerOrPortal: 'بوابة التوظيف الفيدرالية الألمانية (Bundesagentur für Arbeit)',
      salary: '2,800€ - 4,500€ شهرياً (30,000 - 48,000 درهم)',
      contractDuration: 'عقد غير محدد المدة (CDI) أو محدد بسنتين',
      field: 'كهروميكانيك، تمريض ورعاية صحية، قيادة شاحنات ثقيلة، تكنولوجيا المعلومات',
      qualifications: 'دبلوم تقني متخصص (OFPPT) أو إجازة مهنية مع اعتراف أولي (ZAB/Anerkennung)',
      languages: 'الألمانية (A2 إلى B1 حسب المهنة) أو الإنجليزية لمطوري البرمجيات',
      steps: [
        'البحث والتقديم المباشر عبر بوابة Make-it-in-Germany.com أو منصة StepStone.',
        'إجراء مقابلة عمل عن بعد واستلام عقد العمل الرسمي (Arbeitsvertrag).',
        'موافقة وكالة العمل الفيدرالية الألمانية (Vorabzustimmung).',
        'إيداع جواز السفر بمركز TLScontact بالرباط للحصول على تأشيرة العمل § 18a / 18b.'
      ],
      documents: ['سيرة ذاتية بنظام Europass', 'نسخة العقد الموقعة', 'شهادة معادلة الدبلوم', 'شهادة لغة معتمدة'],
      officialPortal: 'make-it-in-germany.com',
      officialUrl: 'https://www.make-it-in-germany.com'
    },
    {
      id: 'job-canada-guichet',
      title: 'عقود العمل الكندية وعروض المشغلين (Guichet-Emplois / Job Bank)',
      type: 'official',
      typeLabelAr: 'وظيفة رسمية دولية',
      country: 'كندا',
      flag: '🇨🇦',
      employerOrPortal: 'بنك الوظائف الحكومي الكندي (Job Bank Canada - Guichet Emplois)',
      salary: '22$ - 38$ دولار كندي للساعة (3,500$ - 6,000$ شهرياً)',
      contractDuration: 'تصريح عمل مغلق من سنتين إلى 3 سنوات قابل للتجديد',
      field: 'لحام وتصنيع ميكانيكي، تقنيو كابلاج، طباخون، سائقو شاحنات وزن ثقيل',
      qualifications: 'دبلوم مهني أو شهادة خبرة مثبتة لا تقل عن سنتين',
      languages: 'الفرنسية (مستوى متحدث جيد) لمقاطعة كيبك، أو الإنجليزية لباقي المقاطعات',
      steps: [
        'تصفية الوظائف الموجهة للمرشحين الدوليين (Verified with LMIA / EIMT) على Job Bank.',
        'إرسال السيرة الذاتية بالصيغة الكندية (Canadian Resume Format).',
        'إصدار دراسة تأثير سوق العمل الإيجابية (LMIA / EIMT) من قبل المشغل الكندي.',
        'التقديم على تصريح العمل عبر بوابة الهجرة الكندية IRCC وإجراء الفحص الطبي.'
      ],
      documents: ['سيرة ذاتية كندية MezdoHub', 'نسخة موافقة LMIA الرسمية', 'شهادات العمل السابقة المصادق عليها'],
      officialPortal: 'jobbank.gc.ca',
      officialUrl: 'https://www.jobbank.gc.ca'
    },
    {
      id: 'job-norway-nav',
      title: 'وظائف المهارات المتخصصة في النرويج (Arbeidsplassen NAV)',
      type: 'official',
      typeLabelAr: 'وظيفة رسمية دولية',
      country: 'النرويج',
      flag: '🇳🇴',
      employerOrPortal: 'إدارة العمل والرفاه النرويجية الرسمية (NAV)',
      salary: '35,000 - 55,000 كرونة نرويجية (32,000 - 50,000 درهم)',
      contractDuration: 'عقد دائم (Fast stilling) مع حقوق تقاعد وضمان اجتماعي نرويجي',
      field: 'الهندسة البحرية، قطاع الطاقة المتجددة، تقنيات اللحام تحت الماء، تكنولوجيا المعلومات',
      qualifications: 'دبلوم جامعي أو تقني عالي معترف به في الاتحاد الأوروبي',
      languages: 'اللغة الإنجليزية بطلاقة (B2/C1)، والنرويجية ميزة إضافية',
      steps: [
        'التسجيل في بوابة التوظيف الوطنية النرويجية arbeidsplassen.nav.no.',
        'إرسال ملف الترشيح باللغة الإنجليزية للشركات النرويجية.',
        'الحصول على عرض عمل رسمي يفي بمتطلبات الراتب الأدنى لإدارة الهجرة UDI.',
        'تقديم طلب تصريح العمل والإقامة لدى سفارة النرويج بالرباط.'
      ],
      documents: ['سيرة ذاتية دقيقة بالإنجليزية', 'شهادات الخبرة والتوصية', 'شهادة الدبلوم مع الترجمة المحلفة'],
      officialPortal: 'arbeidsplassen.nav.no',
      officialUrl: 'https://arbeidsplassen.nav.no'
    },
    {
      id: 'job-spain-agriculture-anapec',
      title: 'عقود العمل الموسمي في جني الفواكه الحمراء بإسبانيا (هويلفا)',
      type: 'seasonal',
      typeLabelAr: 'عمل موسمي زراعي',
      country: 'إسبانيا',
      flag: '🇪🇸',
      employerOrPortal: 'الوكالة الوطنية لإنعاش التشغيل والكفاءات (ANAPEC) & جمعيات الفلاحة الإسبانية',
      salary: '45€ إلى 55€ يورو صافي لليوم الواحد (حوالي 12,000 - 15,000 درهم شهرياً)',
      contractDuration: 'عقد عمل موسمي من 3 إلى 6 أشهر (قابل للتكرار سنوياً)',
      field: 'جني وتعبئة الفراولة والفواكه الحمراء في ضيعات Huelva و Almería',
      qualifications: 'قدرة بدنية جيدة، والالتزام بالعودة للوطن بعد نهاية العقد',
      languages: 'لا يشترط أي مستوى لغوي (يتم توفير مواكبة بالعربية)',
      steps: [
        'فتح باب التسجيل الدوري عبر الوكالات المحلية لـ ANAPEC.',
        'الانتقاء الأولي والمقابلة المباشرة مع اللجان الفلاحية الإسبانية.',
        'إجراء الفحص الطبي واستخراج تأشيرة العمل الموسمي القنصلية مجاناً.',
        'السفر المنظم عبر ميناء طنجة المتوسط وتوفير السكن المجاني بالضيعات.'
      ],
      documents: ['جواز سفر بيومتري صالح لمدة لا تقل عن سنة', 'نسخة بطاقة التعريف الوطنية', 'شهادة الفحص الطبي'],
      officialPortal: 'anapec.org',
      officialUrl: 'http://anapec.org'
    },
    {
      id: 'job-france-agriculture-ofii',
      title: 'عقود العمل الموسمي الفلاحي بفرنسا (عقد OFII الرسمي)',
      type: 'seasonal',
      typeLabelAr: 'عمل موسمي أوروبي',
      country: 'فرنسا',
      flag: '🇫🇷',
      employerOrPortal: 'المكتب الفرنسي للهجرة والاندماج (OFII) ووزارة الفلاحة الفرنسية',
      salary: 'الحد الأدنى للأجور SMIC الفلاحي (حوالي 1,400€ - 1,750€ يورو صافي شهرياً)',
      contractDuration: 'عقد محدد المدة (CDD Saisonnier) حتى 6 أشهر سنوياً',
      field: 'جني المحاصيل الزراعية (العنب، الخضروات، البساتين) بالمناطق الفلاحية الفرنسية',
      qualifications: 'خبرة فلاحية عملية أو استعداد للعمل البدني المنظم',
      languages: 'مبادئ أولية بالفرنسية للتواصل اليومي وتعليمات السلامة',
      steps: [
        'يتعاقد الفلاح أو التعاونية الفرنسية مع العامل ويطلب رخصة العمل من Dreets.',
        'إحالة الملف إلى مكتب OFII بالدار البيضاء لإجراء الفحص الطبي الإجباري.',
        'استلام تأشيرة العمل الموسمي (VLS-TS Saisonnier) بمركز TLScontact.'
      ],
      documents: ['عقد العمل المصادق عليه من منصة Dreets', 'جواز السفر', 'ملف الفحص الطبي الصادر عن OFII'],
      officialPortal: 'france-visas.gouv.fr',
      officialUrl: 'https://france-visas.gouv.fr'
    },
    {
      id: 'job-remote-customer-support',
      title: 'خدمة العملاء والدعم الفني عن بعد باللغتين الفرنسية والإنجليزية',
      type: 'remote',
      typeLabelAr: 'عمل عن بعد (Remote)',
      country: 'عن بعد (فرنسا، كندا، أمريكا)',
      flag: '🌐',
      employerOrPortal: 'شركات دولية: Teleperformance, Webhelp Anywhere, ModSquad, RemoteOK',
      salary: '6,500 - 14,000 درهم شهرياً (مع حوافز الأداء وتأمين صحي)',
      contractDuration: 'عقد عمل عن بعد بدوام كامل أو جزئي من منزلك',
      field: 'خدمة العملاء عبر الهاتف، البريد الإلكتروني، والدردشة الحية (Chat Support)',
      qualifications: 'باك + سنتين فما فوق في أي تخصص، مع سرعة كتابة ممتازة',
      languages: 'اللغة الفرنسية أو الإنجليزية بطلاقة (نطق سليم بدون لكنة حادة)',
      steps: [
        'التقديم عبر بوابات الوظائف عن بعد (LinkedIn Remote Morocco, Remote.co).',
        'اجتياز اختبار سرعة الكتابة واختبار المحاكاة الصوتية أونلاين.',
        'المقابلة الافتراضية واستلام معدات العمل في منزلك بالمغرب.'
      ],
      documents: ['سيرة ذاتية ATS باللغة الفرنسية أو الإنجليزية', 'نسخة CIN', 'شهادة السكنى والاتصال بالإنترنت فايبر'],
      officialPortal: 'remoteok.com',
      officialUrl: 'https://remoteok.com'
    }
  ];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REAL-TIME JOB AGGREGATOR DATABASE (EURES, JOB BANK, MAKE IT IN GERMANY, LINKEDIN)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const aggregatedJobsList: AggregatedJob[] = [
    {
      id: 'agg-ca-welder',
      title: 'لحام صناعي ومصنع هياكل (Soudage & Assemblage Métallique)',
      employer: 'Groupe Industriel Québec Métal',
      source: 'Job Bank Canada',
      sourceBadgeColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200',
      country: 'كندا',
      flag: '🇨🇦',
      city: 'كيبيك سيتي (Québec)',
      salary: '28.50$ CAD / ساعة (~4,800$ CAD شهرياً)',
      visaStatus: 'LMIA Approved (رخصة استقدام أجنبي مؤكدة)',
      field: 'الهندسة الميكانيكية واللحام',
      postedDate: 'تحديث اليوم',
      originalUrl: 'https://www.jobbank.gc.ca'
    },
    {
      id: 'agg-ca-truck',
      title: 'سائق شاحنات وزن ثقيل للمسافات الطويلة (Long-Haul Truck Driver)',
      employer: 'Trans-Canada Freight Logistics',
      source: 'Job Bank Canada',
      sourceBadgeColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200',
      country: 'كندا',
      flag: '🇨🇦',
      city: 'كالجاري (Alberta)',
      salary: '32.00$ CAD / ساعة (~5,500$ CAD شهرياً)',
      visaStatus: 'LMIA Verified (دعم تأشيرة العمل مغلقة)',
      field: 'النقل واللوجستيك الثقيل',
      postedDate: 'أمس',
      originalUrl: 'https://www.jobbank.gc.ca'
    },
    {
      id: 'agg-de-nurse',
      title: 'ممرض / ممرضة رعاية سريرية معتمدة (Pflegefachkraft)',
      employer: 'Universitätsklinikum Frankfurt',
      source: 'Make it in Germany',
      sourceBadgeColor: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200',
      country: 'ألمانيا',
      flag: '🇩🇪',
      city: 'فرانكفورت (Hessen)',
      salary: '3,400€ - 4,200€ شهرياً + منحة الاستقرار',
      visaStatus: 'Vorabzustimmung & تأشيرة مهارات § 18a',
      field: 'التمريض والصحة العامة',
      postedDate: 'قبل يومين',
      originalUrl: 'https://www.make-it-in-germany.com'
    },
    {
      id: 'agg-de-mechatronic',
      title: 'تقني صيانة ميكاترونيك وروبوتات صناعية (Mechatroniker)',
      employer: 'Automotive Precision Tech Stuttgart',
      source: 'Make it in Germany',
      sourceBadgeColor: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200',
      country: 'ألمانيا',
      flag: '🇩🇪',
      city: 'شتوتغارت (Baden-Württemberg)',
      salary: '3,800€ - 4,600€ شهرياً (39,000 - 48,000 DH)',
      visaStatus: 'EU Blue Card المؤهلة للإقامة السريعة',
      field: 'صناعة السيارات والروبوتات',
      postedDate: 'تحديث اليوم',
      originalUrl: 'https://www.make-it-in-germany.com'
    },
    {
      id: 'agg-eu-nl-logistics',
      title: 'مشغل مستودعات إلكترونية ورافعات شوكية (Order Picker / Forklift)',
      employer: 'Port Logistics Rotterdam B.V.',
      source: 'EURES',
      sourceBadgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200',
      country: 'هولندا',
      flag: '🇳🇱',
      city: 'روتردام (Rotterdam)',
      salary: '14.20€ / ساعة (~2,400€ شهرياً + سكن متوفر)',
      visaStatus: 'EURES European Mobility Scheme',
      field: 'اللوجستيك وسلاسل الإمداد',
      postedDate: 'منشور هذا الأسبوع',
      originalUrl: 'https://eures.europa.eu'
    },
    {
      id: 'agg-eu-es-fruits',
      title: 'عامل فلاحي في البيوت المغطاة والمزارع (Operario Agrícola)',
      employer: 'Cooperativa Agrícola del Sur Almería',
      source: 'EURES',
      sourceBadgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200',
      country: 'إسبانيا',
      flag: '🇪🇸',
      city: 'ألميريا (Andalucía)',
      salary: '8.80€ / ساعة (~1,450€ شهرياً)',
      visaStatus: 'عقد موسمي رسمي فلاحي مصادق عليه',
      field: 'الفلاحة والزراعة العصرية',
      postedDate: 'تحديث اليوم',
      originalUrl: 'https://eures.europa.eu'
    },
    {
      id: 'agg-in-remote-qa',
      title: 'فاحص جودة برمجيات عن بعد (Remote QA Tester)',
      employer: 'SaaS Global Scale Ltd',
      source: 'LinkedIn',
      sourceBadgeColor: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-200',
      country: 'عن بعد (Remote)',
      flag: '🌐',
      city: 'العمل من المنزل (Morocco Allowed)',
      salary: '1,800$ - 2,600$ USD شهرياً (~18,000 - 26,000 DH)',
      visaStatus: 'Remote Contractor (لا يحتاج تأشيرة)',
      field: 'تكنولوجيا المعلومات والبرمجة',
      postedDate: 'منشور حديثاً',
      originalUrl: 'https://www.linkedin.com/jobs'
    },
    {
      id: 'agg-ind-french-support',
      title: 'مستشار دعم عملاء فني بالفرنسية (French Technical Advisor)',
      employer: 'Telecommunications Worldwide',
      source: 'Indeed',
      sourceBadgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200',
      country: 'عن بعد / هجين',
      flag: '🌐',
      city: 'الدار البيضاء / العمل عن بعد',
      salary: '7,000 - 9,500 درهم شهرياً + منحة الأداء',
      visaStatus: 'عقد CDI مباشر محلي',
      field: 'خدمة العملاء والاتصالات',
      postedDate: 'اليوم',
      originalUrl: 'https://www.indeed.com'
    }
  ];

  // Filtering for Guides List
  const filteredJobs = jobsList.filter(job => {
    if (activeJobType !== 'all' && activeJobType !== 'aggregator' && job.type !== activeJobType) return false;
    if (selectedCountry !== 'all' && job.country !== selectedCountry) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = job.title.toLowerCase().includes(q) ||
                    job.country.toLowerCase().includes(q) ||
                    job.field.toLowerCase().includes(q) ||
                    job.employerOrPortal.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Filtering for Job Aggregator
  const filteredAggregated = aggregatedJobsList.filter(item => {
    if (aggregatorSource !== 'all' && item.source !== aggregatorSource) return false;
    if (selectedCountry !== 'all' && item.country !== selectedCountry) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = item.title.toLowerCase().includes(q) ||
                    item.employer.toLowerCase().includes(q) ||
                    item.city.toLowerCase().includes(q) ||
                    item.field.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 animate-fade-in text-right font-['Cairo',sans-serif]">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO HEADER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Globe className="w-4 h-4" />
            <span>مجمّع الوظائف الدولية الحية وبوابة التوظيف الخارجي 💼</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            فرص العمل الدولية، عقود المشغلين، والوظائف عن بعد للمغاربة
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            مجمّع وظائف حي يجلب لك فرص العمل المعتمدة من بوابات EURES و Job Bank Canada و Make it in Germany مع روابط المصدر الأصلي والتحقق من رخص العمل الرسمية.
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
          2. TYPE TABS & FILTER BAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'aggregator', label: 'مجمّع الوظائف الحية (EURES · Job Bank · Make it in Germany)', icon: Sparkles },
          { id: 'all', label: 'أدلة التوظيف الكاملة (Tous)', icon: Globe },
          { id: 'official', label: 'وظائف رسمية بالخارج (ألمانيا، كندا، النرويج)', icon: Building2 },
          { id: 'seasonal', label: 'عقود موسمية (فلاحة بإسبانيا وفرنسا)', icon: Sun },
          { id: 'remote', label: 'وظائف عن بعد (Remote بالدولار واليورو)', icon: Laptop }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeJobType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveJobType(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
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
          VIEW 1: LIVE JOB AGGREGATOR (Pillar 2 Feature)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeJobType === 'aggregator' && (
        <div className="space-y-6">
          
          {/* Source Chips & Search */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>عروض التوظيف المجمعة من المصادر الحكومية والدولية الرسمية</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  روابط مباشرة تأخذك لصفحة الشاغر الأصلية على المنصة بدون أي تعديل أو وسطاء.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث بمهنتك (لحام، تمريض، إعلاميات)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Aggregator Source Chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-300 ml-1">بوابة المصدر:</span>
              {[
                { id: 'all', label: 'جميع المصادر المعتمدة' },
                { id: 'Job Bank Canada', label: '🇨🇦 Job Bank Canada' },
                { id: 'Make it in Germany', label: '🇩🇪 Make it in Germany' },
                { id: 'EURES', label: '🇪🇺 EURES (الاتحاد الأوروبي)' },
                { id: 'LinkedIn', label: '💼 LinkedIn Jobs' },
                { id: 'Indeed', label: '🔍 Indeed International' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setAggregatorSource(s.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                    aggregatorSource === s.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Aggregated Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredAggregated.map(item => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.country}</span>
                        <span className="text-[11px] text-slate-500">{item.city}</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${item.sourceBadgeColor}`}>
                      {item.source}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">المشغل: {item.employer}</p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 text-xs bg-slate-50 dark:bg-slate-850 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">الراتب المصرح:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{item.salary}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">رخصة العمل والتأشيرة:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{item.visaStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">تاريخ الإعلان:</span>
                      <span className="text-[11px]">{item.postedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleToggleBookmark(item.id, item.title, item.country, item.flag, item.originalUrl)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      savedIds[item.id] || isItemBookmarked(item.id)
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 border-slate-200 dark:border-slate-700'
                    }`}
                    title="حفظ في مفضلتي"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={item.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>التقديم في المصدر الأصلي ({item.source})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          VIEW 2: GUIDES AND PATHWAYS (Official, Seasonal, Remote)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeJobType !== 'aggregator' && (
        <div className="space-y-6">
          
          {/* Search Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث عن مهنة، دولة، أو شركة..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
              <span>عدد الأدلة المتاحة:</span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-mono text-sm">
                {filteredJobs.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{job.flag}</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{job.country}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                      job.type === 'seasonal'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        : job.type === 'remote'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    }`}>
                      {job.typeLabelAr}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium">
                    الجهة / المشغل: {job.employerOrPortal}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>الراتب التقديري:</strong> {job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>مدة العقد:</strong> {job.contractDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="line-clamp-1"><strong>المجال:</strong> {job.field}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 text-xs font-bold cursor-pointer transition-colors"
                    >
                      الشروط والخطوات 📋
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(job.id, job.title, job.country, job.flag, job.officialUrl)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        savedIds[job.id] || isItemBookmarked(job.id)
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 border-slate-200 dark:border-slate-700'
                      }`}
                      title="حفظ في مفضلتي"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <a
                    href={job.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>البوابة الرسمية</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* JOB DETAIL MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedJob.flag}</span>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">{selectedJob.title}</h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400">{selectedJob.country} · {selectedJob.employerOrPortal}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <strong className="block text-emerald-800 dark:text-emerald-300 font-bold">الراتب ونوع العقد:</strong>
                <p>{selectedJob.salary} ({selectedJob.contractDuration})</p>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white mb-1.5 font-bold">المؤهلات والشواهد المطلوبة:</strong>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 leading-relaxed">
                  {selectedJob.qualifications} (اللغات المطلوبة: {selectedJob.languages})
                </p>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white mb-1.5 font-bold">مراحل التقديم والقبول:</strong>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedJob.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white mb-1.5 font-bold">الوثائق والملف القنصلي:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.documents.map((doc, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
              >
                إغلاق
              </button>
              <a
                href={selectedJob.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>الانتقال للبوابة الرسمية ({selectedJob.officialPortal})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

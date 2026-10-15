import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Globe, 
  Award, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  FileText, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Building, 
  BookmarkCheck, 
  AlertCircle, 
  HelpCircle, 
  Plane, 
  Filter, 
  Sparkles, 
  MapPin, 
  Languages,
  Bookmark
} from 'lucide-react';
import { saveBookmark, isItemBookmarked } from '../services/userPreferences';

interface Scholarship {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  flag: string;
  provider: string;
  coverage: 'fully-funded' | 'partial';
  coverageLabelAr: string;
  degrees: ('Bachelor' | 'Master' | 'PhD')[];
  deadline: string;
  stipend: string;
  fields: string;
  requirements: string[];
  documents: string[];
  officialPortal: string;
  officialUrl: string;
  tips: string;
}

interface UniversityItem {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  language: 'english' | 'french' | 'german' | 'spanish' | 'turkish' | 'multilingual';
  languageLabelAr: string;
  tuitionTier: 'free' | 'low' | 'medium';
  tuitionCost: string;
  popularFields: string[];
  acceptanceRate: string;
  languageScoreRequired: string;
  livingCostMonthly: string;
  officialPortal: string;
  officialUrl: string;
  badge: string;
}

export const StudyAbroadHub: React.FC<{ 
  onBack?: () => void; 
  onSelectTab?: (tab: string, subTab?: string, id?: string) => void;
  initialSubTab?: 'scholarships' | 'universities' | 'admission-guide' | 'student-visa';
}> = ({ onBack, onSelectTab, initialSubTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<'scholarships' | 'universities' | 'admission-guide' | 'student-visa'>(initialSubTab || 'scholarships');
  const [filterCoverage, setFilterCoverage] = useState<'all' | 'fully-funded' | 'partial'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const handleToggleBookmark = (id: string, type: 'scholarship' | 'university', title: string, country?: string, flag?: string, url?: string) => {
    const isAdded = saveBookmark({
      id,
      type,
      title,
      country,
      flag,
      url
    });
    setSavedIds(prev => ({ ...prev, [id]: isAdded }));
  };

  // University Database Filters
  const [uniCountryFilter, setUniCountryFilter] = useState<string>('all');
  const [uniLanguageFilter, setUniLanguageFilter] = useState<string>('all');
  const [uniTuitionFilter, setUniTuitionFilter] = useState<string>('all');
  const [uniSearchQuery, setUniSearchQuery] = useState<string>('');

  const scholarships: Scholarship[] = [
    {
      id: 'sch-turkey-burslari',
      title: 'منحة الحكومة التركية الممولة بالكامل (Türkiye Bursları 2026/2027)',
      country: 'تركيا',
      countryCode: 'TR',
      flag: '🇹🇷',
      provider: 'وزارة التعليم العالي ورئاسة شؤون أتراك المهجر (YTB)',
      coverage: 'fully-funded',
      coverageLabelAr: 'ممولة بالكامل 100%',
      degrees: ['Bachelor', 'Master', 'PhD'],
      deadline: '20 فبراير سنوياً',
      stipend: 'راتب شهري (1700 - 3000 ليرة) + سكن جامعي مجاني + تذاكر الطيران ذهاباً وإياباً + سنة لغة تركية مجانية',
      fields: 'كافة التخصصات (الطب، الهندسة، إدارة الأعمال، العلوم الإنسانية، التكنولوجيا)',
      requirements: [
        'معدل لا يقل عن 70% للبكالوريوس (75% للتخصصات الصحية والطب)',
        'السن: أقل من 21 سنة للبكالوريوس، أقل من 30 سنة للماستر، أقل من 35 للدكتوراه',
        'عدم امتلاك الجنسية التركية أو التسجيل المسبق بجامعة تركية'
      ],
      documents: [
        'نسخة من بطاقة التعريف أو جواز السفر',
        'شهادة البكالوريا مع بيان النقط العام',
        'رسالة تحفيزية شخصية (Statement of Purpose)',
        'رسالتا توصية من أساتذة معتمدين'
      ],
      officialPortal: 'turkiyeburslari.gov.tr',
      officialUrl: 'https://www.turkiyeburslari.gov.tr',
      tips: 'ركز في رسالة الدوافع على كيفية مساهمة دراستك بتركيا في بناء مشاريع تنموية بالمغرب.'
    },
    {
      id: 'sch-germany-daad',
      title: 'منحة الهيئة الألمانية للتبادل الثقافي (DAAD Helmut-Schmidt & EPOS)',
      country: 'ألمانيا',
      countryCode: 'DE',
      flag: '🇩🇪',
      provider: 'Deutscher Akademischer Austauschdienst (DAAD)',
      coverage: 'fully-funded',
      coverageLabelAr: 'ممولة بالكامل 100%',
      degrees: ['Master', 'PhD'],
      deadline: 'بين يوليو وأكتوبر حسب التخصص',
      stipend: '934€ شهرياً للماستر (1,300€ للدكتوراه) + تأمين صحي شامل + بدل سفر + دورة لغة ألمانية تحضيرية',
      fields: 'التنمية المستدامة، الهندسة، الاقتصاد، الحكامة والسياسات العامة، الصحة العامة',
      requirements: [
        'إجازة جامعية أو ماستر بميزة مستحسن على الأقل (أقل من 6 سنوات من التخرج)',
        'سنتان من الخبرة المهنية بعد التخرج (لبرنامج EPOS)',
        'إتقان الإنجليزية (IELTS 6.5+) أو الألمانية (TestDaF 4)'
      ],
      documents: [
        'استمارة DAAD موقعة',
        'سيرة ذاتية بنظام Europass الأوروبي',
        'رسالة دوافع مفصلة (Motivation Letter)',
        'شواهد العمل والتدريب مترجمة للإنجليزية أو الألمانية'
      ],
      officialPortal: 'daad.de/en',
      officialUrl: 'https://www.daad.de',
      tips: 'اختر برامج دراسية بالإنجليزية ولا تتطلب إتقاناً للألمانية إذا كنت لا تملك شواهد Goethe.'
    },
    {
      id: 'sch-romania-mae',
      title: 'منحة وزارة الشؤون الخارجية الرومانية (Bourse Roumanie MAE)',
      country: 'رومانيا',
      countryCode: 'RO',
      flag: '🇷🇴',
      provider: 'وزارة الخارجية الرومانية (MAE)',
      coverage: 'fully-funded',
      coverageLabelAr: 'ممولة بالكامل (إعفاء من الرسوم + سكن + راتب)',
      degrees: ['Bachelor', 'Master', 'PhD'],
      deadline: 'مارس سنوياً عبر البوابة الرقمية',
      stipend: 'إعفاء 100% من رسوم الدراسة + سكن جامعي مجاني + منحة شهرية (65€ - 85€) + سنة لغة رومانية مجانية',
      fields: 'الهندسة، الزراعة، الاقتصاد، العلوم السياسية (باستثناء الطب وطب الأسنان والصيدلة)',
      requirements: [
        'الحصول على نتائج أكاديمية جيدة (معدل عام لا يقل عن 12/20)',
        'مواطنون مغاربة غير مقيمين بالاتحاد الأوروبي',
        'التقديم حصراً عبر البوابة الإلكترونية الرسمية studyinromania.gov.ro'
      ],
      documents: [
        'شهادة البكالوريا وبيان النقط مترجمة للفرنسية أو الإنجليزية',
        'عقد الازدياد الرسمي مترجم',
        'سيرة ذاتية ورسالة تحفيزية',
        'نسخة واضحة من جواز السفر'
      ],
      officialPortal: 'studyinromania.gov.ro',
      officialUrl: 'https://studyinromania.gov.ro',
      tips: 'السنة التحضيرية للغة الرومانية تمنحك إقامة جامعية أوروبية وقدرة على السفر في فضاء شنغن.'
    },
    {
      id: 'sch-hungary-stipendium',
      title: 'منحة الحكومة المجرية (Stipendium Hungaricum للمغاربة)',
      country: 'المجر (هنغاريا)',
      countryCode: 'HU',
      flag: '🇭🇺',
      provider: 'وزارة الخارجية والتجارة المجرية ومؤسسة Tempus Public Foundation',
      coverage: 'fully-funded',
      coverageLabelAr: 'ممولة بالكامل (دراسة بالإنجليزية)',
      degrees: ['Bachelor', 'Master', 'PhD'],
      deadline: '15 يناير سنوياً',
      stipend: 'إعفاء كامل من الرسوم الدراسية + سكن جامعي مجاني أو بدل سكن (40,000 فورنت) + راتب شهري + تأمين صحي',
      fields: 'كافة التخصصات باللغة الإنجليزية: الطب البشري، الصيدلة، هندسة البرمجيات، العلوم الزراعية',
      requirements: [
        'ترشيح مسبق من وزارة التعليم العالي والبحث العلمي والابتكار المغربية (Mabourse)',
        'إتقان اللغة الإنجليزية (IELTS 5.5+ أو شهادة من الجامعة)',
        'نتائج دراسية بمعدل لا يقل عن 12/20'
      ],
      documents: [
        'ملف التسجيل في البوابة المجرية apply.stipendiumhungaricum.hu',
        'شهادة طبية رسمية بخلو الأمراض المعدية',
        'كشف النقط لآخر سنتين دراسيتين مترجم للإنجليزية'
      ],
      officialPortal: 'stipendiumhungaricum.hu',
      officialUrl: 'https://stipendiumhungaricum.hu',
      tips: 'يجب التسجيل في بوابتين في نفس الوقت: البوابة المجرية وبوابة وزارة التعليم العالي المغربية.'
    },
    {
      id: 'sch-erasmus-mundus',
      title: 'منحة الاتحاد الأوروبي للماستر المشترك (Erasmus Mundus Joint Masters)',
      country: 'الاتحاد الأوروبي (فرنسا، ألمانيا، إسبانيا، إيطاليا)',
      countryCode: 'EU',
      flag: '🇪🇺',
      provider: 'المفوضية الأوروبية (European Commission)',
      coverage: 'fully-funded',
      coverageLabelAr: 'منحة النخبة الأوروبية (1,400€ شهرياً)',
      degrees: ['Master'],
      deadline: 'بين ديسمبر وفبراير سنوياً',
      stipend: 'راتب شهري سخي (1,400 يورو شهرياً) + تغطية الرسوم الدراسية بنسبة 100% + تكاليف السفر والتأمين الدولي',
      fields: 'أكثر من 150 برنامج ماستر متخصص في الذكاء الاصطناعي، البيئة، الطاقة، وحقوق الإنسان',
      requirements: [
        'شهادة الإجازة الجامعية (Bac+3) أو ماستر في تخصص مطابق',
        'إتقان الإنجليزية بمستوى ممتاز (IELTS 6.5 - 7.0)',
        'الدراسة في جامعتين أوروبيتين مختلفتين على الأقل خلال سنتين'
      ],
      documents: [
        'سيرة ذاتية وفق نموذج Europass',
        'رسالة تحفيزية شخصية تشرح ملاءمة البرنامج',
        'رسالتا توصية أكاديميتان باللغة الإنجليزية'
      ],
      officialPortal: 'erasmus-plus.ec.europa.eu',
      officialUrl: 'https://erasmus-plus.ec.europa.eu',
      tips: 'تمنحك دبلوم ماستر مزدوج من دولتين أوروبيتين وتفتح لك سوق الشغل الأوروبي تلقائياً.'
    }
  ];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INTERACTIVE UNIVERSITY DATABASE (16 REAL INSTITUTIONS)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const universitiesList: UniversityItem[] = [
    {
      id: 'uni-tum',
      name: 'جامعة ميونخ التقنية (Technical University of Munich - TUM)',
      country: 'ألمانيا',
      countryCode: 'DE',
      flag: '🇩🇪',
      city: 'ميونخ (München)',
      language: 'multilingual',
      languageLabelAr: 'الإنجليزية والألمانية',
      tuitionTier: 'free',
      tuitionCost: 'شبه مجانية (150€ فقط رسوم تسجيل فصلي)',
      popularFields: ['هندسة الحاسوب', 'الذكاء الاصطناعي', 'الميكانيك', 'الروبوتات'],
      acceptanceRate: 'تنافسي (يتطلب معدل جيد)',
      languageScoreRequired: 'IELTS 6.5+ أو Goethe B2/C1',
      livingCostMonthly: '900€ - 1,200€ شهرياً',
      officialPortal: 'tum.de',
      officialUrl: 'https://www.tum.de',
      badge: 'المرتبة #1 في ألمانيا'
    },
    {
      id: 'uni-rwth',
      name: 'جامعة آر إف تي إتش آخن (RWTH Aachen University)',
      country: 'ألمانيا',
      countryCode: 'DE',
      flag: '🇩🇪',
      city: 'آخن (Aachen)',
      language: 'german',
      languageLabelAr: 'الألمانية والإنجليزية للماستر',
      tuitionTier: 'free',
      tuitionCost: 'مجانية 100% (310€ تذكرة قطار وفصل)',
      popularFields: ['الهندسة الكهربائية', 'الكهروميكانيك', 'السيارات', 'علوم المواد'],
      acceptanceRate: 'مفتوح للكفاءات المؤهلة',
      languageScoreRequired: 'TestDaF 4 أو IELTS 6.5 للماستر',
      livingCostMonthly: '750€ - 950€ شهرياً (تكلفة معتدلة)',
      officialPortal: 'rwth-aachen.de',
      officialUrl: 'https://www.rwth-aachen.de',
      badge: 'عاصمة الهندسة الأوروبية'
    },
    {
      id: 'uni-heidelberg',
      name: 'جامعة هايدلبرغ (Heidelberg University)',
      country: 'ألمانيا',
      countryCode: 'DE',
      flag: '🇩🇪',
      city: 'هايدلبرغ (Heidelberg)',
      language: 'multilingual',
      languageLabelAr: 'الألمانية والإنجليزية',
      tuitionTier: 'low',
      tuitionCost: '1,500€ للفصل (رسوم ولاية بادن فورتمبيرغ)',
      popularFields: ['الطب البشري', 'الصيدلة', 'البيولوجيا', 'الفيزياء'],
      acceptanceRate: 'تنافسي جداً للطب',
      languageScoreRequired: 'Goethe C1 للطب أو IELTS 6.5 للعلوم',
      livingCostMonthly: '850€ - 1,050€ شهرياً',
      officialPortal: 'uni-heidelberg.de',
      officialUrl: 'https://www.uni-heidelberg.de',
      badge: 'أقدم جامعة بألمانيا'
    },
    {
      id: 'uni-sorbonne',
      name: 'جامعة السوربون (Sorbonne Université)',
      country: 'فرنسا',
      countryCode: 'FR',
      flag: '🇫🇷',
      city: 'باريس (Paris)',
      language: 'french',
      languageLabelAr: 'الفرنسية بالكامل',
      tuitionTier: 'low',
      tuitionCost: 'رسوم حكومية مخفضة (170€ - 2,770€/سنة)',
      popularFields: ['العلوم الدقيقة', 'الطب', 'الآداب والفلسفة', 'الهندسة'],
      acceptanceRate: 'عبر منصة Campus France Maroc',
      languageScoreRequired: 'TCF-DAP أو DELF B2/C1',
      livingCostMonthly: '950€ - 1,300€ شهرياً (باريس)',
      officialPortal: 'sorbonne-universite.fr',
      officialUrl: 'https://www.sorbonne-universite.fr',
      badge: 'رمز النخبة الأكاديمية'
    },
    {
      id: 'uni-saclay',
      name: 'جامعة باريس ساكلاي (Université Paris-Saclay)',
      country: 'فرنسا',
      countryCode: 'FR',
      flag: '🇫🇷',
      city: 'ساكلاي (باريس الكبرى)',
      language: 'french',
      languageLabelAr: 'الفرنسية والإنجليزية للماستر',
      tuitionTier: 'low',
      tuitionCost: 'رسوم حكومية فرنسية قياسية',
      popularFields: ['الرياضيات (#1 عالمياً)', 'الفيزياء', 'علوم البيانات', 'البيوتكنولوجيا'],
      acceptanceRate: 'بناء على درجات التخرج والمقابلة',
      languageScoreRequired: 'TCF B2 أو IELTS 6.5 للبرامج الدولية',
      livingCostMonthly: '800€ - 1,000€ شهرياً',
      officialPortal: 'universite-paris-saclay.fr',
      officialUrl: 'https://www.universite-paris-saclay.fr',
      badge: 'المرتبة #1 عالمياً بالرياضيات'
    },
    {
      id: 'uni-insa-lyon',
      name: 'المعهد الوطني للعلوم التطبيقية بليون (INSA Lyon)',
      country: 'فرنسا',
      countryCode: 'FR',
      flag: '🇫🇷',
      city: 'ليون (Lyon)',
      language: 'french',
      languageLabelAr: 'الفرنسية والإنجليزية',
      tuitionTier: 'low',
      tuitionCost: 'رسوم مدارس الهندسة العمومية (حوالي 600€/سنة)',
      popularFields: ['الهندسة الميكانيكية', 'الإعلاميات', 'الاتصالات', 'الطاقة'],
      acceptanceRate: 'انتقاء لحاملي البكالوريا العلمية بميزة حسن جداً',
      languageScoreRequired: 'TCF B2 مع تفوق رياضي وعلمي',
      livingCostMonthly: '700€ - 900€ شهرياً (سكن جامعي متاح)',
      officialPortal: 'insa-lyon.fr',
      officialUrl: 'https://www.insa-lyon.fr',
      badge: 'أفضل مدرسة مهندسين عمومية'
    },
    {
      id: 'uni-udem',
      name: 'جامعة مونتريال (Université de Montréal - UdeM)',
      country: 'كندا',
      countryCode: 'CA',
      flag: '🇨🇦',
      city: 'مونتريال (كيبيك)',
      language: 'french',
      languageLabelAr: 'الفرنسية (مع بيئة ثنائية اللغة)',
      tuitionTier: 'medium',
      tuitionCost: 'تخفيضات خاصة بالفرنكوفونية للطلبة المغاربة',
      popularFields: ['الذكاء الاصطناعي (Mila)', 'القانون', 'الصيدلة', 'إدارة الأعمال (HEC)'],
      acceptanceRate: 'حسب التخصصات والمعدل',
      languageScoreRequired: 'شهادة البكالوريا المغربية تثبت الكفاءة بالفرنسية',
      livingCostMonthly: '1,100$ - 1,500$ CAD (~8,500 - 11,500 درهم)',
      officialPortal: 'umontreal.ca',
      officialUrl: 'https://www.umontreal.ca',
      badge: 'عاصمة الذكاء الاصطناعي'
    },
    {
      id: 'uni-ottawa',
      name: 'جامعة أوتاوا (University of Ottawa)',
      country: 'كندا',
      countryCode: 'CA',
      flag: '🇨🇦',
      city: 'أوتاوا (أونتاريو)',
      language: 'multilingual',
      languageLabelAr: 'ثنائية اللغة (فرنسية وإعفاء مالي للمغاربة)',
      tuitionTier: 'medium',
      tuitionCost: 'منحة إعفاء من الرسوم للدارسين بالفرنسية',
      popularFields: ['العلوم السياسية', 'الهندسة الطبية', 'التمريض', 'التكنولوجيا'],
      acceptanceRate: 'معدل بكالوريا لا يقل عن 13/20',
      languageScoreRequired: 'الفرنسية أو الإنجليزية حسب المسار',
      livingCostMonthly: '1,200$ - 1,600$ CAD شهرياً',
      officialPortal: 'uottawa.ca',
      officialUrl: 'https://www.uottawa.ca',
      badge: 'أكبر جامعة ثنائية اللغة بالعالم'
    },
    {
      id: 'uni-barcelona',
      name: 'جامعة برشلونة (Universidad de Barcelona - UB)',
      country: 'إسبانيا',
      countryCode: 'ES',
      flag: '🇪🇸',
      city: 'برشلونة (كاتالونيا)',
      language: 'spanish',
      languageLabelAr: 'الإسبانية والإنجليزية للماستر',
      tuitionTier: 'low',
      tuitionCost: '1,500€ إلى 2,800€ سنوياً',
      popularFields: ['الطب', 'إدارة الأعمال', 'السياحة والفندقة', 'الكيمياء'],
      acceptanceRate: 'امتحان المعادلة UNEDasiss',
      languageScoreRequired: 'DELE B2 في الإسبانية',
      livingCostMonthly: '750€ - 1,000€ شهرياً',
      officialPortal: 'ub.edu',
      officialUrl: 'https://www.ub.edu',
      badge: 'المرتبة #1 في إسبانيا'
    },
    {
      id: 'uni-uam',
      name: 'جامعة مدريد المستقلة (Universidad Autónoma de Madrid)',
      country: 'إسبانيا',
      countryCode: 'ES',
      flag: '🇪🇸',
      city: 'مدريد (العاصمة)',
      language: 'spanish',
      languageLabelAr: 'الإسبانية',
      tuitionTier: 'low',
      tuitionCost: 'حوالي 1,300€ إلى 2,200€ سنوياً',
      popularFields: ['القانون والعلاقات الدولية', 'البيوتكنولوجيا', 'الاقتصاد'],
      acceptanceRate: 'معادلة شهادة البكالوريا Homologación',
      languageScoreRequired: 'شهادة B2 بالإسبانية معتمدة من Instituto Cervantes',
      livingCostMonthly: '800€ - 1,050€ شهرياً',
      officialPortal: 'uam.es',
      officialUrl: 'https://www.uam.es',
      badge: 'جامعة ملك إسبانيا'
    },
    {
      id: 'uni-metu',
      name: 'جامعة الشرق الأوسط التقنية (Middle East Technical University - METU)',
      country: 'تركيا',
      countryCode: 'TR',
      flag: '🇹🇷',
      city: 'أنقرة (العاصمة)',
      language: 'english',
      languageLabelAr: 'الإنجليزية 100% بالكامل',
      tuitionTier: 'low',
      tuitionCost: 'منخفضة (حوالي 400$ - 1,200$ سنوياً للمغاربة)',
      popularFields: ['هندسة الطيران والفضاء', 'الهندسة المدنية', 'المعلوميات'],
      acceptanceRate: 'بناء على معدل البكالوريا أو اختبار SAT',
      languageScoreRequired: 'IELTS 6.5 أو امتحان لغة تركي داخلي',
      livingCostMonthly: '350$ - 500$ شهرياً (تكلفة معيشة رخيصة جداً)',
      officialPortal: 'metu.edu.tr',
      officialUrl: 'https://www.metu.edu.tr',
      badge: 'MIT الشرق الأوسط'
    },
    {
      id: 'uni-istanbul',
      name: 'جامعة إسطنبول (Istanbul University)',
      country: 'تركيا',
      countryCode: 'TR',
      flag: '🇹🇷',
      city: 'إسطنبول',
      language: 'multilingual',
      languageLabelAr: 'التركية والإنجليزية',
      tuitionTier: 'low',
      tuitionCost: '300$ إلى 900$ سنوياً في الكليات العامة',
      popularFields: ['الطب والصيدلة', 'التجارة الدولية', 'الإعلام والاتصال'],
      acceptanceRate: 'اختبار يوس (TR-YÖS) أو البكالوريا المغربية',
      languageScoreRequired: 'سنة لغة تحضيرية مجانية متاحة',
      livingCostMonthly: '400$ - 600$ شهرياً',
      officialPortal: 'istanbul.edu.tr',
      officialUrl: 'https://www.istanbul.edu.tr',
      badge: 'أعرق جامعة في تركيا'
    },
    {
      id: 'uni-sapienza',
      name: 'جامعة سابينزا روما (Sapienza University of Rome)',
      country: 'إيطاليا',
      countryCode: 'IT',
      flag: '🇮🇹',
      city: 'روما (العاصمة)',
      language: 'english',
      languageLabelAr: 'الإنجليزية والإيطالية',
      tuitionTier: 'free',
      tuitionCost: 'رسوم حسب الدخل العائلي ISEE (أقل من 300€ سنوياً للمغاربة)',
      popularFields: ['الذكاء الاصطناعي بالإنجليزية', 'الكلاسيكيات', 'الهندسة المعمارية'],
      acceptanceRate: 'امتحان تولك (TOLC) أو القبول المباشر',
      languageScoreRequired: 'IELTS 5.5+ للبرامج الإنجليزية',
      livingCostMonthly: '650€ - 900€ شهرياً مع إمكانية منحة LazioDisco',
      officialPortal: 'uniroma1.it',
      officialUrl: 'https://www.uniroma1.it',
      badge: 'أكبر جامعة في أوروبا'
    },
    {
      id: 'uni-debrecen',
      name: 'جامعة ديبريسين (University of Debrecen)',
      country: 'المجر (هنغاريا)',
      countryCode: 'HU',
      flag: '🇭🇺',
      city: 'ديبريسين',
      language: 'english',
      languageLabelAr: 'الإنجليزية بالكامل 100%',
      tuitionTier: 'low',
      tuitionCost: 'مؤهلة لمنحة Stipendium الكاملة (مجاناً 100%)',
      popularFields: ['الطب العام بالإنجليزية', 'طب الأسنان', 'الميكاترونيك', 'الزراعة'],
      acceptanceRate: 'مقابلة علمية واختبار لغة',
      languageScoreRequired: 'IELTS 6.0 أو مقابلة عبر Zoom',
      livingCostMonthly: '450€ - 650€ شهرياً (تكلفة رخيصة جداً في الاتحاد الأوروبي)',
      officialPortal: 'unideb.hu',
      officialUrl: 'https://www.unideb.hu',
      badge: 'الوجهة الطبية الأبرز للمغاربة'
    }
  ];

  // Filtering Universities by Country, Language, Tuition, and Search
  const filteredUniversities = universitiesList.filter(uni => {
    // Country Filter
    if (uniCountryFilter !== 'all' && uni.country !== uniCountryFilter) return false;
    // Language Filter
    if (uniLanguageFilter !== 'all' && uni.language !== uniLanguageFilter && uni.language !== 'multilingual') return false;
    // Tuition Filter
    if (uniTuitionFilter !== 'all' && uni.tuitionTier !== uniTuitionFilter) return false;
    // Search Filter
    if (uniSearchQuery.trim()) {
      const q = uniSearchQuery.toLowerCase();
      const match = uni.name.toLowerCase().includes(q) ||
                    uni.city.toLowerCase().includes(q) ||
                    uni.popularFields.some(f => f.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 animate-fade-in text-right font-['Cairo',sans-serif]">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HEADER & GLOBAL SCHOLARSHIPS HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-850 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-slate-700 shadow-2xs">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>دليل المنح الدولية والجامعات العالمية 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              الدراسة بالخارج والمنح الممولة بالكامل للطلبة المغاربة
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              اكتشف المنح الدراسية الحكومية 100% (تذاكر، سكن، راتب)، قاعدة بيانات أفضل الجامعات بفلترة الرسوم واللغات، وخطوات استخراج التأشيرة الدراسية دون وسطاء.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>الرئيسية</span>
              </button>
            )}
          </div>
        </div>

        {/* SUB-TABS SWITCHER */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          {[
            { id: 'scholarships', label: 'المنح الممولة بالكامل 100% (تركيا، ألمانيا، المجر...)', icon: Award },
            { id: 'universities', label: 'قاعدة بيانات الجامعات (فلترة الدولة واللغة والرسوم)', icon: Building },
            { id: 'admission-guide', label: 'خارطة طريق القبول الجامعي خطوة بخطوة', icon: BookOpen },
            { id: 'student-visa', label: 'التأشيرة والحساب البنكي المغلق (Blocked Account)', icon: Plane }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 1: SCHOLARSHIPS DIRECTORY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'scholarships' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="ابحث باسم المنحة، الدولة، أو التخصص الدراسي..."
                className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">التغطية:</span>
              {[
                { id: 'all', label: 'جميع المنح' },
                { id: 'fully-funded', label: 'ممولة 100% فقط' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterCoverage(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    filterCoverage === f.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map(sch => (
              <div
                key={sch.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{sch.flag}</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{sch.country}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                      {sch.coverageLabelAr}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {sch.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">الجهة المانحة: {sch.provider}</p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span><strong>آخر أجل للترشيح:</strong> {sch.deadline}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2"><strong>المميزات:</strong> {sch.stipend}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span><strong>المستويات:</strong> {sch.degrees.join(' · ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedScholarship(sch)}
                      className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 text-xs font-bold cursor-pointer transition-colors"
                    >
                      تفاصيل الشروط 📋
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(sch.id, 'scholarship', sch.title, sch.country, sch.flag, sch.officialUrl)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        savedIds[sch.id] || isItemBookmarked(sch.id)
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 border-slate-200 dark:border-slate-700'
                      }`}
                      title="حفظ في مفضلتي"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <a
                    href={sch.officialUrl}
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: FILTERABLE UNIVERSITY DATABASE (3-WAY FILTERS)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'universities' && (
        <div className="space-y-6">
          
          {/* Universal 3-Way Filter Control Bar */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>قاعدة بيانات الجامعات الدولية المعتمدة للمغاربة</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  تصفح 14 جامعة رائدة مع فلترة دقيقة حسب الدولة، لغة التدريس، وتكاليف الرسوم السنوية.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                <input
                  type="text"
                  value={uniSearchQuery}
                  onChange={e => setUniSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم أو التخصص (ذكاء اصطناعي، طب، هندسة)..."
                  className="w-full pr-10 pl-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* 3-WAY FILTER CHIPS */}
            <div className="space-y-3.5 text-xs">
              
              {/* Filter 1: Country */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>الدولة:</span>
                </span>
                {[
                  { id: 'all', label: 'كافة الدول' },
                  { id: 'ألمانيا', label: 'ألمانيا 🇩🇪' },
                  { id: 'فرنسا', label: 'فرنسا 🇫🇷' },
                  { id: 'كندا', label: 'كندا 🇨🇦' },
                  { id: 'إسبانيا', label: 'إسبانيا 🇪🇸' },
                  { id: 'تركيا', label: 'تركيا 🇹🇷' },
                  { id: 'إيطاليا', label: 'إيطاليا 🇮🇹' },
                  { id: 'المجر (هنغاريا)', label: 'المجر 🇭🇺' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setUniCountryFilter(c.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                      uniCountryFilter === c.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Filter 2: Language */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-indigo-600" />
                  <span>لغة الدراسة:</span>
                </span>
                {[
                  { id: 'all', label: 'جميع اللغات' },
                  { id: 'english', label: 'الإنجليزية بالكامل 🇬🇧' },
                  { id: 'french', label: 'الفرنسية 🇫🇷' },
                  { id: 'german', label: 'الألمانية 🇩🇪' },
                  { id: 'spanish', label: 'الإسبانية 🇪🇸' }
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => setUniLanguageFilter(l.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                      uniLanguageFilter === l.id
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Filter 3: Tuition Tier */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>مستوى الرسوم:</span>
                </span>
                {[
                  { id: 'all', label: 'جميع مستويات الرسوم' },
                  { id: 'free', label: 'شبه مجانية / مجانية (0 - 500€)' },
                  { id: 'low', label: 'رسوم حكومية منخفضة (500€ - 2,500€)' },
                  { id: 'medium', label: 'رسوم متوسطة (مع إعفاءات)' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setUniTuitionFilter(t.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                      uniTuitionFilter === t.id
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUniversities.map(uni => (
              <div
                key={uni.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{uni.flag}</span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">{uni.country}</span>
                        <span className="text-[11px] text-slate-500">{uni.city}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                      {uni.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {uni.name}
                    </h3>
                  </div>

                  {/* Highlights Box */}
                  <div className="space-y-2 text-xs bg-slate-50 dark:bg-slate-850 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">لغة التدريس:</span>
                      <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{uni.languageLabelAr}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">الرسوم الدراسية:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{uni.tuitionCost}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">شرط اللغة:</span>
                      <span>{uni.languageScoreRequired}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">المعيشة شهرياً:</span>
                      <span>{uni.livingCostMonthly}</span>
                    </div>
                  </div>

                  {/* Popular Majors */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1">أبرز التخصصات المتاحة:</span>
                    <div className="flex flex-wrap gap-1">
                      {uni.popularFields.map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleToggleBookmark(uni.id, 'university', uni.name, uni.country, uni.flag, uni.officialUrl)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      savedIds[uni.id] || isItemBookmarked(uni.id)
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 border-slate-200 dark:border-slate-700'
                    }`}
                    title="حفظ في مفضلتي"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={uni.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>بوابة التسجيل الرسمية</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 3: HOW TO GET UNIVERSITY ADMISSION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'admission-guide' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8">
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              خارطة طريق الحصول على القبول الجامعي الدولي (من المغرب خطوة بخطوة)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              خطوات عملية خالية من التعقيد لضمان القبول في كندا، فرنسا، ألمانيا، وإسبانيا دون دفع أموال للوسطاء.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: '1',
                title: 'تجهيز الشواهد والترجمة',
                desc: 'ترجمة شهادة البكالوريا وبيان النقط للفرنسية أو الإنجليزية لدى مترجم محلف ومصادقتها في المقاطعة/العمالة.'
              },
              {
                step: '2',
                title: 'اجتياز اختبار اللغة الرسمي',
                desc: 'اجتياز امتحان TCF-DAP / DELF لفرنسا، أو IELTS الأكاديمي (6.5+) لكندا والبرامج الإنجليزية، أو Goethe لألمانيا.'
              },
              {
                step: '3',
                title: 'صياغة CV ورسالة التحفيز',
                desc: 'استخدام صانع السيرة الذاتية MezdoHub ATS وتخصيص رسالة دوافع توضح أسباب اختيار الجامعة والتخصص بدقة.'
              },
              {
                step: '4',
                title: 'إيداع الملف بالبوابات الرسمية',
                desc: 'التقديم عبر المنصات المعتمدة (Campus France، uni-assist، أو بوابات الجامعات الكندية) قبل الآجال النهائية.'
              }
            ].map(item => (
              <div key={item.step} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                  {item.step}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-amber-800 dark:text-amber-300">
              <strong className="block font-bold">تنبيه هام للطلبة المغاربة:</strong>
              <p>
                لا تدفع أي مبالغ لوكالات تدعي حجز مقاعد مضمونة بالجامعات الحكومية في فرنسا أو كندا أو ألمانيا. القبول يتم حصراً وفق المعايير الأكاديمية ونقط البكالوريا وشواهد اللغة.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 4: STUDENT VISA & BLOCKED ACCOUNTS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'student-visa' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-1 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              دليل استخراج التأشيرة الدراسية والحساب البنكي المغلق (Blocked Account)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              متطلبات التمويل وإثبات القدرة المالية للسفارات والقنصليات بالرباط والدار البيضاء.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>🇩🇪</span>
                <span>الحساب المغلق لألمانيا (Sperrkonto)</span>
              </div>
              <p className="leading-relaxed">
                تشترط السفارة الألمانية تجميد مبلغ 11,208 يورو (حوالي 120,000 درهم) في حساب مغلق يُصرف منه 934 يورو شهرياً للطالب.
              </p>
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                أفضل المزودين المعتمدين: <strong>Expatrio</strong> أو <strong>Coracle</strong>.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>🇫🇷</span>
                <span>الضمان المالي لفرنسا (Prise en charge)</span>
              </div>
              <p className="leading-relaxed">
                كفالة بنكية بمبلغ لا يقل عن 615 يورو شهرياً (73,800 درهم للسنة) أو كفيل رسمي مقيم في فرنسا يتكفل بكتابة تعهد رسمي وإرفاق قسائم الراتب.
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                يتم إيداع الملف عبر <strong>France-Visas</strong> وحجز الموعد لدى <strong>TLScontact</strong>.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>🇨🇦</span>
                <span>تصريح الدراسة لكندا (Permis d'études)</span>
              </div>
              <p className="leading-relaxed">
                إثبات دفع رسوم السنة الأولى + 20,635 دولار كندي للمصاريف الشخصية (شهادة استثمار مضمون GIC أو كشف حساب بنكي للوالدين).
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                التقديم إلكتروني بالكامل عبر بوابة <strong>IRCC</strong> ثم موعد البصمات بـ <strong>VFS Global</strong>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCHOLARSHIP DETAIL MODAL */}
      {selectedScholarship && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-xl text-right max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedScholarship.flag}</span>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">{selectedScholarship.title}</h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400">{selectedScholarship.provider}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedScholarship(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <strong className="block text-emerald-800 dark:text-emerald-300 font-bold">المميزات والرواتب:</strong>
                <p>{selectedScholarship.stipend}</p>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white mb-1.5 font-bold">شروط الأهلية:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  {selectedScholarship.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white mb-1.5 font-bold">الوثائق المطلوبة للملف:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  {selectedScholarship.documents.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
                <strong>نصيحة MezdoHub لرفع حظوظ قبولك:</strong> {selectedScholarship.tips}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedScholarship(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                إغلاق
              </button>
              <a
                href={selectedScholarship.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>التقديم في البوابة الرسمية</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Search,
  ExternalLink, 
  Mail, 
  FileText, 
  Calculator,
  ArrowLeft, 
  ArrowRight, 
  Coins, 
  ShieldCheck, 
  FileCheck, 
  Award, 
  Clock, 
  Landmark, 
  Layers, 
  TrendingUp, 
  AlertCircle, 
  GraduationCap, 
  Shield, 
  Stethoscope, 
  Briefcase,
  Bell,
  Calendar,
  Scale,
  Megaphone,
  Newspaper,
  Zap,
  Info,
  CheckCircle,
  Filter
} from 'lucide-react';
import { trackLeadConversion } from '../services/analytics';

interface LocalNicheJobsHubProps {
  onBack?: () => void;
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  initialSubTab?: 'jobs' | 'concours' | 'updates' | 'salary-calc' | 'demande-maker';
}

export interface JobOpportunity {
  id: string;
  name: string;
  category: 'automotive' | 'manufacturing' | 'aerospace' | 'logistics' | 'bpo' | 'banking' | 'technology';
  categoryLabelAr: string;
  city: 'tanger' | 'kenitra' | 'casablanca';
  cityLabelAr: string;
  zone: string;
  role: string;
  salary: string;
  diplomaRequired: string;
  experienceLevel: string;
  requiredDocuments: string[];
  applicationSteps: string[];
  hrEmailOrPortal: string;
  growthPath: string;
  verifiedSource: string;
}

export interface ConcoursOpportunity {
  id: string;
  title: string;
  institution: string;
  category: 'education' | 'health' | 'ofppt' | 'police' | 'customs' | 'military' | 'justice' | 'prisons' | 'civil_defense' | 'finance' | 'transport' | 'local_authorities' | 'universities';
  categoryLabelAr: string;
  diplomaRequired: string;
  diplomaLevel: 'bac' | 'bac2' | 'licence' | 'master';
  ageLimit: string;
  deadline: string;
  scaleGrade: string;
  salary: string;
  officialSource: string;
  officialLink: string;
  applicationSteps: string[];
  requiredDocuments: string[];
}

export interface LabourUpdate {
  id: string;
  title: string;
  category: 'wages' | 'taxes' | 'initiatives' | 'social' | 'training' | 'concours_calendar';
  categoryLabelAr: string;
  badge: string;
  badgeColor: string;
  date: string;
  summary: string;
  keyPoints: string[];
  impactOnCandidate: string;
  officialSource: string;
  officialLink?: string;
}

export const LocalNicheJobsHub: React.FC<LocalNicheJobsHubProps> = ({ onBack, onSelectTab, initialSubTab = 'jobs' }) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeMainTab, setActiveMainTab] = useState<'jobs' | 'concours' | 'updates' | 'salary-calc' | 'demande-maker'>(initialSubTab);

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveMainTab(initialSubTab);
    }
  }, [initialSubTab]);
  
  // Job Filters
  const [selectedCity, setSelectedCity] = useState<'all' | 'tanger' | 'kenitra' | 'casablanca'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [jobSearchTerm, setJobSearchTerm] = useState('');
  
  // Concours Filters
  const [concoursCategory, setConcoursCategory] = useState<string>('all');
  const [concoursDiploma, setConcoursDiploma] = useState<string>('all');
  const [concoursSearchTerm, setConcoursSearchTerm] = useState('');

  // Labour Updates Filters
  const [updateCategory, setUpdateCategory] = useState<string>('all');

  // Selected Detail Modal State
  const [selectedJobDetail, setSelectedJobDetail] = useState<JobOpportunity | null>(null);
  const [selectedConcoursDetail, setSelectedConcoursDetail] = useState<ConcoursOpportunity | null>(null);
  const [selectedUpdateDetail, setSelectedUpdateDetail] = useState<LabourUpdate | null>(null);

  // Done-For-You VIP Modal State
  const [showDoneForYouModal, setShowDoneForYouModal] = useState(false);
  const [targetCompanyForVip, setTargetCompanyForVip] = useState('');
  const [targetRoleForVip, setTargetRoleForVip] = useState('');
  const [dfySubmitted, setDfySubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [dfyForm, setDfyForm] = useState({
    name: '',
    phone: '',
    city: 'طنجة',
    diploma: 'دبلوم تقني متخصص (ISTA)',
    selectedPackage: 'direct-hr' as 'direct-hr' | 'full-dossier'
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INTERACTIVE SALARY CALCULATOR STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [calcBrut, setCalcBrut] = useState<number>(5500);
  const [calcMarital, setCalcMarital] = useState<'single' | 'married'>('single');
  const [calcChildren, setCalcChildren] = useState<number>(0);

  // Salary Calculations (Morocco 2026 Tax & Social Rules)
  // CNSS: 4.48% (capped at 6,000 DH base = max 268.80 DH)
  const cnssDeduction = Math.min(calcBrut * 0.0448, 268.80);
  // AMO: 2.26% uncapped
  const amoDeduction = calcBrut * 0.0226;
  // Professional fees deduction: 35% capped at 2,916.67 DH/month (35,000 DH/year)
  const fraisPro = Math.min(calcBrut * 0.35, 2916.67);
  // Net Imposable Base
  const baseImposable = Math.max(0, calcBrut - cnssDeduction - amoDeduction - fraisPro);
  
  // Annualized base for Morocco 2026 revised brackets (exemption threshold up to 40,000 DH)
  const annualBase = baseImposable * 12;
  let annualIgr = 0;
  if (annualBase <= 40000) {
    annualIgr = 0;
  } else if (annualBase <= 60000) {
    annualIgr = (annualBase * 0.10) - 4000;
  } else if (annualBase <= 80000) {
    annualIgr = (annualBase * 0.20) - 10000;
  } else if (annualBase <= 180000) {
    annualIgr = (annualBase * 0.30) - 18000;
  } else {
    annualIgr = (annualBase * 0.37) - 30600;
  }
  annualIgr = Math.max(0, annualIgr);
  
  // Family charges deduction: 500 DH/year (41.67 DH/month) per dependent (spouse + up to 6 children, max 3,000 DH/year)
  const dependentsCount = (calcMarital === 'married' ? 1 : 0) + Math.min(calcChildren, 6);
  const familyDeductionAnnual = dependentsCount * 500;
  const finalAnnualIgr = Math.max(0, annualIgr - familyDeductionAnnual);
  const monthlyIgr = finalAnnualIgr / 12;

  // Final Net Salary
  const calculatedNet = Math.round(calcBrut - cnssDeduction - amoDeduction - monthlyIgr);
  // Estimate gain compared to pre-reform tax law
  const preReformIgr = Math.max(0, ((annualBase > 30000 ? (annualBase * 0.10) - 3000 : 0) - (dependentsCount * 360))) / 12;
  const monthlyTaxSaving = Math.round(Math.max(0, preReformIgr - monthlyIgr));

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DEMANDE MAKER STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [demandeType, setDemandeType] = useState<'concours' | 'private'>('concours');
  const [demandeCandidateName, setDemandeCandidateName] = useState('كريم المرابط');
  const [demandeCin, setDemandeCin] = useState('AB123456');
  const [demandePhone, setDemandePhone] = useState('0612345678');
  const [demandeAddress, setDemandeAddress] = useState('حي السلام، طنجة');
  const [demandeTargetInstitution, setDemandeTargetInstitution] = useState('المديرية العامة للأمن الوطني');
  const [demandeTargetRole, setDemandeTargetRole] = useState('حارس أمن (مباراة 2026)');

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. MASTER JOBS DATABASE: TANGIER, KENITRA, CASABLANCA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const privateJobs: JobOpportunity[] = [
    // TANGIER
    {
      id: 'tgr-renault',
      name: 'Renault Group Tangier (Usine Melloussa)',
      category: 'automotive',
      categoryLabelAr: 'صناعة وتجميع السيارات',
      city: 'tanger',
      cityLabelAr: 'طنجة',
      zone: 'Zone Industrielle TAC - Melloussa',
      role: 'تقنيو صيانة صناعية، روبوتات، وتشغيل خطوط التجميع',
      salary: '4,200 - 6,800 درهم/شهر (تقديري) + نقل وتأمين',
      diplomaRequired: 'دبلوم تقني، تقني متخصص (ISTA) أو إجازة مهنية (كهروميكانيك / صيانة)',
      experienceLevel: 'من مبتدئ (Stage PFE) إلى سنتين خبرة',
      requiredDocuments: ['سيرة ذاتية ATS بالفرنسية', 'نسخة من البطاقة الوطنية (CIN)', 'نسخة مصادق عليها من الدبلوم', 'شهادة السوابق العدلية'],
      applicationSteps: ['التسجيل في منصة رونو الرسمية renault.com/carrieres أو عبر وكالة ANAPEC طنجة', 'اجتياز الاختبار التقني الأولي في الميكانيك والكهرباء', 'المقابلة الشفهية واختبار السلامة الصناعية بمصنع ملوسة'],
      hrEmailOrPortal: 'recrutement.tanger@renault.com',
      growthPath: 'تقني صيانة ➔ رئيس فريق (Chef d\'équipe) ➔ مشرف ورشة UET',
      verifiedSource: 'renaultgroup.com & ANAPEC Tanger'
    },
    {
      id: 'tgr-lear',
      name: 'Lear Corporation Morocco (TFZ & TAC)',
      category: 'automotive',
      categoryLabelAr: 'الأنظمة الكهربائية ومقاعد السيارات',
      city: 'tanger',
      cityLabelAr: 'طنجة',
      zone: 'Tanger Free Zone (TFZ) & Tanger Automotive City',
      role: 'مراقبو جودة التوصيل الكهربائي، تقنيو قطع واختبار الأسلاك',
      salary: '3,800 - 5,500 درهم/شهر (تقديري) + منح الإنتاجية',
      diplomaRequired: 'دبلوم تأهيل مهني CQP أو تقني OFPPT في الكهرباء والإلكترونيك',
      experienceLevel: 'بدون خبرة أو خبرة تدريبية سابقة',
      requiredDocuments: ['سيرة ذاتية محينة', 'نسخة CIN', 'شهادة مدرسية أو دبلوم التكوين المهني'],
      applicationSteps: ['إيداع الملف بالوكالة المحلية لـ ANAPEC بطنجة أو عبر بوابة لينكد إن', 'اختبار الفحص البصري واختبار تمييز الألوان الكهربائية', 'المقابلة مع مشرف خط الإنتاج'],
      hrEmailOrPortal: 'recrutement-tanger@lear.com',
      growthPath: 'عامل خط ➔ فاحص جودة كهربائية ➔ مدرب تقني للعمال الجدد',
      verifiedSource: 'lear.com/careers'
    },
    {
      id: 'tgr-aptiv',
      name: 'Aptiv Electrical Distribution Systems (TAC)',
      category: 'automotive',
      categoryLabelAr: 'الضفائر الكهربائية وحلول التنقل الذكي',
      city: 'tanger',
      cityLabelAr: 'طنجة',
      zone: 'Tanger Automotive City - Autoport',
      role: 'تقنيو إنتاج الضفائر الكهربائية، فنيو صيانة لوحات الاختبار',
      salary: '3,700 - 5,200 درهم/شهر (تقديري) + وجبة طعام ونقل مجاني',
      diplomaRequired: 'مستوى بكالوريا، دبلوم تقني، أو دبلوم التكوين المهني',
      experienceLevel: 'مفتوح للمبتدئين (برنامج تدريب أولي مدفوع الأجر)',
      requiredDocuments: ['سيرة ذاتية بصيغة PDF', 'صورتان شمسيتان', 'نسخة بطاقة التعريف الوطنية'],
      applicationSteps: ['الترشيح عبر استمارة التوظيف الرسمية لأبتيف أو بريد الموارد البشرية', 'اختبار السرعة الحركية والدقة اليدوية (Dexterity Test)'],
      hrEmailOrPortal: 'morocco.recruitment@aptiv.com',
      growthPath: 'مجمع كابلاج ➔ تقني ميكانيك دقيقة ➔ مسؤول جودة',
      verifiedSource: 'aptiv.com'
    },
    {
      id: 'tgr-yazaki',
      name: 'Yazaki Morocco Tanger (TFZ)',
      category: 'automotive',
      categoryLabelAr: 'صناعة المكونات والأسلاك الكهربائية',
      city: 'tanger',
      cityLabelAr: 'طنجة',
      zone: 'Zone Franche d\'Exportation (TFZ)',
      role: 'مشغلو آلات الكبس الآلي، مراقبو سلامة التوصيلات',
      salary: '3,600 - 5,000 درهم/شهر (تقديري) + تغطية صحية تكميلية',
      diplomaRequired: 'دبلوم تقني أو مستوى ثانوي تأهيلي',
      experienceLevel: 'حديث التخرج مرحب به',
      requiredDocuments: ['CV بالفرنسية', 'نسخة CIN', 'نسخة الدبلوم أو الشهادة المدرسية'],
      applicationSteps: ['التقديم بمركز التوظيف يازاكي بطنجة أو عن طريق أنابيك', 'الفحص الطبي الأولي واختبار التركيز السمعي والبصري'],
      hrEmailOrPortal: 'rh.yazaki.tanger@yazaki-europe.com',
      growthPath: 'عامل تشغيل ➔ قائد خط إنتاج ➔ مراقب جودة عام',
      verifiedSource: 'yazaki-europe.com'
    },
    {
      id: 'tgr-tangermed',
      name: 'Tanger Med Port Authority (TMSA)',
      category: 'logistics',
      categoryLabelAr: 'الخدمات المينائية واللوجستيك البحري',
      city: 'tanger',
      cityLabelAr: 'طنجة',
      zone: 'Complexe Portuaire Tanger Med',
      role: 'سائقو رافعات الحاويات (STS/RTG)، تقنيو تدبير ساحات الميناء',
      salary: '5,500 - 9,000 درهم/شهر (تقديري) + تعويض العمل الليلي',
      diplomaRequired: 'رخصة سياقة الوزن الثقيل، دبلوم تقني في اللوجستيك، أو ميكانيك الآلات',
      experienceLevel: 'سنتان خبرة في قيادة الآلات الثقيلة أو الشحن المينائي',
      requiredDocuments: ['سيرة ذاتية مفصلة', 'رخصة السياقة المهنية', 'سجل السوابق العدلية', 'نسخة البطاقة الوطنية'],
      applicationSteps: ['التسجيل في بوابة الوظائف tangermed.ma/carrieres', 'اختبار المحاكاة الرقمية للرافعات واختبار السلامة البحرية الصارمة'],
      hrEmailOrPortal: 'recrutement@tangermed.ma',
      growthPath: 'سائق رافعة ساحة ➔ مشغل رافعة رصيف عملاقة ➔ مشرف مناولة مينائية',
      verifiedSource: 'tangermed.ma'
    },

    // KENITRA
    {
      id: 'knt-stellantis',
      name: 'Stellantis Kenitra Plant (Peugeot - Citroën - Fiat)',
      category: 'automotive',
      categoryLabelAr: 'تصنيع وهندسة السيارات الكهربائية والحرارية',
      city: 'kenitra',
      cityLabelAr: 'القنيطرة',
      zone: 'Atlantic Free Zone (AFZ)',
      role: 'تقنيو الصيانة الذاتية، فنيو صباغة هياكل السيارات، ميكاترونيك',
      salary: '4,500 - 7,500 درهم/شهر (تقديري) + منح السلامة والجودة',
      diplomaRequired: 'دبلوم تقني متخصص (ISTA) أو معهد صناعة السيارات (IFMIA القنيطرة)',
      experienceLevel: 'من خريجي IFMIA حديثاً إلى خبرة سنتين',
      requiredDocuments: ['سيرة ذاتية ATS', 'دبلوم IFMIA أو ISTA مصادق عليه', 'بطاقة السوابق العدلية'],
      applicationSteps: ['الترشيح عبر بوابة stellantis.com/careers أو منصة IFMIA', 'امتحان تقني متعدد الاختيارات (QCM) في الكهرباء والميكانيك', 'المقابلة التقنية في ورشات المصنع'],
      hrEmailOrPortal: 'recrutement.kenitra@stellantis.com',
      growthPath: 'تقني ورشة ➔ تقني صيانة وقائية ➔ خبير تشخيص أعطال الروبوتات',
      verifiedSource: 'stellantis.com & IFMIA Kenitra'
    },
    {
      id: 'knt-nexteer',
      name: 'Nexteer Automotive Systems Kenitra',
      category: 'automotive',
      categoryLabelAr: 'أنظمة التوجيه الكهربائي المتقدم للسيارات EPS',
      city: 'kenitra',
      cityLabelAr: 'القنيطرة',
      zone: 'Atlantic Free Zone (AFZ)',
      role: 'تقنيو تشغيل آلات CNC ومراقبو الجودة الميكانيكية الدقيقة',
      salary: '4,500 - 7,200 درهم/شهر (تقديري) + حوافز وتغطية صحية',
      diplomaRequired: 'دبلوم تقني متخصص في الهندسة الميكانيكية أو التصنيع الآلي',
      experienceLevel: 'سنة إلى 3 سنوات في بيئة صناعية آلية',
      requiredDocuments: ['سيرة ذاتية تقنية', 'نسخة الدبلوم', 'شواهد التدريب'],
      applicationSteps: ['التقديم عبر بوابة nexteer.com/careers أو لينكد إن', 'اختبار قراءة التصاميم الهندسية والميكانيكية المليمترية'],
      hrEmailOrPortal: 'morocco.careers@nexteer.com',
      growthPath: 'تقني ميترولوجيا ➔ تقني طرائق ➔ مهندس عمليات تصنيع',
      verifiedSource: 'nexteer.com/careers'
    },
    {
      id: 'knt-kroschu',
      name: 'Kromberg & Schubert Kenitra (المنطقة الحرة)',
      category: 'automotive',
      categoryLabelAr: 'الضفائر والكابلاج الكهربائي للسيارات',
      city: 'kenitra',
      cityLabelAr: 'القنيطرة',
      zone: 'Atlantic Free Zone (AFZ)',
      role: 'أعوان إنتاج وتجميع التوصيلات الكهربائية والفحص الفني',
      salary: '3,500 - 4,800 درهم/شهر (تقديري) + منحة الانتظام',
      diplomaRequired: 'مستوى إعدادي فما فوق، أو دبلوم تأهيل مهني CQP',
      experienceLevel: 'بدون خبرة مسبقة (تكوين مهني أولي مؤدى عنه)',
      requiredDocuments: ['نسخة البطاقة الوطنية', 'عقد الازدياد', 'شهادة مدرسية أو دبلوم'],
      applicationSteps: ['إيداع الملف بالوكالة المحلية للتشغيل بالقنيطرة', 'فحص الرؤية واختبار الدقة والتركيز'],
      hrEmailOrPortal: 'recrutement@kroschu.com',
      growthPath: 'عامل إنتاج ➔ فاحص كهربائي ➔ قائد فريق (Leader)',
      verifiedSource: 'kroschu.com'
    },
    {
      id: 'knt-agc',
      name: 'AGC Automotive Induver (زجاج السيارات الآمن)',
      category: 'manufacturing',
      categoryLabelAr: 'تصنيع ومعالجة الزجاج الحراري للسيارات',
      city: 'kenitra',
      cityLabelAr: 'القنيطرة',
      zone: 'Atlantic Free Zone (AFZ)',
      role: 'تقنيو صيانة خطوط الأفران الحرارية والميكاترونيك الصناعي',
      salary: '4,800 - 7,500 درهم/شهر (تقديري) + تعويض الأخطار',
      diplomaRequired: 'دبلوم تقني متخصص في الصيانة الصناعية والإلكتروتكنيك',
      experienceLevel: 'سنتان في البيئات الحرارية أو الميكانيكية',
      requiredDocuments: ['سيرة ذاتية ATS', 'سجل الضمان الاجتماعي CNSS', 'نسخة الدبلوم'],
      applicationSteps: ['الترشيح عبر البريد الإلكتروني الرسمي لإدارة الموارد البشرية', 'مقابلة تقنية مع مدير الصيانة'],
      hrEmailOrPortal: 'agc-induver.recrutement@agc.com',
      growthPath: 'تقني صيانة ➔ أخصائي أنظمة حرارية ➔ منسق صيانة مصنع',
      verifiedSource: 'agc-automotive.com'
    },

    // CASABLANCA
    {
      id: 'cas-safran',
      name: 'Safran Nacelles Morocco (صناعة الطيران Midparc)',
      category: 'aerospace',
      categoryLabelAr: 'صناعة هياكل محركات الطائرات والمواد المركبة',
      city: 'casablanca',
      cityLabelAr: 'الدار البيضاء',
      zone: 'Zone Franche Midparc - Nouaceur',
      role: 'مركبو هياكل الطائرات، فنيو المواد المركبة (Composites)',
      salary: '5,000 - 8,200 درهم/شهر (تقديري) + تأمين طيران خاص ونقل',
      diplomaRequired: 'دبلوم معهد مهن الطيران (IMA) أو تقني متخصص OFPPT (طيران/ميكانيك)',
      experienceLevel: 'خريجو معهد IMA أو خبرة سنة في التصنيع الدقيق',
      requiredDocuments: ['سيرة ذاتية تقنية بالفرنسية', 'نسخة CIN', 'دبلوم معهد الطيران IMA'],
      applicationSteps: ['التسجيل عبر بوابة safran-group.com/fr/talents', 'اجتياز الاختبار التطبيقي في معهد النواصر على قطع الطيران'],
      hrEmailOrPortal: 'recrutement.snm@safrangroup.com',
      growthPath: 'فني مواد مركبة ➔ مراقب جودة طيران CND ➔ رئيس ورشة هياكل',
      verifiedSource: 'safran-group.com & IMA Nouaceur'
    },
    {
      id: 'cas-capgemini',
      name: 'Capgemini Engineering Morocco (Casanearshore)',
      category: 'technology',
      categoryLabelAr: 'تكنولوجيا المعلومات وهندسة البرمجيات والسحابيات',
      city: 'casablanca',
      cityLabelAr: 'الدار البيضاء',
      zone: 'Parc Casanearshore - Sidi Maârouf',
      role: 'مهندسو برمجيات Full-Stack، DevOps، ومستشارو Cloud',
      salary: '9,000 - 15,000 درهم/شهر (تقديري) + تأمين AXA وتقاعد CIMR',
      diplomaRequired: 'دبلوم مهندس دولة أو ماستر جامعي في علوم الحاسوب (Bac+5)',
      experienceLevel: 'من خريج حديث (PFE) إلى 3 سنوات خبرة',
      requiredDocuments: ['CV تقني بالفرنسية أو الإنجليزية', 'رابط GitHub / Portfolio', 'شواهد التخرج'],
      applicationSteps: ['التقديم عبر منصة التوظيف الرسمية أو لينكد إن', 'اختبار البرمجة الأونلاين (CodinGame)', 'المقابلة التقنية والمعمارية'],
      hrEmailOrPortal: 'recrutement.maroc@capgemini.com',
      growthPath: 'مهندس junior ➔ مطور confirmed ➔ Tech Lead ➔ مدير مشاريع',
      verifiedSource: 'capgemini.com/careers'
    },
    {
      id: 'cas-attijari',
      name: 'Attijariwafa Bank (المقر الرئيسي & شبكة الفروع)',
      category: 'banking',
      categoryLabelAr: 'القطاع البنكي والمالية والاستثمار CFC',
      city: 'casablanca',
      cityLabelAr: 'الدار البيضاء',
      zone: 'Boulevard Hassan II & Casablanca Finance City (CFC)',
      role: 'مكلفون بزبناء الأفراد والشركات، محللو مخاطر الائتمان',
      salary: '6,500 - 11,000 درهم/شهر (تقديري) + الشهر 13 و 14 وأرباح بنكية',
      diplomaRequired: 'إجازة أو ماستر في الاقتصاد، المالية، البنوك أو التدبير (Bac+3/5)',
      experienceLevel: 'مفتوح لحاملي الشواهد الجامعية العليا والتجارية (ENCG / ISCAE / FSJES)',
      requiredDocuments: ['سيرة ذاتية احترافية', 'نسخ الشواهد الجامعية وبيان النقط', 'نسخة CIN'],
      applicationSteps: ['التسجيل في البوابة attijariwafabank.com/fr/carrieres', 'الاختبار النفسي والمالي الأولي', 'المقابلة مع مديرية الموارد البشرية'],
      hrEmailOrPortal: 'recrutement@attijariwafa.com',
      growthPath: 'مكلف بالزبناء ➔ مستشار مقاولات ➔ مدير وكالة بنكية',
      verifiedSource: 'attijariwafabank.com'
    },
    {
      id: 'cas-banquepop',
      name: 'Banque Populaire (البنك الشعبي المركزي)',
      category: 'banking',
      categoryLabelAr: 'العمليات المصرفية والتمويلات التنموية',
      city: 'casablanca',
      cityLabelAr: 'الدار البيضاء',
      zone: 'Boulevard Mohamed Zerktouni',
      role: 'مستشارو مبيعات بنكية، محللو عمليات القروض والائتمان',
      salary: '6,200 - 10,500 درهم/شهر (تقديري) + امتيازات بنكية',
      diplomaRequired: 'إجازة أو ماستر في الاقتصاد أو المحاسبة والمالية',
      experienceLevel: 'حديث التخرج أو خبرة سنتين',
      requiredDocuments: ['سيرة ذاتية', 'شواهد النجاح الجامعية', 'بطاقة التعريف الوطنية'],
      applicationSteps: ['الترشيح عبر البوابة الرسمية للبنك الشعبي', 'اختبار الذكاء والتحليل المالي'],
      hrEmailOrPortal: 'recrutement@cpm.co.ma',
      growthPath: 'مستشار مالي ➔ رئيس قسم الائتمان ➔ مدير وكالة بنكية',
      verifiedSource: 'groupebcp.com'
    },
    {
      id: 'cas-marjane',
      name: 'Marjane Group (المقر وسلسلة المتاجر الكبرى)',
      category: 'logistics',
      categoryLabelAr: 'التوزيع التجاري وسلاسل الإمداد والتجارة الإلكترونية',
      city: 'casablanca',
      cityLabelAr: 'الدار البيضاء',
      zone: 'Sidi Maârouf & Hypermarchés Casablanca',
      role: 'مسؤولو أجنحة تجارية (Chef de rayon)، مدبرو المخزون واللوجستيك',
      salary: '4,800 - 7,500 درهم/شهر (تقديري) + منحة المبيعات الشهرية',
      diplomaRequired: 'دبلوم تقني متخصص (Bac+2/3) في التجارة، التسيير أو اللوجستيك',
      experienceLevel: 'سنة في التجارة أو التوزيع أو خدمة العملاء',
      requiredDocuments: ['سيرة ذاتية محدثة', 'نسخة الدبلوم', 'نسخة البطاقة الوطنية'],
      applicationSteps: ['الترشيح المباشر عبر موقع marjanegroup.ma أو مكاتب المتاجر', 'المقابلة مع مدير المتجر الإقليمي'],
      hrEmailOrPortal: 'recrutement@marjane.co.ma',
      growthPath: 'مسؤول جناح ➔ رئيس قسم ➔ مدير مساعد ➔ مدير هايبرماركت',
      verifiedSource: 'marjanegroup.ma'
    }
  ];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. MASTER PUBLIC COMPETITIONS DATABASE (14 OFFICIAL SECTORS)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const publicCompetitions: ConcoursOpportunity[] = [
    // 1. NATIONAL EDUCATION (AREF)
    {
      id: 'cnc-education-aref',
      title: 'مباراة توظيف أطر التدريس والأطر المختصة (التعليم بالأكاديميات الجهوية AREF)',
      institution: 'وزارة التربية الوطنية والتعليم الأولي والرياضة',
      category: 'education',
      categoryLabelAr: 'قطاع التربية الوطنية والتعليم',
      diplomaRequired: 'شهادة الإجازة في الدراسات الأساسية أو المهنية أو التربية (Bac+3)',
      diplomaLevel: 'licence',
      ageLimit: '30 سنة كحد أقصى عند تاريخ إعلان المباراة',
      deadline: 'دورة الخريف 2026 (تعلن رسمياً)',
      scaleGrade: 'السلم 10 (الدرجة الثانية)',
      salary: '5,800 - 6,500 درهم/شهر + تغطية CNOPS/AMO وتقاعد CMR',
      officialSource: 'tawdif.men.gov.ma & emploi-public.ma',
      officialLink: 'tawdif.men.gov.ma',
      applicationSteps: [
        'التسجيل الإلكتروني المسبق عبر البوابة الرسمية tawdif.men.gov.ma والمصادقة على الترشيح',
        'إيداع الملف الرقمي أو الورقي لدى المديرية الإقليمية المختارة',
        'اجتياز الاختبارات الكتابية (الموضوع العام، التخصص، وديداكتيك المادة)',
        'اجتياز المقابلة الشفهية أمام لجنة التفتيش والتأهيل التربوي',
        'سنة تكوينية بالمراكز الجهوية لمهن التربية والتكوين CRMEF'
      ],
      requiredDocuments: ['وصل الترشيح الإلكتروني المستخرج من البوابة', 'نسخة مصادق عليها من شهادة الإجازة', 'نسخة من شهادة البكالوريا', 'نسخة من البطاقة الوطنية (CIN)', 'التزام مصحح الإمضاء بعدم ممارسة أي وظيفة']
    },

    // 2. CUSTOMS & INDIRECT TAXES (ADII)
    {
      id: 'cnc-douane-adii',
      title: 'مباراة توظيف حراس الجمارك ومساعدي التفتيش والتقنيين (إدارة الجمارك ADII)',
      institution: 'إدارة الجمارك والضرائب غير المباشرة - وزارة الاقتصاد والمالية',
      category: 'customs',
      categoryLabelAr: 'الجمارك والضرائب غير المباشرة',
      diplomaRequired: 'شهادة البكالوريا (حارس جمارك - سلم 6) أو تقني متخصص ISTA (سلم 8/9)',
      diplomaLevel: 'bac',
      ageLimit: 'من 18 إلى 25 سنة لحراس الجمارك (تصل لـ 45 سنة للمتصرفين)',
      deadline: 'دورة الربيع / الخريف 2026 (إعلان رسمي)',
      scaleGrade: 'السلم 6 / السلم 8 / السلم 10',
      salary: '4,800 - 8,500 درهم/شهر + تعويضات الحراسة والميدان والتأمين التكميلي',
      officialSource: 'douane.gov.ma & emploi-public.ma',
      officialLink: 'douane.gov.ma',
      applicationSteps: [
        'التسجيل ببوابة التوظيف لإدارة الجمارك douane.gov.ma وطباعة وصل التسجيل',
        'إيداع وتحميل الوثائق الممسوحة ضوئياً',
        'اختبار الرياضة واللياقة البدنية وقياس القامة (لا تقل عن 1.70م للذكور و 1.65م للإناث)',
        'اجتياز الاختبار الكتابي في الثقافة العامة واللغتين والرياضيات',
        'المقابلة الشفهية مع لجنة التفتيش الجمركي والفحص الطبي'
      ],
      requiredDocuments: ['وصل التسجيل الإلكتروني الموقع', 'نسخة مصادق عليها من البكالوريا وبيان النقط', 'نسخة CIN', 'شهادة طبية تثبت القامة وسلامة البصر', 'السجل العدلي']
    },

    // 3. ROYAL GENDARMERIE (GENDARMERIE ROYALE)
    {
      id: 'cnc-gendarmerie-gr',
      title: 'مباراة ولوج سلك التلاميذ الدركيين ضباط الصف (الدرك الملكي - Gendarmerie Royale)',
      institution: 'قيادة الدرك الملكي - إدارة الدفاع الوطني',
      category: 'military',
      categoryLabelAr: 'الدرك الملكي والقوات المسلحة',
      diplomaRequired: 'شهادة البكالوريا (جميع الشعب العلمية والتقنية والأدبية)',
      diplomaLevel: 'bac',
      ageLimit: 'من 18 إلى 24 سنة عند تاريخ إجراء المباراة',
      deadline: 'تفتح دورياً بين أبريل ويونيو سنوياً',
      scaleGrade: 'رتبة تلميذ دركي ضابط صف (Sous-Officier)',
      salary: '5,500 - 7,200 درهم/شهر + سكن وظيفي وتغطية عسكرية متكاملة ومجانية العلاج',
      officialSource: 'recrutement.gr.ma',
      officialLink: 'recrutement.gr.ma',
      applicationSteps: [
        'التسجيل المسبق عبر البوابة الرسمية للدرك الملكي recrutement.gr.ma وتفعيل الحساب',
        'الانتقاء الأولي المعتمد على درجات البكالوريا',
        'استدعاء المرشحين لمراكز التكوين الجهوية للفحص الطبي العسكري الدقيق وقياس القامة (1.70م فأكثر)',
        'اجتياز اختبارات اللياقة البدنية والعدو واختبار السيكوتقني (Psychotechnique)',
        'المقابلة الفردية الشفهية'
      ],
      requiredDocuments: ['استمارة التسجيل المطبوعة', 'عقد الازدياد باللغتين العربية والفرنسية', 'نسخة مصادق عليها لشهادة البكالوريا', 'نسخة البطاقة الوطنية CIN', 'شهادة العزوبية']
    },

    // 4. POLICE & NATIONAL SECURITY (DGSN)
    {
      id: 'cnc-dgsn-police',
      title: 'مباريات التوظيف بالمديرية العامة للأمن الوطني (حراس أمن، مفتشون، ضباط، عمداء)',
      institution: 'المديرية العامة للأمن الوطني - وزارة الداخلية',
      category: 'police',
      categoryLabelAr: 'الأمن الوطني والشرطة',
      diplomaRequired: 'البكالوريا (حارس أمن)، باك + سنة (مفتش)، باك + سنتين (ضابط)، إجازة جامعية (عميد شرطة)',
      diplomaLevel: 'bac',
      ageLimit: '21 إلى 30 سنة (مع قامة لا تقل عن 1.73م للذكور و 1.67م للإناث)',
      deadline: 'إعلان سنوي موحد بمرسوم رسمي',
      scaleGrade: 'رتب الأمن الوطني العسكرية والمدنية',
      salary: '5,200 - 8,500 درهم/شهر (حسب الرتبة + تغطية عسكرية وصحية متكاملة)',
      officialSource: 'concours.dgsn.gov.ma',
      officialLink: 'concours.dgsn.gov.ma',
      applicationSteps: [
        'التسجيل الإلكتروني الإلزامي بالبوابة المخصصة concours.dgsn.gov.ma وطباعة الاستمارة',
        'إيداع الملف الشخصي الكامل بالمصلحة الإدارية لولاية الأمن التابع لها مقر السكنى',
        'قياس الطول والوزن والفحص البصري الأولي (حدة البصر بدون نظارات لا تقل عن 15/20)',
        'اجتياز الاختبارات الكتابية (أسئلة متعددة الاختيارات وموضوع عام باللغتين العربية والفرنسية)',
        'الفحص الطبي النفسي المعمق والبحث الميداني السلوكي'
      ],
      requiredDocuments: ['استمارة التسجيل الإلكتروني الموقعة', 'نسخة مشهود بمطابقتها لشهادة البكالوريا أو الدبلوم المطلوب', 'نسخة بطاقة التعريف الوطنية', 'السجل العدلي (Casier judiciaire)']
    },

    // 5. MINISTRY OF JUSTICE (DAC COURTS)
    {
      id: 'cnc-justice-dac',
      title: 'مباريات وزارة العدل (المنتدبون القضائيون والمحررون القضائيون بمحاكم المملكة)',
      institution: 'وزارة العدل - مديرية الموارد البشرية',
      category: 'justice',
      categoryLabelAr: 'قطاع العدل والقضاء والمحاكم',
      diplomaRequired: 'ماستر في الحقوق أو الاقتصاد (منتدب قضائي سلم 11)، إجازة أو تقني متخصص ISTA (محرر قضائي سلم 8 و 9)',
      diplomaLevel: 'licence',
      ageLimit: '45 سنة كحد أقصى',
      deadline: 'دورية حسب دورات وزارة العدل',
      scaleGrade: 'السلم 8 / السلم 9 / السلم 11',
      salary: '5,200 - 9,800 درهم/شهر + تعويضات الحساب الخاص لكتابة الضبط',
      officialSource: 'dac.justice.gov.ma & justice.gov.ma',
      officialLink: 'dac.justice.gov.ma',
      applicationSteps: [
        'التسجيل الإلكتروني ببوابة مديرية الموارد البشرية لوزارة العدل dac.justice.gov.ma',
        'تحميل التوصيل والمصادقة على التخصص المطلوب (قانون خاص، قانون عام، تدبير، معلوميات)',
        'إجراء الاختبار الكتابي (QCM وموضوع تحليلي في المنظومة القضائية)',
        'اجتياز الاختبار الشفهي أمام قضاة ومسؤولي الإدارة القضائية'
      ],
      requiredDocuments: ['وصل الترشيح الإلكتروني المستخرج من البوابة', 'نسخة الدبلوم المطلوب مشهود بمطابقتها للأصل', 'نسخة البطاقة الوطنية للتعريف', 'سيرة ذاتية للمترشح']
    },

    // 6. PRISON ADMINISTRATION (DGAPR)
    {
      id: 'cnc-dgapr-prisons',
      title: 'مباراة توظيف مراقبي ومربي السجون (المندوبية العامة لإدارة السجون وإعادة الإدماج DGAPR)',
      institution: 'المندوبية العامة لإدارة السجون وإعادة الإدماج',
      category: 'prisons',
      categoryLabelAr: 'إدارة السجون وإعادة الإدماج',
      diplomaRequired: 'شهادة البكالوريا (مراقب مربي - السلم 6) أو دبلوم الدراسات الجامعية / إجازة (ضابط مربي)',
      diplomaLevel: 'bac',
      ageLimit: 'من 21 إلى 30 سنة',
      deadline: 'دورات مستمرة على مدار السنة',
      scaleGrade: 'السلم 6 / السلم 8 / السلم 10',
      salary: '4,800 - 7,400 درهم/شهر + تعويضات الأخطار والتغذية والكسوة',
      officialSource: 'dgapr.gov.ma',
      officialLink: 'dgapr.gov.ma',
      applicationSteps: [
        'التسجيل القبلي عبر الموقع الإلكتروني dgapr.gov.ma في الآجال المحددة',
        'إيداع الملف الرقمي أو بمركز التكوين الإقليمي التابع للمندوبية',
        'اختبارات الكفاءة البدنية والرياضية وقياس القامة (1.75م للذكور و 1.65م للإناث)',
        'الفحص الطبي والنفسي المعمق',
        'اجتياز الاختبار الكتابي والشفهي التقييمي'
      ],
      requiredDocuments: ['طلب خطي موجه للمندوب العام لإدارة السجون', 'نسخة من شهادة البكالوريا مصادق عليها', 'نسخة من البطاقة الوطنية', 'شهادة الفحص الطبي للقامة وسلامة البصر']
    },

    // 7. CIVIL DEFENSE & FIREFIGHTING
    {
      id: 'cnc-protection-civile',
      title: 'مباراة ولوج سلك أعوان الإغاثة وضباط الوقاية المدنية (الإنقاذ والإطفاء)',
      institution: 'المديرية العامة للوقاية المدنية - وزارة الداخلية',
      category: 'civil_defense',
      categoryLabelAr: 'الوقاية المدنية والإنقاذ',
      diplomaRequired: 'مستوى الثالثة إعدادي + رخصة سياقة (B/C/D) لأعوان الإغاثة، أو البكالوريا للضباط',
      diplomaLevel: 'bac',
      ageLimit: 'من 20 إلى 26 سنة',
      deadline: 'تعلن سنوياً بقرار لوزير الداخلية',
      scaleGrade: 'رتب أعوان وضباط الوقاية المدنية',
      salary: '4,600 - 6,800 درهم/شهر + تعويضات الإنقاذ والتدخلات الكبرى',
      officialSource: 'recrutement.protectioncivile.gov.ma',
      officialLink: 'recrutement.protectioncivile.gov.ma',
      applicationSteps: [
        'التسجيل بالبوابة الرسمية للوقاية المدنية وطباعة استمارة الترشيح',
        'الانتقاء الأولي واستدعاء المرشحين لإجراء الفحص الطبي الإجباري بالمدرسة الوطنية للوقاية المدنية',
        'اختبار السباحة (100 متر حرة) وتسلق الحبل والجري مسافة 1000 متر',
        'المقابلة الشفهية واختبار السياقة للشاحنات وسيارات الإسعاف'
      ],
      requiredDocuments: ['استمارة الترشيح الإلكتروني', 'نسخة مصادق عليها من رخصة السياقة', 'شهادة مدرسية أو دبلوم البكالوريا مصادق عليه', 'نسخة البطاقة الوطنية الإلكترونية']
    },

    // 8. FORCES AUXILIAIRES
    {
      id: 'cnc-forces-auxiliaires',
      title: 'مباراة ولوج سلك رجال الصف بالقوات المساعدة (مخازنية - شطر الشمال والجنوب)',
      institution: 'المفتشية العامة للقوات المساعدة - وزارة الداخلية',
      category: 'military',
      categoryLabelAr: 'القوات المساعدة (رجال الصف)',
      diplomaRequired: 'مستوى دراسي من الثالثة إعدادي إلى البكالوريا أو دبلوم تأهيل مهني',
      diplomaLevel: 'bac',
      ageLimit: 'من 18 إلى 24 سنة',
      deadline: 'دورية سنوياً لشطري الشمال (المجاعرة) والجنوب (أولوز)',
      scaleGrade: 'رتبة جندي صف بالقوات المساعدة',
      salary: '4,500 - 5,600 درهم/شهر + تغطية صحية كاملة وتغذية وسكن',
      officialSource: 'recrutement.fa.gov.ma',
      officialLink: 'recrutement.fa.gov.ma',
      applicationSteps: [
        'التسجيل في البوابة الإلكترونية recrutement.fa.gov.ma واختيار الشطر (الشمال أو الجنوب)',
        'الانتقاء المسبق بناء على السن ومستوى البنية الجسدية',
        'استدعاء المرشحين للمركز العسكري لقياس الطول (1.70م على الأقل) والفحص الطبي',
        'اجتياز اختبار الجري والتحمل البدني والمقابلة الأولية'
      ],
      requiredDocuments: ['استمارة التسجيل المطبوعة', 'نسخة بطاقة التعريف الوطنية', 'عقد الازدياد وشهادة مدرسية مصادق عليها', 'السجل العدلي']
    },

    // 9. MINISTRY OF FINANCE & TAXES (DGI & TGR)
    {
      id: 'cnc-finances-tgr-dgi',
      title: 'مباريات وزارة الاقتصاد والمالية (المديرية العامة للضرائب DGI والخزينة العامة TGR)',
      institution: 'وزارة الاقتصاد والمالية',
      category: 'finance',
      categoryLabelAr: 'المالية العامة والضرائب والخزينة',
      diplomaRequired: 'دبلوم تقني متخصص (السلم 9)، إجازة في الاقتصاد والتدبير (السلم 10)، ماستر أو مهندس دولة (السلم 11)',
      diplomaLevel: 'licence',
      ageLimit: '45 سنة كحد أقصى',
      deadline: 'سنوياً حسب قانون المالية',
      scaleGrade: 'السلم 9 / السلم 10 / السلم 11 (متصرفون ومهندسون وتقنيون)',
      salary: '5,500 - 10,500 درهم/شهر + علاوات المردودية السنوية',
      officialSource: 'finances.gov.ma & emploi-public.ma',
      officialLink: 'finances.gov.ma',
      applicationSteps: [
        'التسجيل عبر المنصة الرقمية لوزارة الاقتصاد والمالية e-recrutement.finances.gov.ma',
        'إيداع الشهادات والبيانات الأكاديمية إلكترونياً',
        'اجتياز الاختبار الكتابي في السياسات المالية أو المعلوميات أو التدبير المحاسبي',
        'المقابلة الشفهية التخصصية بمقر الوزارة بالرباط'
      ],
      requiredDocuments: ['وصل التسجيل الإلكتروني', 'نسخ مصادق عليها من الدبلوم والشواهد الجامعية', 'نسخة البطاقة الوطنية', 'سيرة ذاتية محينة']
    },

    // 10. NATIONAL RAILWAYS (ONCF)
    {
      id: 'cnc-oncf-railways',
      title: 'مباريات التوظيف بالمكتب الوطني للسكك الحديدية (ONCF - البراق والأطلس)',
      institution: 'المكتب الوطني للسكك الحديدية (ONCF)',
      category: 'transport',
      categoryLabelAr: 'النقل والسكك الحديدية',
      diplomaRequired: 'دبلوم تقني متخصص (ISTA) في الكهروميكانيك، الكهرباء الصناعية، أو التسيير التجاري',
      diplomaLevel: 'bac2',
      ageLimit: '30 سنة كحد أقصى',
      deadline: 'دورية حسب احتياجات شبكة الخط فائق السرعة LGV ومحطات القطار',
      scaleGrade: 'تقني سككي / سائق قطار / مسؤول تجاري',
      salary: '5,000 - 8,200 درهم/شهر + بطاقة تنقل مجاني بالقطارات وتأمين صحي خاص',
      officialSource: 'oncf.ma & emploi-public.ma',
      officialLink: 'oncf.ma',
      applicationSteps: [
        'الترشيح عبر بوابة التوظيف الرسمية لـ ONCF',
        'اختبارات الكفاءة النفسية والتركيز ورد الفعل الحركي (Psychotechnique) لسائقي القطارات',
        'الفحص الطبي الدقيق للسمع والبصر وسلامة القلب',
        'المقابلة التقنية والتكوين المؤدى عنه بمعهد التكوين السككي IFF بالرباط'
      ],
      requiredDocuments: ['سيرة ذاتية دقيقة', 'نسخة الدبلوم التقني المتخصص', 'نسخة البطاقة الوطنية', 'شهادة السوابق العدلية']
    },

    // 11. HEALTH SECTOR (ISPITS & CHU)
    {
      id: 'cnc-sante-ispits',
      title: 'مباراة توظيف الممرضين وتقنيي الصحة من الدرجة الأولى',
      institution: 'وزارة الصحة والحماية الاجتماعية والمراكز الاستشفائية CHU',
      category: 'health',
      categoryLabelAr: 'قطاع الصحة والمستشفيات',
      diplomaRequired: 'دبلوم ممرض دولة / تقني صحة من معاهد ISPITS أو شهادة معادلة معترف بها',
      diplomaLevel: 'licence',
      ageLimit: '45 سنة كحد أقصى',
      deadline: 'حسب إعلانات كل جهة ومستشفى جامعي CHU',
      scaleGrade: 'السلم 10 (إطار تقني صحة / ممرض)',
      salary: '6,400 - 7,800 درهم/شهر + تعويضات الحراسة والمخاطر المهنية',
      officialSource: 'sante.gov.ma & emploi-public.ma',
      officialLink: 'sante.gov.ma',
      applicationSteps: [
        'التسجيل في المنصة الإلكترونية المخصصة للمباراة بموقع وزارة الصحة',
        'إرفاق الوثائق والشهادات المحصل عليها والتأكد من تطابق التخصص المطلوب',
        'اجتياز الاختبار الكتابي التخصصي في العلوم التمريضية أو تقنيات الصحة'
      ],
      requiredDocuments: ['طلب خطي موجه لوزير الصحة', 'نسخة مشهود بمطابقتها لأصل دبلوم ISPITS', 'نسخة البطاقة الوطنية', 'السيرة الذاتية المفصلة']
    },

    // 12. VOCATIONAL TRAINING (OFPPT & CMC)
    {
      id: 'cnc-ofppt-formateurs',
      title: 'مباراة توظيف مكوني التكوين المهني OFPPT (المدن والكفاءات CMC)',
      institution: 'مكتب التكوين المهني وإنعاش الشغل OFPPT',
      category: 'ofppt',
      categoryLabelAr: 'قطاع التكوين المهني وإنعاش الشغل',
      diplomaRequired: 'تقني متخصص (Bac+2) مع خبرة 3 سنوات، أو إجازة مهنية، أو دبلوم مهندس دولة (Bac+5)',
      diplomaLevel: 'bac2',
      ageLimit: '45 سنة',
      deadline: 'مفتوحة حسب الدورات السنوية',
      scaleGrade: 'إطار مكون مهني (حسب الشهادة المحصل عليها)',
      salary: '6,200 - 11,500 درهم/شهر (حسب السلم والخبرة الصناعية المعتمدة)',
      officialSource: 'recrutement.ofppt.ma',
      officialLink: 'recrutement.ofppt.ma',
      applicationSteps: [
        'إنشاء حساب مرشح ببوابة التوظيف الخاصة بـ OFPPT وإدخال الشواهد وسنوات الخبرة',
        'الانتقاء الأولي بناءً على التخصصات التقنية المطلوبة (كابلاج، ميكانيك، إعلاميات...)',
        'اجتياز الامتحان التقني والمحاكاة البيداغوجية العملية (Micro-enseignement)'
      ],
      requiredDocuments: ['سيرة ذاتية دقيقة تبرز الخبرات العملية', 'شواهد العمل المصادق عليها مع مستخرج التصريح بالـ CNSS', 'نسخ الشواهد والدبلومات المحصل عليها']
    },

    // 13. LOCAL AUTHORITIES (COMMUNES)
    {
      id: 'cnc-communes-locales',
      title: 'مباريات التوظيف بالجماعات الترابية (عمالات ومجالس المدن والجهات)',
      institution: 'وزارة الداخلية - المديرية العامة للجماعات الترابية',
      category: 'local_authorities',
      categoryLabelAr: 'الجماعات الترابية ومجالس العمالات',
      diplomaRequired: 'تقني (السلم 8)، تقني متخصص ISTA (السلم 9)، إجازة (السلم 10)، ماستر (السلم 11)',
      diplomaLevel: 'bac2',
      ageLimit: 'من 18 إلى 45 سنة كحد أقصى',
      deadline: 'حسب إعلانات كل جماعة حضرية أو قروية',
      scaleGrade: 'تقنيو ومتصرفو الإدارات العمومية والجماعية',
      salary: '4,200 - 7,800 درهم/شهر (حسب السلم المالي المخصص للمنصب)',
      officialSource: 'emploi-public.ma & collectivités-territoriales.gov.ma',
      officialLink: 'emploi-public.ma',
      applicationSteps: [
        'تتبع إعلانات التوظيف الفردية المنشورة على بوابة التشغيل العمومي emploi-public.ma',
        'إرسال أو إيداع الملف الورقي بمكتب الضبط التابع للجماعة المنظمة للمباراة قبل انقضاء الأجل',
        'اجتياز الاختبار الكتابي والشفهي أمام لجنة التوظيف المحلية'
      ],
      requiredDocuments: ['طلب خطي موجه لرئيس المجلس الجماعي المعني', 'نسخة مصادق عليها من الدبلوم والتخصص', 'نسخة من البطاقة الوطنية', 'سيرة ذاتية']
    },

    // 14. UNIVERSITIES
    {
      id: 'cnc-universites-admin',
      title: 'مباريات توظيف المتصرفين والتقنيين بالجامعات المغربية',
      institution: 'وزارة التعليم العالي والبحث العلمي والابتكار',
      category: 'universities',
      categoryLabelAr: 'الجامعات والمدارس العليا والمعاهد',
      diplomaRequired: 'دبلوم تقني متخصص (ISTA) أو إجازة مهنية أو ماستر في التسيير والإعلاميات',
      diplomaLevel: 'licence',
      ageLimit: '45 سنة',
      deadline: 'دورية حسب كل جامعة (جامعة عبد المالك السعدي، جامعة الحسن الثاني...)',
      scaleGrade: 'متصرفون وتقنيو التعليم العالي',
      salary: '4,900 - 8,200 درهم/شهر',
      officialSource: 'emploi-public.ma',
      officialLink: 'emploi-public.ma',
      applicationSteps: [
        'التسجيل في منصة الجامعة المنظمة أو عبر بوابة التشغيل العمومي',
        'إجراء الامتحان الكتابي التخصصي في الإدارة أو المعلوميات'
      ],
      requiredDocuments: ['طلب خطي', 'نسخ الشواهد المحصل عليها', 'نسخة CIN']
    }
  ];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. MASTER LABOUR MARKET UPDATES & LEGAL DEVELOPMENTS (2026)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const labourUpdatesList: LabourUpdate[] = [
    {
      id: 'upd-smic-2026',
      title: 'تطبيق الزيادة الرسمية في الحد الأدنى للأجور (SMIC) بالقطاع الصناعي والتجاري',
      category: 'wages',
      categoryLabelAr: 'الأجور والتعويضات',
      badge: 'إلزامي بمقتضى القانون',
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200',
      date: '2026',
      summary: 'رفع الأجر الأدنى القانوني في الساعة (SMIC) لقطاعات الصناعة والتجارة والخدمات ليصل إلى حوالي 17.10 درهم للساعة، محققاً راتباً شهرياً قانونياً يقارب 3,120 درهماً صافياً للأجير.',
      keyPoints: [
        'تطبيق الزيادة على عمال المصانع والمناطق الحرة (Renault, Lear, Stellantis...) والشركات الخدماتية.',
        'رفع الحد الأدنى للأجر الفلاحي (SMAG) إلى ما يقارب 93.5 درهماً لليوم الواحد.',
        'تشديد المراقبة عبر مفتشيات الشغل لضمان تنزيل الزيادة ومنع التهرب أو الخصم غير القانوني.'
      ],
      impactOnCandidate: 'إذا كنت تعمل بدوام كامل (191 ساعة شهرياً)، فإن أي مشغل ملزم قانونياً بأن يمنحك ما لا يقل عن 3,120 درهم صافي شهرياً مع التصريح الإجباري في CNSS.',
      officialSource: 'الجريدة الرسمية للمملكة & وزارة الإدماج الاقتصادي والتشغيل',
      officialLink: 'travail.gov.ma'
    },
    {
      id: 'upd-ir-reform',
      title: 'إصلاح الضريبة على الدخل (IR): إعفاء جديد وزيادة في الأجور تصل لـ 500 درهم شهرياً',
      category: 'taxes',
      categoryLabelAr: 'الضرائب والمالية العامة',
      badge: 'قانون المالية',
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200',
      date: '2026',
      summary: 'مراجعة جدول الضريبة على الدخل برفع سقف الشريحة الأولى المعفاة من 30,000 درهم إلى 40,000 درهم سنوياً، وتخفيض الأسعار الهامشية لرفع القدرة الشرائية للطبقة المتوسطة والأجراء.',
      keyPoints: [
        'إعفاء تام من ضريبة الدخل لكل راتب خام يقل عن 6,000 درهم شهرياً.',
        'زيادة صافية شهرية مباشرة في الحساب البنكي تتراوح بين 300 و 500 درهم للموظفين والعمال.',
        'رفع خصم الأعباء العائلية (عن الزوجة والأبناء) من 360 إلى 500 درهم عن كل فرد مكفول.'
      ],
      impactOnCandidate: 'زيادة مباشرة في الراتب الصافي الشهري دون أي اقتطاع إضافي من المشغل، ويمكنك حساب فارق راتبك بدقة في تبويب حاسبة الراتب أدناه.',
      officialSource: 'المديرية العامة للضرائب (DGI) - قانون المالية',
      officialLink: 'tax.gov.ma'
    },
    {
      id: 'upd-anapec-insertion',
      title: 'إطلاق منصة "أنابيك 2.0" وعقد التدريب من أجل الإدماج (CI) مع إعفاءات ضريبية للمشغل',
      category: 'initiatives',
      categoryLabelAr: 'مبادرات التشغيل والإدماج',
      badge: 'برنامج وطني',
      badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200',
      date: '2026',
      summary: 'عصرنة آليات الوكالة الوطنية لإنعاش التشغيل والكفاءات (ANAPEC) عبر مطابقة رقمية ذكية للملفات مع كبرى المصانع والشركات البنكية، وتمديد مزايا عقد الإدماج CI.',
      keyPoints: [
        'إعفاء المشغل من مساهمات الضريبة على الدخل والضمان الاجتماعي لمدة تصل إلى 24 شهراً.',
        'تحمل الدولة لمساهمات التغطية الصحية الإجبارية (AMO) عن المرشحين حاملي عقود التدريب.',
        'إلزامية تحويل 60% على الأقل من عقود الإدماج في كل شركة إلى عقود عمل دائمة (CDI) بعد نهاية التدريب.'
      ],
      impactOnCandidate: 'فرصة مثالية لحاملي الدبلومات حديثي التخرج للاندماج الفوري في كبرى الشركات دون اشتراط خبرة مسبقة مع حماية التغطية الصحية.',
      officialSource: 'الوكالة الوطنية لإنعاش التشغيل والكفاءات (ANAPEC)',
      officialLink: 'anapec.org'
    },
    {
      id: 'upd-ipe-cnss',
      title: 'تسهيل شروط الاستفادة من التعويض عن فقدان الشغل (IPE) وتطبيق Ma CNSS الرقمي',
      category: 'social',
      categoryLabelAr: 'الحماية الاجتماعية والضمان',
      badge: 'حقوق العمال',
      badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200',
      date: '2026',
      summary: 'تيسير معايير صرف التعويض المالي للأجراء الذين فقدوا عملهم لظروف خارجة عن إرادتهم، مع إمكانية إيداع وتتبع الملفات مباشرة عبر الهاتف.',
      keyPoints: [
        'صرف تعويض مالي شهري يعادل 70% من متوسط الأجر المصرح به في الـ 36 شهراً الأخيرة (في حدود الـ SMIC) لمدة 6 أشهر.',
        'احتساب نقاط التقاعد واستمرار التغطية الصحية الإجبارية (AMO) خلال فترة صرف التعويض.',
        'إمكانية تحميل شهادة التصريح بالأيام والتتبع اللحظي لحالة الملف عبر تطبيق Ma CNSS.'
      ],
      impactOnCandidate: 'شبكة أمان اجتماعي تضمن استمرار دخلك وتغطيتك الصحية لأفراد عائلتك في حال تعرض مصنعك أو شركتك لتوقف أو إغلاق مفاجئ.',
      officialSource: 'الصندوق الوطني للضمان الاجتماعي (CNSS)',
      officialLink: 'cnss.ma'
    },
    {
      id: 'upd-cmc-training',
      title: 'مدن المهن والكفاءات (CMC): فتح التسجيل بـ 12 جهة لتكوين 34,000 كفاءة في قطاعات المستقبل',
      category: 'training',
      categoryLabelAr: 'التكوين المهني والصناعي',
      badge: 'مدارس الجيل الجديد',
      badgeColor: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200',
      date: '2026',
      summary: 'انطلاق مرحلة تكوينية موسعة في مدن المهن والكفاءات بمختلف جهات المملكة لتأهيل الشباب في مهن السيارات الكهربائية، الطيران، الذكاء الاصطناعي، اللوجستيك والصحة.',
      keyPoints: [
        'بنيات تحتية تحاكي المصانع والمستشفيات الحقيقية بنسبة 80% من التطبيق العملي.',
        'شراكات مباشرة تضمن فترات تدريب وإدماج موثقة مع كبرى الشركات المصنعة (Renault, Stellantis, Safran).',
        'شواهد تقني وتقني متخصص وتأهيل معترف بها في المغرب ومطابقة للمعايير الأوروبية.'
      ],
      impactOnCandidate: 'مسار سريع ومضمون يرفع نسبة توظيف الخريج لأكثر من 85% خلال 6 أشهر من التخرج في أرقى المنصات الصناعية بالمملكة.',
      officialSource: 'مكتب التكوين المهني وإنعاش الشغل (OFPPT & CMC)',
      officialLink: 'cmc.ac.ma'
    },
    {
      id: 'upd-calendar-concours',
      title: 'رزنامة إعلانات كبرى المباريات العمومية بالمغرب: المواعيد الدورية المتوقعة لسنة 2026',
      category: 'concours_calendar',
      categoryLabelAr: 'رزنامة المباريات الرسمية',
      badge: 'مواعيد سنوية',
      badgeColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200',
      date: '2026',
      summary: 'جدول زمني استرشادي للمواعيد الدورية المعتادة لإعلانات التوظيف العمومي الكبرى بالمغرب لمساعدة المترشحين على تجهيز الوثائق والاستعداد المبكر.',
      keyPoints: [
        'الأمن الوطني (DGSN): إعلان دوري موحد خلال فصلي الصيف والخريف (أكثر من 6,000 منصب).',
        'الدرك الملكي (GR): دورة تلاميذ ضباط الصف تنطلق عادة بين شهري أبريل ويونيو.',
        'الجمارك (ADII): دورة حراس الجمارك والتقنيين خلال فصلي الربيع والخريف.',
        'التعليم (AREF): مباريات أطر التدريس والأطر المختصة تعلن رسمياً خلال شهري أكتوبر ونونبر.'
      ],
      impactOnCandidate: 'تجهيز السجل العدلي وبيان النقط والشهادات الطبية مسبقاً يضمن لك إيداع ملفك في الساعات الأولى للإعلان وتفادي الضغط على البوابات الإلكترونية.',
      officialSource: 'بوابة التشغيل العمومي emploi-public.ma & الجريدة الرسمية',
      officialLink: 'emploi-public.ma'
    }
  ];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DYNAMIC FILTERING IMPLEMENTATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const filteredPrivateJobs = privateJobs.filter(job => {
    if (selectedCity !== 'all' && job.city !== selectedCity) return false;
    if (selectedCategory !== 'all' && job.category !== selectedCategory) return false;
    if (jobSearchTerm.trim()) {
      const term = jobSearchTerm.toLowerCase();
      const match = job.name.toLowerCase().includes(term) ||
                    job.role.toLowerCase().includes(term) ||
                    job.diplomaRequired.toLowerCase().includes(term) ||
                    job.zone.toLowerCase().includes(term) ||
                    job.cityLabelAr.toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  const filteredConcours = publicCompetitions.filter(cnc => {
    if (concoursCategory !== 'all' && cnc.category !== concoursCategory) return false;
    if (concoursDiploma !== 'all' && cnc.diplomaLevel !== concoursDiploma) return false;
    if (concoursSearchTerm.trim()) {
      const term = concoursSearchTerm.toLowerCase();
      const match = cnc.title.toLowerCase().includes(term) ||
                    cnc.institution.toLowerCase().includes(term) ||
                    cnc.diplomaRequired.toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  const filteredUpdates = labourUpdatesList.filter(upd => {
    if (updateCategory !== 'all' && upd.category !== updateCategory) return false;
    return true;
  });

  // Action handlers
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenVipModal = (company: string, role: string) => {
    setTargetCompanyForVip(company);
    setTargetRoleForVip(role);
    setDfySubmitted(false);
    setShowDoneForYouModal(true);
  };

  const handleDfySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dfyForm.name || !dfyForm.phone) return;

    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_crm_leads') || '[]');
      const newLead = {
        id: `vip-job-${Date.now()}`,
        name: dfyForm.name,
        phone: dfyForm.phone,
        city: dfyForm.city,
        diploma: dfyForm.diploma,
        selectedPackage: dfyForm.selectedPackage,
        company: targetCompanyForVip,
        role: targetRoleForVip,
        date: new Date().toLocaleDateString('ar-MA') + ' ' + new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' }),
        status: 'new'
      };
      localStorage.setItem('mezdohub_crm_leads', JSON.stringify([newLead, ...existing]));
    } catch {}

    trackLeadConversion('job_direct_hr', targetCompanyForVip, {
      role: targetRoleForVip,
      package: dfyForm.selectedPackage
    });

    setDfySubmitted(true);
  };

  // Generate customized Demande text
  const generatedArabicLetter = `المملكة المغربية
الاسم الكامل: ${demandeCandidateName || 'كريم المرابط'}
رقم بطاقة التعريف الوطنية: ${demandeCin || 'AB123456'}
رقم الهاتف: ${demandePhone || '0612345678'}
العنوان الشخصي: ${demandeAddress || 'طنجة، المغرب'}

إلى السيد (ة): وزير / مدير عام ${demandeTargetInstitution || 'المؤسسة المعنية'}
الموضوع: طلب خطي لاجتياز ${demandeTargetRole || 'مباراة التوظيف'}

سلام تام بوجود مولانا الإمام،

وبعد،
يشرفني بكل احترام وتقدير أن أتقدم إلى سيادتكم بطلبي هذا قصد تسجيل ترشيحي لاجتياز ${demandeTargetRole || 'مباراة التوظيف برسم سنة 2026'}.

وأحيطكم علماً سيدي المدير المحترم، أنني شاب مغربي حامل لبطاقة التعريف الوطنية رقم (${demandeCin || 'AB123456'})، وحاصل على الشهادة المطلوبة في التخصص المناسب، ومستوفٍ لكافة الشروط القانونية المنصوص عليها في قرار فتح المباراة.

وتجدون رفقة هذا الطلب الملف الإداري الكامل متضمناً كافة الوثائق والشهادات المشهود بمطابقتها للأصل.

وفي انتظار ردكم الكريم، تفضلوا سيدي المدير فائق عبارات التقدير والاحترام.

وحرر بـ: ${demandeAddress?.split('،')[1]?.trim() || 'المغرب'}، بتاريخ: ${new Date().toLocaleDateString('ar-MA')}

توقيع المترشح:
${demandeCandidateName || 'كريم المرابط'}`;

  const generatedFrenchLetter = `De : ${demandeCandidateName || 'Karim El Mourabit'}
CIN : ${demandeCin || 'AB123456'}
Tél : ${demandePhone || '+212 6 12 34 56 78'}
Adresse : ${demandeAddress || 'Tanger, Maroc'}

À l'attention de : Monsieur le Directeur des Ressources Humaines
Entreprise : ${demandeTargetInstitution || 'Renault / Lear / Safran'}

Objet : Candidature spontanée / Réponse à l'offre pour le poste de : ${demandeTargetRole || 'Technicien'}

Monsieur le Directeur,

J'ai l'honneur de solliciter votre haute bienveillance afin de vous soumettre ma candidature pour le poste de ${demandeTargetRole || 'Technicien de production / Maintenance'}.

Titulaire d'un diplôme reconnu et motivé par la rigueur et l'excellence industrielle de votre groupe, j'ai acquis des compétences techniques solides que je souhaite mettre au service de vos équipes.

Dynamique, rigoureux et doté d'un fort esprit d'équipe, je serais ravi de vous rencontrer lors d'un entretien afin de vous exposer plus en détail ma motivation.

Dans l'attente de votre réponse, je vous prie d'agréer, Monsieur le Directeur, l'expression de mes salutations les plus distinguées.

Fait à ${demandeAddress?.split('،')[1]?.trim() || 'Tanger'}, le ${new Date().toLocaleDateString('fr-FR')}

Signature :
${demandeCandidateName || 'Karim El Mourabit'}`;

  return (
    <div className={`space-y-8 animate-fade-in ${isAr ? 'text-right' : 'text-left font-[\'Inter\',sans-serif]'}`}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HEADER & TRI-POLE REGIONAL METRICS + LIVE TICKER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-6">
        
        {/* TOP BAR: BADGE & CV BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-[#2563EB] border border-[#E2E8F0] dark:border-slate-700 shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'المرصد الوطني الموحد للتشغيل والمباريات 2026' : 'Observatoire National de l\'Emploi Maroc'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] dark:text-white leading-tight">
              {isAr ? 'منظومة الوظائف الكبرى ومباريات الدولة بالمغرب' : 'Écosystème National de l\'Emploi & Concours'}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 font-normal leading-relaxed">
              {isAr 
                ? 'تصفح كبرى المجموعات الصناعية والبنكية والتكنولوجية في طنجة، القنيطرة، والدار البيضاء، ومباريات الوظيفة العمومية وأحدث مستجدات الحد الأدنى للأجور وقانون العمل من المصادر الرسمية المؤكدة فقط.'
                : 'Accédez aux offres réelles des usines, banques, concours de l\'État et actualités officielles du SMIC et du code du travail.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{isAr ? 'رجوع' : 'Retour'}</span>
              </button>
            )}
            <button
              onClick={() => onSelectTab('cv-builder')}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>{isAr ? 'أنشئ سيرة ذاتية ATS' : 'Créateur CV ATS'}</span>
            </button>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            LIVE TICKER: BREAKING EMPLOYMENT & CONCOURS DEVELOPMENTS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <Megaphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{isAr ? 'شريط المستجدات الحية 2026:' : 'Actualités en direct :'}</span>
          </div>

          <div className="flex-1 text-[#1E293B] dark:text-slate-200 text-xs leading-relaxed font-medium">
            <span>
              {isAr 
                ? '📌 تطبيق الزيادة الرسمية في الـ SMIC (17.10 درهم/ساعة) • إعفاء ضريبي جديد للأجور الأقل من 6,000 درهم • فتح التسجيل بمدن المهن والكفاءات CMC • بوابة emploi-public.ma لمباريات الدولة'
                : '📌 Hausse effective du SMIC • Exonération IR < 6000 DH • Inscriptions CMC ouvertes'}
            </span>
          </div>

          <button
            onClick={() => setActiveMainTab('updates')}
            className="text-xs font-bold text-[#2563EB] dark:text-blue-400 hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>{isAr ? 'تفاصيل المستجدات' : 'Voir détails'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* REGIONAL HUBS & CONCOURS LIVE STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center">
          <div 
            onClick={() => { setActiveMainTab('jobs'); setSelectedCity('tanger'); }}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 cursor-pointer hover:border-[#2563EB] transition-all"
          >
            <div className="font-mono font-black text-lg text-[#2563EB]">طنجة (5 شركات)</div>
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold block truncate">Renault, Lear, Aptiv, Yazaki</span>
          </div>

          <div 
            onClick={() => { setActiveMainTab('jobs'); setSelectedCity('kenitra'); }}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 cursor-pointer hover:border-emerald-500 transition-all"
          >
            <div className="font-mono font-black text-lg text-emerald-600 dark:text-emerald-400">القنيطرة (4 مصانع)</div>
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold block truncate">Stellantis, Nexteer, AGC</span>
          </div>

          <div 
            onClick={() => { setActiveMainTab('jobs'); setSelectedCity('casablanca'); }}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 cursor-pointer hover:border-indigo-500 transition-all"
          >
            <div className="font-mono font-black text-lg text-indigo-600 dark:text-indigo-400">كازا (5 مؤسسات)</div>
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold block truncate">Safran, Capgemini, Attijari</span>
          </div>

          <div 
            onClick={() => setActiveMainTab('concours')}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 cursor-pointer hover:border-amber-500 transition-all"
          >
            <div className="font-mono font-black text-lg text-amber-600 dark:text-amber-400">مباريات الدولة (14 قطاعاً)</div>
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold block truncate">التعليم، الأمن، الجمارك، الدرك</span>
          </div>

          <div 
            onClick={() => setActiveMainTab('updates')}
            className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 cursor-pointer hover:border-rose-500 transition-all col-span-2 sm:col-span-1"
          >
            <div className="font-mono font-black text-lg text-rose-600 dark:text-rose-400">المستجدات 2026</div>
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 font-semibold block truncate">SMIC & ضريبة IR & أنابيك</span>
          </div>
        </div>

        {/* SUB-TABS NAVIGATION (Main Switcher) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
          {[
            { id: 'jobs', label: isAr ? 'سوق العمل والمصانع الكبرى (القطاع الخاص)' : 'Grandes Entreprises & Usines', icon: Building2 },
            { id: 'concours', label: isAr ? 'بوابة مباريات الوظيفة العمومية (14 قطاعاً)' : 'Concours de l\'État (14)', icon: Landmark },
            { id: 'updates', label: isAr ? 'مستجدات وتشريعات الشغل 2026 (SMIC & CNSS)' : 'Actualités & SMIC 2026', icon: Newspaper },
            { id: 'salary-calc', label: isAr ? 'حاسبة الراتب الصافي بالمغرب (Salaire Net)' : 'Simulateur Salaire Net', icon: Calculator },
            { id: 'demande-maker', label: isAr ? 'مولد الطلب الخطي الرسمي (Demande d\'Emploi)' : 'Générateur Demande', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeMainTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700 hover:border-slate-300'
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
          TAB 1: PRIVATE SECTOR & REGIONAL INDUSTRIAL HUBS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'jobs' && (
        <div className="space-y-6">
          
          {/* Dual Filtering Matrix: Cities + Sectors */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-xs">
            
            {/* Search Input & City Buttons */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#94A3B8] absolute right-3.5 top-3" />
                <input
                  type="text"
                  value={jobSearchTerm}
                  onChange={e => setJobSearchTerm(e.target.value)}
                  placeholder={isAr ? 'ابحث باسم الشركة (رونو، لير، سافران...)، المنصب، أو الدبلوم...' : 'Recherche entreprise, poste, diplôme...'}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-xs text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* City Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-[#64748B] dark:text-slate-300 ml-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isAr ? 'المدينة:' : 'Ville:'}</span>
                </span>
                {[
                  { id: 'all', label: isAr ? 'كافة المدن' : 'Toutes les villes' },
                  { id: 'tanger', label: isAr ? 'طنجة (TFZ/TAC)' : 'Tanger' },
                  { id: 'kenitra', label: isAr ? 'القنيطرة (AFZ)' : 'Kénitra' },
                  { id: 'casablanca', label: isAr ? 'الدار البيضاء (Midparc/CFC)' : 'Casablanca' }
                ].map(city => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      selectedCity === city.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                        : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] dark:border-slate-700'
                    }`}
                  >
                    {city.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#F1F5F9] dark:border-slate-800">
              <span className="text-xs font-bold text-[#64748B] dark:text-slate-300 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{isAr ? 'القطاع الاقتصادي:' : 'Secteur:'}</span>
              </span>
              {[
                { id: 'all', label: isAr ? 'جميع القطاعات' : 'Tous' },
                { id: 'automotive', label: isAr ? 'صناعة السيارات والكابلاج' : 'Automobile & Câblage' },
                { id: 'aerospace', label: isAr ? 'صناعة الطيران (Aéronautique)' : 'Aéronautique' },
                { id: 'manufacturing', label: isAr ? 'الصناعات التحويلية' : 'Industrie' },
                { id: 'technology', label: isAr ? 'التكنولوجيا والبرمجيات (Tech)' : 'Tech & IT' },
                { id: 'banking', label: isAr ? 'البنوك والمالية (Banking)' : 'Banques & Finance' },
                { id: 'logistics', label: isAr ? 'الموانئ واللوجستيك والتوزيع' : 'Logistique & Ports' }
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedCategory(sec.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors ${
                    selectedCategory === sec.id
                      ? 'bg-[#2563EB] text-white font-bold'
                      : 'bg-[#F1F5F9] dark:bg-slate-800 text-[#475569] dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

          </div>

          {/* Job Listings Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrivateJobs.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#2563EB] transition-all shadow-xs flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  
                  {/* Category & Verified Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F1F5F9] dark:bg-slate-800 text-[#2563EB]">
                      {job.categoryLabelAr}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                      <span>✅ مصدر مؤكد</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#0F172A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                      {job.name}
                    </h3>
                    <p className="text-xs text-[#475569] dark:text-slate-300 font-medium mt-1">
                      {job.role}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F1F5F9] dark:border-slate-800 space-y-1.5 text-xs text-[#64748B] dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{job.cityLabelAr} ({job.zone})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.diplomaRequired}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJobDetail(job)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>عرض الشروط والخطوات</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleCopy(job.hrEmailOrPortal, job.id)}
                      title="نسخ بريد التوظيف"
                      className="p-2 rounded-xl border border-[#CBD5E1] dark:border-slate-700 text-[#475569] dark:text-slate-300 hover:border-slate-400 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedKey === job.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenVipModal(job.name, job.role)}
                    className="w-full py-2 px-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>إرسال الملف المباشر للموارد البشرية (خدمة VIP)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: PUBLIC COMPETITIONS HUB (14 VERIFIED CONCOURS)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'concours' && (
        <section className="space-y-6">
          
          {/* Permanent Disclaimer Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">⚠️ تنبيه رسمي وقانوني دائم:</strong>
              <p>منصة MezdoHub لا تنظم مباريات التوظيف العمومي ولا تتلقى أي مبالغ مالية مقابل التسجيل. التقديم يتم حصراً ومجاناً عبر الروابط الرسمية للمؤسسات الحكومية المعنية وبوابة التشغيل العمومي التابعة لوزارة الانتقال الرقمي وإصلاح الإدارة (emploi-public.ma).</p>
            </div>
          </div>

          {/* Concours Dedicated Filter Bar */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-amber-600" />
                  <span>بوابة مباريات الوظيفة العمومية بالمغرب (14 قطاعاً حكومياً 2026)</span>
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  المباريات الوطنية المعتمدة: التعليم، الأمن، الدرك، الجمارك، العدل، السجون، الوقاية المدنية، المالية، والسكك الحديدية.
                </p>
              </div>

              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
                <span>✅ روابط رسمية مؤكدة (emploi-public.ma)</span>
              </div>
            </div>

            {/* Concours Filters: Search + Sector + Diploma */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">بحث في المباريات:</label>
                <input
                  type="text"
                  value={concoursSearchTerm}
                  onChange={e => setConcoursSearchTerm(e.target.value)}
                  placeholder="ابحث بالوزارة أو التخصص (جمارك، أمن، تعليم...)"
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">القطاع والمؤسسة المنظمة:</label>
                <select
                  value={concoursCategory}
                  onChange={e => setConcoursCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                >
                  <option value="all">كافة القطاعات الحكومية (14)</option>
                  <option value="education">التربية والتعليم (أطر الأكاديميات AREF)</option>
                  <option value="customs">الجمارك والضرائب غير المباشرة (ADII)</option>
                  <option value="military">الدرك الملكي والقوات المساعدة</option>
                  <option value="police">الأمن الوطني والشرطة (DGSN)</option>
                  <option value="justice">وزارة العدل والمحاكم (كتابة الضبط)</option>
                  <option value="prisons">إدارة السجون وإعادة الإدماج (DGAPR)</option>
                  <option value="civil_defense">الوقاية المدنية والإسعاف</option>
                  <option value="finance">وزارة المالية والضرائب (DGI & TGR)</option>
                  <option value="transport">السكك الحديدية (ONCF - البراق)</option>
                  <option value="health">الصحة والمستشفيات (ISPITS & CHU)</option>
                  <option value="ofppt">التكوين المهني (OFPPT & CMC)</option>
                  <option value="local_authorities">الجماعات الترابية والعمالات</option>
                  <option value="universities">الجامعات والتعليم العالي</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-600 dark:text-slate-300">الدبلوم والشهادة المطلوبة:</label>
                <select
                  value={concoursDiploma}
                  onChange={e => setConcoursDiploma(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                >
                  <option value="all">كافة المستويات الأكاديمية</option>
                  <option value="bac">شهادة البكالوريا (الأمن، الدرك، الجمارك، السجون)</option>
                  <option value="bac2">تقني متخصص / Bac+2 (ISTA / OFPPT / ONCF)</option>
                  <option value="licence">شهادة الإجازة / Bac+3 (التعليم، الصحة، كتابة الضبط)</option>
                  <option value="master">شهادة الماستر أو مهندس / Bac+5</option>
                </select>
              </div>

            </div>
          </div>

          {/* Concours Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredConcours.map(concours => (
              <div
                key={concours.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-amber-500 transition-all shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#F1F5F9] dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                      {concours.categoryLabelAr}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200">
                      ✅ رسمي
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {concours.scaleGrade}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-base sm:text-lg text-[#0F172A] dark:text-white">
                    {concours.title}
                  </h3>
                  <p className="text-xs text-[#475569] dark:text-slate-300 font-medium mt-1">
                    المؤسسة المنظمة: {concours.institution}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#64748B] dark:text-slate-400 bg-[#F8FAFC] dark:bg-slate-850 p-4 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">الدبلوم المطلوب:</span>
                    <span className="font-bold text-slate-900 dark:text-white text-left">{concours.diplomaRequired}</span>
                  </div>
                  <div className="flex justify-between text-amber-700 dark:text-amber-300">
                    <span>السن القانوني الأقصى:</span>
                    <span className="font-bold">{concours.ageLimit}</span>
                  </div>
                  <div className="flex justify-between text-rose-600 dark:text-rose-400">
                    <span>موعد الدورة / الإعلان:</span>
                    <span className="font-bold">{concours.deadline}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>الراتب الشهري التقديري:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{concours.salary}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => setSelectedConcoursDetail(concours)}
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>الشروط والوثائق الكاملة</span>
                    <FileText className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://${concours.officialLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>البوابة الرسمية ({concours.officialLink})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 3: MASTER LABOUR UPDATES & LEGAL DEVELOPMENTS 2026
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'updates' && (
        <section className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-rose-600" />
                  <span>مرصد مستجدات وتشريعات سوق الشغل بالمغرب 2026</span>
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  متابعة دقيقة للحد الأدنى للأجور (SMIC)، إصلاح الضريبة على الدخل (IR)، برامج أنابيك، ومدن المهن والكفاءات.
                </p>
              </div>

              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200">
                <Bell className="w-3.5 h-3.5" />
                <span>محدث وفق الجريدة الرسمية وقانون المالية</span>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-[#64748B] dark:text-slate-300 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>تصنيف المستجدات:</span>
              </span>
              {[
                { id: 'all', label: 'كافة المستجدات (6)' },
                { id: 'wages', label: 'الحد الأدنى للأجور (SMIC)' },
                { id: 'taxes', label: 'الضريبة على الدخل (IR)' },
                { id: 'initiatives', label: 'مبادرات أنابيك والإدماج' },
                { id: 'social', label: 'الحماية والتعويض (CNSS)' },
                { id: 'training', label: 'مدن المهن والكفاءات (CMC)' },
                { id: 'concours_calendar', label: 'رزنامة المباريات' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setUpdateCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    updateCategory === cat.id
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#475569] dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Updates Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredUpdates.map(update => (
              <div
                key={update.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 hover:border-rose-400 transition-all shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] dark:border-slate-800 pb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${update.badgeColor}`}>
                      {update.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{update.date}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#0F172A] dark:text-white leading-snug">
                      {update.title}
                    </h3>
                    <p className="text-xs text-[#475569] dark:text-slate-300 font-normal mt-2 leading-relaxed">
                      {update.summary}
                    </p>
                  </div>

                  {/* Key Bullet Points */}
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-700 space-y-1.5 text-xs text-[#475569] dark:text-slate-300">
                    <span className="font-bold text-[#0F172A] dark:text-white block mb-1">أبرز النقاط الجوهرية:</span>
                    {update.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Direct Impact on Candidate */}
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs leading-relaxed">
                    <strong className="block font-bold mb-0.5 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      <span>ماذا يعني هذا لك كباحث عن عمل أو موظف؟</span>
                    </strong>
                    <p>{update.impactOnCandidate}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#F1F5F9] dark:border-slate-800 text-xs">
                  <span className="text-[#64748B] dark:text-slate-400 text-[11px] truncate max-w-[200px]">
                    المصدر: {update.officialSource}
                  </span>

                  {update.officialLink && (
                    <a
                      href={`https://${update.officialLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white font-bold text-xs flex items-center gap-1"
                    >
                      <span>البوابة الرسمية</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CALENDAR SCHEDULE SUMMARY TABLE */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-4 shadow-xs">
            <h3 className="text-base font-black text-[#0F172A] dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              <span>جدول الرزنامة التقديرية لكبرى المباريات العمومية بالمغرب (2026)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-[#E2E8F0] dark:border-slate-700">
                    <th className="p-3 font-bold">المباراة والجهة المنظمة</th>
                    <th className="p-3 font-bold">المستوى المشترط</th>
                    <th className="p-3 font-bold">السن القانوني</th>
                    <th className="p-3 font-bold">الموعد التقديري للإعلان</th>
                    <th className="p-3 font-bold">البوابة الرسمية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9] dark:divide-slate-800 text-[#475569] dark:text-slate-300">
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">الأمن الوطني (حراس، مفتشون، ضباط)</td>
                    <td className="p-3">بكالوريا إلى إجازة</td>
                    <td className="p-3">21 - 30 سنة</td>
                    <td className="p-3 text-amber-600 font-bold">الصيف / الخريف</td>
                    <td className="p-3"><code className="text-blue-600 font-bold">concours.dgsn.gov.ma</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">الدرك الملكي (تلاميذ دركيون)</td>
                    <td className="p-3">شهادة البكالوريا</td>
                    <td className="p-3">18 - 24 سنة</td>
                    <td className="p-3 text-amber-600 font-bold">أبريل - يونيو</td>
                    <td className="p-3"><code className="text-blue-600 font-bold">recrutement.gr.ma</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">إدارة الجمارك (حراس ومساعدون)</td>
                    <td className="p-3">بكالوريا / تقني</td>
                    <td className="p-3">18 - 25 سنة</td>
                    <td className="p-3 text-amber-600 font-bold">الربيع / الخريف</td>
                    <td className="p-3"><code className="text-blue-600 font-bold">douane.gov.ma</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">أطر التدريس والتعليم (AREF)</td>
                    <td className="p-3">شهادة الإجازة</td>
                    <td className="p-3">30 سنة كحد أقصى</td>
                    <td className="p-3 text-amber-600 font-bold">أكتوبر - نونبر</td>
                    <td className="p-3"><code className="text-blue-600 font-bold">tawdif.men.gov.ma</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">إدارة السجون (مراقبو وضباط)</td>
                    <td className="p-3">بكالوريا / إجازة</td>
                    <td className="p-3">21 - 30 سنة</td>
                    <td className="p-3 text-amber-600 font-bold">دورات مستمرة</td>
                    <td className="p-3"><code className="text-blue-600 font-bold">dgapr.gov.ma</code></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">الوقاية المدنية (أعوان الإغاثة)</td>
                    <td className="p-3">إعدادي + رخصة / بكالوريا</td>
                    <td className="p-3">20 - 26 سنة</td>
                    <td className="p-3 text-amber-600 font-bold">الربع الثاني سنوياً</td>
                    <td className="p-3"><code className="text-blue-600 font-bold">recrutement.protectioncivile.gov.ma</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 4: INTERACTIVE SALARY CALCULATOR (SALAIRE NET MAROC 2026)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'salary-calc' && (
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-6 shadow-xs max-w-3xl mx-auto">
          <div className="border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#2563EB]" />
              <span>محاكي وحاسبة الراتب الصافي بالمغرب 2026 (Brut en Net)</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              حساب دقيق ومحدث وفق قانون المالية 2026 مع احتساب زيادة الـ SMIC وإعفاء الضريبة على الدخل الجديد واقتطاعات CNSS و AMO.
            </p>
          </div>

          {/* Quick Select Buttons */}
          <div className="space-y-2 text-xs">
            <label className="block font-bold text-slate-700 dark:text-slate-300">حدد الراتب الشهري الخام (Salaire Brut):</label>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { val: 3120, label: 'الحد الأدنى SMIC (3,120 درهم)' },
                { val: 4500, label: '4,500 درهم (تقني مبتدئ)' },
                { val: 6000, label: '6,000 درهم (معفى من الضريبة)' },
                { val: 8500, label: '8,500 درهم (إطار تقني)' },
                { val: 12000, label: '12,000 درهم (مهندس)' }
              ].map(opt => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setCalcBrut(opt.val)}
                  className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
                    calcBrut === opt.val
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="number"
                min="3000"
                max="80000"
                step="100"
                value={calcBrut}
                onChange={e => setCalcBrut(Number(e.target.value) || 0)}
                className="w-full p-3 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-sm font-bold text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                placeholder="أدخل مبلغ الراتب الخام بالدرهم..."
              />
            </div>
          </div>

          {/* Family Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">الحالة العائلية:</label>
              <select
                value={calcMarital}
                onChange={e => setCalcMarital(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-slate-800 dark:text-white outline-none"
              >
                <option value="single">عازب / غير متزوج</option>
                <option value="married">متزوج</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">عدد الأبناء في الكفالة:</label>
              <select
                value={calcChildren}
                onChange={e => setCalcChildren(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-slate-800 dark:text-white outline-none"
              >
                <option value={0}>بدون أبناء</option>
                <option value={1}>طفل واحد (1)</option>
                <option value={2}>طفلان (2)</option>
                <option value={3}>3 أطفال</option>
                <option value={4}>4 أطفال أو أكثر</option>
              </select>
            </div>
          </div>

          {/* RESULTS DISPLAY */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-850 border border-blue-200 dark:border-slate-700 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 dark:border-slate-700 pb-3">
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">الراتب الصافي الشهري المقبوض في الحساب:</span>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  {calculatedNet.toLocaleString('ar-MA')} درهم / شهر
                </div>
              </div>

              {monthlyTaxSaving > 0 && (
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300">
                  🎉 ربحت +{monthlyTaxSaving} درهم شهرياً بفضل إصلاح الضريبة الجديد!
                </div>
              )}
            </div>

            {/* Deductions Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[#64748B] block text-[11px]">التقاعد CNSS (4.48%):</span>
                <strong className="text-rose-600 font-mono font-bold">-{cnssDeduction.toFixed(1)} DH</strong>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[#64748B] block text-[11px]">الصحة AMO (2.26%):</span>
                <strong className="text-rose-600 font-mono font-bold">-{amoDeduction.toFixed(1)} DH</strong>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[#64748B] block text-[11px]">ضريبة الدخل IGR:</span>
                <strong className="text-rose-600 font-mono font-bold">-{monthlyIgr.toFixed(1)} DH</strong>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-[#64748B] block text-[11px]">المصاريف المهنية (35%):</span>
                <strong className="text-emerald-600 font-mono font-bold">+{fraisPro.toFixed(1)} DH</strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              * ملحوظة: الحساب يشمل الاقتطاعات الإجبارية الرسمية في القانون المغربي. لا يشمل التعويضات الخاصة أو التأمين التكميلي الاختياري أو القروض البنكية المباشرة.
            </p>
          </div>
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 5: DEMANDE D'EMPLOI GENERATOR (OFFICIAL LETTERS)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeMainTab === 'demande-maker' && (
        <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-6 shadow-xs max-w-3xl mx-auto">
          <div className="border-b border-[#F1F5F9] dark:border-slate-800 pb-4">
            <h2 className="text-xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2563EB]" />
              <span>مولد الطلب الخطي للعمل (Demande d'Emploi) للمباريات والشركات</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              صيغ قانونية رسمية جاهزة مقبولة لدى لجان مباريات الوظيفة العمومية ومصانع وشركات القطاع الخاص.
            </p>
          </div>

          {/* Model Switcher: Public Concours vs Private Sector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDemandeType('concours')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                demandeType === 'concours'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              طلب خطي لاجتياز مباراة بالوظيفة العمومية (العربية)
            </button>

            <button
              onClick={() => setDemandeType('private')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                demandeType === 'private'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              طلب خطي لشركة أو مصنع بالقطاع الخاص (الفرنسية)
            </button>
          </div>

          {/* Candidate Customization Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F8FAFC] dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <label className="block font-semibold mb-1">الاسم الكامل للمترشح:</label>
              <input
                type="text"
                value={demandeCandidateName}
                onChange={e => setDemandeCandidateName(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">رقم البطاقة الوطنية (CIN):</label>
              <input
                type="text"
                value={demandeCin}
                onChange={e => setDemandeCin(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">رقم الهاتف:</label>
              <input
                type="text"
                value={demandePhone}
                onChange={e => setDemandePhone(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">العنوان الشخصي / المدينة:</label>
              <input
                type="text"
                value={demandeAddress}
                onChange={e => setDemandeAddress(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">المؤسسة / الشركة المستهدفة:</label>
              <input
                type="text"
                value={demandeTargetInstitution}
                onChange={e => setDemandeTargetInstitution(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">المنصب أو المباراة المستهدفة:</label>
              <input
                type="text"
                value={demandeTargetRole}
                onChange={e => setDemandeTargetRole(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Letter Output Box */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-850 border border-[#E2E8F0] dark:border-slate-700 text-xs leading-relaxed font-mono whitespace-pre-wrap select-all">
            {demandeType === 'concours' ? generatedArabicLetter : generatedFrenchLetter}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => handleCopy(demandeType === 'concours' ? generatedArabicLetter : generatedFrenchLetter, 'letter-copy')}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
            >
              {copiedKey === 'letter-copy' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedKey === 'letter-copy' ? 'تم نسخ الطلب بنجاح!' : 'نسخ الطلب الخطي الكامل'}</span>
            </button>

            <span className="text-[11px] text-[#64748B]">
              جاهز للطباعة أو الكتابة بخط اليد.
            </span>
          </div>
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL 1: JOB DETAIL MODAL (Requirements & Steps)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedJobDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 animate-fade-in shadow-xl text-right max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                  {selectedJobDetail.cityLabelAr} · {selectedJobDetail.categoryLabelAr}
                </span>
                <h3 className="text-lg font-black text-[#0F172A] dark:text-white mt-1">
                  {selectedJobDetail.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedJobDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">المنصب والمهام المطلوبة:</h4>
                <p className="text-[#64748B] dark:text-slate-300 leading-relaxed">{selectedJobDetail.role}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">الدبلوم والخبرة:</h4>
                <p className="text-[#64748B] dark:text-slate-300 leading-relaxed font-semibold">{selectedJobDetail.diplomaRequired} ({selectedJobDetail.experienceLevel})</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">الوثائق والملف المطلوب:</h4>
                <ul className="list-disc list-inside space-y-1 text-[#64748B] dark:text-slate-300">
                  {selectedJobDetail.requiredDocuments.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">خطوات الترشيح المباشرة:</h4>
                <ol className="list-decimal list-inside space-y-1 text-[#64748B] dark:text-slate-300">
                  {selectedJobDetail.applicationSteps.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-600 dark:text-slate-300">
                <span className="font-bold block text-slate-900 dark:text-white mb-0.5">البريد الإلكتروني للتوظيف المباشر:</span>
                <code className="text-blue-600 dark:text-blue-400 font-bold">{selectedJobDetail.hrEmailOrPortal}</code>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t">
              <button
                onClick={() => setSelectedJobDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  const job = selectedJobDetail;
                  setSelectedJobDetail(null);
                  handleOpenVipModal(job.name, job.role);
                }}
                className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
              >
                طلب توجيه الملف VIP
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL 2: CONCOURS DETAIL MODAL (Requirements & Steps)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedConcoursDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 animate-fade-in shadow-xl text-right max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                  {selectedConcoursDetail.categoryLabelAr} · مصدر رسمي
                </span>
                <h3 className="text-lg font-black text-[#0F172A] dark:text-white mt-1">
                  {selectedConcoursDetail.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedConcoursDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200">
                ⚠️ التقديم يتم عبر البوابة الرسمية للدولة فقط: <strong>{selectedConcoursDetail.officialLink}</strong>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">المؤسسة المنظمة:</h4>
                <p className="text-[#64748B] dark:text-slate-300 leading-relaxed font-semibold">{selectedConcoursDetail.institution}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">الشهادة والدبلوم المشترط:</h4>
                <p className="text-[#64748B] dark:text-slate-300 leading-relaxed font-bold text-emerald-600 dark:text-emerald-400">{selectedConcoursDetail.diplomaRequired}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">الوثائق المطلوبة لتجهيز الملف:</h4>
                <ul className="list-disc list-inside space-y-1 text-[#64748B] dark:text-slate-300">
                  {selectedConcoursDetail.requiredDocuments.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">خطوات التسجيل والامتحانات:</h4>
                <ol className="list-decimal list-inside space-y-1 text-[#64748B] dark:text-slate-300">
                  {selectedConcoursDetail.applicationSteps.map((st, idx) => (
                    <li key={idx}>{st}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t">
              <button
                onClick={() => setSelectedConcoursDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                إغلاق
              </button>
              <a
                href={`https://${selectedConcoursDetail.officialLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <span>الانتقال لرابط التسجيل الرسمي</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MODAL 3: DONE-FOR-YOU VIP ROUTING MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {showDoneForYouModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 animate-fade-in shadow-xl text-right">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>خدمة تجهيز وإرسال الملف المباشر (VIP)</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
                الترشيح المباشر لـ: {targetCompanyForVip}
              </h3>
              <p className="text-xs text-[#64748B]">
                نقوم بمراجعة سيرتك الذاتية وتنسيقها وفق المعايير المطلوبة وإيصال ملفك مباشرة إلى صندوق الموارد البشرية.
              </p>
            </div>

            {dfySubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">تم استلام طلبك بنجاح!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  سيتواصل معك مستشار MezdoHub عبر الواتساب لتأكيد جاهزية سيرتك الذاتية وإتمام توجيه الملف.
                </p>
                <button
                  onClick={() => setShowDoneForYouModal(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <form onSubmit={handleDfySubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: يونس المرابط"
                    value={dfyForm.name}
                    onChange={e => setDfyForm({ ...dfyForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">رقم الهاتف / الواتساب *</label>
                  <input
                    type="tel"
                    required
                    placeholder="06XXXXXXXX"
                    value={dfyForm.phone}
                    onChange={e => setDfyForm({ ...dfyForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">المدينة</label>
                    <input
                      type="text"
                      value={dfyForm.city}
                      onChange={e => setDfyForm({ ...dfyForm, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#0F172A] dark:text-slate-300">الدبلوم / الشعبة</label>
                    <input
                      type="text"
                      value={dfyForm.diploma}
                      onChange={e => setDfyForm({ ...dfyForm, diploma: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDoneForYouModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#F1F5F9] dark:bg-slate-800 text-[#475569] font-bold text-xs"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                  >
                    تأكيد وإرسال الملف
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

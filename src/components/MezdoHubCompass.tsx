import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Compass,
  Plane,
  GraduationCap,
  Briefcase,
  RefreshCw,
  Coins,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Banknote,
  Sparkles,
  Printer,
  Share2,
  BookmarkCheck,
  ChevronRight,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Home,
  Check,
  Target,
  Zap,
  TrendingUp,
  MapPin,
  ChevronLeft
} from 'lucide-react';
import {
  CompassType,
  CompassQuestion,
  CompassResult,
  IMMIGRATION_QUESTIONS,
  STUDY_QUESTIONS,
  JOB_QUESTIONS,
  SHIFT_QUESTIONS,
  SIDEHUSTLE_QUESTIONS,
  evaluateCompassResults,
  RecommendationPathway
} from '../data/compassEngine';
import {
  trackPageView,
  trackCompassStarted,
  trackCompassCompleted,
  trackPdfDownloaded,
  trackDecisionReportSaved
} from '../services/analytics';
import {
  recordCompassStart,
  recordCompassCompletion,
  recordPdfDownload,
  recordSavedReport
} from '../services/compassAnalyticsService';

export interface MezdoHubCompassProps {
  initialType?: CompassType;
  subTab?: string;
  onNavigateToTab?: (tab: string, subTab?: string, id?: string) => void;
}

export const MezdoHubCompass: React.FC<MezdoHubCompassProps> = ({
  initialType,
  subTab,
  onNavigateToTab
}) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Resolve active compass type from subTab or initialType
  const resolveCompassType = (val?: string): CompassType | null => {
    if (!val || val === 'gateway') return null;
    if (val === 'immigration') return 'immigration';
    if (val === 'study') return 'study';
    if (val === 'jobs' || val === 'job') return 'jobs';
    if (val === 'shift' || val === 'career-shift') return 'shift';
    if (val === 'side-hustle' || val === 'side-income') return 'side-hustle';
    return 'immigration';
  };

  const activeCompass = resolveCompassType(subTab || (initialType ? initialType : undefined));

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CompassResult | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Reset questionnaire state when activeCompass changes (e.g. user navigated to another compass URL)
  useEffect(() => {
    setCurrentStep(0);
    setUserAnswers({});
    setResult(null);
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (activeCompass) {
      trackPageView(`MezdoHub Compass - ${activeCompass}`);
    } else {
      trackPageView('MezdoHub Compass - Gateway Portal');
    }
  }, [activeCompass]);

  // Keep window scrolled to top on step changes or result generation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep, result]);

  const COMPASS_CONFIGS = [
    {
      id: 'immigration' as CompassType,
      pathSub: 'immigration',
      titleAr: 'بوصلة الهجرة الدولية',
      titleFr: 'Boussole Immigration',
      headlineAr: 'أين وكيف أهاجر قانونياً حسب وضعي؟',
      headlineFr: 'Où et comment immigrer légalement selon mon profil ?',
      badgeAr: 'الأكثر طلباً 🔥',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
      descriptionAr: 'تحليل دقيق لسنك، شواهدك، سنوات خبرتك، لغاتك وقدرتك المالية لاقتراح أفضل 3 مسارات قانونية (ألمانيا، كندا، فرنسا، إسبانيا، أو العمل الحر).',
      descriptionFr: 'Diagnostic selon votre âge, diplômes, expérience, langues et budget pour 3 parcours optimaux (Allemagne, Canada, France, Espagne, Freelance).',
      inputsAr: ['العمر والشواهد', 'سنوات الخبرة', 'اللغات الأجنبية', 'القدرة المالية الأولية'],
      outputsAr: ['أفضل 3 دول مناسبة', 'نسبة الملاءمة الدقيقة', 'التكاليف التقديرية بالدرهم', 'خطة تنفيذ من 3 مراحل'],
      icon: Plane,
      timeEstimate: '3 دقائق',
      questionsCount: IMMIGRATION_QUESTIONS.length
    },
    {
      id: 'study' as CompassType,
      pathSub: 'study',
      titleAr: 'بوصلة الدراسة والمنح بالخارج',
      titleFr: 'Boussole Études & Bourses',
      headlineAr: 'أين يمكنني متابعة دراستي بمعدلي وميزانيتي؟',
      headlineFr: 'Où étudier à l\'étranger avec mes notes et mon budget ?',
      badgeAr: 'منح 100% وتكوين مأجور 🎓',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
      descriptionAr: 'اكتشف الجامعات والمنح الدراسية الدولية الممولة بالكامل أو التكوين المهني الألماني المأجور (Ausbildung) المناسب لمستواك الدراسي وميزانيتك.',
      descriptionFr: 'Trouvez les bourses 100%, universités accessibles et formations pros rémunérées en Allemagne selon votre mention et budget.',
      inputsAr: ['المستوى الدراسي المستهدف', 'الميزة والمعدل', 'لغة التدريس المفضلة', 'الميزانية السنوية'],
      outputsAr: ['المنح المتاحة 100%', 'التكوين المهني المأجور', 'دول منخفضة التكاليف', 'شروط القبول والتأشيرة'],
      icon: GraduationCap,
      timeEstimate: '2.5 دقائق',
      questionsCount: STUDY_QUESTIONS.length
    },
    {
      id: 'jobs' as CompassType,
      pathSub: 'jobs',
      titleAr: 'بوصلة التوظيف السريع',
      titleFr: 'Boussole Emploi Express',
      headlineAr: 'أريد وظيفة محترمة خلال 6 أشهر.. ما هي أقصر خطة؟',
      headlineFr: 'Objectif emploi stable sous 6 mois : le meilleur plan ?',
      badgeAr: 'خطة عمل 6 أشهر ⏱️',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      descriptionAr: 'خارطة طريق للحصول على عمل مجزٍ بالقطاع الخاص بالمغرب، مراكز الأعمال الدولية أو وظائف تقنية عن بعد، مع تحديد المهارات الناقصة بدقة.',
      descriptionFr: 'Feuille de route pour décrocher un poste en entreprise au Maroc, en centre de services ou en télétravail international.',
      inputsAr: ['المدى الزمني المستهدف', 'أقوى مهارة لديك', 'مكان ونمط العمل المفضل'],
      outputsAr: ['أقرب الوظائف للوصول', 'المهارات المطلوبة للبدء', 'خطة لأول راتب', 'نطاق الرواتب المتوقع'],
      icon: Briefcase,
      timeEstimate: '2 دقائق',
      questionsCount: JOB_QUESTIONS.length
    },
    {
      id: 'shift' as CompassType,
      pathSub: 'shift',
      titleAr: 'بوصلة التحول المهني ومضاعفة الدخل',
      titleFr: 'Reconversion Métier & Revenus',
      headlineAr: 'أنا عالق في مركز اتصال أو وظيفة روتينية.. كيف أنتقل للـ Tech؟',
      headlineFr: 'Bloqué en centre d\'appels : comment pivoter vers la Tech ?',
      badgeAr: 'مضاعفة الدخل 2x 🚀',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
      descriptionAr: 'مخصصة للشباب الراغبين في الخروج من ضغط مراكز الاتصال والوظائف ذات الأفق المحدود والانتقال الآمن إلى مجالات التكنولوجيا والإدارة الرقمية دون مخاطرة.',
      descriptionFr: 'Guide de reconversion pour passer des centres d\'appels aux métiers d\'avenir dans la Tech sans rupture de salaire.',
      inputsAr: ['الوضع المهني الحالي', 'الساعات المتاحة أسبوعياً', 'الميزانية للتكوين'],
      outputsAr: ['خارطة تعلم لسنتين', 'وظائف ذات دخل مضاعف', 'خطة الانتقال الآمن', 'شهادات معتمدة عالمياً'],
      icon: RefreshCw,
      timeEstimate: '2 دقائق',
      questionsCount: SHIFT_QUESTIONS.length
    },
    {
      id: 'side-hustle' as CompassType,
      pathSub: 'side-hustle',
      titleAr: 'بوصلة الدخل الإضافي والمشاريع المصغرة',
      titleFr: 'Boussole Side Hustle & Freelance',
      headlineAr: 'كيف أحقق أول 5,000 درهم شهرياً من الإنترنت؟',
      headlineFr: 'Comment générer mes premiers 5 000 MAD/mois en ligne ?',
      badgeAr: 'بدون رأس مال 💰',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
      descriptionAr: 'تحديد أفضل نشاط رقمي (Freelancing، تقديم خدمات، تجارة إلكترونية، أو صناعة محتوى) يلائم وقت فراغك ومهاراتك الحالية، حتى لو كان رأس مالك 0 درهم.',
      descriptionFr: 'Identifiez le meilleur modèle (freelance, e-commerce, services) pour vos heures libres même avec un capital initial de 0 DH.',
      inputsAr: ['الوقت المتوفر أسبوعياً', 'رأس المال المتوفر (من 0 DH)', 'المهارات الرقمية الحالية'],
      outputsAr: ['المجال الأنسب لحالتك', 'خطة الوصول لأول عميل', 'طرق استلام الأموال بالمغرب', 'توقعات الأرباح الواقعية'],
      icon: Coins,
      timeEstimate: '2 دقائق',
      questionsCount: SIDEHUSTLE_QUESTIONS.length
    }
  ];

  // Helper to get questions
  const getQuestionsForActiveCompass = (): CompassQuestion[] => {
    switch (activeCompass) {
      case 'immigration':
        return IMMIGRATION_QUESTIONS;
      case 'study':
        return STUDY_QUESTIONS;
      case 'jobs':
        return JOB_QUESTIONS;
      case 'shift':
        return SHIFT_QUESTIONS;
      case 'side-hustle':
        return SIDEHUSTLE_QUESTIONS;
      default:
        return IMMIGRATION_QUESTIONS;
    }
  };

  const currentQuestions = getQuestionsForActiveCompass();
  const currentQ = currentQuestions[currentStep];
  const activeTabConfig = COMPASS_CONFIGS.find(t => t.id === activeCompass) || COMPASS_CONFIGS[0];
  const ActiveIcon = activeTabConfig.icon;

  const handleSelectCompassUrl = (subTabKey: string) => {
    const foundConfig = COMPASS_CONFIGS.find(c => c.pathSub === subTabKey);
    trackCompassStarted(subTabKey, foundConfig?.titleAr || subTabKey);
    const mappedType = subTabKey === 'shift' ? 'careerShift' : subTabKey === 'side-hustle' ? 'sideHustle' : subTabKey as any;
    recordCompassStart(mappedType);
    onNavigateToTab?.('compass', subTabKey);
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...userAnswers, [questionId]: optionId };
    setUserAnswers(updated);

    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (activeCompass) {
        const computed = evaluateCompassResults(activeCompass, updated);
        setResult(computed);
        const mappedType = activeCompass === 'shift' ? 'careerShift' : activeCompass === 'side-hustle' ? 'sideHustle' : activeCompass as any;
        recordCompassCompletion(mappedType);
        trackCompassCompleted(
          activeCompass,
          activeTabConfig.titleAr,
          computed.pathways[0]?.titleAr || '',
          computed.pathways[0]?.matchScore || 90
        );
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setResult(null);
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSaveToDashboard = () => {
    if (!result || !activeCompass) return;
    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_saved_decisions') || '[]');
      const topP = result.pathways[0];
      const newEntry = {
        id: `decision_${Date.now()}`,
        type: activeCompass,
        typeNameAr: activeTabConfig.titleAr,
        date: new Date().toISOString(),
        topPathway: topP?.titleAr || '',
        matchScore: topP?.matchScore || 0,
        difficulty: topP?.difficulty || '',
        estimatedCost: topP?.costMAD || '',
        timeframe: topP?.timeToComplete || '',
        roadmapPhases: topP?.roadmap || [],
        checklist: topP?.prerequisitesAr || [],
        pathways: result.pathways.slice(0, 3),
        progressCompletedTasks: []
      };
      localStorage.setItem('mezdohub_saved_decisions', JSON.stringify([newEntry, ...existing]));
      recordSavedReport();
      trackDecisionReportSaved(activeCompass, result.pathways[0]?.titleAr || '');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 4000);
    } catch {}
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setShareToast(isAr ? 'تم نسخ رابط التقرير للحافظة بنجاح!' : 'Lien copié dans le presse-papier !');
      setTimeout(() => setShareToast(null), 3500);
    }
  };

  const handlePrint = () => {
    if (activeCompass) {
      const mappedType = activeCompass === 'shift' ? 'careerShift' : activeCompass === 'side-hustle' ? 'sideHustle' : activeCompass as any;
      recordPdfDownload(mappedType);
      trackPdfDownloaded(`compass_${activeCompass}`, result?.pathways[0]?.titleAr || 'MezdoHub Decision Report');
    }
    window.print();
  };

  // ══════════════════════════════════════════════════════════════════════
  // VIEW 1: MAIN GATEWAY PORTAL (/compass)
  // Displayed when no subTab is specified, showcasing all 5 compasses
  // ══════════════════════════════════════════════════════════════════════
  if (!activeCompass) {
    return (
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 animate-fade-in ${isAr ? 'text-right' : 'text-left'}`}>
        
        {/* Gateway Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={() => onNavigateToTab?.('home')}
            className="hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'الرئيسية' : 'Accueil'}</span>
          </button>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            {isAr ? 'بوابة بوصلة الفرص والقرار' : 'Boussole Stratégique MezdoHub'}
          </span>
        </nav>

        {/* Hero Header: Platform Mission & Philosophy */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-2xs">
            <Compass className="w-4 h-4 text-blue-600 animate-spin-slow" />
            <span>{isAr ? 'MezdoHub Compass · محرك القرار المغربي والعربي 2026' : 'MezdoHub Decision Engine 2026'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tight">
            {isAr ? (
              <>
                بدل أن تضيع 50 ساعة بين الفيديوهات وتضارب النصائح.. <br />
                <span className="text-blue-600 dark:text-blue-400">اتخذ قرارك الصحيح بناءً على ظروفك الحقيقية</span>
              </>
            ) : (
              <>
                Prenez la bonne décision pour votre avenir <br />
                <span className="text-blue-600 dark:text-blue-400">selon votre profil réel et vos opportunités</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isAr ? (
              'MezdoHub ليس مجرد موقع معلومات أو مدونة عادية. نحن نساعد الشباب المغربي والعربي على اتخاذ القرار الأنسب لمستقبلهم: أجب عن أسئلة دقيقة خلال 3 دقائق، لتحصل فوراً على أفضل 3 مسارات مع نسبة الملاءمة وخطة تنفيذ عملية.'
            ) : (
              'MezdoHub n\'est pas un simple blog : c\'est un moteur de décision stratégique. En 3 minutes, obtenez vos 3 meilleurs parcours personnalisés avec plan d\'action concret.'
            )}
          </p>

          {/* 4 Pillars of Value */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Clock className="w-5 h-5 text-blue-600 mx-auto" />
              <div className="font-bold text-slate-900 dark:text-white">{isAr ? 'توفير الوقت' : 'Gain de temps'}</div>
              <div className="text-[11px] text-slate-500">{isAr ? 'خطة دقيقة في 3 دقائق' : 'Plan en 3 minutes'}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
              <div className="font-bold text-slate-900 dark:text-white">{isAr ? 'تقليل الخوف' : 'Réduction du risque'}</div>
              <div className="text-[11px] text-slate-500">{isAr ? 'فهم أسباب كل اختيار' : 'Compréhension du pourquoi'}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <TrendingUp className="w-5 h-5 text-purple-600 mx-auto" />
              <div className="font-bold text-slate-900 dark:text-white">{isAr ? 'زيادة الفرص' : 'Opportunités réelles'}</div>
              <div className="text-[11px] text-slate-500">{isAr ? 'مسارات لم تكن تخطر ببالك' : 'Pistes inexplorées'}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Target className="w-5 h-5 text-amber-600 mx-auto" />
              <div className="font-bold text-slate-900 dark:text-white">{isAr ? 'وضوح القرار' : 'Clarté décisionnelle'}</div>
              <div className="text-[11px] text-slate-500">{isAr ? 'قرار + خطة + خطوات' : 'Décision + Plan clair'}</div>
            </div>
          </div>
        </section>

        {/* The 5 Main Compasses Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {isAr ? 'اختر البوصلة المناسبة لقرارك الحالي:' : 'Choisissez votre boussole stratégique :'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isAr ? 'كل بوصلة تحتوي على نموذج أسئلة مستقل ومباشر مع تقرير استراتيجي مخصص.' : 'Chaque boussole dispose d\'un questionnaire indépendant et d\'un rapport dédié.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPASS_CONFIGS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectCompassUrl(item.pathSub)}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${item.badgeColor}`}>
                        {isAr ? item.badgeAr : ''}
                      </span>
                    </div>

                    {/* Titles */}
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {isAr ? item.titleAr : item.titleFr}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {isAr ? item.headlineAr : item.headlineFr}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {isAr ? item.descriptionAr : item.descriptionFr}
                    </p>

                    {/* Inputs & Outputs Tags */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          {isAr ? 'المعطيات التي تفحصها البوصلة:' : 'Critères analysés :'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.inputsAr.map((input, idx) => (
                            <span key={idx} className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                              {input}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          {isAr ? 'التقرير النهائي يمنحك:' : 'Résultats générés :'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.outputsAr.map((output, idx) => (
                            <span key={idx} className="text-[11px] bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-medium">
                              ✓ {output}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Bottom Button */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500 font-normal">{item.timeEstimate} ({item.questionsCount} أسئلة)</span>
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform font-bold">
                      {isAr ? 'ابدأ التشخيص الآن' : 'Démarrer'}
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Comparison Table: Traditional Web vs MezdoHub Compass */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-black">
              {isAr ? 'الميزة التنافسية: لماذا يحب المستخدمون MezdoHub؟' : 'Pourquoi MezdoHub fait la différence ?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {isAr ? 'معظم المواقع تقدم معلومات مجردة.. نحن نمنحك قراراً قابلاً للتنفيذ.' : 'La plupart des sites donnent des informations, nous donnons un plan d\'action.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-xs">
            {/* The Old Way */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <span className="font-bold text-rose-400 text-sm block">
                ❌ {isAr ? 'البحث التقليدي والإنترنت العام' : 'Recherche traditionnelle'}
              </span>
              <ul className="space-y-2 text-slate-300">
                <li>• عشرات الفيديوهات والمقالات المكررة والمعلومات المتناقضة.</li>
                <li>• نصائح عامة لا تراعي سنك، دبلومك، أو ميزانيتك الحقيقية.</li>
                <li>• ضياع أسابيع وأشهر في التردد والخوف من الخطوة الأولى.</li>
                <li>• المستخدم يخرج بمعلومات كثيرة، لكن دون أي قرار محدد.</li>
              </ul>
            </div>

            {/* The MezdoHub Way */}
            <div className="p-5 rounded-2xl bg-blue-950/60 border border-blue-500/50 space-y-3">
              <span className="font-bold text-emerald-400 text-sm block">
                ✅ {isAr ? 'منهجية MezdoHub Compass' : 'Méthode MezdoHub Compass'}
              </span>
              <ul className="space-y-2 text-slate-200">
                <li>• تشخيص رقمي فوري مبني على معايير القبول الحقيقية لسنة 2026.</li>
                <li>• أفضل 3 مسارات تناسبك تماماً مع درجة الملاءمة والتكلفة بالدرهم.</li>
                <li>• خارطة طريق تنفيذية من 3 مراحل مع مدة كل مرحلة.</li>
                <li>• المستخدم يخرج بقرار واضح، ثقة عالية، وخطة عمل واقعية.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // VIEW 2: SPECIFIC COMPASS QUESTIONNAIRE / REPORT VIEW
  // Triggered when URL is /compass/immigration, /compass/study, etc.
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 animate-fade-in ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* 1. TOP HEADER WITH INSTANT CLEAN URL SWITCHING */}
      <header className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        
        {/* Breadcrumb Bar + Back to Gateway */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <button
              onClick={() => onNavigateToTab?.('home')}
              className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{isAr ? 'الرئيسية' : 'Accueil'}</span>
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigateToTab?.('compass')}
              className="hover:text-blue-600 font-bold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
            >
              {isAr ? 'بوصلة الفرص' : 'Boussole'}
            </button>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold truncate">
              {isAr ? activeTabConfig.titleAr : activeTabConfig.titleFr}
            </span>
          </div>

          <button
            onClick={() => onNavigateToTab?.('compass')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <ArrowIcon className="w-3.5 h-3.5" />
            <span>{isAr ? 'بوابة البوصلات' : 'Toutes les boussoles'}</span>
          </button>
        </div>

        {/* 5-Tabs Quick Horizontal Navigation: Updates URL to dedicated compass cleanly */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {COMPASS_CONFIGS.map(tab => {
            const isCurrent = activeCompass === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectCompassUrl(tab.pathSub)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? tab.titleAr : tab.titleFr}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. DIRECT QUESTIONNAIRE ENTRY (Right at the top of the screen - ZERO scroll required!) */}
      {!result ? (
        <main className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Active Compass Header Title Banner */}
          <div className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ActiveIcon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {isAr ? activeTabConfig.titleAr : activeTabConfig.titleFr}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? activeTabConfig.headlineAr : activeTabConfig.headlineFr}
                </p>
              </div>
            </div>

            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 border ${activeTabConfig.badgeColor}`}>
              {isAr ? activeTabConfig.badgeAr : ''}
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                {isAr ? `السؤال ${currentStep + 1} من ${currentQuestions.length}` : `Question ${currentStep + 1} sur ${currentQuestions.length}`}
              </span>
              <span className="font-mono tabular-nums font-bold text-blue-600 dark:text-blue-400">
                {Math.round(((currentStep + 1) / currentQuestions.length) * 100)}%
              </span>
            </div>
            {/* Smooth Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Question & Options */}
          {currentQ && (
            <div className="space-y-6 pt-2">
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                  {isAr ? currentQ.titleAr : currentQ.titleFr}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isAr ? currentQ.descriptionAr : currentQ.descriptionFr}
                </p>
              </div>

              {/* Touch-Friendly Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map(option => {
                  const isSelected = userAnswers[currentQ.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(currentQ.id, option.id)}
                      className={`p-4 sm:p-5 rounded-2xl border text-right transition-all flex items-start justify-between gap-3 cursor-pointer group active:scale-[0.99] ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-1 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-slate-50/50 dark:bg-slate-850/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white block">
                          {isAr ? option.labelAr : option.labelFr}
                        </span>
                        {option.subLabelAr && (
                          <span className="text-xs text-slate-500 dark:text-slate-400 block font-normal">
                            {isAr ? option.subLabelAr : ''}
                          </span>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 dark:border-slate-600 group-hover:border-blue-400'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nav Step Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isAr ? '← السؤال السابق' : '← Question précédente'}
                </button>
                <span className="text-xs text-slate-400">
                  {isAr ? 'اضغط على الخيار للانتقال فوراً للسؤال التالي' : 'Sélectionnez une option pour continuer'}
                </span>
              </div>
            </div>
          )}
        </main>
      ) : (
        /* 3. THE DECISION REPORT (RESULTS VIEW AT TOP) */
        <main className="space-y-6 animate-fade-in" id="printable-report">
          {/* Header Action Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'تم استخراج أفضل 3 مسارات مناسبة لحالتك' : '3 parcours optimaux identifiés'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {isAr ? 'خارطة طريقك وقرارك النهائي' : 'Votre Rapport Décisionnel Stratégique'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {isAr ? `تاريخ التشخيص: ${new Date().toLocaleDateString('ar-MA')}` : `Évalué le : ${new Date().toLocaleDateString('fr-FR')}`}
              </p>
            </div>

            {/* Print & Share Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isAr ? 'طباعة / PDF' : 'Imprimer / PDF'}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'مشاركة' : 'Partager'}</span>
              </button>

              <button
                onClick={handleSaveToDashboard}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>{isSaved ? (isAr ? 'تم الحفظ في حسابك!' : 'Enregistré !') : (isAr ? 'حفظ في حسابي' : 'Sauvegarder')}</span>
              </button>

              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {isAr ? 'إعادة التشخيص ↺' : 'Recommencer ↺'}
              </button>
            </div>
          </div>

          {shareToast && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{shareToast}</span>
            </div>
          )}

          {/* Strategic Executive Summary Card */}
          <div className="bg-gradient-to-r from-blue-900/10 via-amber-500/10 to-transparent border border-blue-200 dark:border-blue-900/50 rounded-3xl p-6 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>{isAr ? 'الخلاصة التنفيذية لحالتك:' : 'Synthèse Stratégique :'}</span>
            </div>
            <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              {isAr ? result.primarySummaryAr : result.primarySummaryFr}
            </p>
          </div>

          {/* The 3 Tailored Pathways Cards */}
          <div className="space-y-6">
            {result.pathways.map((pathway, idx) => (
              <div
                key={pathway.id}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 sm:p-8 shadow-sm transition-all space-y-6 ${
                  idx === 0
                    ? 'border-blue-500 dark:border-blue-500/80 ring-1 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Pathway Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-black text-sm flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      0{pathway.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{pathway.flagEmoji}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                          {isAr ? pathway.titleAr : pathway.titleFr}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {pathway.destinationOrTrack}
                      </span>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex items-center gap-3">
                    <div className="text-right sm:text-left">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        {isAr ? 'نسبة الملاءمة' : 'Adéquation'}
                      </span>
                      <span className="text-xl sm:text-2xl font-black font-mono tabular-nums text-blue-600 dark:text-blue-400">
                        {pathway.matchScore}%
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center font-mono text-sm font-bold text-blue-600 dark:text-blue-300">
                      #{pathway.rank}
                    </div>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {isAr ? 'المدة التقديرية للهدف:' : 'Délai prévisionnel :'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                      {pathway.timeToComplete}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                      {isAr ? 'التكلفة الإجمالية:' : 'Coût prévisionnel :'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {pathway.costMAD}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      {isAr ? 'درجة الصعوبة:' : 'Niveau de complexité :'}
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {pathway.difficulty === 'easy' ? (isAr ? 'ميسرة / سريعة' : 'Accessible') : pathway.difficulty === 'moderate' ? (isAr ? 'متوسطة / تتطلب جهداً' : 'Modérée') : (isAr ? 'عالية التنافسية' : 'Sélective')}
                    </span>
                  </div>
                </div>

                {/* Why this path section */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {isAr ? '🔍 لماذا هذا المسار مناسب لحالتك بالذات؟' : 'Pourquoi ce choix est adapté à votre profil ?'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-blue-50/40 dark:bg-slate-850/40 p-4 rounded-xl border border-blue-100/50 dark:border-slate-800">
                    {isAr ? pathway.whyThisPathAr : pathway.whyThisPathFr}
                  </p>
                </div>

                {/* Step-by-Step Action Roadmap */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    {isAr ? 'خطة التنفيذ خطوة بخطوة (Roadmap):' : 'Plan d\'action jalonné :'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pathway.roadmap.map(step => (
                      <div
                        key={step.step}
                        className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                            {isAr ? `المرحلة 0${step.step}` : `Étape 0${step.step}`}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {step.duration}
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {isAr ? step.titleAr : step.titleFr}
                        </h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                          {isAr ? step.actionAr : step.actionFr}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites & Insider Pro-Tip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {isAr ? '📋 المتطلبات والوثائق الإلزامية:' : 'Conditions & Pièces requises :'}
                    </span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                      {(isAr ? pathway.prerequisitesAr : pathway.prerequisitesFr).map((prereq, pIdx) => (
                        <li key={pIdx}>{prereq}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 space-y-1.5">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      {isAr ? 'نصيحة MezdoHub الذهبية للمغاربة:' : 'Le conseil pro MezdoHub :'}
                    </span>
                    <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                      {isAr ? pathway.proTipAr : pathway.proTipFr}
                    </p>
                  </div>
                </div>

                {/* Direct Link to Guide */}
                {pathway.guideRoute && onNavigateToTab && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onNavigateToTab(pathway.guideRoute!.tab, pathway.guideRoute!.subTab, pathway.guideRoute!.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <span>{isAr ? 'اقرأ الدليل التخصصي الكامل لهذا المسار' : 'Consulter le guide complet'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions Bar */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="text-xl sm:text-2xl font-black">
              {isAr ? 'جاهز لبدء الخطوة الأولى الآن؟' : 'Prêt à démarrer l\'étape 1 ?'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isAr
                ? 'ابدأ اليوم بتجهيز سيرتك الذاتية المتوافقة مع أنظمة ATS لتكون مستعداً للتقديم على هذا المسار.'
                : 'Commencez par générer votre CV professionnel aux normes ATS.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigateToTab?.('cv-builder')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                {isAr ? 'صانع السيرة الذاتية (CV ATS)' : 'Créer mon CV ATS Pro'}
              </button>
              <button
                onClick={() => onNavigateToTab?.('compass')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                {isAr ? 'استكشاف بوصلة أخرى 🧭' : 'Tester une autre boussole'}
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

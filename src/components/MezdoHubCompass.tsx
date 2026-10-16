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
  Home
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
import { trackPageView } from '../services/analytics';

interface MezdoHubCompassProps {
  initialType?: CompassType;
  onNavigateToTab?: (tab: string, subTab?: string, id?: string) => void;
}

export const MezdoHubCompass: React.FC<MezdoHubCompassProps> = ({
  initialType = 'immigration',
  onNavigateToTab
}) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeCompass, setActiveCompass] = useState<CompassType>(initialType);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CompassResult | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Sync when initialType prop changes from navigation
  useEffect(() => {
    if (initialType) {
      setActiveCompass(initialType);
      setCurrentStep(0);
      setUserAnswers({});
      setResult(null);
      setIsSaved(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [initialType]);

  // Always scroll to top when changing compass, step, or displaying results
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep, result, activeCompass]);

  const COMPASS_TABS = [
    {
      id: 'immigration' as CompassType,
      labelAr: 'بوصلة الهجرة الدولية',
      labelFr: 'Boussole Immigration',
      subAr: 'ألمانيا، فرنسا، كندا أو العمل الحر',
      icon: Plane,
      badgeAr: 'الأكثر طلباً'
    },
    {
      id: 'study' as CompassType,
      labelAr: 'بوصلة الدراسة والمنح',
      labelFr: 'Boussole Études & Bourses',
      subAr: 'منح 100% وتكوين مأجور بالخارج',
      icon: GraduationCap,
      badgeAr: 'ممولة بالكامل'
    },
    {
      id: 'jobs' as CompassType,
      labelAr: 'بوصلة التوظيف السريع',
      labelFr: 'Boussole Emploi Express',
      subAr: 'خطة وظيفة مجزية خلال 6 أشهر',
      icon: Briefcase,
      badgeAr: 'سوق الشغل'
    },
    {
      id: 'shift' as CompassType,
      labelAr: 'بوصلة التحول المهني',
      labelFr: 'Reconversion Métier',
      subAr: 'الخروج من الوظائف الروتينية للـ Tech',
      icon: RefreshCw,
      badgeAr: 'مضاعفة الدخل'
    },
    {
      id: 'side-hustle' as CompassType,
      labelAr: 'بوصلة الدخل الإضافي',
      labelFr: 'Boussole Side Hustle',
      subAr: 'أول 5,000 درهم شهرياً بدون رأس مال',
      icon: Coins,
      badgeAr: 'مشاريع مصغرة'
    }
  ];

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
  const activeTabConfig = COMPASS_TABS.find(t => t.id === activeCompass) || COMPASS_TABS[0];
  const ActiveIcon = activeTabConfig.icon;

  useEffect(() => {
    trackPageView(`MezdoHub Compass - ${activeCompass}`);
  }, [activeCompass]);

  const handleSelectCompass = (type: CompassType) => {
    setActiveCompass(type);
    setCurrentStep(0);
    setUserAnswers({});
    setResult(null);
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...userAnswers, [questionId]: optionId };
    setUserAnswers(updated);

    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const computed = evaluateCompassResults(activeCompass, updated);
      setResult(computed);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setResult(null);
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSaveToDashboard = () => {
    if (!result) return;
    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_saved_decisions') || '[]');
      const newEntry = {
        id: `decision_${Date.now()}`,
        type: activeCompass,
        date: new Date().toISOString(),
        topPathway: result.pathways[0]?.titleAr || '',
        matchScore: result.pathways[0]?.matchScore || 0
      };
      localStorage.setItem('mezdohub_saved_decisions', JSON.stringify([newEntry, ...existing]));
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
    window.print();
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 animate-fade-in ${isAr ? 'text-right' : 'text-left'}`}>
      
      {/* 1. COMPACT TOP HEADER WITH INSTANT COMPASS NAVIGATION */}
      <header className="flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        {/* Top Control Bar: Back to Home + Active Compass Tag */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => onNavigateToTab?.('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'الرئيسية' : 'Accueil'}</span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">{isAr ? 'بوصلة الفرص' : 'Boussole'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>{isAr ? 'تشخيص مباشر ومجاني 2026' : 'Diagnostic direct 2026'}</span>
          </div>
        </div>

        {/* 5-Tabs Quick Horizontal Scroll Bar (Direct access to any compass) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {COMPASS_TABS.map(tab => {
            const isCurrent = activeCompass === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectCompass(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? tab.labelAr : tab.labelFr}</span>
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
                  {isAr ? activeTabConfig.labelAr : activeTabConfig.labelFr}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isAr ? activeTabConfig.subAr : ''}
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2.5 py-1 rounded-lg shrink-0">
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
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
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

          {/* Bottom Actions */}
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
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                {isAr ? 'تجربة بوصلة أخرى 🧭' : 'Tester une autre boussole'}
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

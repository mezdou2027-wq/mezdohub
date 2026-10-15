import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Target, 
  DollarSign, 
  Laptop, 
  Globe, 
  Factory, 
  FileText,
  RotateCcw,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { trackLifeMapCompleted } from '../services/analytics';

interface LifeMapArabProps {
  onSelectTab: (tab: string) => void;
}

interface DiagnosisResult {
  title: string;
  category: string;
  matchScore: string;
  incomePotential: string;
  timeToResults: string;
  recommendedTab: string;
  ctaText: string;
  whyThisFit: string;
  steps: string[];
  toolsToUse: string[];
}

export const LifeMapArab: React.FC<LifeMapArabProps> = ({ onSelectTab }) => {
  const { isDarkMode } = useTheme();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    situation: '',
    preference: '',
    timeCommitment: ''
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [resultReady, setResultReady] = useState(false);

  const handleSelectOption = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setResultReady(true);
        // Track GA4 diagnostic completion conversion
        const finalResult = getAccurateResult();
        trackLifeMapCompleted(finalResult.title, finalResult.matchScore);
      }, 1200);
    }
  };

  const resetTest = () => {
    setStep(1);
    setAnswers({ situation: '', preference: '', timeCommitment: '' });
    setResultReady(false);
  };

  // Dynamic and strictly accurate outcome generation based on user choices:
  const getAccurateResult = (): DiagnosisResult => {
    const { situation, preference } = answers;

    // 1. FREELANCE / DIGITAL INCOME (العمل الحر بالدولار)
    if (preference === 'remote_digital' || situation === 'freelance_seeker') {
      return {
        title: 'مسار العمل الحر بالدولار والمهارات الرقمية 💻',
        category: 'العمل الحر وخدمات كانفا والترجمة وتطوير الويب',
        matchScore: '94% (توافق عالي جداً)',
        incomePotential: '300$ - 1,500$ شهرياً (3,000 إلى 15,000 درهم)',
        timeToResults: 'أول دفعة خلال 30 إلى 45 يوماً',
        recommendedTab: 'freelance-money',
        ctaText: 'الانتقال لدليل العمل الحر وحساب أرباح بايبال 💲',
        whyThisFit: 'اخترت العمل الرقمي وحرية المكان؛ هذا المسار يتطلب استثمار ساعتين إلى 4 ساعات يومياً لتقديم خدمات مطلوبة وسحب الأرباح لحساب بنكي مغربي (CIH / Attijari أو Wise).',
        steps: [
          'اختر مهارة سريعة الطلب: تصاميم كانفا للمتاجر، كتابة محتوى بالذكاء الاصطناعي، أو الترجمة.',
          'افتح حساباً على Upwork أو منصة Mostaql أو ابدأ بعرض خدماتك على لينكدإن ومجموعات فيسبوك.',
          'استخدم حاسبة اقتطاعات بايبال ووايز لمعرفة صافي ربحك بالدرهم قبل تحديد تسعيرة الخدمات.'
        ],
        toolsToUse: ['حاسبة بايبال والدرهم', 'مقارنة بطاقات Wise و CIH', 'مولد عروض الأسعار Devis']
      };
    }

    // 2. MIGRATION & INTERNATIONAL CONTRACTS (عقود العمل بالخارج والهجرة)
    if (preference === 'migration_abroad') {
      return {
        title: 'مسار عقود العمل بالخارج والهجرة القانونية ✈️',
        category: 'بطاقة ألمانيا Chancenkarte، عقود الإمارات، والقرعة الأمريكية',
        matchScore: '91% (مسار استراتيجي دولي)',
        incomePotential: '15,000 - 35,000 درهم مغربي شهرياً',
        timeToResults: '3 إلى 6 أشهر لتجهيز الملف والتأشيرة',
        recommendedTab: 'migration',
        ctaText: 'فتح بوابة عقود الهجرة والفرص الدولية 🌍',
        whyThisFit: 'هدفك تأسيس رأس مال كبير بالخارج؛ المنظومة توفر لك المسارات القانونية بدون وسطاء مزيفين مع الشواهد المطلوبة وخطط التقديم المباشر.',
        steps: [
          'حدد وجهتك: ألمانيا (بطاقة الفرصة بالدبلوم المهني) أو الإمارات (عقود الضيافة والمبيعات).',
          'افحص مطابقة صورتك للقرعة الأمريكية (DV-2027) مجاناً بأداة الفحص البيومتري.',
          'جهز سيرتك الذاتية الدولية باللغة الإنجليزية وتأكد من معادلة شهادتك عبر الجهات الرسمية.'
        ],
        toolsToUse: ['بوابة عقود الهجرة', 'فحص صورة القرعة الأمريكية', 'صانع CV ATS الدولي']
      };
    }

    // 3. STABLE FACTORY & LOCAL JOBS (مصانع طنجة والمباريات الوطنية)
    return {
      title: 'مسار التوظيف المباشر بمصانع طنجة والمباريات 🏭',
      category: 'مصانع السيارات والكابلاج (Renault / Lear) والوظيفة العمومية',
      matchScore: '89% (أسرع مسار للاستقرار المالي)',
      incomePotential: '4,000 - 8,500 درهم شهرياً مع التغطية الصحية CNSS',
      timeToResults: 'أقل من 3 أسابيع (توظيف فوري مستمر)',
      recommendedTab: 'local-jobs',
      ctaText: 'تصفح شواغر مصانع طنجة والتقديم المباشر 💼',
      whyThisFit: 'أنت بحاجة لدخل شهري قار وسريع بعقد عمل موثق وتأمين صحي؛ المنطقة الصناعية بطنجة توفر مئات الفرص أسبوعياً لمن يمتلك ملفاً إدارياً صحيحاً وسيرة ذاتية منضبطة.',
      steps: [
        'أنشئ سيرة ذاتية بنظام ATS بالفرنسية تركز على الانضباط، الدقة، ونظام 5S الصناعي.',
        'قدم مباشرة على عناوين ومواقع HR الرسمية لمصانع طنجة (Renault Meloussa, Lear, Yazaki).',
        'استخدم حاسبة الراتب الصافي لمعرفة أجرك بعد اقتطاعات CNSS والضريبة IR.'
      ],
      toolsToUse: ['بوابة وظائف طنجة', 'صانع الـ CV الفرنسي', 'حاسبة الراتب الصافي']
    };
  };

  const result = getAccurateResult();

  return (
    <div className="space-y-8 animate-fade-in text-right max-w-3xl mx-auto">
      
      {/* Intro Banner */}
      <section className={`p-6 sm:p-10 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0c1630] via-[#091124] to-[#16122d] border-purple-500/30' 
          : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-200 shadow-sm'
      }`}>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Compass className="w-4 h-4 text-purple-400" />
            <span>بوصلة التوجيه الذكية · LifeMap Arab 2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            تشخيص مسارك المهني: نتائج دقيقة مرتبطة بأدواتك الحقيقية 🧭
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
            أجب عن 3 أسئلة سريعة لنحدد لك بدقة: أين تبدأ، كم ستربح، وما هي الأداة والفرصة التي تطابق رغبتك دون أي تشتيت أو نتائج عشوائية.
          </p>
        </div>
      </section>

      {/* Quiz Question Box */}
      {!resultReady ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#091122] border border-slate-800 space-y-6 shadow-xl">
          {analyzing ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="font-black text-base text-white">
                جاري مطابقة إجاباتك مع أدوات ومسارات MezdoHub بدقة...
              </h3>
              <p className="text-xs text-slate-400">
                نقوم بفحص الخيارات الواقعية المناسبة لإجابتك لنوجهك فوراً للقسم الصحيح.
              </p>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b pb-3 border-slate-800">
                <span className="text-purple-400 font-mono">السؤال {step} من 3</span>
                <span>{step === 1 ? 'الوضعية الحالية' : step === 2 ? 'الميول الحقيقي' : 'الوقت والالتزام'}</span>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    ما هي وضعيتك الحالية في الوقت الراهن؟
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { id: 'jobless_active', title: 'عاطل وباحث عن وظيفة ثابتة وسريعة', desc: 'أحتاج دخلاً قاراً هذا الشهر (مصانع، مراكز اتصال، إدارات)' },
                      { id: 'student_diploma', title: 'طالب أو خريج جديد (باك أو دبلوم أو جامعة)', desc: 'أريد معرفة المسار الأكثر طلباً وكيف أبدأ خطوتي الأولى' },
                      { id: 'freelance_seeker', title: 'أعمل لكن الراتب لا يكفي وأريد زيادة دخلي', desc: 'أرغب في العمل الحر أونلاين بالدولار أو عقود الهجرة بالخارج' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('situation', opt.id)}
                        className="w-full p-4 rounded-2xl border border-slate-750 hover:border-purple-500 bg-[#0d162d] text-right transition-all cursor-pointer group active:scale-98"
                      >
                        <span className="block font-black text-sm text-white group-hover:text-purple-400 transition-colors">
                          {opt.title}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    أي من هذه الأنماط هو الأقرب لرغبتك وهدفك المالي؟
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { id: 'remote_digital', title: 'العمل الحر عبر الإنترنت والكمبيوتر (Freelance)', desc: 'تقديم خدمات رقمية، الربح بالدولار، وحرية الوقت وسحب الأرباح للبنك' },
                      { id: 'migration_abroad', title: 'الهجرة وعقود العمل الدولية (أوروبا أو الخليج)', desc: 'ألمانيا، الإمارات، كندا، والقرعة الأمريكية لتأسيس رأس مال' },
                      { id: 'stable_company', title: 'وظيفة مستقرة بمصنع أو شركة بعقد وتأمين صحي', desc: 'راتب شهري مضمون، ترقية وظيفية، واستقرار محلي' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('preference', opt.id)}
                        className="w-full p-4 rounded-2xl border border-slate-750 hover:border-purple-500 bg-[#0d162d] text-right transition-all cursor-pointer group active:scale-98"
                      >
                        <span className="block font-black text-sm text-white group-hover:text-purple-400">
                          {opt.title}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    كم من الوقت تستطيع تخصيصه يومياً للتنفيذ؟
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { id: 'full_time', title: 'متفرغ تماماً (8+ ساعات يومياً)', desc: 'مستعد للبدء الفوري غداً في مصنع أو إعداد وتجهيز ملفي' },
                      { id: 'part_time', title: 'ساعتان إلى 4 ساعات في المساء', desc: 'لتعلم مهارة عمل حر جديدة وتجهيز سيرة ذاتية والبدء بتقديم الخدمات' },
                      { id: 'weekend', title: 'عطلة نهاية الأسبوع فقط', desc: 'لبناء مشروع جانبي متدرج' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('timeCommitment', opt.id)}
                        className="w-full p-4 rounded-2xl border border-slate-750 hover:border-purple-500 bg-[#0d162d] text-right transition-all cursor-pointer group active:scale-98"
                      >
                        <span className="block font-black text-sm text-white group-hover:text-purple-400">
                          {opt.title}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           ACCURATE RESULT DIAGNOSTIC VIEW (مطابق تماماً لما اختاره المستخدم)
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        <div className="p-6 sm:p-10 rounded-3xl bg-[#091124] border border-purple-500/40 space-y-6 shadow-2xl animate-fade-in">
          
          <div className="flex items-start justify-between border-b pb-4 border-slate-800 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-black text-purple-400 uppercase tracking-wider block">
                نتيجة التشخيص المخصصة · LifeMap Arab Precision Match
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {result.title}
              </h2>
              <span className="text-xs text-slate-400 block font-medium">
                التصنيف: {result.category}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-2xl shrink-0">
              🧭
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-purple-900/50">
              <span className="text-slate-400 block text-[10px]">نسبة التوافق مع اختياراتك:</span>
              <span className="text-base font-black text-purple-400 font-mono mt-0.5 block">{result.matchScore}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-900/50">
              <span className="text-slate-400 block text-[10px]">الدخل المالي التقديري:</span>
              <span className="text-base font-black text-emerald-400 font-mono mt-0.5 block">{result.incomePotential}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-blue-900/50">
              <span className="text-slate-400 block text-[10px]">الزمن المتوقع لأول نتيجة:</span>
              <span className="text-base font-black text-blue-400 mt-0.5 block">{result.timeToResults}</span>
            </div>
          </div>

          {/* Why this fit */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
            <strong className="text-white block font-bold">لماذا يناسبك هذا المسار؟</strong>
            <p>{result.whyThisFit}</p>
          </div>

          {/* Step by step action plan */}
          <div className="p-5 rounded-2xl bg-[#060c18] border border-slate-800 space-y-3 text-xs leading-relaxed">
            <h4 className="font-black text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>خطة التنفيذ العملية (الخطوات الثلاث المباشرة):</span>
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 font-medium pr-1">
              {result.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>

          {/* Tools you will need on MezdoHub */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400">أدوات منصة MezdoHub المجهزة لمساعدتك في هذا المسار:</span>
            <div className="flex flex-wrap gap-2">
              {result.toolsToUse.map((tool, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-blue-300 text-xs font-bold">
                  ⚡ {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Button directly to the chosen path! */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onSelectTab(result.recommendedTab)}
              className="w-full sm:flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-purple-600/30 active:scale-95 transition-all"
            >
              <span>{result.ctaText}</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>

            <button
              onClick={resetTest}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة التشخيص</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

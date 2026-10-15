import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Award, 
  Globe, 
  Compass, 
  Plane, 
  GraduationCap, 
  Briefcase, 
  DollarSign, 
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { trackLifeMapCompleted } from '../services/analytics';
import { saveAiDiagnostic } from '../services/userPreferences';

interface AiImmigrationAssistantProps {
  onSelectTab: (tab: string) => void;
  onOpenLeadMagnet?: () => void;
}

interface Recommendation {
  id: string;
  title: string;
  country: string;
  flag: string;
  matchScore: number;
  category: 'immigration' | 'work' | 'study';
  targetTab: string;
  summary: string;
  whyFitsYou: string;
  steps: string[];
  estimatedTimeline: string;
  officialPortal: string;
  officialUrl: string;
}

export const AiImmigrationAssistant: React.FC<AiImmigrationAssistantProps> = ({ onSelectTab, onOpenLeadMagnet }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // User Profile Inputs
  const [profile, setProfile] = useState({
    ageBracket: 'under-30', // 'under-30' | '30-35' | '36-44' | '45+'
    diploma: 'licence', // 'bac' | 'ofppt' | 'licence' | 'master'
    languages: 'french-english', // 'french-only' | 'english-only' | 'french-english' | 'german-b1' | 'beginner'
    experienceYears: '3-plus', // 'none' | '1-2' | '3-plus'
    budget: 'medium', // 'low' (less than 30k DH) | 'medium' (30k-80k DH) | 'high' (80k+ DH)
    primaryGoal: 'permanent' // 'permanent' | 'work' | 'study'
  });

  const handleSelect = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
        const topRecs = calculateRecommendations();
        trackLifeMapCompleted('ai_immigration_assistant', topRecs[0]?.title || 'general');
        
        // Auto-save diagnostic results to user profile history
        try {
          saveAiDiagnostic({
            ageBracket: profile.ageBracket,
            diploma: profile.diploma,
            language: profile.languages,
            experience: profile.experienceYears,
            budget: profile.budget,
            topMatches: topRecs.slice(0, 3).map(r => ({
              title: r.title,
              flag: r.flag,
              matchScore: r.matchScore,
              summary: r.summary,
              officialPortal: r.officialPortal
            }))
          });
        } catch {}
      }, 900);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  // Recommendation Engine
  const calculateRecommendations = (): Recommendation[] => {
    const list: Recommendation[] = [];

    // Rule 1: Germany Chancenkarte (High for under-35 with OFPPT or higher, English or German)
    let deScore = 75;
    if (profile.ageBracket === 'under-30') deScore += 15;
    else if (profile.ageBracket === '30-35') deScore += 10;
    if (profile.diploma === 'licence' || profile.diploma === 'master' || profile.diploma === 'ofppt') deScore += 10;
    if (profile.languages === 'german-b1') deScore += 15;
    else if (profile.languages.includes('english')) deScore += 8;
    if (profile.experienceYears === '3-plus') deScore += 8;
    deScore = Math.min(deScore, 98);

    list.push({
      id: 'rec-de-chancenkarte',
      title: 'بطاقة الفرصة الألمانية للبحث عن عمل (Chancenkarte § 20a)',
      country: 'ألمانيا',
      flag: '🇩🇪',
      matchScore: deScore,
      category: 'immigration',
      targetTab: 'migration',
      summary: 'تصريح إقامة قانوني يمنحك حق السفر لألمانيا للبحث عن عمل مع إمكانية العمل 20 ساعة أسبوعياً أثناء البحث.',
      whyFitsYou: `مستوى شهادتك (${profile.diploma === 'ofppt' ? 'دبلوم مهني' : 'شهادة جامعية'}) وسنك يمنحك رصيد نقاط مرتفع في الحاسبة الألمانية الرسمية، خاصة مع إمكانية العمل الجزئي لتغطية مصاريفك.`,
      steps: [
        'معادلة الدبلوم المغربي عبر شهادة ZAB أو قاعدة بيانات Anabin الرسمية.',
        'فتح الحساب البنكي المغلق (Sperrkonto) بقيمة 1,027 يورو شهرياً لتغطية المعيشة.',
        'إيداع الملف بمركز TLScontact بالرباط واستلام التأشيرة.'
      ],
      estimatedTimeline: '3 إلى 5 أشهر',
      officialPortal: 'make-it-in-germany.com',
      officialUrl: 'https://www.make-it-in-germany.com'
    });

    // Rule 2: Canada Express Entry / Arrima (High for under-35, Licence or Master, French/English)
    let caScore = 70;
    if (profile.ageBracket === 'under-30') caScore += 20;
    else if (profile.ageBracket === '30-35') caScore += 12;
    if (profile.diploma === 'master') caScore += 15;
    else if (profile.diploma === 'licence') caScore += 10;
    if (profile.languages === 'french-english') caScore += 18;
    else if (profile.languages.includes('french')) caScore += 12;
    if (profile.experienceYears === '3-plus') caScore += 10;
    caScore = Math.min(caScore, 97);

    list.push({
      id: 'rec-ca-express',
      title: 'الهجرة الدائمة إلى كندا (Express Entry & Arrima Québec)',
      country: 'كندا',
      flag: '🇨🇦',
      matchScore: caScore,
      category: 'immigration',
      targetTab: 'migration',
      summary: 'الحصول على الإقامة الدائمة (Permanent Residency) لك ولكافة أفراد عائلتك قبل مغادرة المغرب.',
      whyFitsYou: `إتقانك للغة (${profile.languages.includes('french') ? 'الفرنسية ميزة كبرى لكيبيك' : 'الإنجليزية'}) وخبرتك تمنحك درجات CRS مرتفعة في حوض الترشيح الكندي الفيدرالي.`,
      steps: [
        'معادلة شواهدك عبر تقرير WES الرسمي.',
        'اجتياز اختبار TCF Canada أو IELTS والحصول على درجة CLB 7 أو أعلى.',
        'إنشاء ملف مجاني عبر بوابة Arrima أو Express Entry وانتظار السحب الرسمي.'
      ],
      estimatedTimeline: '6 إلى 12 شهراً',
      officialPortal: 'canada.ca/en/services/immigration-citizenship',
      officialUrl: 'https://www.canada.ca/en/services/immigration-citizenship.html'
    });

    // Rule 3: Study Abroad Scholarships (High for students or lower budget)
    let studyScore = 65;
    if (profile.ageBracket === 'under-30') studyScore += 25;
    if (profile.budget === 'low') studyScore += 15;
    if (profile.languages.includes('english') || profile.languages.includes('french')) studyScore += 10;
    studyScore = Math.min(studyScore, 95);

    list.push({
      id: 'rec-study-scholarship',
      title: 'المنح الدراسية والجامعات المجانية (تركيا، ألمانيا، إيراسموس)',
      country: 'أوروبا والدول الشريكة',
      flag: '🇪🇺',
      matchScore: studyScore,
      category: 'study',
      targetTab: 'study-abroad',
      summary: 'دراسة جامعية معفاة من الرسوم أو ممولة بالكامل 100% مع راتب شهري وسكن جامعي وتذاكر طيران.',
      whyFitsYou: 'المنح الدولية تمثل الخيار الأسرع للشباب دون اشتراط حسابات بنكية ضخمة مع اكتساب شهادة دولية تفتح لك سوق الشغل فور التخرج.',
      steps: [
        'تجهيز كشوف النقط وبيان السيرة الذاتية ورسالة الدوافع.',
        'التقديم عبر بوابات المنح الحكومية المفتوحة (DAAD، Türkiye Burslari، Stipendium Hungaricum).',
        'استلام خطاب القبول والتقدم للسفارة لطلب تأشيرة الطالب.'
      ],
      estimatedTimeline: '4 إلى 8 أشهر',
      officialPortal: 'turkiyeburslari.gov.tr & daad.de',
      officialUrl: 'https://www.daad.de'
    });

    // Sort by Match Score descending
    return list.sort((a, b) => b.matchScore - a.matchScore);
  };

  const recommendations = calculateRecommendations();

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-right font-['Cairo',sans-serif]">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Bot className="w-3.5 h-3.5" />
            <span>المساعد الذكي للفرص الدولية · AI Navigator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            تشخيص مسارك الدولي الأكثر ملاءمة لمؤهلاتك
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            أجب عن 4 أسئلة سريعة لنحدد لك أفضل برامج الهجرة والدراسة والعمل التي تملك فيها أعلى فرص قبول رسمية.
          </p>
        </div>

        {showResults && (
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 hover:bg-slate-200 transition-colors self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة التشخيص</span>
          </button>
        )}
      </div>

      {/* QUIZ WIZARD (Steps 1 to 4) */}
      {!showResults && !isAnalyzing && (
        <div className="space-y-6 max-w-2xl mx-auto">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>الخطوة {currentStep} من 4</span>
            <span>{currentStep === 1 ? 'العمر والسن' : currentStep === 2 ? 'المستوى الدراسي' : currentStep === 3 ? 'اللغات المتقنة' : 'الخبرة والهدف'}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* STEP 1: AGE */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                1. كم يبلغ عمرك الحالي؟
              </h3>
              <p className="text-xs text-slate-500">العمر يلعب دوراً حاسماً في حساب نقاط برامج الهجرة والمنح الدراسية.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'under-30', label: 'أقل من 30 سنة', sub: 'أعلى رصيد نقاط في كندا وألمانيا' },
                  { id: '30-35', label: 'بين 30 و 35 سنة', sub: 'رصيد نقاط قوي ومناسب للكفاءات' },
                  { id: '36-44', label: 'بين 36 و 44 سنة', sub: 'متاح للهجرة الماهرة برعاية مشغل' },
                  { id: '45+', label: '45 سنة أو أكثر', sub: 'يناسب تأسيس الشركات والاستثمار' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('ageBracket', opt.id)}
                    className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                      profile.ageBracket === opt.id
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DIPLOMA */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                2. ما هو أعلى دبلوم أو شهادة تمتلكها؟
              </h3>
              <p className="text-xs text-slate-500">الدبلومات المعترف بها في المغرب يمكن معادلتها دولياً.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'bac', label: 'شهادة البكالوريا فقط', sub: 'مناسب للمنح والتدريب المهني Ausbildung' },
                  { id: 'ofppt', label: 'دبلوم تقني أو تقني متخصص OFPPT', sub: 'مطلوب جداً في كندا وألمانيا' },
                  { id: 'licence', label: 'شهادة الإجازة الجامعية (Bac+3)', sub: 'ممتاز للدخول السريع والدراسات العليا' },
                  { id: 'master', label: 'ماستر أو دبلوم مهندس دولة (Bac+5)', sub: 'أعلى درجات الكفاءة التخصصية' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('diploma', opt.id)}
                    className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                      profile.diploma === opt.id
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: LANGUAGES */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                3. ما هي اللغات الأجنبية التي تتقنها حالياً؟
              </h3>
              <p className="text-xs text-slate-500">اللغة هي العامل الأول في سرعة صدور التأشيرة وإيجاد العمل.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'french-english', label: 'الفرنسية والإنجليزية معاً', sub: 'أفضل وضعية (تمنحك نقاطاً مضاعفة بكندا)' },
                  { id: 'french-only', label: 'الفرنسية بطلاقة (B2 فما فوق)', sub: 'مثالي لمقاطعة كيبيك وفرنسا' },
                  { id: 'english-only', label: 'الإنجليزية بطلاقة (IELTS 6.5+)', sub: 'مثالي لألمانيا وأستراليا وبرامج كندا' },
                  { id: 'german-b1', label: 'اللغة الألمانية (A2 إلى B2)', sub: 'فرصة مباشرة بنسبة 98% في ألمانيا' },
                  { id: 'beginner', label: 'مبتدئ / أحتاج لتطوير مستواي', sub: 'سنقترح عليك برامج تتيح سنة لغة مجانية' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect('languages', opt.id)}
                    className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                      profile.languages === opt.id
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: EXPERIENCE & GOAL */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                4. كم سنة خبرة عملية تمتلك، وما هو هدفك الأكبر؟
              </h3>
              
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">سنوات الخبرة العملية:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'حديث تخرج' },
                    { id: '1-2', label: 'سنة إلى سنتين' },
                    { id: '3-plus', label: '3 سنوات أو أكثر' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect('experienceYears', item.id)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                        profile.experienceYears === item.id
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">هدفك الأساسي بالخارج:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'permanent', label: 'الهجرة الدائمة والاستقرار' },
                    { id: 'work', label: 'عقد عمل مدفوع براتب مرتفع' },
                    { id: 'study', label: 'متابعة الدراسة والحصول على منحة' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect('primaryGoal', item.id)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                        profile.primaryGoal === item.id
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>الخطوة السابقة</span>
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{currentStep === 4 ? 'تحليل الفرص وإظهار النتائج' : 'متابعة'}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* LOADING STATE */}
      {isAnalyzing && (
        <div className="py-16 text-center space-y-4 animate-fade-in">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 animate-spin" />
            <Bot className="w-7 h-7 text-blue-600 absolute inset-0 m-auto" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            جاري مطابقة مؤهلاتك مع أكثر من 18 برنامج هجرة ومنحة دراسية دولية...
          </h3>
          <p className="text-xs text-slate-500">
            نقوم باحتساب نقاط السن واللغة والشهادات وفق المعايير الرسمية لسنة 2026.
          </p>
        </div>
      )}

      {/* RESULTS PRESENTATION */}
      {showResults && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">
                تم تحليل ملفك بنجاح! إليك أفضل 3 مسارات دولية تملك فيها أعلى نسبة قبول رسمية:
              </span>
            </div>
            {onOpenLeadMagnet && (
              <button
                onClick={onOpenLeadMagnet}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shrink-0"
              >
                تحميل الدليل PDF
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendations.map((rec, index) => (
              <div
                key={rec.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600 transition-all shadow-xs flex flex-col justify-between space-y-4 group relative"
              >
                {/* Ranking Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 font-mono">
                    #{index + 1} الخيار الأفضل
                  </span>
                  <div className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1 font-mono">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>توافق {rec.matchScore}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xl">
                    <span>{rec.flag}</span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                      {rec.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rec.summary}
                  </p>
                </div>

                {/* Why this fits */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-bold">لماذا يناسبك هذا الخيار؟</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                    {rec.whyFitsYou}
                  </p>
                </div>

                {/* Steps Checklist */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">الخطوات القادمة:</span>
                  {rec.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px]">
                      <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                  <button
                    onClick={() => onSelectTab(rec.targetTab)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>عرض دليل البرنامج الكامل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={rec.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>البوابة الرسمية ({rec.officialPortal})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

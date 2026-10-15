import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Send, 
  Copy, 
  Check, 
  FileText, 
  Users, 
  ExternalLink, 
  ShieldCheck, 
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Star,
  Award,
  Layers,
  Printer
} from 'lucide-react';
import { trackLeadConversion } from '../services/analytics';

interface LaunchPartnersHubProps {
  onBack: () => void;
}

export const LaunchPartnersHub: React.FC<LaunchPartnersHubProps> = ({ onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'landing' | 'register-form' | 'eval-form' | 'pdf-deck' | 'outreach-scripts'>('landing');

  // Copy helpers
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form registration state
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    contactName: '',
    jobTitle: '',
    email: '',
    phone: '',
    website: '',
    city: 'طنجة',
    companyType: 'شركة خاصة',
    employeeCount: '11-50',
    isHiringNow: 'نعم',
    acceptsInterns: 'نعم',
    skillsNeeded: ['تسويق', 'برمجة'] as string[],
    joinLaunchProgram: 'نعم',
    agreedToContact: true
  });
  const [submittedCompany, setSubmittedCompany] = useState(false);

  // Candidate Evaluation Form State
  const [evalForm, setEvalForm] = useState({
    candidateName: 'محمد أمين',
    candidateEmail: 'amine@example.com',
    candidatePhone: '0612345678',
    targetRole: 'مطور ويب',
    techScore: 4,
    problemSolvingScore: 4,
    selfLearningScore: 5,
    communicationScore: 4,
    teamworkScore: 4,
    englishScore: 3,
    hasPortfolio: 'نعم',
    hasRealProjects: 'نعم',
    hasCv: 'نعم',
    hasLinkedin: 'نعم',
    firstImpression: 5,
    motivation: 5,
    confidence: 4,
    goalClarity: 5,
    finalDecision: 'ممتاز',
    recommendationNotes: 'مرشح شغوف ولديه مشاريع تطبيقية واضحة ومستعد للبدء الفوري.'
  });
  const [evalSubmitted, setEvalSubmitted] = useState(false);

  const calculateTotalEvalScore = () => {
    // التقنية: 25 | التواصل: 15 | التعلم: 15 | Portfolio: 15 | المشاريع: 15 | المقابلة: 15 = 100
    const tech = (evalForm.techScore / 5) * 25;
    const comm = (evalForm.communicationScore / 5) * 15;
    const learn = (evalForm.selfLearningScore / 5) * 15;
    const port = evalForm.hasPortfolio === 'نعم' ? 15 : 5;
    const proj = evalForm.hasRealProjects === 'نعم' ? 15 : 5;
    const interview = ((evalForm.firstImpression + evalForm.motivation + evalForm.confidence + evalForm.goalClarity) / 20) * 15;
    return Math.round(tech + comm + learn + port + proj + interview);
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyForm.companyName.trim() || !companyForm.phone.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_crm_leads') || '[]');
      const newPartner = {
        id: `partner-${Date.now()}`,
        name: companyForm.contactName || companyForm.companyName,
        phone: companyForm.phone,
        city: companyForm.city,
        diploma: `شريك إطلاق: ${companyForm.companyType} (${companyForm.companyName})`,
        selectedPackage: 'launch-partner-free',
        company: companyForm.companyName,
        role: `شريك مؤسس (${companyForm.jobTitle}) - المهارات: ${companyForm.skillsNeeded.join(', ')}`,
        date: new Date().toLocaleDateString('ar-MA') + ' ' + new Date().toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' }),
        status: 'new'
      };
      localStorage.setItem('mezdohub_crm_leads', JSON.stringify([newPartner, ...existing]));
    } catch {}

    // Track GA4 B2B Lead Conversion
    trackLeadConversion('b2b_launch_partner', companyForm.companyName, {
      city: companyForm.city,
      employee_count: companyForm.employeeCount,
      is_hiring: companyForm.isHiringNow
    });

    setSubmittedCompany(true);
  };

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedScript(id);
      setTimeout(() => setCopiedScript(null), 2500);
    }
  };

  const handleShareForm = () => {
    const url = window.location.origin + '?tab=partners&form=apply';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const printPdfDeck = () => {
    window.print();
  };

  return (
    <div className="space-y-8 text-right animate-fade-in max-w-5xl mx-auto">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TOP BAR & SUB-NAVIGATION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#091124] border border-slate-800 shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>بوابة الشركاء B2B · Launch Partners Program 2027</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-500" />
            <span>برنامج شركاء الإطلاق لـ MezdoHub (الشركات والمؤسسات)</span>
          </h1>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto active:scale-95 transition-all"
        >
          <span>العودة للرئيسية</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-800">
        {[
          { id: 'landing', label: '1. صفحة الشركاء (Landing Page)', icon: '🏢' },
          { id: 'register-form', label: '2. نموذج تسجيل الشركات (Forms)', icon: '📋' },
          { id: 'eval-form', label: '3. نموذج تقييم المرشحين (Talent Eval)', icon: '🎯' },
          { id: 'pdf-deck', label: '4. العرض التقديمي (PDF Deck بالألوان)', icon: '📑' },
          { id: 'outreach-scripts', label: '5. رسائل الدعوة والمكالمة (Outreach)', icon: '💬' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer border ${
              activeSubTab === tab.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                : 'bg-[#091122] text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 1: صفحة الهبوط للشركات (LANDING PAGE)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'landing' && (
        <div className="space-y-10">
          
          {/* Hero Banner */}
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c1630] via-[#091124] to-[#14122d] border border-blue-500/30 text-center space-y-5 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>مخصص لأول 20 شركة ومؤسسة فقط مجاناً ⚠️</span>
            </div>

            <h2 className="text-2xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              كن من أوائل شركاء MezdoHub<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                اعثر على المواهب المناسبة في وقت أقل 🎯
              </span>
            </h2>

            <p className="text-slate-300 font-medium text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
              ساعدنا في بناء الجيل القادم من المواهب العربية، واحصل على باقة <strong>Growth مجاناً لمدة 3 أشهر</strong> لنشر وظائفكم والوصول إلى شباب مؤهلين يمتلكون مهارات موثقة وشغفاً حقيقياً للعمل.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveSubTab('register-form')}
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-600/30 cursor-pointer active:scale-95 transition-all"
              >
                انضم كشريك إطلاق مجاناً (3 أشهر) 🚀
              </button>

              <button
                onClick={() => setActiveSubTab('pdf-deck')}
                className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>تحميل العرض التقديمي (PDF)</span>
              </button>
            </div>
          </section>

          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Problem */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#091122] border border-rose-900/30 space-y-4">
              <div className="inline-flex items-center gap-2 text-rose-400 font-black text-xs">
                <span>⚠️ التحديات التي تواجه الشركات اليوم:</span>
              </div>
              <h3 className="text-lg font-black text-white">هل تعانون من هذه المشاكل في التوظيف؟</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 text-sm">✕</span>
                  <span>عشرات ومئات السير الذاتية غير المناسبة والعشوائية في البريد.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 text-sm">✕</span>
                  <span>صعوبة تقييم المهارات الحقيقية ومعرفة هل المرشح قادر على الإنجاز فعلاً.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 text-sm">✕</span>
                  <span>وقت طويل ومجهود كبير مهدر للوصول للمرشح المناسب.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-400 text-sm">✕</span>
                  <span>نقص في المرشحين الشباب الجادين والمستعدين للتعلم والانضباط.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#091122] border border-emerald-900/30 space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-black text-xs">
                <span>✨ حل MezdoHub الذكي:</span>
              </div>
              <h3 className="text-lg font-black text-white">كيف نساعدكم على تجاوز ذلك؟</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>البحث حسب المهارات الموثقة (Verified Skills):</strong> بدون ادعاءات فارغة.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>ملفات مهنية ذكية:</strong> عرض التحديات المكتملة والمشاريع الحقيقية بدل CV ورقي فقط.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>نشر مجاني للوظائف وفرص التدريب:</strong> لجمهور شغوف وجاهز لسوق العمل.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>ظهور رسمي كشريك مؤسس:</strong> يعزز علامتكم التجارية كوجهة مفضلة للمواهب.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Pricing Packages Matrix */}
          <div className="space-y-6 text-center">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-3xl font-black text-white">باقات الشركات المستقبلية</h3>
              <p className="text-xs text-slate-400">
                (ملاحظة: يحصل شركاء الإطلاق على خطة <strong>Growth مجاناً 100% لمدة 3 أشهر</strong>)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
              
              {/* Starter */}
              <div className="p-6 rounded-3xl bg-[#091122] border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">للبدايات السريعة</span>
                  <h4 className="text-lg font-black text-white">Starter</h4>
                  <div className="text-2xl font-black text-white font-mono">99 درهم <span className="text-xs font-sans text-slate-400">/ شهرياً</span></div>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">✅ نشر 3 وظائف شهرياً</li>
                  <li className="flex items-center gap-2">✅ صفحة شركة مخصصة</li>
                  <li className="flex items-center gap-2">✅ استقبال طلبات الترشيح المباشرة</li>
                </ul>
              </div>

              {/* Growth (Featured) */}
              <div className="p-6 rounded-3xl bg-[#0c1630] border-2 border-blue-500 space-y-4 relative shadow-xl">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white uppercase">
                  عرض شركاء الإطلاق (مجاناً)
                </span>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-400">الأكثر طلباً للشركات النشطة</span>
                  <h4 className="text-lg font-black text-white">Growth</h4>
                  <div className="text-2xl font-black text-blue-400 font-mono">299 درهم <span className="text-xs font-sans text-slate-400">/ شهرياً</span></div>
                </div>
                <ul className="text-xs space-y-2 text-slate-200">
                  <li className="flex items-center gap-2">✅ نشر وظائف وتدريبات غير محدودة</li>
                  <li className="flex items-center gap-2">✅ بحث متقدم في قاعدة المواهب (Talent Pool)</li>
                  <li className="flex items-center gap-2">✅ فلترة دقيقة حسب المهارات الموثقة</li>
                  <li className="flex items-center gap-2">✅ إحصائيات ظهور الوظيفة والمتقدمين</li>
                  <li className="flex items-center gap-2">⭐ ظهور رسمي بشعار الشركة كشريك مؤسس</li>
                </ul>
                <button
                  onClick={() => setActiveSubTab('register-form')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs cursor-pointer"
                >
                  احجز خطة Growth مجاناً 🚀
                </button>
              </div>

              {/* Pro */}
              <div className="p-6 rounded-3xl bg-[#091122] border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400">للمؤسسات الكبرى ومكاتب التوظيف</span>
                  <h4 className="text-lg font-black text-white">Pro</h4>
                  <div className="text-2xl font-black text-white font-mono">799 درهم <span className="text-xs font-sans text-slate-400">/ شهرياً</span></div>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">✅ جميع مزايا باقة Growth</li>
                  <li className="flex items-center gap-2">✅ وصول كامل وتصدير بيانات المواهب</li>
                  <li className="flex items-center gap-2">✅ تقارير تقييم المرشحين المفصلة</li>
                  <li className="flex items-center gap-2">✅ مدير حساب ودعم فني مخصص على الواتساب</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: نموذج تسجيل الشركات (GOOGLE FORMS REPLICA)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'register-form' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#091124] border border-blue-500/30 space-y-6 shadow-xl max-w-2xl mx-auto">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-black text-blue-400 uppercase">Google Forms Format · MezdoHub Partners</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">استمارة تسجيل الشركات في برنامج شركاء الإطلاق</h2>
            </div>
            <button
              onClick={handleShareForm}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              title="نسخ رابط المشاركة"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="text-[11px]">نسخ الرابط</span>
            </button>
          </div>

          {submittedCompany ? (
            <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">✅ تم استلام طلب شركتكم بنجاح!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  شكراً لاهتمامكم ببرنامج شركاء الإطلاق لـ <strong>{companyForm.companyName}</strong>. سيتم التواصل معكم خلال 48 ساعة من طرف جواد وفريق العمل لمناقشة التعاون وتفعيل باقة Growth المجانية لمدة 3 أشهر.
                </p>
                <p className="text-xs text-blue-400 font-mono pt-2">📩 support@mezdohub.com | 📱 +212 600000000</p>
              </div>
              <button
                onClick={() => setSubmittedCompany(false)}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs cursor-pointer"
              >
                تعديل البيانات أو تسجيل شركة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleCompanySubmit} className="space-y-5 text-xs text-slate-200">
              
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-black text-sm text-white">القسم 1: معلومات الشركة والمسؤول</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-300">اسم الشركة / المؤسسة *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: TechCraft Agency"
                      value={companyForm.companyName}
                      onChange={e => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-300">اسم الشخص المسؤول *</label>
                    <input
                      type="text"
                      required
                      placeholder="الاسم الكامل"
                      value={companyForm.contactName}
                      onChange={e => setCompanyForm({ ...companyForm, contactName: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-300">المنصب الوظيفي</label>
                    <input
                      type="text"
                      placeholder="مثال: مدير الموارد البشرية / المؤسس"
                      value={companyForm.jobTitle}
                      onChange={e => setCompanyForm({ ...companyForm, jobTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-300">المدينة المقر</label>
                    <input
                      type="text"
                      placeholder="طنجة، الرباط، الدار البيضاء، فاس، مكناس..."
                      value={companyForm.city}
                      onChange={e => setCompanyForm({ ...companyForm, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-300">البريد الإلكتروني المهني *</label>
                    <input
                      type="email"
                      required
                      placeholder="hr@company.com"
                      value={companyForm.email}
                      onChange={e => setCompanyForm({ ...companyForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-300">رقم الهاتف / الواتساب *</label>
                    <input
                      type="tel"
                      required
                      placeholder="06XXXXXXXX"
                      value={companyForm.phone}
                      onChange={e => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-300">نوع المؤسسة</label>
                  <select
                    value={companyForm.companyType}
                    onChange={e => setCompanyForm({ ...companyForm, companyType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                  >
                    <option value="شركة خاصة">شركة خاصة</option>
                    <option value="وكالة تسويق وتصميم">وكالة تسويق وتصميم</option>
                    <option value="شركة برمجيات وتكنولوجيا">شركة برمجيات وتكنولوجيا</option>
                    <option value="مركز تكوين وتدريب">مركز تكوين وتدريب</option>
                    <option value="مكتب توظيف واستشارات">مكتب توظيف واستشارات</option>
                    <option value="مصنع / قطاع صناعي">مصنع / قطاع صناعي</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-black text-sm text-white">القسم 2: احتياجات التوظيف والتدريب</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-300">هل تنشرون وظائف حالياً؟</label>
                    <select
                      value={companyForm.isHiringNow}
                      onChange={e => setCompanyForm({ ...companyForm, isHiringNow: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                    >
                      <option value="نعم">نعم، لدينا شواغر</option>
                      <option value="لا">لا، ولكن نهتم بالمستقبل</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-300">هل تقبلون المتدربين (Stagiaires)؟</label>
                    <select
                      value={companyForm.acceptsInterns}
                      onChange={e => setCompanyForm({ ...companyForm, acceptsInterns: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                    >
                      <option value="نعم">نعم، نرحب بالمتدربين</option>
                      <option value="لا">لا نقبل حالياً</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1.5 text-slate-300">أكثر المهارات المطلوبة لديكم (اختر ما ينطبق):</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['تسويق رقمي', 'تصميم جرافيك / UI', 'برمجة وتطوير ويب', 'مبيعات وإدارة عملاء', 'صناعة محتوى', 'لوجستيك وصيانة'].map(skill => (
                      <label key={skill} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={companyForm.skillsNeeded.includes(skill)}
                          onChange={e => {
                            if (e.target.checked) {
                              setCompanyForm({ ...companyForm, skillsNeeded: [...companyForm.skillsNeeded, skill] });
                            } else {
                              setCompanyForm({ ...companyForm, skillsNeeded: companyForm.skillsNeeded.filter(s => s !== skill) });
                            }
                          }}
                          className="rounded text-blue-600"
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-[11px] text-blue-200">
                ☑️ أوافق على التواصل معي بخصوص برنامج شركاء الإطلاق وتفعيل ميزات باقة Growth المجانية لمدة 3 أشهر.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm cursor-pointer active:scale-95 transition-all shadow-lg shadow-blue-600/25"
              >
                إرسال طلب الانضمام كشريك إطلاق 🚀
              </button>

            </form>
          )}

        </div>
      )}


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 3: نموذج تقييم المرشحين (TALENT POOL EVALUATION)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'eval-form' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#091124] border border-indigo-500/30 space-y-6 shadow-xl max-w-2xl mx-auto">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-black text-indigo-400 uppercase">Assessment Grid (100 Points)</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">نموذج تقييم المرشح - MezdoHub Talent Pool</h2>
            </div>
            <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 text-center">
              <span className="text-[10px] text-slate-400 block">المجموع التراكمي</span>
              <div className="text-2xl font-black text-indigo-300 font-mono">{calculateTotalEvalScore()} / 100</div>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setEvalSubmitted(true); }} className="space-y-5 text-xs text-slate-200">
            
            {/* Candidate Basics */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="font-black text-sm text-white">القسم 1: معلومات المرشح الأساسية</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-slate-300">اسم المرشح</label>
                  <input
                    type="text"
                    value={evalForm.candidateName}
                    onChange={e => setEvalForm({ ...evalForm, candidateName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-300">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={evalForm.candidateEmail}
                    onChange={e => setEvalForm({ ...evalForm, candidateEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-300">المنصب المستهدف</label>
                  <select
                    value={evalForm.targetRole}
                    onChange={e => setEvalForm({ ...evalForm, targetRole: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                  >
                    <option value="مطور ويب">مطور ويب</option>
                    <option value="مصمم جرافيك / UI">مصمم جرافيك / UI</option>
                    <option value="مسوق رقمي">مسوق رقمي</option>
                    <option value="كاتب محتوى">كاتب محتوى</option>
                    <option value="مبيعات">مبيعات</option>
                    <option value="تقني صناعي / صيانة">تقني صناعي / صيانة</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Skills Linear Scales (1 to 5) */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="font-black text-sm text-white">القسم 2: تقييم المهارات (من 1 إلى 5)</h4>
              
              {[
                { label: 'المعرفة التقنية (Technical Knowledge) [25 نقطة]', field: 'techScore' },
                { label: 'حل المشكلات (Problem Solving) [15 نقطة]', field: 'problemSolvingScore' },
                { label: 'التعلم الذاتي والتطور (Self-Learning) [15 نقطة]', field: 'selfLearningScore' },
                { label: 'التواصل والوضوح (Communication) [15 نقطة]', field: 'communicationScore' },
                { label: 'اللغة الإنجليزية (English Proficiency)', field: 'englishScore' }
              ].map(item => (
                <div key={item.field} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-bold text-slate-300">{item.label}</span>
                  <div className="flex items-center gap-1 font-mono">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setEvalForm({ ...evalForm, [item.field]: val })}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          (evalForm as any)[item.field] === val
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Checkboxes */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="font-black text-sm text-white">القسم 3: الملف المهني العملي</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span>هل لديه Portfolio أعمال؟ [15 نقطة]</span>
                  <span className="font-bold text-emerald-400">{evalForm.hasPortfolio}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span>مشاريع عملية حقيقية؟ [15 نقطة]</span>
                  <span className="font-bold text-emerald-400">{evalForm.hasRealProjects}</span>
                </div>
              </div>
            </div>

            {/* Final Decision */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="font-black text-sm text-white">القرار والتوصية النهائية</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-slate-300">النتيجة العامة</label>
                  <select
                    value={evalForm.finalDecision}
                    onChange={e => setEvalForm({ ...evalForm, finalDecision: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                  >
                    <option value="ممتاز (جاهز فوراً)">ممتاز (جاهز فوراً)</option>
                    <option value="جيد جداً">جيد جداً</option>
                    <option value="جيد مع إشراف">جيد مع إشراف</option>
                    <option value="يحتاج تدريب أولي">يحتاج تدريب أولي</option>
                    <option value="غير مناسب حالياً">غير مناسب حالياً</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-300">الملاحظات والتوصية</label>
                  <input
                    type="text"
                    value={evalForm.recommendationNotes}
                    onChange={e => setEvalForm({ ...evalForm, recommendationNotes: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-white outline-none"
                  />
                </div>
              </div>
            </div>

            {evalSubmitted && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-center font-bold">
                ✅ تم حفظ نتيجة التقييم لـ {evalForm.candidateName} بنتيجة {calculateTotalEvalScore()}/100!
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black cursor-pointer shadow-md"
            >
              حفظ وتصدير تقرير التقييم 📊
            </button>

          </form>

        </div>
      )}


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 4: العرض التقديمي الملون (PDF PRESENTATION DECK)
          جاهز للطباعة والتنزيل كـ PDF رسمي بالألوان
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'pdf-deck' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#091124] border border-slate-800">
            <div>
              <h3 className="font-black text-sm text-white">كتيب العرض التقديمي الرسمي (MezdoHub Launch Partners Deck)</h3>
              <p className="text-xs text-slate-400">ملف جاهز للطباعة بالألوان أو تصديره إلى PDF لمشاركته مع مدراء الشركات والـ HR.</p>
            </div>
            <button
              onClick={printPdfDeck}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كـ PDF 🖨️</span>
            </button>
          </div>

          {/* Printable Color Slides Document */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 shadow-2xl space-y-12 border border-slate-200">
            
            {/* Slide 1: Cover */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 mx-auto flex items-center justify-center text-3xl font-black shadow-lg">
                🧭
              </div>
              <span className="text-xs font-black uppercase text-blue-400 tracking-widest block">
                MezdoHub · Launch Partners Program 2027
              </span>
              <h1 className="text-3xl sm:text-4xl font-black">برنامج شركاء الإطلاق</h1>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                بناء الجيل القادم من المواهب العربية بالتعاون مع الشركات والمؤسسات الرائدة.
              </p>
            </div>

            {/* Slide 2: About & Vision */}
            <div className="space-y-3 border-b pb-8">
              <span className="text-xs font-black uppercase text-blue-600">الصفحة 2 · من نحن؟</span>
              <h2 className="text-2xl font-black text-slate-900">رؤية منصة MezdoHub</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                منصة رقمية عربية متكاملة تساعد الشباب على الوصول للوظائف المباشرة وفرص التدريب، اكتشاف المسارات المهنية المناسبة عبر بوصلة LifeMap، تطوير المهارات وتتبع تقدمهم، والوصول إلى عقود العمل والهجرة وزيادة الدخل القانونية.
              </p>
            </div>

            {/* Slide 3: The Problem */}
            <div className="space-y-3 border-b pb-8">
              <span className="text-xs font-black uppercase text-rose-600">الصفحة 3 · المشكلة</span>
              <h2 className="text-2xl font-black text-slate-900">ما الذي تعاني منه الشركات اليوم؟</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                  <strong className="text-rose-700 block">1. كثرة السير الذاتية العشوائية</strong>
                  <p className="text-slate-600">فرز مئات الإيميلات التي لا تطابق المنصب المطلوب.</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                  <strong className="text-rose-700 block">2. صعوبة التحقق من المهارات</strong>
                  <p className="text-slate-600">الـ CV التقليدي لا يعكس قدرة المرشح على الإنجاز الفعلي.</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1">
                  <strong className="text-rose-700 block">3. بطء وتكلفة التوظيف</strong>
                  <p className="text-slate-600">استنزاف وقت الإدارة والموارد للوصول لكفاءة موثوقة.</p>
                </div>
              </div>
            </div>

            {/* Slide 4: The Solution */}
            <div className="space-y-3 border-b pb-8">
              <span className="text-xs font-black uppercase text-emerald-600">الصفحة 4 · الحل</span>
              <h2 className="text-2xl font-black text-slate-900">منظومة MezdoHub المتكاملة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 font-bold text-blue-900">Talent Pool الموثق</div>
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 font-bold text-indigo-900">بوابة الوظائف والتدريب</div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 font-bold text-purple-900">Career GPS المسارات</div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-bold text-emerald-900">Skill Verification التحديات</div>
              </div>
            </div>

            {/* Slide 5: Partner Benefits & Offer */}
            <div className="space-y-3 border-b pb-8">
              <span className="text-xs font-black uppercase text-amber-600">الصفحة 5 · فوائد الشريك</span>
              <h2 className="text-2xl font-black text-slate-900">عرض شركاء الإطلاق (مجاناً لمدة 3 أشهر)</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <li className="p-3 rounded-xl bg-slate-50 border">✅ نشر الوظائف وفرص التدريب داخل المنصة بدون حد أقصى.</li>
                <li className="p-3 rounded-xl bg-slate-50 border">✅ وصول أولي لقاعدة المواهب الشابة والفلترة بالمهارات.</li>
                <li className="p-3 rounded-xl bg-slate-50 border">✅ ظهور شعار شركتكم كشريك مؤسس رسمي.</li>
                <li className="p-3 rounded-xl bg-slate-50 border">✅ الاستفادة من خطة Growth (بقيمة 299 درهم/شهر) مجاناً.</li>
              </ul>
            </div>

            {/* Slide 6: Contact */}
            <div className="p-6 rounded-2xl bg-slate-100 text-center space-y-2">
              <h3 className="text-lg font-black text-slate-900">جاهزون للانضمام؟ تواصلوا معنا اليوم:</h3>
              <p className="text-xs text-slate-600">
                البريد: <strong>partners@mezdohub.com</strong> | الهاتف/الواتساب: <strong>+212 600000000</strong> | الموقع: <strong>mezdohub.com</strong>
              </p>
            </div>

          </div>
        </div>
      )}


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 5: نصوص التواصل والمكالمات (OUTREACH SCRIPTS)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeSubTab === 'outreach-scripts' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200">
            💡 <strong>القاعدة الذهبية:</strong> لا تقل للشركة <i>"اشتركوا في منصتي"</i>، بل قل: <i>"ساعدونا في بناء منصة أفضل للشباب، وسنمنحكم وصولاً مجانياً مبكراً للمواهب والوظائف خلال فترة الإطلاق."</i>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Script 1: WhatsApp Short */}
            <div className="p-6 rounded-3xl bg-[#091122] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400">📱 نسخة واتساب قصيرة للشركات</span>
                <button
                  onClick={() => handleCopy(`مرحبًا،\nأنا جواد، مؤسس MezdoHub.\nنطلق حاليًا منصة تساعد الشباب على الوصول للوظائف والتدريب وتطوير المهارات.\nندعو عددًا محدودًا من الشركات للانضمام كشركاء إطلاق والاستفادة من:\n✅ نشر مجاني للوظائف ✅ ظهور كشريك رسمي ✅ الوصول المبكر للمواهب\nالبرنامج مجاني خلال مرحلة الإطلاق.\nإذا كان الأمر يهمكم يسعدني إرسال التفاصيل خلال دقيقتين.\nتحياتي، جواد`, 'wa-short')}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedScript === 'wa-short' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>نسخ</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap font-sans leading-relaxed border border-slate-850">
{`مرحبًا،
أنا جواد، مؤسس MezdoHub.
نطلق حاليًا منصة تساعد الشباب على الوصول للوظائف والتدريب وتطوير المهارات.
ندعو عددًا محدودًا من الشركات للانضمام كشركاء إطلاق والاستفادة من:
✅ نشر مجاني للوظائف ✅ ظهور كشريك رسمي ✅ الوصول المبكر للمواهب
البرنامج مجاني خلال مرحلة الإطلاق.
إذا كان الأمر يهمكم يسعدني إرسال التفاصيل خلال دقيقتين.
تحياتي، جواد`}
              </pre>
            </div>

            {/* Script 2: Follow-up 1 */}
            <div className="p-6 rounded-3xl bg-[#091122] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-400">📧 متابعة رقم 1 (بعد 5 أيام)</span>
                <button
                  onClick={() => handleCopy(`الموضوع: متابعة سريعة\nمرحبًا [الاسم]،\nأردت فقط المتابعة بخصوص رسالتي السابقة.\nنعمل حاليًا على بناء مجتمع من الشباب المهتمين بالوظائف والتدريب وتطوير المهارات، ونبحث عن شركات ترغب في الوصول إلى هذه الفئة بشكل أفضل.\nإذا كانت لديكم فرص تدريب أو وظائف أو حتى تحديات مهنية يمكن مشاركتها، يسعدني الحديث معكم لمدة 10 دقائق فقط لفهم احتياجاتكم.\nتحياتي، جواد`, 'followup-1')}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedScript === 'followup-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>نسخ</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 text-xs whitespace-pre-wrap font-sans leading-relaxed border border-slate-850">
{`الموضوع: متابعة سريعة
مرحبًا [الاسم]،
أردت فقط المتابعة بخصوص رسالتي السابقة.
نعمل حاليًا على بناء مجتمع من الشباب المهتمين بالوظائف والتدريب وتطوير المهارات، ونبحث عن شركات ترغب في الوصول إلى هذه الفئة بشكل أفضل.
إذا كانت لديكم فرص تدريب أو وظائف، يسعدني الحديث معكم لمدة 10 دقائق لفهم احتياجاتكم.
تحياتي، جواد`}
              </pre>
            </div>

            {/* Script 3: 15-Minute Call Playbook */}
            <div className="p-6 rounded-3xl bg-[#091122] border border-slate-800 space-y-3 md:col-span-2">
              <span className="text-xs font-black text-amber-400 block">📞 نص مكالمة البيع والاكتشاف (15 دقيقة فقط)</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-1.5">
                  <strong className="text-blue-400 block">1. أول دقيقتين (تحدث عنهم):</strong>
                  <p className="text-slate-400">"شكراً على وقتك. قبل أن أشرح أي شيء، أحب أن أفهم كيف تجدون المرشحين والمتدربين لديكم حالياً؟ وما أكبر صعوبة تواجهونها؟"</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-1.5">
                  <strong className="text-emerald-400 block">2. مرحلة الربط وتقديم MezdoHub:</strong>
                  <p className="text-slate-400">"بدلاً من انتظار مئات الطلبات العشوائية، نساعدكم للوصول لشباب لديهم دافع حقيقي، مهارات موثقة، ويتابعون تطوير أنفسهم باستمرار."</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-1.5">
                  <strong className="text-amber-400 block">3. إغلاق المكالمة بدون بيع:</strong>
                  <p className="text-slate-400">"أقترح أن نجرب ببساطة: سأنشر إحدى وظائفكم أو فرص التدريب مجاناً خلال مرحلة الإطلاق، ونتابع النتائج معاً. هل لديكم فرصة شاغرة حالياً؟"</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

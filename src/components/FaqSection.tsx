import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  DollarSign,
  PackageCheck
} from 'lucide-react';
import { updateStructuredData, getFaqPageSchema } from '../services/schemaGenerator';

interface FaqItem {
  id: string;
  category: 'migration' | 'study' | 'jobs' | 'freelance' | 'dv-lottery' | 'customs';
  categoryLabelAr: string;
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'migration',
      categoryLabelAr: 'الهجرة الدولية',
      question: 'هل يمكن لخريجي التكوين المهني (OFPPT) الهجرة إلى كندا أو ألمانيا؟',
      answer: 'نعم بكل تأكيد! ألمانيا تعترف بدبلوم التقني المتخصص (ISTA) في إطار بطاقة الفرصة (Chancenkarte) وقانون هجرة الكفاءات الجديد عبر إجراء معادلة ZAB. وفي كندا، برنامج الحرف الفيدرالية (FSTP) وبرنامج كيبيك (Arrima) يمنحان أولوية كبرى للمهن الصناعية والتقنية (كهروميكانيك، لحام، صيانة، كابلاج، بناء).'
    },
    {
      id: 'faq-customs-1',
      category: 'customs',
      categoryLabelAr: 'الجمارك والطرود 📦',
      question: 'كيف يتم احتساب رسوم الجمارك على طرود AliExpress و Temu و Shein بالمغرب في 2026؟',
      answer: 'تخضع جميع الطرود لضريبة القيمة المضافة TVA بنسبة 20% مضافاً إليها رسم استيراد يتراوح بين 2.5% و 40% حسب نوع السلعة ورسوم المعالجة البريدية لبريد المغرب (حوالي 40 إلى 60 درهماً). يمكنك قراءة دليل الجمارك الشامل بمركز المحتوى في MezdoHub.'
    },
    {
      id: 'faq-spain-1',
      category: 'migration',
      categoryLabelAr: 'الهجرة لإسبانيا',
      question: 'ما هي شروط تسوية الإقامة في إسبانيا عبر الجذور التدريبية (Arraigo para la Formación)؟',
      answer: 'تتطلب إقامة فعلية مستمرة لمدة عامين بإسبانيا، شهادة خلو السوابق العدلية من المغرب وإسبانيا، والتسجيل في تكوين مهني معتمد يؤهلك مباشرة لعقد عمل وإقامة نظامية لسنتين قابلة للتجديد.'
    },
    {
      id: 'faq-2',
      category: 'dv-lottery',
      categoryLabelAr: 'القرعة الأمريكية',
      question: 'لماذا تُرفض أكثر من 60% من صور القرعة الأمريكية لدى المغاربة؟',
      answer: 'السبب الرئيسي هو عدم مطابقة المعايير البيومترية الصارمة: يجب أن تكون الصورة بمقاس 600×600 بكسل تماماً، بخلفية بيضاء نقية دون ظلال، بدون نظارات، وتكون حديثة التقطت خلال آخر 6 أشهر. يمكنك فحص صورتك بدقة فورية ومجاناً عبر أداة فاحص الصور في MezdoHub.'
    },
    {
      id: 'faq-3',
      category: 'study',
      categoryLabelAr: 'الدراسة والمنح',
      question: 'ما هو الحساب البنكي المغلق (Sperrkonto) المطلوب لفيزا ألمانيا وكيف أفتحه من المغرب؟',
      answer: 'الحساب المغلق هو حساب بنكي يثبت قدرتك المالية على المعيشة لسنة كاملة بألمانيا. المبلغ المطلوب لعام 2026 هو 11,904 يورو (992€ شهرياً). يمكنك فتحه إلكترونياً من المغرب في أقل من 24 ساعة عبر بنك Expatrio أو Coracle المعترف بهما رسمياً بسفارة ألمانيا بالرباط.'
    },
    {
      id: 'faq-4',
      category: 'freelance',
      categoryLabelAr: 'العمل الحر والأرباح',
      question: 'كيف أسحب أرباحي من PayPal أو العمل الحر إلى حساب بنكي مغربي دون حظر؟',
      answer: 'أفضل طريقة قانونية ومجربة هي ربط بطاقة Visa دولية (مثل CIH Code30 أو بطاقة التجاري وفا بنك) أو ربط حساب بنكي أمريكي وسيط عبر Wise أو Payoneer. كما نوصي باستخراج بطاقة المقاول الذاتي (Auto-Entrepreneur) لتبرئة ذمتك القانونية ومكتب الصرف ودفع ضريبة رمزية 1% فقط.'
    },
    {
      id: 'faq-5',
      category: 'jobs',
      categoryLabelAr: 'الوظائف والشركات',
      question: 'ما هو نظام الفرز الآلي للسير الذاتية (ATS) وكيف أضمن قبول سيرتي الذاتية؟',
      answer: 'روبوت الـ ATS هو نظام ذكي تستخدمه كبريات الشركات (مثل رونو، لير، ستيلانتيس، والشركات الدولية) لمسح السير الذاتية آلياً قبل وصولها لعين الـ HR. صانع السيرة الذاتية في MezdoHub يولد لك ملف PDF بعمود واحد متوافق 100% مع معايير ATS مجاناً.'
    },
    {
      id: 'faq-6',
      category: 'study',
      categoryLabelAr: 'الدراسة والمنح',
      question: 'هل توجد منح دراسية مجانية لا تشترط حساباً بنكياً مغلقاً؟',
      answer: 'نعم! المنح الممولة بالكامل مثل منحة رومانيا (MAE)، منحة المجر (Stipendium Hungaricum)، ومنحة إيطاليا (DSU) تغطي الرسوم الدراسية 100% مع راتب شهري وسكن مجاني، وبالتالي لا تطلب منك القنصلية أي حساب بنكي مغلق عند استخراج التأشيرة.'
    }
  ];

  // Sync FAQ schema with Google rich snippets
  useEffect(() => {
    const faqSchema = getFaqPageSchema(faqs.map(f => ({ question: f.question, answer: f.answer })));
    updateStructuredData('homepage-faqs-schema', faqSchema);
  }, []);

  const filteredFaqs = faqs.filter(faq => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = faq.question.toLowerCase().includes(q) ||
                    faq.answer.toLowerCase().includes(q) ||
                    faq.categoryLabelAr.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <section className="space-y-8 animate-fade-in text-right">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>مركز الأسئلة الشائعة والأجوبة المعتمدة (FAQ)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          إجابات واضحة ودقيقة لأهم أسئلة الشباب المغربي
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          كل ما تحتاج معرفته عن شروط الهجرة، المنح، العمل الحر، التوظيف الصناعي، وحسابات البنوك دون تعقيد.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث في الأسئلة الشائعة..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-9 pl-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'migration', label: 'الهجرة' },
            { id: 'study', label: 'الدراسة والمنح' },
            { id: 'jobs', label: 'الوظائف و ATS' },
            { id: 'freelance', label: 'العمل الحر' },
            { id: 'dv-lottery', label: 'القرعة الأمريكية' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3 max-w-4xl mx-auto">
        {filteredFaqs.map(faq => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
                    {faq.categoryLabelAr}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};

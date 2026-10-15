import React, { useState } from 'react';
import { 
  FileDown, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Download, 
  Mail, 
  User, 
  ArrowLeft,
  ArrowRight,
  Printer
} from 'lucide-react';
import { trackLeadConversion } from '../services/analytics';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCountry?: string;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose, defaultCountry = 'كندا' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTarget, setSelectedTarget] = useState(defaultCountry);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    try {
      const existing = JSON.parse(localStorage.getItem('mezdohub_leads') || '[]');
      const newLead = {
        id: `lead-${Date.now()}`,
        name: name.trim() || 'صديق MezdoHub',
        email: email.trim(),
        target: selectedTarget,
        type: 'guide_pdf_download',
        date: new Date().toISOString()
      };
      localStorage.setItem('mezdohub_leads', JSON.stringify([newLead, ...existing]));

      // Also add to subscribers list
      const subs = JSON.parse(localStorage.getItem('mezdohub_subscribers') || '[]');
      localStorage.setItem('mezdohub_subscribers', JSON.stringify([...subs, { email: email.trim(), date: new Date().toISOString() }]));
    } catch {}

    trackLeadConversion('guide_pdf_download', selectedTarget, { name, email });
    setIsSubmitted(true);
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-['Cairo',sans-serif]">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl text-right relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>هدية حصرية مجانية 100% · تحديث 2026</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                تحميل الدليل الشامل للهجرة القانونية والعمل بالخارج للمغاربة 2026 (PDF)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                دليل عملي مفصل يجمع لك كل ما تحتاجه دون الحاجة لأي وسيط: خطوات الهجرة لكندا وألمانيا وأستراليا، نماذج السيرة الذاتية ورسائل التحفيز، وجدول معادلة الشهادات المغربية.
              </p>
            </div>

            {/* Checklist of what's inside */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <div className="font-bold text-slate-900 dark:text-white mb-1">ماذا ستجد داخل هذا الدليل؟</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>شرح مبسط لنظام الدخول السريع لكندا (Express Entry) وبطاقة الفرصة الألمانية.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>قائمة بأكثر من 40 مهنة وتخصصاً مطلوباً مع مبالغ الرواتب بالدرهم المغربي.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>الروابط الحكومية الرسمية المعتمدة فقط لتفادي الوقوع في النصب والاحتيال.</span>
              </div>
            </div>

            {/* Opt-in Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-800 dark:text-slate-200">الاسم الأول أو الكامل</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="مثال: يونس"
                    className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-800 dark:text-slate-200">بريدك الإلكتروني (لتحميل الدليل)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pr-9 pl-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600 text-left dir-ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-800 dark:text-slate-200">الوجهة أو المسار الأكثر اهتماماً بالنسبة لك:</label>
                <select
                  value={selectedTarget}
                  onChange={e => setSelectedTarget(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                >
                  <option value="كندا">الهجرة والعمل في كندا 🇨🇦</option>
                  <option value="ألمانيا">بطاقة الفرصة والعمل في ألمانيا 🇩🇪</option>
                  <option value="أستراليا">نظام النقاط في أستراليا 🇦🇺</option>
                  <option value="أوروبا">العمل الموسمي والدراسة بأوروبا 🇪🇺</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>تأكيد وتحميل الدليل المجاني الآن</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>خصوصيتك مضمونة 100% · لن نرسل لك أي رسائل مزعجة أبداً.</span>
              </div>
            </form>
          </>
        ) : (
          /* Success & Instant PDF Download View */
          <div className="space-y-5 text-center py-2 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                تم تجهيز دليلك الشامل بنجاح يا {name || 'صديقنا'}! 🎉
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                يمكنك الآن قراءة الدليل مباشرة أو تنزيله أو طباعته كملف PDF على جهازك:
              </p>
            </div>

            {/* Document Preview Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-right text-xs leading-relaxed space-y-3 max-h-64 overflow-y-auto">
              <div className="border-b pb-2">
                <span className="font-mono text-[10px] text-blue-600 font-bold block">MEZDOHUB OFFICIAL HANDBOOK 2026</span>
                <strong className="text-sm font-black text-slate-900 dark:text-white block mt-0.5">
                  الدليل الاستراتيجي للهجرة والعمل الدولي للمغاربة 2026
                </strong>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white">الفصل 1: خارطة كندا (Express Entry & Arrima):</strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                  معادلة دبلوم WES + اختبار TCF Canada بدرجة CLB7 + إنشاء الملف المجاني عبر canada.ca.
                </p>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white">الفصل 2: بطاقة الفرصة الألمانية Chancenkarte:</strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                  جمع 6 نقاط + الحساب المغلق Sperrkonto + حق العمل القانوني 20 ساعة أسبوعياً.
                </p>
              </div>

              <div>
                <strong className="block text-slate-900 dark:text-white">الفصل 3: القواعد الذهبية لحماية نفسك:</strong>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                  لا تدفع درهماً واحداً لأي صفحة تعدك بعقد عمل جاهز في كندا أو أوروبا. جميع المنصات الرسمية مجانية التقديم.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                onClick={handlePrintOrDownload}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>حفظ أو طباعة كـ PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                إغلاق والعودة
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

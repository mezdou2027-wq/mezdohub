import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Compass, 
  Flame, 
  ChevronRight, 
  Bell, 
  Check, 
  X
} from 'lucide-react';
import { trackNewsletterSignup } from '../services/analytics';

interface WeeklyNewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab?: (tab: string) => void;
}

export const WeeklyNewsletterModal: React.FC<WeeklyNewsletterModalProps> = ({ isOpen, onClose, onSelectTab }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferredTopic, setPreferredTopic] = useState<'all' | 'immigration' | 'jobs' | 'scholarships'>('all');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    try {
      const subs = JSON.parse(localStorage.getItem('mezdohub_subscribers') || '[]');
      const newSub = {
        id: `sub-${Date.now()}`,
        name: name.trim() || 'صديق MezdoHub',
        email: email.trim(),
        preferredTopic,
        date: new Date().toISOString()
      };
      localStorage.setItem('mezdohub_subscribers', JSON.stringify([newSub, ...subs]));
    } catch {}

    trackNewsletterSignup(preferredTopic);
    setIsSuccess(true);
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

        {!isSuccess ? (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>النشرة البريدية الأسبوعية · كل جمعة صباحاً</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                فرص المغاربة هذا الأسبوع 📬
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ملخص أسبوعي حصري يصلك كل جمعة يحتوي على أهم 5 فرص دولية حقيقية، سحوبات كندا وألمانيا، ومباريات التوظيف الصادرة في الأسبوع.
              </p>
            </div>

            {/* Newsletter Highlights Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                ماذا يتضمن عدد الجمعة القادم؟
              </span>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>جدول سحوبات Express Entry وبطاقة الفرصة الألمانية الأسبوعية.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>أحدث 10 عقود عمل رسمية معتمدة على Job Bank Canada و Make-it-in-Germany.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>تنبيه بمواعيد إغلاق المنح الجامعية الممولة بالكامل في أوروبا.</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-800 dark:text-slate-200">الاسم أو اللقب:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثال: يوسف"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-800 dark:text-slate-200">البريد الإلكتروني:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600 text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-800 dark:text-slate-200">اهتمامك الأكبر:</label>
                <select
                  value={preferredTopic}
                  onChange={e => setPreferredTopic(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-blue-600"
                >
                  <option value="all">الكل (هجرة + وظائف + منح + دخل رقمي)</option>
                  <option value="immigration">الهجرة الرسمية لكندا وألمانيا وأستراليا</option>
                  <option value="jobs">عقود العمل الدولية والموسمية</option>
                  <option value="scholarships">المنح الجامعية والدراسة بالخارج</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>اشترك مجاناً في نشرة "فرص المغاربة"</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>نحترم خصوصيتك 100%. بدون سبام. يمكنك إلغاء الاشتراك بنقرة واحدة.</span>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                تم اشتراكك بنجاح في نشرة MezdoHub! 🎉
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                أهلاً بك يا {name || 'صديقنا'}! سيصلك العدد الأول يوم الجمعة القادم على البريد ({email}).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-200 text-right space-y-2">
              <span className="font-bold block">💡 في هذه الأثناء:</span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                يمكنك الانتقال إلى لوحة حسابك لتفعيل نظام التنبيهات المخصص لملفك وتتبع المستجدات أولاً بأول.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onSelectTab) onSelectTab('dashboard');
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              الانتقال إلى لوحة حسابي الشخصية
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

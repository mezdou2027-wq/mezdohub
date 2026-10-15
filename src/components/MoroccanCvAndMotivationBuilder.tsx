import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Languages 
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { trackCvDownload } from '../services/analytics';

interface MoroccanCvAndMotivationBuilderProps {
  onSelectTab?: (tab: string) => void;
}

const DEFAULT_CV_DATA = {
  fullName: 'كريم المرابط',
  title: 'Technicien Spécialisé en Électromécanique / Industrie',
  email: 'karim.elmorabit@email.com',
  phone: '06 12 34 56 78',
  city: 'طنجة - المغرب',
  summary: 'تقني متخصص ذو انضباط عالي وخبرة في صيانة الآلات الصناعية وخطوط الإنتاج. قادر على الاندماج الفوري في فرق العمل وتطبيق معايير السلامة والجودة العالمية (5S / Lean Manufacturing).',
  experience: 'متربص صيانة صناعية - شركة كابلاج (6 أشهر)\n- فحص وضبط التجهيزات الكهروميكانيكية.\n- تقليل زمن توقف الخطوط الإنتاجية بنسبة 15%.',
  education: 'دبلوم تقني متخصص (ISTA / OFPPT طنجة) - 2024\nشهادة البكالوريا شعبة العلوم والتكنولوجيات الكهربائية - 2022',
  skills: 'Électromécanique, Câblage Industriel, Lean 5S, Pneumatique, Esprit d’équipe, Rigueur',
  languages: 'العربية (اللغة الأم)، الفرنسية (مستوى مهني جيد B2)، الإنجليزية (أساسيات تقنية)'
};

export const MoroccanCvAndMotivationBuilder: React.FC<MoroccanCvAndMotivationBuilderProps> = ({ onSelectTab }) => {
  const { isDarkMode } = useTheme();
  const [activeSubTab, setActiveSubTab] = useState<'cv' | 'letter'>('cv');

  // CV State hydrated from localStorage to prevent data loss on tab navigation
  const [cvData, setCvData] = useState(() => {
    try {
      const saved = localStorage.getItem('mezdohub_cv_draft_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_CV_DATA;
  });

  // Auto-save on every edit
  React.useEffect(() => {
    try {
      localStorage.setItem('mezdohub_cv_draft_v1', JSON.stringify(cvData));
    } catch {}
  }, [cvData]);

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate PDF via jsPDF
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Simple clean ATS CV Layout
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(30, 41, 59);
      doc.text(cvData.fullName, 20, 25);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(79, 70, 229);
      doc.text(cvData.title, 20, 33);

      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`Email: ${cvData.email} | Tel: ${cvData.phone} | Ville: ${cvData.city}`, 20, 40);

      doc.setDrawColor(226, 232, 240);
      doc.line(20, 45, 190, 45);

      // Profil
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text('PROFIL PROFESSIONNEL', 20, 54);

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const splitSummary = doc.splitTextToSize(cvData.summary, 170);
      doc.text(splitSummary, 20, 61);

      // Experiences
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text('EXPERIENCES PROFESSIONNELLES', 20, 85);

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const splitExp = doc.splitTextToSize(cvData.experience, 170);
      doc.text(splitExp, 20, 92);

      // Formation
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text('FORMATION & DIPLOMES', 20, 125);

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const splitEdu = doc.splitTextToSize(cvData.education, 170);
      doc.text(splitEdu, 20, 132);

      // Competences
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text('COMPETENCES TECHNIQUES', 20, 160);

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const splitSkills = doc.splitTextToSize(cvData.skills, 170);
      doc.text(splitSkills, 20, 167);

      // Langues
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text('LANGUES', 20, 190);

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const splitLang = doc.splitTextToSize(cvData.languages, 170);
      doc.text(splitLang, 20, 197);

      doc.save(`CV_${cvData.fullName.replace(/\s+/g, '_')}_MezdoHub.pdf`);
      
      // Track GA4 file_download conversion
      trackCvDownload('pdf', cvData.title);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-right">
      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>صانع السيرة الذاتية الذكي ATS المعتمد للشركات المغربية 🇲🇦</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              مولد CV والرسائل التحفيزية (Curriculum Vitae Pro)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              سيرة ذاتية متوافقة 100% مع روبوتات الفرز الآلي للشركات (ATS) وتصدير فوري بصيغة PDF مجاناً.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>🔒 خصوصية تامة: بياناتك تُحفظ في جهازك فقط ولا تُرسل لأي خادم خارجي.</span>
              <button
                type="button"
                onClick={() => {
                  if (confirm('هل ترغب في إعادة ضبط البيانات إلى النموذج الافتراضي؟')) {
                    setCvData(DEFAULT_CV_DATA);
                    localStorage.removeItem('mezdohub_cv_draft_v1');
                  }
                }}
                className="text-slate-400 hover:text-rose-500 underline text-[10px] cursor-pointer"
              >
                (إعادة تعيين النموذج)
              </button>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>تحميل الـ CV الآن (PDF) 📥</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>تم توليد وتحميل ملف الـ PDF لسيرتك الذاتية بنجاح!</span>
          </div>
          {onSelectTab && (
            <button
              onClick={() => onSelectTab('local-jobs')}
              className="underline text-emerald-700 dark:text-emerald-300 cursor-pointer"
            >
              قدّم به الآن على وظائف طنجة 🚀
            </button>
          )}
        </div>
      )}

      {/* Editor & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Editor Form */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className="font-black text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            تعديل معلومات السيرة الذاتية ✍️
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">الاسم واللقب</label>
              <input
                type="text"
                value={cvData.fullName}
                onChange={e => setCvData({ ...cvData, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">المسمى المهني (Titre)</label>
              <input
                type="text"
                value={cvData.title}
                onChange={e => setCvData({ ...cvData, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">البريد الإلكتروني</label>
              <input
                type="email"
                value={cvData.email}
                onChange={e => setCvData({ ...cvData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">رقم الهاتف</label>
              <input
                type="text"
                value={cvData.phone}
                onChange={e => setCvData({ ...cvData, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">نبذة تعريفية (Résumé / Profil)</label>
            <textarea
              rows={3}
              value={cvData.summary}
              onChange={e => setCvData({ ...cvData, summary: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">الخبرات والتدريب (Expériences)</label>
            <textarea
              rows={3}
              value={cvData.experience}
              onChange={e => setCvData({ ...cvData, experience: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">التكوين والشهادات (Formation)</label>
            <textarea
              rows={3}
              value={cvData.education}
              onChange={e => setCvData({ ...cvData, education: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">المهارات التقنية (Compétences)</label>
            <input
              type="text"
              value={cvData.skills}
              onChange={e => setCvData({ ...cvData, skills: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold mb-1 text-slate-600 dark:text-slate-300">اللغات (Langues)</label>
            <input
              type="text"
              value={cvData.languages}
              onChange={e => setCvData({ ...cvData, languages: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white text-slate-900 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div>
              <h2 className="text-xl font-black text-slate-900">{cvData.fullName}</h2>
              <p className="text-xs font-bold text-indigo-600">{cvData.title}</p>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              معاينة مباشرة ATS
            </span>
          </div>

          <div className="text-[11px] text-slate-500 flex flex-wrap gap-3">
            <span>📧 {cvData.email}</span>
            <span>📱 {cvData.phone}</span>
            <span>📍 {cvData.city}</span>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-900 border-b pb-1">نبذة عن المترشح (Profil)</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">{cvData.summary}</p>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-900 border-b pb-1">التجارب المهنية (Expériences)</h4>
            <pre className="text-slate-600 text-[11px] font-sans whitespace-pre-wrap leading-relaxed">{cvData.experience}</pre>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-900 border-b pb-1">الدراسة والشواهد (Formation)</h4>
            <pre className="text-slate-600 text-[11px] font-sans whitespace-pre-wrap leading-relaxed">{cvData.education}</pre>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-900 border-b pb-1">المهارات التقنية (Compétences)</h4>
            <p className="text-slate-600 text-[11px]">{cvData.skills}</p>
          </div>

          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-900 border-b pb-1">اللغات (Langues)</h4>
            <p className="text-slate-600 text-[11px]">{cvData.languages}</p>
          </div>

          <div className="pt-3 space-y-2">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/25 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>تحميل نسخة PDF جاهزة فوراً (Télécharger CV ATS) 📥</span>
            </button>

            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-right space-y-2">
              <span className="text-[11px] font-black text-slate-800 block">
                🎯 ماذا تفعل بعد تحميل سيرتك الذاتية؟
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectTab && onSelectTab('local-jobs')}
                  className="p-2.5 rounded-lg bg-white border border-slate-300 hover:border-blue-500 text-slate-800 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>1. ادفع للشركات بنفسك عبر الإيميل ✉️</span>
                </button>
                <button
                  onClick={() => onSelectTab && onSelectTab('local-jobs')}
                  className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  <span>2. أو اطلب منا إرسال ملفك للـ HR 🚀</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

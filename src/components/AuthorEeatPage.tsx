import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Mail, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  FileCheck,
  Scale,
  Sparkles
} from 'lucide-react';

interface AuthorEeatPageProps {
  onBack?: () => void;
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
}

export const AuthorEeatPage: React.FC<AuthorEeatPageProps> = ({ onBack, onSelectTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-['Cairo',sans-serif] text-right">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>رجوع</span>
            </button>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>معايير الثقة والخبرة التحريرية (Google E-E-A-T Compliance 2026)</span>
          </span>
        </div>

        <button
          onClick={() => onSelectTab('why-mezdohub')}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold"
        >
          ميثاق الشفافية 🛡️
        </button>
      </div>

      {/* Hero Author Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/40 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-blue-600 to-indigo-500 border-2 border-white/20 flex items-center justify-center text-5xl shadow-2xl shrink-0">
            👨‍💼
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                طارق مزدوحي (Tariq Mezdouhi)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                المؤسس ورئيس التحرير
              </span>
            </div>
            <p className="text-sm text-blue-200">
              مستشار في الهجرة الدولية، التوجيه الأكاديمي، واقتصاد العمل الحر والحلول الرقمية بالمغرب
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>mezdou2027@gmail.com</span>
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>المغرب / طنجة الدولية</span>
              </span>
            </div>
          </div>
        </div>

        {/* Credentials and Impact */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">الخبرة العملية</div>
            <div className="text-base font-black text-white mt-0.5">+8 سنوات</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">المقالات والأدلة</div>
            <div className="text-base font-black text-white mt-0.5">+45 دليلاً رسمياً</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">المصادر المعتمدة</div>
            <div className="text-base font-black text-emerald-400 mt-0.5">100% حكومية</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-slate-300">الاستشارات المجانية</div>
            <div className="text-base font-black text-amber-300 mt-0.5">صفر درهم عمولة</div>
          </div>
        </div>
      </div>

      {/* Editorial Mission & Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Box 1: Editorial Standards */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>ميثاق التحرير والتدقيق (Editorial Policy):</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>التدقيق المباشر:</strong> كل مقال ودليل يتم تدقيقه بمقارنته مع الجريدة الرسمية وبوابات الهجرة الحكومية الرسمية فقط.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>التحديث الدوري المستمر:</strong> تخضع شروط الهجرة ومبالغ الحسابات البنكية للمراجعة الشهرية الدقيقة لمواكبة التغييرات القانونية.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>محاربة التضليل والوسطاء:</strong> لا نقبل أي وساطة مالية، ونحذر دائماً من سماسرة عقود العمل والتأشيرات غير المرخصة.</span>
            </div>
          </div>
        </div>

        {/* Box 2: Official Sources Citations */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <span>البوابات الحكومية المعتمدة في تحرير المحتوى:</span>
          </h2>
          <div className="space-y-2.5 text-xs">
            {[
              { name: 'IRCC Canada – وزارة الهجرة واللجوء والمواطنة الكندية', url: 'https://www.canada.ca' },
              { name: 'Make it in Germany – البوابة الرسمية للحكومة الألمانية للعمالة المتخصصة', url: 'https://www.make-it-in-germany.com' },
              { name: 'ADII – إدارة الجمارك والضرائب غير المباشرة بالمملكة المغربية', url: 'https://www.douane.gov.ma' },
              { name: 'Emploi-Public.ma – بوابة التشغيل والوظيفة العمومية بالمغرب', url: 'https://www.emploi-public.ma' },
              { name: 'France-Visas – البوابة الرسمية للتأشيرات بالجمهورية الفرنسية', url: 'https://france-visas.gouv.fr' }
            ].map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors font-medium"
              >
                <span className="line-clamp-1">{src.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mr-2" />
              </a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

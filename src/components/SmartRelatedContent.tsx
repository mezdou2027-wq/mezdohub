import React from 'react';
import { Sparkles, ArrowLeft, Layers, Wrench, FileText } from 'lucide-react';
import { CONTENT_HUB_ARTICLES } from '../data/contentHubArticles';

interface SmartRelatedContentProps {
  currentContext: string;
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  title?: string;
}

export const SmartRelatedContent: React.FC<SmartRelatedContentProps> = ({ 
  currentContext, 
  onSelectTab,
  title = 'أدوات ومقالات ذكية مقترحة ذات صلة'
}) => {
  // Related tools based on context
  const getRelatedTools = () => {
    switch (currentContext) {
      case 'immigration':
      case 'migration':
      case 'pillar-seo':
        return [
          { tab: 'ai-assistant', subTab: undefined, title: 'المساعد الذكي لفحص أهلية الهجرة 🤖', desc: 'مطابقة فورية مع 18 برنامجاً معتمداً' },
          { tab: 'cv-builder', subTab: undefined, title: 'صانع السيرة الذاتية الكندية والأوروبية ATS 📄', desc: 'متوافق 100% مع أنظمة الفرز الآلي' },
          { tab: 'dv-lottery', subTab: undefined, title: 'فاحص صورة اللوتري الأمريكي 600x600 📸', desc: 'تأكد من مطابقة المعايير وتفادي الرفض' }
        ];
      case 'freelance-money':
      case 'side-hustles':
      case 'customs':
        return [
          { tab: 'freelance-money', subTab: 'paypal', title: 'حاسبة بايبال المغربية واقتطاعات CIH 💳', desc: 'حساب الصافي بالدرهم المغربي' },
          { tab: 'freelance-money', subTab: 'auto-entrepreneur', title: 'محاكي المقاول الذاتي والضرائب 🧾', desc: 'احتساب ضريبة 1% وفواتير معفاة من TVA' },
          { tab: 'local-jobs', subTab: 'salary-calc', title: 'حاسبة الراتب الصافي بالمغرب 🧮', desc: 'اقتطاعات الضريبة على الدخل IGR و CNSS' }
        ];
      default:
        return [
          { tab: 'content-hub', subTab: undefined, title: 'أدلة الجمارك والطرود (AliExpress & Temu) 📦', desc: 'حساب الرسوم الجمركية والطرود المعفاة' },
          { tab: 'study-abroad', subTab: 'scholarships', title: 'دليل المنح الدراسية الأوروبية الممولة 🎓', desc: 'رومانيا، المجر، وإيطاليا DSU' },
          { tab: 'shorts', subTab: undefined, title: 'فيديوهات 30 ثانية المركزة 🎬', desc: 'زبدة الفرص في ثوانٍ معدودة' }
        ];
    }
  };

  const relatedTools = getRelatedTools();
  const relatedArticles = CONTENT_HUB_ARTICLES.slice(0, 2);

  return (
    <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-6 text-right font-['Cairo',sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>نظام الربط الداخلي الذكي (Smart Internal Linking)</span>
          </span>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {title}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          روابط مباشرة لتسريع الإنجاز ⚡
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool, idx) => (
          <div
            key={idx}
            onClick={() => onSelectTab(tool.tab, tool.subTab)}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all cursor-pointer shadow-2xs space-y-2 group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                أداة تفاعلية 🛠️
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {tool.desc}
              </p>
            </div>

            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>استخدم الأداة الآن</span>
              <ArrowLeft className="w-3 h-3 group-hover:translate-x-[-3px] transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

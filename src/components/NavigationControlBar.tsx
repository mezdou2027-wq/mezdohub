import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Layers, 
  X,
  FileText,
  Plane,
  GraduationCap,
  Globe,
  Coins,
  Briefcase,
  Bot,
  User,
  ShieldCheck,
  Video,
  Calculator,
  Camera,
  CheckCircle2
} from 'lucide-react';

export interface BreadcrumbItem {
  id: string;
  label: string;
  tab: string;
  subTab?: string;
}

interface NavigationControlBarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onGoHome: () => void;
  currentTitle: string;
  previousTitle?: string;
  nextTitle?: string;
  activeTab: string;
  onSelectTab: (tab: string, subTab?: string, id?: string) => void;
  breadcrumbs: BreadcrumbItem[];
}

// Static Quick Sections Directory hoisted outside component to prevent re-allocations
const ALL_SECTIONS = [
  {
    categoryAr: '🌟 فضاء المرشح والمساعد الذكي',
    categoryFr: 'Espace Candidat & IA',
    items: [
      { id: 'dashboard', label: 'حسابي ومفضلتي 🌟', desc: 'حفظ الفرص وتتبع ملفات التقديم', icon: User },
      { id: 'ai-assistant', label: 'المساعد الذكي للهجرة 🤖', desc: 'تشخيص الملف ومطابقة 18 برنامجاً دولياً', icon: Bot },
      { id: 'shorts', label: 'فيديوهات 30 ثانية ⚡', desc: 'شروحات مركزة لـ TikTok و Reels', icon: Video },
      { id: 'why-mezdohub', label: 'ميثاق الثقة (لماذا MezdoHub) 🛡️', desc: 'مصادر حكومية 100% وصفر عمولة', icon: ShieldCheck },
    ]
  },
  {
    categoryAr: '✈️ الهجرة الدولية والدراسة بالخارج',
    categoryFr: 'Immigration & Bourses',
    items: [
      { id: 'pillar-seo', subTab: 'canada-immigration', label: 'الأدلة المرجعية 2026 🏛️', desc: 'كندا، ألمانيا، أستراليا، والدراسة', icon: FileText },
      { id: 'migration', label: 'الهجرة القانونية إلى 7 دول ✈️', desc: 'شروط الإقامة الدائمة وتكاليف المعيشة', icon: Plane },
      { id: 'study-abroad', subTab: 'scholarships', label: 'المنح الدراسية الممولة 🎓', desc: 'تركيا، DAAD، المجر، رومانيا، إيراسموس', icon: GraduationCap },
      { id: 'study-abroad', subTab: 'universities', label: 'قاعدة بيانات الجامعات 🏫', desc: 'جامعات مجانية ورسوم منخفضة', icon: Globe },
      { id: 'global-jobs', subTab: 'aggregator', label: 'مجمّع الوظائف الدولية 💼', desc: 'EURES و Job Bank و Make it in Germany', icon: Briefcase },
      { id: 'global-jobs', subTab: 'seasonal', label: 'عقود العمل الموسمية 🌾', desc: 'إسبانيا وفرنسا والفلاحة الأوروبية', icon: Layers },
    ]
  },
  {
    categoryAr: '🇲🇦 وظائف المغرب والعمل الحر والأدوات',
    categoryFr: 'Emploi Maroc & Outils',
    items: [
      { id: 'local-jobs', subTab: 'jobs', label: 'وظائف مصانع المغرب 🏭', desc: 'طنجة، القنيطرة، كازا والسيارات', icon: Briefcase },
      { id: 'local-jobs', subTab: 'concours', label: 'المباريات العمومية 2026 📢', desc: 'التعليم، الأمن، الجمارك، الوقاية والدرك', icon: FileText },
      { id: 'local-jobs', subTab: 'salary-calc', label: 'حاسبة الراتب الصافي 🧮', desc: 'احتساب Salaire Net واقتطاعات IGR', icon: Calculator },
      { id: 'local-jobs', subTab: 'demande-maker', label: 'مولد الطلب الخطي ✍️', desc: 'صيغ إدارية قانونية جاهزة للنسخ', icon: FileText },
      { id: 'cv-builder', label: 'صانع السيرة الذاتية ATS 📄', desc: 'تصدير PDF مجاني مطابق لروبوتات الفرز', icon: FileText },
      { id: 'freelance-money', subTab: 'paypal', label: 'حاسبة سحب PayPal 💳', desc: 'عمولات CIH والتجاري وهامش الصرف', icon: Coins },
      { id: 'freelance-money', subTab: 'auto-entrepreneur', label: 'محاكي المقاول الذاتي 🧾', desc: 'ضريبة 1% و 2% وفواتير بدون TVA', icon: Coins },
      { id: 'side-hustles', label: 'الوظائف الجانبية والربح الرقمي 💡', desc: 'Canva و Etsy والعمل الحر', icon: Coins },
      { id: 'lifemap-arab', label: 'بوصلة LifeMap Arab 🧭', desc: 'تشخيص ميولك ونقاط قوتك المهنية', icon: Compass },
      { id: 'dv-lottery', label: 'فاحص صورة قرعة أمريكا 📸', desc: 'فحص بيومتري 600x600 px قبل التسجيل', icon: Camera },
    ]
  },
  {
    categoryAr: '🛡️ مركز المحتوى، فحص AdSense، وميثاق E-E-A-T',
    categoryFr: 'Qualité & Audit',
    items: [
      { id: 'content-hub', label: 'مركز المقالات والجمارك 📦', desc: 'AliExpress و Temu وإسبانيا وألمانيا', icon: FileText },
      { id: 'audit-health', label: 'فحص AdSense و SEO التقني 🛡️', desc: 'فحص ملفات robots و sitemap و Core Web Vitals', icon: ShieldCheck },
      { id: 'author-eeat', label: 'ملف الكاتب وميثاق E-E-A-T 🏛️', desc: 'الخبرة الميدانية والمصادر الحكومية المعتمدة', icon: User },
    ]
  }
];

export const NavigationControlBar: React.FC<NavigationControlBarProps> = ({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onGoHome,
  currentTitle,
  previousTitle,
  nextTitle,
  activeTab,
  onSelectTab,
  breadcrumbs
}) => {
  const { lang } = useTheme();
  const isAr = lang === 'ar';
  const [isSectionsMenuOpen, setIsSectionsMenuOpen] = useState(false);

  return (
    <>
      <nav 
        aria-label="مسار التصفح وأزرار التنقل" 
        className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 sm:p-3 mb-6 shadow-2xs backdrop-blur-sm transition-all"
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          
          {/* 1. Back and Forward Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            
            {/* Back Button (السابق / رجوع) */}
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              title={canGoBack ? (previousTitle ? `الرجوع إلى: ${previousTitle}` : 'الرجوع إلى الصفحة السابقة') : 'لا توجد صفحة سابقة'}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer select-none active:scale-95 ${
                canGoBack
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-200/70 dark:bg-slate-800/60 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
              }`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>{isAr ? 'رجوع' : 'Retour'}</span>
              {canGoBack && previousTitle && (
                <span className="hidden md:inline-block max-w-[110px] truncate text-[10px] opacity-85 font-medium border-r border-white/20 pr-1.5 mr-0.5">
                  {previousTitle}
                </span>
              )}
            </button>

            {/* Forward Button (التالي / تقدم) */}
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              title={canGoForward ? (nextTitle ? `التقدم إلى: ${nextTitle}` : 'التقدم إلى الصفحة التالية') : 'لا توجد صفحة تالية'}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer select-none active:scale-95 ${
                canGoForward
                  ? 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white shadow-xs'
                  : 'bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <span>{isAr ? 'تقدم' : 'Suivant'}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
              {canGoForward && nextTitle && (
                <span className="hidden md:inline-block max-w-[110px] truncate text-[10px] text-slate-500 border-l border-slate-300 dark:border-slate-700 pl-1.5 ml-0.5">
                  {nextTitle}
                </span>
              )}
            </button>

            {/* Home Quick Button */}
            <button
              onClick={onGoHome}
              title="العودة إلى الصفحة الرئيسية مباشرة"
              className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
            </button>

          </div>

          {/* 2. Interactive Breadcrumbs Trail (مسار التصفح) */}
          <div className="flex-1 flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar min-w-[180px] py-0.5 px-1">
            <button
              onClick={onGoHome}
              className={`hover:text-blue-600 font-bold transition-colors shrink-0 ${
                activeTab === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {isAr ? 'الرئيسية' : 'Accueil'}
            </button>

            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id || idx}>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <button
                  onClick={() => onSelectTab(crumb.tab, crumb.subTab)}
                  className={`hover:text-blue-600 font-bold transition-colors shrink-0 max-w-[180px] sm:max-w-xs truncate ${
                    idx === breadcrumbs.length - 1
                      ? 'text-slate-900 dark:text-white font-black'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* 3. All Sections Quick Drawer Launcher */}
          <div className="shrink-0">
            <button
              onClick={() => setIsSectionsMenuOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>{isAr ? 'فهرس الأقسام' : 'Toutes les rubriques'}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FULL SECTIONS DIRECTORY DRAWER (فهرس الأقسام والخدمات الكامل)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isSectionsMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end animate-fade-in">
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-900 h-full overflow-y-auto p-5 sm:p-6 space-y-6 shadow-2xl border-r border-slate-200 dark:border-slate-800 text-right animate-slide-left font-['Cairo',sans-serif]"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                  M
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {isAr ? 'فهرس أقسام وخدمات MezdoHub' : 'Toutes les rubriques MezdoHub'}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    {isAr ? 'انقر على أي قسم للانتقال الفوري إليه' : 'Accès rapide à tous les outils'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSectionsMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Home link */}
            <button
              onClick={() => {
                onGoHome();
                setIsSectionsMenuOpen(false);
              }}
              className="w-full p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 font-black text-xs flex items-center justify-between hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-blue-600" />
                <span>العودة إلى الصفحة الرئيسية 🏠</span>
              </div>
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Categorized Sections */}
            <div className="space-y-6">
              {ALL_SECTIONS.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
                    {isAr ? group.categoryAr : group.categoryFr}
                  </h4>

                  <div className="space-y-1.5">
                    {group.items.map((item, itemIdx) => {
                      const Icon = item.icon;
                      const isCurrent = activeTab === item.id;
                      return (
                        <button
                          key={itemIdx}
                          onClick={() => {
                            onSelectTab(item.id, item.subTab);
                            setIsSectionsMenuOpen(false);
                          }}
                          className={`w-full p-2.5 rounded-xl border text-right transition-all flex items-start gap-2.5 cursor-pointer ${
                            isCurrent
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                            isCurrent ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-800 text-blue-600 border border-slate-200 dark:border-slate-700'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-xs truncate">
                              {item.label}
                            </span>
                            <span className={`block text-[10px] truncate mt-0.5 ${
                              isCurrent ? 'text-blue-100' : 'text-slate-400'
                            }`}>
                              {item.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

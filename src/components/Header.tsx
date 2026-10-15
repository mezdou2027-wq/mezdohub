import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  FileText, 
  Compass, 
  Sun, 
  Moon, 
  Globe, 
  Briefcase, 
  GraduationCap,
  Sparkles,
  Coins,
  LogIn, 
  LogOut,
  Plane,
  Bot,
  User,
  ShieldCheck,
  Video,
  ArrowRight,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string, subTab?: string, id?: string) => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenAuth,
  canGoBack = false,
  canGoForward = false,
  onGoBack,
  onGoForward
}) => {
  const { isDarkMode, toggleTheme, lang, toggleLang } = useTheme();
  const { user, signOut } = useAuth();
  const isAr = lang === 'ar';

  const navItems = [
    { id: 'home', labelAr: 'الرئيسية', labelFr: 'Accueil', icon: Compass },
    { id: 'dashboard', labelAr: 'حسابي ومفضلتي 🌟', labelFr: 'Mon Espace', icon: User },
    { id: 'content-hub', labelAr: 'المقالات والجمارك 📚', labelFr: 'Guides & Douane', icon: BookOpen },
    { id: 'ai-assistant', labelAr: 'المساعد الذكي 🤖', labelFr: 'Assistant IA', icon: Bot },
    { id: 'pillar-seo', labelAr: 'الأدلة المرجعية 2026', labelFr: 'Guides 2026', icon: FileText },
    { id: 'migration', labelAr: 'الهجرة الدولية', labelFr: 'Immigration', icon: Plane },
    { id: 'study-abroad', labelAr: 'الدراسة والمنح', labelFr: 'Bourses & Études', icon: GraduationCap },
    { id: 'global-jobs', labelAr: 'مجمّع الوظائف 💼', labelFr: 'Job Aggregator', icon: Globe },
    { id: 'shorts', labelAr: 'فيديوهات 30 ثانية ⚡', labelFr: 'Shorts 30s', icon: Video },
    { id: 'why-mezdohub', labelAr: 'لماذا MezdoHub؟ 🛡️', labelFr: 'Pourquoi MezdoHub', icon: ShieldCheck },
    { id: 'side-hustles', labelAr: 'وظائف جانبية', labelFr: 'Side Hustles', icon: Coins },
    { id: 'local-jobs', labelAr: 'وظائف المغرب', labelFr: 'Emploi Maroc', icon: Briefcase },
    { id: 'cv-builder', labelAr: 'السيرة الذاتية ATS', labelFr: 'CV ATS', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 border-b transition-colors bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-2xs">
      
      {/* 1. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Section with Strengthened Visual Identity */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Custom Emblem */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <span className="font-mono tracking-tighter">M</span>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[9px] flex items-center justify-center border-2 border-white dark:border-[#0A0F1D]">
                ★
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  Mezdo<span className="text-blue-600 dark:text-blue-400">Hub</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hidden sm:inline">
                  PRO
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                {isAr ? 'منصة الفرص الدولية للمغاربة 🇲🇦' : 'Portail d\'Opportunités Internationales'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isAr ? item.labelAr : item.labelFr}</span>
                </button>
              );
            })}
          </nav>

          {/* In-Header Navigation Step Controls (Active when history exists) */}
          {(canGoBack || canGoForward) && (
            <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 dark:bg-slate-850 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
              {canGoBack && (
                <button
                  onClick={onGoBack}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
                  title="الرجوع للصفحة السابقة"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-black">{isAr ? 'رجوع' : 'Retour'}</span>
                </button>
              )}
              {canGoForward && (
                <button
                  onClick={onGoForward}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer"
                  title="التقدم للأمام"
                >
                  <span className="text-[11px] font-black">{isAr ? 'تقدم' : 'Avancer'}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Right Action Controls: Lang Switcher, Theme Toggle, CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Bilingual Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 transition-colors cursor-pointer"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'ar' ? 'FR' : 'العربية'}</span>
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title={isDarkMode ? 'التحويل للمظهر الفاتح' : 'التحويل للمظهر الليلي'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Authentication Status / User Profile Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`hidden md:flex flex-col text-right px-2.5 py-1 rounded-xl transition-all border ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent'
                  }`}
                  title="الانتقال للوحة حسابي ومفضلتي"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                    {user.fullName}
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                    لوحة حسابي ومفضلتي ⭐
                  </span>
                </button>

                {user.role === 'admin' && (
                  <button
                    onClick={() => setActiveTab('owner-crm')}
                    className={`hidden sm:inline-flex px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      activeTab === 'owner-crm'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{isAr ? 'لوحة الإدارة' : 'Admin'}</span>
                  </button>
                )}

                <button
                  onClick={signOut}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth?.('signin')}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-blue-600 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-600" />
                <span>{isAr ? 'دخول' : 'Connexion'}</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => setActiveTab('cv-builder')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isAr ? 'أنشئ CV ATS' : 'Créer un CV'}</span>
            </button>

          </div>

        </div>

        {/* Mobile Horizontal Navigation Tabs */}
        <div className="xl:hidden flex items-center overflow-x-auto py-2.5 gap-2 border-t border-slate-200 dark:border-slate-800 no-scrollbar">
          {/* Mobile Step Back Shortcut */}
          {canGoBack && (
            <button
              onClick={onGoBack}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 shrink-0 bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-95"
              title="الرجوع للخطوة السابقة"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>{isAr ? 'رجوع للخلف' : 'Retour'}</span>
            </button>
          )}
          {canGoForward && (
            <button
              onClick={onGoForward}
              className="whitespace-nowrap px-2.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1 shrink-0 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs active:scale-95"
              title="التقدم للأمام"
            >
              <span>{isAr ? 'تقدم' : 'Avancer'}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
          {navItems.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? tab.labelAr : tab.labelFr}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};

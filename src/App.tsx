// Cloudflare deployment sync: 2026-10-15T14:21:47.716Z
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NavigationControlBar, BreadcrumbItem } from './components/NavigationControlBar';
import { MezdoHomePortal } from './components/MezdoHomePortal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { trackPageView } from './services/analytics';

// 🚀 High-Performance Lazy Loading for Sub-Hubs & Heavy Tools
// Shrinks the initial bundle by ~75% and loads pages on-demand instantly
const LocalNicheJobsHub = lazy(() => import('./components/LocalNicheJobsHub').then(m => ({ default: m.LocalNicheJobsHub })));
const MigrationHub = lazy(() => import('./components/MigrationHub').then(m => ({ default: m.MigrationHub })));
const StudyAbroadHub = lazy(() => import('./components/StudyAbroadHub').then(m => ({ default: m.StudyAbroadHub })));
const GlobalJobsHub = lazy(() => import('./components/GlobalJobsHub').then(m => ({ default: m.GlobalJobsHub })));
const SideHustlesHub = lazy(() => import('./components/SideHustlesHub').then(m => ({ default: m.SideHustlesHub })));
const FreelanceFinanceHub = lazy(() => import('./components/FreelanceFinanceHub').then(m => ({ default: m.FreelanceFinanceHub })));
const MoroccanCvAndMotivationBuilder = lazy(() => import('./components/MoroccanCvAndMotivationBuilder').then(m => ({ default: m.MoroccanCvAndMotivationBuilder })));
const LifeMapArab = lazy(() => import('./components/LifeMapArab').then(m => ({ default: m.LifeMapArab })));
const DvLotteryHub = lazy(() => import('./components/DvLotteryHub').then(m => ({ default: m.DvLotteryHub })));
const LaunchPartnersHub = lazy(() => import('./components/LaunchPartnersHub').then(m => ({ default: m.LaunchPartnersHub })));
const OwnerAdminPortal = lazy(() => import('./components/OwnerAdminPortal').then(m => ({ default: m.OwnerAdminPortal })));
const LegalPoliciesModal = lazy(() => import('./components/LegalPoliciesModal').then(m => ({ default: m.LegalPoliciesModal })));
const PillarSeoHub = lazy(() => import('./components/PillarSeoHub').then(m => ({ default: m.PillarSeoHub })));
const AiImmigrationAssistant = lazy(() => import('./components/AiImmigrationAssistant').then(m => ({ default: m.AiImmigrationAssistant })));
const UserDashboard = lazy(() => import('./components/UserDashboard').then(m => ({ default: m.UserDashboard })));
const WhyMezdoHub = lazy(() => import('./components/WhyMezdoHub').then(m => ({ default: m.WhyMezdoHub })));
const ShortVideosHub = lazy(() => import('./components/ShortVideosHub').then(m => ({ default: m.ShortVideosHub })));
const ContentHub = lazy(() => import('./components/ContentHub').then(m => ({ default: m.ContentHub })));
const SeoAdSenseHealthHub = lazy(() => import('./components/SeoAdSenseHealthHub').then(m => ({ default: m.SeoAdSenseHealthHub })));
const AuthorEeatPage = lazy(() => import('./components/AuthorEeatPage').then(m => ({ default: m.AuthorEeatPage })));
const AuthModal = lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const LeadMagnetModal = lazy(() => import('./components/LeadMagnetModal').then(m => ({ default: m.LeadMagnetModal })));
const WeeklyNewsletterModal = lazy(() => import('./components/WeeklyNewsletterModal').then(m => ({ default: m.WeeklyNewsletterModal })));

import { resolveCurrentRoute, syncCleanUrl } from './services/router';

export interface HistoryEntry {
  tab: string;
  subTab?: string;
  id?: string;
}

const TAB_TITLES: Record<string, { ar: string; fr: string }> = {
  home: { ar: 'الرئيسية', fr: 'Accueil' },
  dashboard: { ar: 'حسابي ومفضلتي 🌟', fr: 'Mon Espace' },
  'user-dashboard': { ar: 'حسابي ومفضلتي 🌟', fr: 'Mon Espace' },
  'content-hub': { ar: 'مركز المحتوى التخصصي 📚', fr: 'Content Hub' },
  'audit-health': { ar: 'فحص AdSense ومؤشرات Google 🛡️', fr: 'AdSense Audit' },
  'health-audit': { ar: 'فحص AdSense ومؤشرات Google 🛡️', fr: 'AdSense Audit' },
  'author-eeat': { ar: 'ملف الكاتب و E-E-A-T 🏛️', fr: 'E-E-A-T Author' },
  'ai-assistant': { ar: 'المساعد الذكي 🤖', fr: 'Assistant IA' },
  'ai-immigration': { ar: 'المساعد الذكي 🤖', fr: 'Assistant IA' },
  'pillar-seo': { ar: 'الأدلة المرجعية 2026 🏛️', fr: 'Guides 2026' },
  migration: { ar: 'الهجرة الدولية ✈️', fr: 'Immigration' },
  'study-abroad': { ar: 'الدراسة والمنح 🎓', fr: 'Bourses & Études' },
  'global-jobs': { ar: 'مجمّع الوظائف 💼', fr: 'Job Aggregator' },
  shorts: { ar: 'فيديوهات 30 ثانية ⚡', fr: 'Shorts 30s' },
  'why-mezdohub': { ar: 'لماذا MezdoHub؟ 🛡️', fr: 'Pourquoi MezdoHub' },
  'side-hustles': { ar: 'وظائف جانبية 💡', fr: 'Side Hustles' },
  'local-jobs': { ar: 'وظائف المغرب 🏭', fr: 'Emploi Maroc' },
  'cv-builder': { ar: 'السيرة الذاتية ATS 📄', fr: 'CV ATS' },
  'freelance-money': { ar: 'حاسبات العمل الحر 💳', fr: 'Finance Freelance' },
  'lifemap-arab': { ar: 'بوصلة LifeMap Arab 🧭', fr: 'LifeMap' },
  'dv-lottery': { ar: 'فاحص صورة قرعة أمريكا 📸', fr: 'DV Lottery' },
  partners: { ar: 'شركاء الإطلاق 🤝', fr: 'Partenaires' },
  'owner-crm': { ar: 'لوحة الإدارة والمشرف 👑', fr: 'Admin CRM' },
  legal: { ar: 'السياسات والشروط القانونية 📜', fr: 'Mentions Légales' },
};

const SUB_TAB_TITLES: Record<string, string> = {
  'canada-immigration': 'دليل كندا الشامل',
  'germany-opportunity-card': 'بطاقة الفرصة الألمانية',
  'european-scholarships': 'المنح الأوروبية الممولة',
  'remote-work-morocco': 'العمل الحر عن بعد بالدولار',
  universities: 'دليل الجامعات الدولية',
  scholarships: 'دليل المنح الدراسية',
  fulltime: 'عقود عمل دائمة ورعاية',
  seasonal: 'عقود العمل الموسمي الفلاحي',
  remote: 'وظائف تقنية عن بعد',
  concours: 'مباريات الوظيفة العمومية',
  industry: 'مصانع المناطق الحرة بالمغرب',
  salary: 'حاسبة الراتب الصافي',
  paypal: 'حاسبة بايبال المغربية',
  'auto-entrepreneur': 'حاسبة المقاول الذاتي',
  privacy: 'سياسة الخصوصية',
  terms: 'شروط الاستخدام',
  disclaimer: 'إخلاء المسؤولية',
  cookies: 'ملفات تعريف الارتباط',
};

// Ultralight Fast Suspense Fallback
const FastTabLoader: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4 animate-fade-in font-['Cairo',sans-serif]">
    <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
    <span className="text-xs text-slate-500 font-bold block">جارٍ تحميل القسم بسرعة فائقة...</span>
  </div>
);

export function App() {
  const { lang } = useTheme();

  // Navigation History Stack (Resolved from clean pathname e.g. /guide/..., /tool/... or fallback query params)
  const [historyStack, setHistoryStack] = useState<HistoryEntry[]>(() => {
    try {
      const initial = resolveCurrentRoute();
      // Clean up address bar on mount if opened with legacy query params
      syncCleanUrl(initial, false);
      return [initial];
    } catch {
      return [{ tab: 'home' }];
    }
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Active view resolved from history stack
  const currentEntry = historyStack[currentIndex] || { tab: 'home' };
  const activeTab = currentEntry.tab;
  const activeSubTab = currentEntry.subTab;
  const activeId = currentEntry.id;

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [leadMagnetTarget, setLeadMagnetTarget] = useState<string>('كندا');
  const [legalSubTab, setLegalSubTab] = useState<'privacy' | 'terms' | 'disclaimer' | 'cookies'>('privacy');
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < historyStack.length - 1;

  // Sync state with clean URL path without page reloading
  const updateUrl = (tab: string, subTab?: string, id?: string, push = true) => {
    try {
      syncCleanUrl({ tab, subTab, id }, push);
    } catch {}
  };

  // Navigate to tab
  const handleSelectTab = (tab: string, subTab?: string, id?: string) => {
    // If selecting the exact current view, don't push duplicate
    if (activeTab === tab && activeSubTab === subTab && activeId === id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const newEntry: HistoryEntry = { tab, subTab, id };
    const newStack = [...historyStack.slice(0, currentIndex + 1), newEntry];
    setHistoryStack(newStack);
    setCurrentIndex(newStack.length - 1);
    updateUrl(tab, subTab, id, true);
    trackPageView(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go Back 
  const handleGoBack = () => {
    if (canGoBack) {
      const newIdx = currentIndex - 1;
      setCurrentIndex(newIdx);
      const prev = historyStack[newIdx];
      updateUrl(prev.tab, prev.subTab, prev.id, false);
      trackPageView(prev.tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSelectTab('home');
    }
  };

  // Go Forward
  const handleGoForward = () => {
    if (canGoForward) {
      const newIdx = currentIndex + 1;
      setCurrentIndex(newIdx);
      const next = historyStack[newIdx];
      updateUrl(next.tab, next.subTab, next.id, false);
      trackPageView(next.tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync with browser native Back & Forward gestures (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      try {
        const state = event.state as HistoryEntry | null;
        const resolved = state && state.tab ? state : resolveCurrentRoute();
        const tab = resolved.tab || 'home';
        const subTab = resolved.subTab;
        const id = resolved.id;

        if (currentIndex > 0 && historyStack[currentIndex - 1]?.tab === tab) {
          setCurrentIndex(currentIndex - 1);
        } else if (currentIndex < historyStack.length - 1 && historyStack[currentIndex + 1]?.tab === tab) {
          setCurrentIndex(currentIndex + 1);
        } else {
          const newEntry: HistoryEntry = { tab, subTab, id };
          setHistoryStack(prev => [...prev.slice(0, currentIndex + 1), newEntry]);
          setCurrentIndex(prev => prev + 1);
        }
        trackPageView(tab);
      } catch {}
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentIndex, historyStack]);

  // Compute breadcrumbs trail
  const breadcrumbs: BreadcrumbItem[] = [];
  if (activeTab !== 'home') {
    const tabInfo = TAB_TITLES[activeTab] || { ar: activeTab, fr: activeTab };
    breadcrumbs.push({
      id: activeTab,
      label: tabInfo.ar,
      tab: activeTab
    });
    if (activeSubTab && SUB_TAB_TITLES[activeSubTab]) {
      breadcrumbs.push({
        id: `${activeTab}-${activeSubTab}`,
        label: SUB_TAB_TITLES[activeSubTab],
        tab: activeTab,
        subTab: activeSubTab
      });
    }
  }

  const previousTitle = canGoBack ? TAB_TITLES[historyStack[currentIndex - 1]?.tab]?.ar : undefined;
  const nextTitle = canGoForward ? TAB_TITLES[historyStack[currentIndex + 1]?.tab]?.ar : undefined;
  const currentTitle = TAB_TITLES[activeTab]?.ar || 'الرئيسية';

  return (
    <div className="min-h-screen flex flex-col font-['Cairo',sans-serif] bg-[#FFFFFF] dark:bg-[#060a14] text-[#0F172A] dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* Universal Sticky Header with integrated back/forward controls */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(t) => handleSelectTab(t)}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode || 'signin');
          setIsAuthModalOpen(true);
        }}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
      />

      {/* Floating In-App Navigation Control Bar */}
      <NavigationControlBar
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onGoHome={() => handleSelectTab('home')}
        breadcrumbs={breadcrumbs}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        previousTitle={previousTitle}
        nextTitle={nextTitle}
        currentTitle={currentTitle}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        
        {/* 1. Primary Authority Home & Conversion Portal (Loaded Synchronously for Maximum Speed) */}
        {activeTab === 'home' && (
          <MezdoHomePortal 
            onSelectTab={handleSelectTab} 
            onOpenLeadMagnet={() => {
              setLeadMagnetTarget('كندا');
              setIsLeadMagnetOpen(true);
            }} 
          />
        )}

        {/* 🚀 On-Demand Lazy Loaded Hubs Wrapped in Suspense */}
        <Suspense fallback={<FastTabLoader />}>
          
          {/* 2. Global Migration & Country Pillars */}
          {activeTab === 'migration' && (
            <MigrationHub 
              onBack={handleGoBack} 
              onSelectTab={handleSelectTab}
              initialMainTab={activeSubTab as any}
              initialCountry={activeId}
            />
          )}

          {/* 3. Study Abroad & Fully-Funded Scholarships */}
          {activeTab === 'study-abroad' && (
            <StudyAbroadHub 
              onBack={handleGoBack} 
              onSelectTab={handleSelectTab}
              initialSubTab={activeSubTab as any}
            />
          )}

          {/* 4. Global Employment, Seasonal Work & Job Aggregator */}
          {activeTab === 'global-jobs' && (
            <GlobalJobsHub 
              onBack={handleGoBack} 
              onSelectTab={handleSelectTab}
              initialJobType={activeSubTab as any}
            />
          )}

          {/* 5. Side Hustles, Digital Income & Freelance */}
          {activeTab === 'side-hustles' && (
            <SideHustlesHub 
              onBack={handleGoBack} 
              onSelectTab={handleSelectTab}
            />
          )}

          {/* 6. Morocco Industry Jobs & Public Concours */}
          {activeTab === 'local-jobs' && (
            <LocalNicheJobsHub 
              onBack={handleGoBack}
              onSelectTab={handleSelectTab} 
              initialSubTab={activeSubTab as any}
            />
          )}

          {/* 7. Freelance & Financial Calculators */}
          {activeTab === 'freelance-money' && (
            <FreelanceFinanceHub 
              onBack={handleGoBack}
              initialTab={activeSubTab as any}
            />
          )}

          {/* 8. Professional CV ATS & Motivation Letter Builder */}
          {activeTab === 'cv-builder' && (
            <MoroccanCvAndMotivationBuilder onSelectTab={handleSelectTab} />
          )}

          {/* 9. LifeMap Arab Diagnostic Compass */}
          {activeTab === 'lifemap-arab' && (
            <LifeMapArab onSelectTab={handleSelectTab} />
          )}

          {/* 10. Dedicated DV Lottery & 600x600 Biometric Photo Hub */}
          {activeTab === 'dv-lottery' && (
            <DvLotteryHub onBack={handleGoBack} />
          )}

          {/* 11. Launch Partners Hub */}
          {activeTab === 'partners' && (
            <LaunchPartnersHub onBack={handleGoBack} />
          )}

          {/* 12. Protected Owner Admin CRM Portal */}
          {activeTab === 'owner-crm' && (
            <ProtectedRoute 
              allowedRoles={['admin']}
              onOpenAuth={(mode) => {
                setAuthModalMode(mode || 'signin');
                setIsAuthModalOpen(true);
              }}
              fallbackTitle="لوحة الإدارة والـ CRM محمية بصلاحيات المشرف 👑"
              fallbackMessage="هذه الصفحة تحتوي على قاعدة بيانات سرية للمترشحين ومعلومات اتصال مباشرة. يرجى تسجيل الدخول بحساب مسؤول مصرح له للوصول."
            >
              <OwnerAdminPortal />
            </ProtectedRoute>
          )}

          {/* 13. Google AdSense Legal Compliance Pages */}
          {activeTab === 'legal' && (
            <LegalPoliciesModal 
              initialTab={legalSubTab} 
              onClose={handleGoBack} 
            />
          )}

          {/* 14. Mega Pillar SEO Authority Guides */}
          {activeTab === 'pillar-seo' && (
            <PillarSeoHub 
              onBack={handleGoBack}
              onSelectTab={handleSelectTab} 
              onOpenLeadMagnet={() => {
                setLeadMagnetTarget('كندا');
                setIsLeadMagnetOpen(true);
              }}
              initialPillarId={activeSubTab || activeId || 'canada-immigration'}
            />
          )}

          {/* 15. AI Immigration & Study Assistant */}
          {(activeTab === 'ai-assistant' || activeTab === 'ai-immigration') && (
            <AiImmigrationAssistant 
              onSelectTab={handleSelectTab} 
              onOpenLeadMagnet={() => {
                setLeadMagnetTarget('كندا');
                setIsLeadMagnetOpen(true);
              }}
            />
          )}

          {/* 16. Personal User Dashboard & Bookmarks Hub */}
          {activeTab === 'dashboard' && (
            <UserDashboard 
              onSelectTab={handleSelectTab}
              onOpenAiAssistant={() => handleSelectTab('ai-assistant')}
              onOpenNewsletterModal={() => setIsNewsletterOpen(true)}
            />
          )}

          {/* 17. Why MezdoHub - Extreme Trust & Transparency Charter */}
          {activeTab === 'why-mezdohub' && (
            <WhyMezdoHub 
              onSelectTab={handleSelectTab}
              onOpenAiAssistant={() => handleSelectTab('ai-assistant')}
            />
          )}

          {/* 18. Short Videos Blueprint (TikTok / Reels / Shorts 30s) */}
          {activeTab === 'shorts' && (
            <ShortVideosHub 
              onBack={handleGoBack}
              onSelectTab={handleSelectTab}
              onOpenAiAssistant={() => handleSelectTab('ai-assistant')}
              initialVideoId={activeSubTab || activeId}
            />
          )}

          {/* 19. Specialized Content Hub (Customs, Spain, Germany, France, Portugal) */}
          {activeTab === 'content-hub' && (
            <ContentHub 
              onBack={handleGoBack}
              onSelectTab={handleSelectTab}
              initialArticleId={activeSubTab || activeId}
            />
          )}

          {/* 20. AdSense & SEO Technical Audit Health Dashboard */}
          {(activeTab === 'audit-health' || activeTab === 'health-audit') && (
            <SeoAdSenseHealthHub 
              onBack={handleGoBack}
              onSelectTab={handleSelectTab}
            />
          )}

          {/* 21. Author Profile & E-E-A-T Editorial Standards */}
          {activeTab === 'author-eeat' && (
            <AuthorEeatPage 
              onBack={handleGoBack}
              onSelectTab={handleSelectTab}
            />
          )}

        </Suspense>

      </main>

      {/* Global Authentication Modal (Lazy Loaded) */}
      <Suspense fallback={null}>
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            initialMode={authModalMode}
          />
        )}
      </Suspense>

      {/* Lead Magnet Free Comprehensive PDF Guide Modal (Lazy Loaded) */}
      <Suspense fallback={null}>
        {isLeadMagnetOpen && (
          <LeadMagnetModal
            isOpen={isLeadMagnetOpen}
            onClose={() => setIsLeadMagnetOpen(false)}
            defaultCountry={leadMagnetTarget}
          />
        )}
      </Suspense>

      {/* Weekly Newsletter Modal (Lazy Loaded) */}
      <Suspense fallback={null}>
        {isNewsletterOpen && (
          <WeeklyNewsletterModal
            isOpen={isNewsletterOpen}
            onClose={() => setIsNewsletterOpen(false)}
            onSelectTab={handleSelectTab}
          />
        )}
      </Suspense>

      {/* Footer with AdSense Compliance Links */}
      <Footer 
        onSelectTab={handleSelectTab} 
        onOpenLegal={(sub) => {
          setLegalSubTab(sub);
          handleSelectTab('legal');
        }} 
      />
    </div>
  );
}

export default App;

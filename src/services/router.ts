// Universal Clean URL Router for MezdoHub
// Replaces ugly query parameters (?tab=...&id=...) with real, clean SEO-friendly paths (/guide/..., /tool/...)
// Fully compatible with Googlebot, AdSense crawlers, and HTML5 History API.

export interface RouteEntry {
  tab: string;
  subTab?: string;
  id?: string;
}

// Clean Path Definition Map
export const CLEAN_ROUTES: { path: string; tab: string; subTab?: string; id?: string; titleAr: string }[] = [
  // Homepage
  { path: '/', tab: 'home', titleAr: 'الرئيسية – منصة الفرص الدولية للمغاربة' },
  // MezdoHub Compass Strategic Decision Engine (/compass/...)
  { path: '/compass', tab: 'compass', titleAr: 'بوابة بوصلة الفرص والقرار – محرك القرار المغربي والعربي 2026' },
  { path: '/compass/immigration', tab: 'compass', subTab: 'immigration', titleAr: 'بوصلة الهجرة الدولية – تقرير المسارات الأنسب' },
  { path: '/compass/study', tab: 'compass', subTab: 'study', titleAr: 'بوصلة الدراسة والمنح بالخارج – الترشيحات الأكاديمية' },
  { path: '/compass/jobs', tab: 'compass', subTab: 'jobs', titleAr: 'بوصلة التوظيف السريع – خطة الحصول على عمل' },
  { path: '/compass/career-shift', tab: 'compass', subTab: 'shift', titleAr: 'بوصلة التحول المهني ومضاعفة الدخل' },
  { path: '/compass/shift', tab: 'compass', subTab: 'shift', titleAr: 'بوصلة التحول المهني ومضاعفة الدخل' },
  { path: '/compass/side-hustle', tab: 'compass', subTab: 'side-hustle', titleAr: 'بوصلة الدخل الإضافي والمشاريع المصغرة' },
  { path: '/compass/side-income', tab: 'compass', subTab: 'side-hustle', titleAr: 'بوصلة الدخل الإضافي والمشاريع المصغرة' },

  // Deep Knowledge Guides & Articles (/guide/...)
  { path: '/guide/morocco-customs', tab: 'content-hub', id: 'morocco-customs-aliexpress-temu-shein', titleAr: 'دليل الجمارك المغربية على طرود AliExpress و Temu و Shein 2026' },
  { path: '/guide/spain-immigration', tab: 'content-hub', id: 'spain-immigration-work-arraigo-2026', titleAr: 'دليل الهجرة إلى إسبانيا والإقامة عبر الجذور Arraigo 2026' },
  { path: '/guide/germany-opportunity-card', tab: 'pillar-seo', subTab: 'germany-opportunity-card', titleAr: 'دليل بطاقة الفرصة الألمانية Chancenkarte والتكوين المهني' },
  { path: '/guide/germany-blocked-account', tab: 'content-hub', id: 'germany-blocked-account-chancenkarte-2026', titleAr: 'دراسة وعمل ألمانيا: الحساب المغلق (11,904€) وبطاقة الفرصة' },
  { path: '/guide/canada-immigration', tab: 'pillar-seo', subTab: 'canada-immigration', titleAr: 'دليل الهجرة إلى كندا الشامل 2026 (الدخول السريع والفرانكوفونية)' },
  { path: '/guide/european-scholarships', tab: 'pillar-seo', subTab: 'european-scholarships', titleAr: 'دليل المنح الدراسية الأوروبية الممولة 100% للطلبة المغاربة' },
  { path: '/guide/remote-work-morocco', tab: 'pillar-seo', subTab: 'remote-work-morocco', titleAr: 'دليل العمل الحر والربح الرقمي وقوانين الصرف بالمغرب' },
  { path: '/guide/france-talent-passport', tab: 'content-hub', id: 'france-talent-passport-work-visas-2026', titleAr: 'الهجرة إلى فرنسا: تأشيرة المواهب وعقود CDI ورخصة العمل' },
  { path: '/guide/portugal-d8-visa', tab: 'content-hub', id: 'portugal-digital-nomad-d8-visa-2026', titleAr: 'تأشيرة البدو الرقميين للبرتغال D8 والعمل عن بعد بالدولار' },
  { path: '/guides', tab: 'content-hub', titleAr: 'مركز الأدلة والمقالات التخصصية' },

  // Interactive Tools & Calculators (/tool/...)
  { path: '/tool/cv-builder', tab: 'cv-builder', titleAr: 'صانع السيرة الذاتية ورسائل التحفيز ATS Pro' },
  { path: '/tool/dv-lottery', tab: 'dv-lottery', titleAr: 'فاحص الصورة البيومترية للقرعة الأمريكية 600x600' },
  { path: '/dv-lottery', tab: 'dv-lottery', titleAr: 'القرعة الأمريكية الرسمية DV – فحص الصورة البيومترية وخدمة التسجيل' },
  { path: '/dv-registration', tab: 'dv-lottery', titleAr: 'خدمة تسجيل القرعة الأمريكية الرسمية وتدقيق الملف' },
  { path: '/lottery', tab: 'dv-lottery', titleAr: 'القرعة الأمريكية الرسمية DV' },
  { path: '/tool/paypal-calculator', tab: 'freelance-money', subTab: 'paypal', titleAr: 'حاسبة بايبال المغربية واقتطاعات السحب البنكي' },
  { path: '/tool/auto-entrepreneur', tab: 'freelance-money', subTab: 'auto-entrepreneur', titleAr: 'محاكي المقاول الذاتي والضرائب بالمغرب' },
  { path: '/tool/salary-calculator', tab: 'local-jobs', subTab: 'salary', titleAr: 'حاسبة الراتب الصافي واقتطاعات IGR و CNSS بالمغرب' },
  { path: '/tool/lifemap', tab: 'lifemap-arab', titleAr: 'بوصلة التوجيه وتحديد المسار المهني LifeMap' },
  { path: '/tool/study-abroad', tab: 'study-abroad', titleAr: 'دليل الجامعات الدولية والمنح الدراسية' },
  { path: '/tool/global-jobs', tab: 'global-jobs', titleAr: 'بوابة الوظائف الدولية وعقود العمل الرسمية' },
  { path: '/tool/local-jobs', tab: 'local-jobs', titleAr: 'بوابة وظائف المغرب ومولد المراسلات الإدارية' },
  { path: '/tools', tab: 'home', titleAr: 'دليل الأدوات والحاسبات التفاعلية' },

  // Media, Authority & E-E-A-T
  { path: '/shorts', tab: 'shorts', titleAr: 'ريلز وفيديوهات 30 ثانية للفرص الدولية' },
  { path: '/author', tab: 'author-eeat', titleAr: 'صفحة المؤلف وهيئة التحرير – ميثاق E-E-A-T' },
  { path: '/about', tab: 'why-mezdohub', titleAr: 'لماذا MezdoHub؟ ميثاق الشفافية ومصادر التمويل' },
  { path: '/dashboard', tab: 'user-dashboard', titleAr: 'لوحة تحكم المستخدم والعناصر المحفوظة' },
  { path: '/partners', tab: 'partners', titleAr: 'شركاء الإطلاق والرعاة المعتمدون' },
  { path: '/health-audit', tab: 'health-audit', titleAr: 'مركز تدقيق وفحص جاهزية Google AdSense و SEO' },
  { path: '/admin', tab: 'owner-crm', titleAr: 'لوحة الإدارة والتحكم CRM' },
  { path: '/ai-assistant', tab: 'ai-assistant', titleAr: 'المساعد الذكي للهجرة والتأشيرات' },

  // Legal & Compliance Pages
  { path: '/privacy', tab: 'legal', subTab: 'privacy', titleAr: 'سياسة الخصوصية وملفات تعريف الارتباط' },
  { path: '/terms', tab: 'legal', subTab: 'terms', titleAr: 'شروط وأحكام الاستخدام والنزاهة القانونية' },
  { path: '/disclaimer', tab: 'legal', subTab: 'disclaimer', titleAr: 'إخلاء المسؤولية القانونية والمصادر المعتمدة' }
];

/**
 * Resolves current window pathname & search into a clean RouteEntry
 */
export function resolveCurrentRoute(): RouteEntry {
  try {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    const search = window.location.search;
    const params = new URLSearchParams(search);

    // 1. Check direct clean path match first
    const directMatch = CLEAN_ROUTES.find(r => r.path === pathname);
    if (directMatch) {
      return { tab: directMatch.tab, subTab: directMatch.subTab, id: directMatch.id };
    }

    // 2. Check dynamic compass route: /compass or /compass/:type
    if (pathname === '/compass') {
      return { tab: 'compass' };
    }
    if (pathname.startsWith('/compass/')) {
      const type = pathname.replace('/compass/', '').toLowerCase();
      if (type === 'immigration') return { tab: 'compass', subTab: 'immigration' };
      if (type === 'study') return { tab: 'compass', subTab: 'study' };
      if (type === 'jobs' || type === 'job') return { tab: 'compass', subTab: 'jobs' };
      if (type === 'career-shift' || type === 'shift') return { tab: 'compass', subTab: 'shift' };
      if (type === 'side-hustle' || type === 'side-income') return { tab: 'compass', subTab: 'side-hustle' };
      return { tab: 'compass', subTab: type };
    }

    // 3. Check dynamic guide route: /guide/:slug
    if (pathname.startsWith('/guide/')) {
      const slug = pathname.replace('/guide/', '');
      // Match against known guide IDs
      if (slug === 'morocco-customs') return { tab: 'content-hub', id: 'morocco-customs-aliexpress-temu-shein' };
      if (slug === 'spain-immigration') return { tab: 'content-hub', id: 'spain-immigration-work-arraigo-2026' };
      if (slug === 'germany-opportunity-card') return { tab: 'pillar-seo', subTab: 'germany-opportunity-card' };
      if (slug === 'germany-blocked-account') return { tab: 'content-hub', id: 'germany-blocked-account-chancenkarte-2026' };
      if (slug === 'canada-immigration') return { tab: 'pillar-seo', subTab: 'canada-immigration' };
      if (slug === 'european-scholarships') return { tab: 'pillar-seo', subTab: 'european-scholarships' };
      if (slug === 'remote-work-morocco') return { tab: 'pillar-seo', subTab: 'remote-work-morocco' };
      if (slug === 'france-talent-passport') return { tab: 'content-hub', id: 'france-talent-passport-work-visas-2026' };
      if (slug === 'portugal-d8-visa') return { tab: 'content-hub', id: 'portugal-digital-nomad-d8-visa-2026' };
      return { tab: 'content-hub', id: slug };
    }

    // 3. Check dynamic tool route: /tool/:toolId
    if (pathname.startsWith('/tool/')) {
      const toolId = pathname.replace('/tool/', '');
      if (toolId === 'cv-builder') return { tab: 'cv-builder' };
      if (toolId === 'dv-lottery') return { tab: 'dv-lottery' };
      if (toolId === 'paypal-calculator' || toolId === 'paypal') return { tab: 'freelance-money', subTab: 'paypal' };
      if (toolId === 'auto-entrepreneur') return { tab: 'freelance-money', subTab: 'auto-entrepreneur' };
      if (toolId === 'salary-calculator' || toolId === 'salary') return { tab: 'local-jobs', subTab: 'salary' };
      if (toolId === 'lifemap') return { tab: 'lifemap-arab' };
      if (toolId === 'study-abroad') return { tab: 'study-abroad' };
      if (toolId === 'global-jobs') return { tab: 'global-jobs' };
      if (toolId === 'local-jobs') return { tab: 'local-jobs' };
      return { tab: toolId };
    }

    // 4. Backward Compatibility: query parameters (?tab=...&subTab=...&id=...)
    if (params.has('tab')) {
      const tab = params.get('tab') || 'home';
      const subTab = params.get('subTab') || undefined;
      const id = params.get('id') || undefined;
      return { tab, subTab, id };
    }

    return { tab: 'home' };
  } catch {
    return { tab: 'home' };
  }
}

/**
 * Converts a RouteEntry (tab, subTab, id) into a clean SEO URL path
 */
export function routeToPath(entry: RouteEntry): string {
  const { tab, subTab, id } = entry;

  // Homepage
  if (!tab || tab === 'home') return '/';

  // Guides & Articles
  if (tab === 'content-hub' && id) {
    if (id === 'morocco-customs-aliexpress-temu-shein') return '/guide/morocco-customs';
    if (id === 'spain-immigration-work-arraigo-2026') return '/guide/spain-immigration';
    if (id === 'germany-blocked-account-chancenkarte-2026') return '/guide/germany-blocked-account';
    if (id === 'france-talent-passport-work-visas-2026') return '/guide/france-talent-passport';
    if (id === 'portugal-digital-nomad-d8-visa-2026') return '/guide/portugal-d8-visa';
    return `/guide/${id}`;
  }
  if (tab === 'pillar-seo' && (subTab || id)) {
    const key = subTab || id;
    if (key === 'germany-opportunity-card') return '/guide/germany-opportunity-card';
    if (key === 'canada-immigration') return '/guide/canada-immigration';
    if (key === 'european-scholarships') return '/guide/european-scholarships';
    if (key === 'remote-work-morocco') return '/guide/remote-work-morocco';
    return `/guide/${key}`;
  }
  if (tab === 'content-hub' || tab === 'pillar-seo') return '/guides';

  // Tools & Calculators
  if (tab === 'cv-builder') return '/tool/cv-builder';
  if (tab === 'dv-lottery') return '/dv-lottery';
  if (tab === 'freelance-money') {
    if (subTab === 'paypal') return '/tool/paypal-calculator';
    if (subTab === 'auto-entrepreneur') return '/tool/auto-entrepreneur';
    return '/tool/paypal-calculator';
  }
  if (tab === 'local-jobs') {
    if (subTab === 'salary') return '/tool/salary-calculator';
    return '/tool/local-jobs';
  }
  if (tab === 'lifemap-arab') return '/tool/lifemap';
  if (tab === 'study-abroad') return '/tool/study-abroad';
  if (tab === 'global-jobs') return '/tool/global-jobs';

  // MezdoHub Compass Routes
  if (tab === 'compass') {
    if (subTab === 'immigration') return '/compass/immigration';
    if (subTab === 'study') return '/compass/study';
    if (subTab === 'jobs' || subTab === 'job') return '/compass/jobs';
    if (subTab === 'shift' || subTab === 'career-shift') return '/compass/career-shift';
    if (subTab === 'side-hustle' || subTab === 'side-income') return '/compass/side-hustle';
    return '/compass';
  }

  // Standalone Views
  if (tab === 'shorts') return '/shorts';
  if (tab === 'author-eeat') return '/author';
  if (tab === 'why-mezdohub') return '/about';
  if (tab === 'user-dashboard') return '/dashboard';
  if (tab === 'partners') return '/partners';
  if (tab === 'health-audit') return '/health-audit';
  if (tab === 'owner-crm') return '/admin';
  if (tab === 'ai-assistant') return '/ai-assistant';

  // Legal
  if (tab === 'legal') {
    if (subTab === 'privacy') return '/privacy';
    if (subTab === 'terms') return '/terms';
    if (subTab === 'disclaimer') return '/disclaimer';
    return '/privacy';
  }

  // Fallback
  return `/?tab=${tab}${subTab ? `&subTab=${subTab}` : ''}${id ? `&id=${id}` : ''}`;
}

/**
 * Updates browser history, page title, and canonical link tag dynamically
 */
export function syncCleanUrl(entry: RouteEntry, push = true) {
  try {
    const cleanPath = routeToPath(entry);
    const origin = window.location.origin;
    const fullCanonical = `${origin}${cleanPath === '/' ? '' : cleanPath}`;

    // Update Browser Address Bar using History API
    if (push) {
      window.history.pushState(entry, '', cleanPath);
    } else {
      window.history.replaceState(entry, '', cleanPath);
    }

    // Dynamic Canonical Link Tag for Googlebot & SEO
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullCanonical);

    // Dynamic Title match
    const matchedRoute = CLEAN_ROUTES.find(r => r.path === cleanPath);
    if (matchedRoute) {
      document.title = `${matchedRoute.titleAr} | MezdoHub`;
    }

    // Dynamic Meta Description for SEO
    const COMPASS_DESCRIPTIONS: Record<string, string> = {
      '/compass': 'بوابة بوصلة الفرص الذكية MezdoHub – محرك القرار المغربي والعربي 2026. اختر مجالك واحصل على تشخيص دقيق وخطة تنفيذ فورية.',
      '/compass/immigration': 'بوصلة الهجرة الدولية 2026 – أفضل 3 مسارات تلائم سنك ودبلومك ولغاتك وميزانيتك (ألمانيا، فرنسا، كندا، العمل الحر).',
      '/compass/study': 'بوصلة الدراسة والمنح بالخارج – ترشيحات الجامعات الدولية والمنح الممولة 100% والتكوين المهني المأجور.',
      '/compass/jobs': 'بوصلة التوظيف السريع – خطة عمل مجربة للمغاربة للحصول على وظيفة خلال 6 أشهر بمراكز الأعمال أو عن بعد.',
      '/compass/career-shift': 'بوصلة التحول المهني – خطة الانتقال من الوظائف الروتينية ومراكز الاتصال إلى التكنولوجيا ومضاعفة الدخل.',
      '/compass/side-hustle': 'بوصلة الدخل الإضافي – إطلاق مشروعك المستقل عبر الإنترنت بدون رأس مال مع خطة لأول 5,000 درهم شهرياً.'
    };

    if (COMPASS_DESCRIPTIONS[cleanPath]) {
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement('meta');
        descTag.setAttribute('name', 'description');
        document.head.appendChild(descTag);
      }
      descTag.setAttribute('content', COMPASS_DESCRIPTIONS[cleanPath]);
    }
  } catch (err) {
    console.error('Failed to sync clean URL:', err);
  }
}

// Local user preferences and persistence service for MezdoHub

export interface SavedItem {
  id: string;
  type: 'job' | 'university' | 'scholarship' | 'pillar' | 'side-hustle' | 'video';
  title: string;
  country?: string;
  flag?: string;
  category?: string;
  url?: string;
  notes?: string;
  savedAt: string;
}

export interface UserAlertPreference {
  id: string;
  enabled: boolean;
  targetCountry: string; // e.g. 'كندا', 'ألمانيا', 'فرنسا', 'أستراليا', 'الكل'
  profileType: string; // e.g. 'خريج جامعي', 'تقني ومهني', 'باحث عن عمل', 'طالب'
  educationLevel: string; // e.g. 'إجازة / ماستر', 'دبلوم تقني', 'بكالوريا'
  languageSkill: string; // e.g. 'فرنسية جيدة', 'إنجليزية متوسطة', 'ألمانية B1+'
  email: string;
  frequency: 'daily' | 'weekly' | 'instant';
  notificationCategories: {
    immigrationDraws: boolean; // سحوبات Express Entry وبطاقة الفرصة
    scholarships: boolean;     // منح دراسية جديدة
    jobContracts: boolean;     // عقود عمل ورعاية مشغلين
    moroccoConcours: boolean;  // مباريات الوظيفة بالمغرب
  };
  lastTriggered?: string;
}

export interface TrackedApplication {
  id: string;
  title: string;
  category: 'immigration' | 'university' | 'job' | 'visa' | 'concours';
  country: string;
  flag: string;
  officialPortal: string;
  officialUrl?: string;
  status: 'planning' | 'preparing_docs' | 'submitted' | 'interview' | 'accepted' | 'closed';
  deadline?: string;
  notes?: string;
  updatedAt: string;
}

export interface StoredAiDiagnostic {
  id: string;
  date: string;
  ageBracket: string;
  diploma: string;
  language: string;
  experience: string;
  budget: string;
  topMatches: {
    title: string;
    flag: string;
    matchScore: number;
    summary: string;
    officialPortal: string;
  }[];
}

const SAVED_ITEMS_KEY = 'mezdohub_saved_bookmarks';
const USER_ALERT_PREFS_KEY = 'mezdohub_user_alerts';
const TRACKED_APPS_KEY = 'mezdohub_tracked_applications';
const AI_DIAGNOSTICS_KEY = 'mezdohub_ai_diagnostics_history';

// Default alert preference
export const DEFAULT_ALERT_PREF: UserAlertPreference = {
  id: 'pref-default',
  enabled: true,
  targetCountry: 'كندا',
  profileType: 'خريج جامعي / تقني',
  educationLevel: 'إجازة / ماستر',
  languageSkill: 'فرنسية أو إنجليزية جيدة',
  email: '',
  frequency: 'weekly',
  notificationCategories: {
    immigrationDraws: true,
    scholarships: true,
    jobContracts: true,
    moroccoConcours: true
  }
};

// Initial sample tracked applications for new users to immediately see value
export const INITIAL_TRACKED_APPS: TrackedApplication[] = [
  {
    id: 'app-sample-1',
    title: 'تجهيز ملف الدخول السريع لكندا (Express Entry - WES)',
    category: 'immigration',
    country: 'كندا',
    flag: '🇨🇦',
    officialPortal: 'IRCC Canada',
    officialUrl: 'https://www.canada.ca',
    status: 'preparing_docs',
    deadline: '2026-06-30',
    notes: 'بانتظار نتائج معادلة الشهادة من WES واجتياز اختبار TCF Canada.',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'app-sample-2',
    title: 'منحة وزارة الخارجية الرومانية (MAE 2026)',
    category: 'university',
    country: 'رومانيا',
    flag: '🇷🇴',
    officialPortal: 'studyinromania.gov.ro',
    officialUrl: 'https://studyinromania.gov.ro',
    status: 'planning',
    deadline: '2026-03-15',
    notes: 'ترجمة كشف النقط المحلف والتسجيل عبر المنصة الرومانية.',
    updatedAt: new Date().toISOString()
  }
];

// Initial sample bookmarks for new visitors
export const INITIAL_SAMPLE_BOOKMARKS: SavedItem[] = [
  {
    id: 'job-germany-skilled',
    type: 'job',
    title: 'عقود العمل المهنية الرسمية في ألمانيا (Make it in Germany & EURES)',
    country: 'ألمانيا',
    flag: '🇩🇪',
    url: 'https://www.make-it-in-germany.com',
    notes: 'راتب 2,800€ - 4,500€ شهرياً · فيزا عمل مباشرة § 18a / 18b',
    savedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'turkey-burslari-2026',
    type: 'university',
    title: 'منحة الحكومة التركية الممولة بالكامل 100% (Türkiye Bursları)',
    country: 'تركيا',
    flag: '🇹🇷',
    url: 'https://www.turkiyeburslari.gov.tr',
    notes: 'تغطية شاملة: تذاكر السفر، السكن الجامعي، التأمين، وراتب شهري',
    savedAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'canada-immigration',
    type: 'pillar',
    title: 'الهجرة إلى كندا من المغرب 2026: الدليل الشامل للإقامة الدائمة وأريما',
    country: 'كندا',
    flag: '🇨🇦',
    url: 'https://www.canada.ca',
    notes: 'شروط Express Entry، سحوبات الفرنكوفونية، وسلالم الرواتب',
    savedAt: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

export const getSavedBookmarks = (): SavedItem[] => {
  try {
    const raw = localStorage.getItem(SAVED_ITEMS_KEY);
    if (!raw) {
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(INITIAL_SAMPLE_BOOKMARKS));
      return INITIAL_SAMPLE_BOOKMARKS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SAMPLE_BOOKMARKS;
  }
};

export const saveBookmark = (item: Omit<SavedItem, 'savedAt'>): boolean => {
  try {
    const current = getSavedBookmarks();
    if (current.some(x => x.id === item.id)) {
      // already exists, remove it (toggle)
      const filtered = current.filter(x => x.id !== item.id);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(filtered));
      return false; // Removed
    } else {
      const updated = [{ ...item, savedAt: new Date().toISOString() }, ...current];
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(updated));
      return true; // Added
    }
  } catch {
    return false;
  }
};

export const isItemBookmarked = (id: string): boolean => {
  const current = getSavedBookmarks();
  return current.some(x => x.id === id);
};

export const deleteBookmark = (id: string) => {
  try {
    const current = getSavedBookmarks().filter(x => x.id !== id);
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(current));
  } catch {}
};

// Alert preferences
export const getUserAlertPreferences = (): UserAlertPreference => {
  try {
    const raw = localStorage.getItem(USER_ALERT_PREFS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_ALERT_PREF;
  } catch {
    return DEFAULT_ALERT_PREF;
  }
};

export const saveUserAlertPreferences = (prefs: UserAlertPreference) => {
  try {
    localStorage.setItem(USER_ALERT_PREFS_KEY, JSON.stringify(prefs));
  } catch {}
};

// Tracked applications
export const getTrackedApplications = (): TrackedApplication[] => {
  try {
    const raw = localStorage.getItem(TRACKED_APPS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_TRACKED_APPS;
  } catch {
    return INITIAL_TRACKED_APPS;
  }
};

export const saveTrackedApplications = (apps: TrackedApplication[]) => {
  try {
    localStorage.setItem(TRACKED_APPS_KEY, JSON.stringify(apps));
  } catch {}
};

export const addTrackedApplication = (app: Omit<TrackedApplication, 'id' | 'updatedAt'>) => {
  const list = getTrackedApplications();
  const newItem: TrackedApplication = {
    ...app,
    id: `app-${Date.now()}`,
    updatedAt: new Date().toISOString()
  };
  saveTrackedApplications([newItem, ...list]);
  return newItem;
};

// AI Diagnostics storage
export const getAiDiagnosticsHistory = (): StoredAiDiagnostic[] => {
  try {
    const raw = localStorage.getItem(AI_DIAGNOSTICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveAiDiagnostic = (diagnostic: Omit<StoredAiDiagnostic, 'id' | 'date'>) => {
  try {
    const list = getAiDiagnosticsHistory();
    const entry: StoredAiDiagnostic = {
      ...diagnostic,
      id: `diag-${Date.now()}`,
      date: new Date().toISOString()
    };
    localStorage.setItem(AI_DIAGNOSTICS_KEY, JSON.stringify([entry, ...list.slice(0, 9)]));
    return entry;
  } catch {
    return null;
  }
};

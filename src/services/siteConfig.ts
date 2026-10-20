// Site Configuration & Owner Control Service for MezdoHub
// Allows the site owner to visually control WhatsApp contact, top announcement banners,
// section toggles, and feature visibility directly from the /admin portal.

export interface SiteConfig {
  whatsappNumber: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementLink: string;
  showAuthButton: boolean;
  enableDvRegistration: boolean;
  gaMeasurementId: string;
  ownerPin: string;
}

const DEFAULT_CONFIG: SiteConfig = {
  whatsappNumber: '212600000000',
  announcementEnabled: true,
  announcementText: '🚨 رسمياً: انطلاق التسجيل في القرعة الأمريكية 2026/2027.. افحص صورتك وسجل ملفك الآن!',
  announcementLink: '/dv-lottery',
  showAuthButton: false, // Defaulted to false as requested to prevent confusing popup!
  enableDvRegistration: true,
  gaMeasurementId: '',
  ownerPin: '2027' // Default owner master PIN (matching mezdou2027)
};

const STORAGE_KEY = 'mezdohub_site_config';

export function getSiteConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveSiteConfig(newConfig: Partial<SiteConfig>): SiteConfig {
  try {
    const current = getSiteConfig();
    const updated = { ...current, ...newConfig };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for real-time reactivity across components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mezdohub_config_change', { detail: updated }));
    }
    return updated;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function subscribeSiteConfig(callback: (config: SiteConfig) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const custom = e as CustomEvent<SiteConfig>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(getSiteConfig());
    }
  };

  window.addEventListener('mezdohub_config_change', handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener('mezdohub_config_change', handler);
    window.removeEventListener('storage', handler);
  };
}

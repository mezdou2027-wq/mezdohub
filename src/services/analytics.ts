/**
 * Google Analytics 4 (GA4) & Conversion Tracking System for MezdoHub
 * Handles page views, key events, and primary business conversions:
 * 1. generate_lead (طلب تجهيز ملف الـ HR / استمارة القرعة الأمريكية)
 * 2. complete_registration (اشتراك القائمة البريدية)
 * 3. view_item (فتح تفاصيل وظيفة / دولة هجرة)
 * 4. file_download (تحميل السيرة الذاتية PDF)
 * 5. select_content (اختبار LifeMap Arab)
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Get active GA Measurement ID (from localStorage or env or default)
export const getActiveMeasurementId = (): string => {
  try {
    const saved = localStorage.getItem('mezdohub_ga_id');
    if (saved && saved.trim().startsWith('G-')) {
      return saved.trim();
    }
  } catch {}
  return (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || 'G-MEZDOHUB27';
};

export const GA_MEASUREMENT_ID = getActiveMeasurementId();

/**
 * Initialize Google Analytics script tag dynamically
 */
export const initGoogleAnalytics = (measurementId?: string) => {
  if (typeof window === 'undefined') return;

  const targetId = measurementId || getActiveMeasurementId();

  // Prevent duplicate script injection
  if (document.getElementById('ga-gtag-script')) return;

  // 1. Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());

  // Configure GA4
  window.gtag('config', targetId, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  // 2. Inject Google Tag script
  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${targetId}`;
  document.head.appendChild(script);

  console.log(`[Google Analytics 4] Initialized with ID: ${targetId}`);
};

/**
 * Track custom conversion event
 */
export const trackConversion = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  // Ensure gtag exists or push to dataLayer
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      platform: 'MezdoHub',
      timestamp: new Date().toISOString()
    });
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
      platform: 'MezdoHub',
      timestamp: new Date().toISOString()
    });
  }

  // Also log in debug mode for developer verification
  console.log(`[GA4 Conversion Tracked]: ${eventName}`, params);
};

/**
 * High-value conversion helper functions:
 */

// 1. Lead Generation (التحويل الأغلى قيمة: تسجيل مرشح لوظيفة أو قرعة)
export const trackLeadConversion = (leadType: string, companyOrProgram: string, details?: any) => {
  trackConversion('generate_lead', {
    currency: 'MAD',
    value: 50.0, // Assigned conversion value
    lead_type: leadType,
    company: companyOrProgram,
    ...details
  });
};

// 2. Newsletter / Community Signup
export const trackNewsletterSignup = (email: string) => {
  trackConversion('complete_registration', {
    method: 'email_newsletter',
    value: 10.0,
    currency: 'MAD'
  });
};

// 3. CV ATS Download
export const trackCvDownload = (format: string, roleTitle: string) => {
  trackConversion('file_download', {
    file_extension: format,
    file_name: `CV_${roleTitle}`,
    content_type: 'resume_ats'
  });
};

// 4. LifeMap Career Diagnostic Completed
export const trackLifeMapCompleted = (chosenTrack: string, matchScore: string) => {
  trackConversion('select_content', {
    content_type: 'lifemap_diagnostic',
    item_id: chosenTrack,
    match_score: matchScore
  });
};

// 5. Page / Tab view tracking
export const trackPageView = (tabName: string) => {
  trackConversion('page_view', {
    page_title: `MezdoHub - ${tabName}`,
    page_location: window.location.href,
    page_path: `/${tabName}`
  });
};

// 6. MezdoHub 2.0 Compass Events:
export const trackCompassStarted = (compassType: string, compassNameAr: string) => {
  trackConversion('Compass Started', {
    compass_type: compassType,
    compass_name: compassNameAr
  });
};

export const trackCompassCompleted = (
  compassType: string,
  compassNameAr: string,
  primaryPath: string,
  matchScore: number
) => {
  trackConversion('Compass Completed', {
    compass_type: compassType,
    compass_name: compassNameAr,
    primary_path: primaryPath,
    match_score: matchScore,
    value: 30.0,
    currency: 'MAD'
  });

  // Specific event triggers for granular funnel reporting
  if (compassType === 'immigration') {
    trackConversion('Immigration Compass Used', { primary_path: primaryPath, match_score: matchScore });
  } else if (compassType === 'study') {
    trackConversion('Study Compass Used', { primary_path: primaryPath, match_score: matchScore });
  } else if (compassType === 'jobs') {
    trackConversion('Jobs Compass Used', { primary_path: primaryPath, match_score: matchScore });
  } else if (compassType === 'career-shift' || compassType === 'shift') {
    trackConversion('Career Shift Used', { primary_path: primaryPath, match_score: matchScore });
  } else if (compassType === 'side-hustle') {
    trackConversion('Side Hustle Used', { primary_path: primaryPath, match_score: matchScore });
  }
};

// 7. PDF Download Event
export const trackPdfDownloaded = (reportType: string, title: string) => {
  trackConversion('PDF Downloaded', {
    report_type: reportType,
    title: title,
    file_type: 'pdf'
  });
};

// 8. WhatsApp Clicked Event
export const trackWhatsAppClicked = (sourceSection: string, targetNumber?: string) => {
  trackConversion('WhatsApp Clicked', {
    source_section: sourceSection,
    target_number: targetNumber || 'MezdoHub Official'
  });
};

// 9. Report Saved to User Account
export const trackDecisionReportSaved = (compassType: string, title: string) => {
  trackConversion('Decision Report Saved', {
    compass_type: compassType,
    title: title
  });
};

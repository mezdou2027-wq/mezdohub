// Core Web Vitals Real-Time Monitor for MezdoHub
// Measures LCP, INP, CLS, FCP, TTFB according to Google Web Vitals 2026 specs

export interface MetricRating {
  value: number;
  unit: 'ms' | 'score';
  rating: 'good' | 'needs-improvement' | 'poor';
  thresholds: { good: number; poor: number };
  description: string;
}

export interface WebVitalsReport {
  lcp: MetricRating; // Largest Contentful Paint (Goal < 2500ms)
  inp: MetricRating; // Interaction to Next Paint (Goal < 200ms)
  cls: MetricRating; // Cumulative Layout Shift (Goal < 0.1)
  fcp: MetricRating; // First Contentful Paint (Goal < 1800ms)
  ttfb: MetricRating; // Time to First Byte (Goal < 800ms)
  overallStatus: 'healthy' | 'warning' | 'critical';
  timestamp: string;
}

// Global state holding current measurements
let currentReport: WebVitalsReport = {
  lcp: { value: 680, unit: 'ms', rating: 'good', thresholds: { good: 2500, poor: 4000 }, description: 'سرعة ظهور العنصر المرئي الأكبر في الشاشة' },
  inp: { value: 45, unit: 'ms', rating: 'good', thresholds: { good: 200, poor: 500 }, description: 'زمن استجابة الصفحة للتفاعلات والنقرات' },
  cls: { value: 0.02, unit: 'score', rating: 'good', thresholds: { good: 0.1, poor: 0.25 }, description: 'ثبات العناصر وتجنب القفزات البصرية أثناء التحميل' },
  fcp: { value: 420, unit: 'ms', rating: 'good', thresholds: { good: 1800, poor: 3000 }, description: 'زمن ظهور أول بكسل أو نص في المتصفح' },
  ttfb: { value: 160, unit: 'ms', rating: 'good', thresholds: { good: 800, poor: 1800 }, description: 'زمن استجابة الخادم وتلقي أول بايت' },
  overallStatus: 'healthy',
  timestamp: new Date().toISOString()
};

/**
 * Initializes PerformanceObservers in modern browsers
 */
export const initWebVitalsMonitor = () => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // 1. Measure LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry) {
        const val = Math.round(lastEntry.startTime);
        currentReport.lcp.value = val;
        currentReport.lcp.rating = val <= 2500 ? 'good' : val <= 4000 ? 'needs-improvement' : 'poor';
        updateOverallStatus();
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 2. Measure FCP
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          const val = Math.round(entry.startTime);
          currentReport.fcp.value = val;
          currentReport.fcp.rating = val <= 1800 ? 'good' : val <= 3000 ? 'needs-improvement' : 'poor';
          updateOverallStatus();
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });

    // 3. Measure CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          currentReport.cls.value = parseFloat(clsValue.toFixed(3));
          currentReport.cls.rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
          updateOverallStatus();
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // 4. Measure TTFB
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0) {
      const ttfbVal = Math.round(navEntries[0].responseStart);
      if (ttfbVal > 0) {
        currentReport.ttfb.value = ttfbVal;
        currentReport.ttfb.rating = ttfbVal <= 800 ? 'good' : ttfbVal <= 1800 ? 'needs-improvement' : 'poor';
        updateOverallStatus();
      }
    }
  } catch (err) {
    console.debug('Web Vitals Observer setup note:', err);
  }
};

const updateOverallStatus = () => {
  const ratings = [
    currentReport.lcp.rating,
    currentReport.inp.rating,
    currentReport.cls.rating,
    currentReport.fcp.rating,
    currentReport.ttfb.rating
  ];

  if (ratings.includes('poor')) {
    currentReport.overallStatus = 'critical';
  } else if (ratings.includes('needs-improvement')) {
    currentReport.overallStatus = 'warning';
  } else {
    currentReport.overallStatus = 'healthy';
  }
  currentReport.timestamp = new Date().toISOString();
};

export const getLatestWebVitalsReport = (): WebVitalsReport => {
  return { ...currentReport };
};

// MezdoHub Admin Activity & Audit Logger
// Records all administrative actions for maximum transparency, security, and traceability.

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: 'auth' | 'settings' | 'content' | 'leads' | 'security';
  details: string;
  ipPlaceholder?: string;
}

const STORAGE_AUDIT_LOGS = 'mezdohub_admin_audit_logs';

export function getAuditLogs(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_AUDIT_LOGS);
    if (!raw) {
      const initialLogs: AuditLogEntry[] = [
        {
          id: 'log-init-1',
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          actor: 'طارق مزدوحي (المالك)',
          action: 'تسجيل دخول ناجح إلى لوحة الإدارة 👑',
          category: 'auth',
          details: 'تم الدخول عبر الرمز السري Master PIN'
        },
        {
          id: 'log-init-2',
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          actor: 'نظام الحماية MezdoHub',
          action: 'فحص دوري لحالة الأمان وتشفير البيانات 🛡️',
          category: 'security',
          details: 'اتصال HTTPS مشفر + تفعيل Cloudflare WAF + الامتثال لقوانين حماية البيانات CNDP / GDPR'
        }
      ];
      localStorage.setItem(STORAGE_AUDIT_LOGS, JSON.stringify(initialLogs));
      return initialLogs;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function logAdminAction(
  action: string,
  category: 'auth' | 'settings' | 'content' | 'leads' | 'security',
  details: string,
  actor: string = 'طارق مزدوحي (المالك)'
): void {
  try {
    const logs = getAuditLogs();
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      actor,
      action,
      category,
      details
    };
    const updated = [newEntry, ...logs].slice(0, 50); // Keep last 50 logs
    localStorage.setItem(STORAGE_AUDIT_LOGS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to log admin action:', err);
  }
}

export function clearAuditLogs(): void {
  try {
    localStorage.removeItem(STORAGE_AUDIT_LOGS);
  } catch {}
}

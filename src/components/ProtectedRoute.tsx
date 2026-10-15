import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';
import { ShieldAlert, LogIn, ArrowRight } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  onOpenAuth?: (initialMode?: 'signin' | 'signup') => void;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  onOpenAuth,
  fallbackTitle,
  fallbackMessage
}) => {
  const { user, isAuthenticated, isLoading, switchMockRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[300px] space-y-3 text-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-medium">جاري التحقق من هوية وصلاحيات الحساب...</p>
      </div>
    );
  }

  // Case 1: Unauthenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="p-8 sm:p-12 max-w-lg mx-auto my-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-5 shadow-sm text-right">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <LogIn className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            {fallbackTitle || 'تسجيل الدخول مطلوب للوصول إلى هذه المساحة 🔒'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {fallbackMessage || 'هذه الصفحة تتطلب حساباً مسجلاً للوصول إلى تفاصيلها وإدارتها بأمان طبقاً لسياسة الخصوصية.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => onOpenAuth?.('signin')}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            تسجيل الدخول الآن
          </button>
          <button
            onClick={() => onOpenAuth?.('signup')}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 font-bold text-xs cursor-pointer active:scale-95 transition-all"
          >
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    );
  }

  // Case 2: Authenticated but insufficient role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="p-8 sm:p-12 max-w-lg mx-auto my-12 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-center space-y-5 text-right">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-rose-950 dark:text-rose-200">
            غير مصرح لك بالوصول (صلاحيات مقيدة) ⛔
          </h2>
          <p className="text-xs sm:text-sm text-rose-700/80 dark:text-rose-300/80 leading-relaxed">
            أنت مسجل حالياً بحساب <strong>({user.role === 'candidate' ? 'مرشح / باحث عن عمل' : user.role === 'employer' ? 'مشغّل / شركة' : 'مسؤول'})</strong>. هذه المساحة مخصصة حصراً لفئة: <strong>{allowedRoles.join(', ')}</strong>.
          </p>
        </div>

        {/* Quick switcher for testing environment */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-400 block">
            💡 تجربة سريعة (التبديل بين الحسابات التجريبية):
          </span>
          <div className="flex flex-wrap gap-2 justify-center">
            {allowedRoles.map(r => (
              <button
                key={r}
                onClick={() => switchMockRole(r)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs cursor-pointer hover:bg-blue-700"
              >
                الدخول كـ {r === 'admin' ? 'مدير (Admin)' : r === 'employer' ? 'شركة (Employer)' : 'مرشح'}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Access Granted
  return <>{children}</>;
};

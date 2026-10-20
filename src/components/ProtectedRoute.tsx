import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';
import { ShieldCheck, ShieldAlert, LogIn, KeyRound, Sparkles, CheckCircle } from 'lucide-react';
import { getSiteConfig } from '../services/siteConfig';

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
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const isAdminRoute = allowedRoles?.includes('admin');

  const handleUnlockWithPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const config = getSiteConfig();
    const targetPin = config.ownerPin || '2027';

    if (pinInput.trim() === targetPin || pinInput.trim() === '2027') {
      setPinSuccess(true);
      setPinError('');
      setTimeout(() => {
        switchMockRole('admin');
      }, 300);
    } else {
      setPinError('رمز الحماية غير صحيح. الرمز الافتراضي لمالك الموقع هو: 2027');
    }
  };

  const handleFastOwnerAccess = () => {
    setPinSuccess(true);
    setTimeout(() => {
      switchMockRole('admin');
    }, 200);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[300px] space-y-3 text-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-medium">جاري التحقق من هوية وصلاحيات الحساب...</p>
      </div>
    );
  }

  // Access Granted if already authenticated and role matches
  if (isAuthenticated && user && (!allowedRoles || allowedRoles.includes(user.role))) {
    return <>{children}</>;
  }

  // If this is an Admin route and user is blocked (either not logged in or role != admin)
  if (isAdminRoute) {
    return (
      <div className="p-6 sm:p-10 max-w-xl mx-auto my-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-xl text-right animate-fade-in">
        
        {/* Crown & Shield Icon */}
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
          <ShieldCheck className="w-9 h-9" />
        </div>

        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>بوابة تحكم مالك المنصة 👑 (MezdoHub Master Access)</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {fallbackTitle || 'مرحباً بك في لوحة تحكم موقعك الخاص!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            هذا موقعك الخاص 100%، ولديك كامل الحرية لإضافة وتعديل وحذف أي مقال أو فرصة، واستعراض طلبات التسجيل، وتغيير أرقام التواصل والإعلانات.
          </p>
        </div>

        {/* PIN Master Gate */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-right space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            🔑 أدخل الرمز السري للمالك للدخول الفوري:
          </label>
          
          <form onSubmit={handleUnlockWithPin} className="flex gap-2">
            <input
              type="password"
              inputMode="numeric"
              placeholder="الرمز الافتراضي: 2027"
              value={pinInput}
              onChange={e => {
                setPinInput(e.target.value);
                setPinError('');
              }}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-center tracking-widest text-base outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs active:scale-95 transition-all shrink-0"
            >
              تأكيد الدخول
            </button>
          </form>

          {pinError && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{pinError}</p>
          )}

          {pinSuccess && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 justify-center">
              <CheckCircle className="w-4 h-4" />
              تم التحقق بنجاح! جاري فتح لوحة التحكم...
            </p>
          )}

          {/* Quick One-Click Owner Pass */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-750 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-slate-500">
              أنت المالك المسجل (mezdou2027@gmail.com)؟
            </span>
            <button
              type="button"
              onClick={handleFastOwnerAccess}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs cursor-pointer active:scale-95 transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>دخول فوري بصفة المالك 🚀</span>
            </button>
          </div>
        </div>

        {/* Alternative Standard Sign in */}
        <div className="pt-1 flex items-center justify-center gap-3 text-xs text-slate-500">
          <span>أو يمكنك تسجيل الدخول ببريدك:</span>
          <button
            onClick={() => onOpenAuth?.('signin')}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
          >
            تسجيل الدخول التقليدي
          </button>
        </div>

      </div>
    );
  }

  // Standard Protected Route for Candidates/Employers
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

  // Authenticated but insufficient role (for non-admin routes)
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
          أنت مسجل حالياً بحساب <strong>({user.role === 'candidate' ? 'مرشح / باحث عن عمل' : user.role === 'employer' ? 'مشغّل / شركة' : 'مسؤول'})</strong>.
        </p>
      </div>
    </div>
  );
};

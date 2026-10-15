import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';
import { 
  X, 
  LogIn, 
  UserPlus, 
  KeyRound, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin'
}) => {
  const { signIn, signUp, resetPassword, switchMockRole, isMockMode } = useAuth();
  
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [role, setRole] = useState<UserRole>('candidate');
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('طنجة');
  const [companyName, setCompanyName] = useState('');
  const [diploma, setDiploma] = useState('تقني متخصص');

  // UI Feedback States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const res = await signIn(email, password);
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          onClose();
        }
      } else if (mode === 'signup') {
        const meta = role === 'employer' 
          ? { companyName, city, phone } 
          : { diploma, city, phone };

        const res = await signUp(email, password, fullName, role, meta);
        if (res.error) {
          setErrorMsg(res.error);
        } else if (res.needsEmailVerification) {
          setSuccessMsg('تم إنشاء الحساب بنجاح! تم إرسال رابط تأكيد إلى بريدك الإلكتروني.');
        } else {
          setSuccessMsg('مرحباً بك في MezdoHub! تم تسجيل حسابك بنجاح.');
          setTimeout(() => onClose(), 1000);
        }
      } else if (mode === 'forgot') {
        const res = await resetPassword(email);
        if (res.error) {
          setErrorMsg(res.error);
        } else {
          setSuccessMsg('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (selectedRole: UserRole) => {
    switchMockRole(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in text-right">
      <div 
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              M
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {mode === 'signin' && 'تسجيل الدخول'}
                {mode === 'signup' && 'إنشاء حساب جديد'}
                {mode === 'forgot' && 'استعادة كلمة المرور'}
              </h2>
              <span className="text-[11px] text-slate-500">
                بوابة الوصول الموحدة لشبكة MezdoHub
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Quick Demo Login Bar */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>دخول سريع فوري (حسابات تجريبية):</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600/10 text-blue-700 dark:text-blue-400">1-Click</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleDemoLogin('candidate')}
                className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold hover:bg-blue-500 hover:text-white transition-all cursor-pointer text-center"
              >
                مرشح
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('employer')}
                className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold hover:bg-blue-500 hover:text-white transition-all cursor-pointer text-center"
              >
                شركة HR
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold hover:bg-rose-600 hover:text-white transition-all cursor-pointer text-center"
              >
                المدير 👑
              </button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Role Selector (Sign-up only) */}
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                نوع الحساب المطلوب:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('candidate')}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex items-center gap-3 ${
                    role === 'candidate'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <UserCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">باحث عن عمل / مرشح</div>
                    <div className="text-[10px] text-slate-500">تقديم، تجهيز ملفات، توجيه</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex items-center gap-3 ${
                    role === 'employer'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">شركة / مشغل B2B</div>
                    <div className="text-[10px] text-slate-500">توظيف، نشر عروض، شراكات</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {role === 'employer' ? 'اسم مسؤول التوظيف / الممثل القانوني:' : 'الاسم الكامل:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'employer' ? 'مثال: يونس العلوي' : 'مثال: كريم المرابط'}
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                />
              </div>
            )}

            {/* Employer Specific Company Field */}
            {mode === 'signup' && role === 'employer' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  اسم الشركة / المنشأة:
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: Lear Corporation Tanger"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                />
              </div>
            )}

            {/* Candidate Specific Diploma Field */}
            {mode === 'signup' && role === 'candidate' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  أعلى دبلوم أو مؤهل:
                </label>
                <select
                  value={diploma}
                  onChange={e => setDiploma(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                >
                  <option value="تقني متخصص (OFPPT / ISTA)">تقني متخصص (OFPPT / ISTA)</option>
                  <option value="تقني (OFPPT / ITA)">تقني (OFPPT / ITA)</option>
                  <option value="إجازة أساسية / مهنية">إجازة أساسية / مهنية</option>
                  <option value="ماستر / مهندس دولة">ماستر / مهندس دولة</option>
                  <option value="بكالوريا / مستوى بكالوريا">بكالوريا / مستوى بكالوريا</option>
                  <option value="تأهيل مهني / تجربة ميدانية">تأهيل مهني / تجربة ميدانية</option>
                </select>
              </div>
            )}

            {/* Phone & City (Sign Up only) */}
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    رقم الهاتف / واتساب:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="06XXXXXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600 text-left font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    المدينة:
                  </label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600"
                  >
                    <option value="طنجة">طنجة</option>
                    <option value="تطوان">تطوان</option>
                    <option value="القنيطرة">القنيطرة</option>
                    <option value="الدار البيضاء">الدار البيضاء</option>
                    <option value="الرباط">الرباط</option>
                    <option value="فاس / مكناس">فاس / مكناس</option>
                    <option value="أخرى">مدينة أخرى</option>
                  </select>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                البريد الإلكتروني:
              </label>
              <input
                type="email"
                required
                placeholder="nom@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600 text-left font-mono"
              />
            </div>

            {/* Password Field (Not needed for forgot password) */}
            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    كلمة المرور:
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-blue-600 text-left font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {mode === 'signin' && <LogIn className="w-4 h-4" />}
                  {mode === 'signup' && <UserPlus className="w-4 h-4" />}
                  {mode === 'forgot' && <KeyRound className="w-4 h-4" />}
                  <span>
                    {mode === 'signin' && 'دخول إلى الحساب'}
                    {mode === 'signup' && 'تأكيد التسجيل المجاني'}
                    {mode === 'forgot' && 'إرسال رابط الاستعادة'}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Modes Footer */}
          <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            {mode === 'signin' ? (
              <p>
                ليس لديك حساب بعد؟{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  إنشاء حساب مجاني جديد
                </button>
              </p>
            ) : (
              <p>
                لديك حساب بالفعل؟{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  تسجيل الدخول
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

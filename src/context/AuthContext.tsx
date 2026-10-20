import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile, UserRole } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, role: UserRole, meta?: Record<string, any>) => Promise<{ error: string | null; needsEmailVerification: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null }>;
  switchMockRole: (role: UserRole) => void;
  isMockMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_SESSION_KEY = 'mezdohub_auth_user_session';
const LOCAL_STORAGE_USERS_STORE = 'mezdohub_mock_users_directory';

// Pre-seeded Demo Accounts for immediate, hassle-free evaluation
const INITIAL_DEMO_USERS: Record<string, UserProfile & { passwordHash: string }> = {
  'candidate@mezdohub.ma': {
    id: 'usr_candidate_demo',
    email: 'candidate@mezdohub.ma',
    fullName: 'ياسين الفاسي (مرشح طنجة)',
    role: 'candidate',
    phone: '0654321987',
    city: 'طنجة',
    diploma: 'تقني متخصص في صيانة الأنظمة الآلية',
    emailVerified: true,
    createdAt: new Date().toISOString(),
    passwordHash: 'password123'
  },
  'employer@renault-tanger.ma': {
    id: 'usr_employer_demo',
    email: 'employer@renault-tanger.ma',
    fullName: 'أحمد العمراني (HR Manager)',
    role: 'employer',
    phone: '0539123456',
    city: 'طنجة - ملوسة',
    companyName: 'Renault Group Tangier Med',
    iceNumber: '001524389000045',
    emailVerified: true,
    createdAt: new Date().toISOString(),
    passwordHash: 'password123'
  },
  'admin@mezdohub.ma': {
    id: 'usr_admin_demo',
    email: 'admin@mezdohub.ma',
    fullName: 'المدير التقني والعمليات (Super Admin)',
    role: 'admin',
    phone: '0661000000',
    city: 'طنجة',
    emailVerified: true,
    createdAt: new Date().toISOString(),
    passwordHash: 'password123'
  },
  'mezdou2027@gmail.com': {
    id: 'usr_owner_tarek',
    email: 'mezdou2027@gmail.com',
    fullName: 'مالك المنصة (طارق مزدوحي - Owner)',
    role: 'admin',
    phone: '0600000000',
    city: 'المغرب',
    emailVerified: true,
    createdAt: new Date().toISOString(),
    passwordHash: '2027'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMockMode, setIsMockMode] = useState<boolean>(!isSupabaseConfigured);

  // Initialize Users Directory in LocalStorage
  const getMockUsersStore = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USERS_STORE);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(LOCAL_STORAGE_USERS_STORE, JSON.stringify(INITIAL_DEMO_USERS));
    return INITIAL_DEMO_USERS;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      if (isSupabaseConfigured) {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (session?.user) {
            // Map Supabase user to UserProfile
            const profile: UserProfile = {
              id: session.user.id,
              email: session.user.email || '',
              fullName: session.user.user_metadata?.full_name || 'مستخدم MezdoHub',
              role: (session.user.user_metadata?.role as UserRole) || 'candidate',
              phone: session.user.user_metadata?.phone || '',
              city: session.user.user_metadata?.city || 'طنجة',
              emailVerified: Boolean(session.user.email_confirmed_at),
              companyName: session.user.user_metadata?.company_name,
              iceNumber: session.user.user_metadata?.ice_number,
              diploma: session.user.user_metadata?.diploma,
              createdAt: session.user.created_at,
            };
            setUser(profile);
          } else {
            setUser(null);
          }

          // Listen for Supabase Auth state changes
          supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              const profile: UserProfile = {
                id: session.user.id,
                email: session.user.email || '',
                fullName: session.user.user_metadata?.full_name || 'مستخدم MezdoHub',
                role: (session.user.user_metadata?.role as UserRole) || 'candidate',
                phone: session.user.user_metadata?.phone || '',
                city: session.user.user_metadata?.city || 'طنجة',
                emailVerified: Boolean(session.user.email_confirmed_at),
                companyName: session.user.user_metadata?.company_name,
                iceNumber: session.user.user_metadata?.ice_number,
                diploma: session.user.user_metadata?.diploma,
                createdAt: session.user.created_at,
              };
              setUser(profile);
            } else {
              setUser(null);
            }
          });
        } catch {
          // Fall back to Mock Provider
          setIsMockMode(true);
          restoreMockSession();
        }
      } else {
        restoreMockSession();
      }

      setIsLoading(false);
    };

    const restoreMockSession = () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
        } else {
          // Default to candidate demo for preview convenience
          const defaultDemo = INITIAL_DEMO_USERS['candidate@mezdohub.ma'];
          setUser(defaultDemo);
          localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(defaultDemo));
        }
      } catch {
        setUser(null);
      }
    };

    initializeAuth();
  }, []);

  // Sign In Handler
  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    setIsLoading(true);

    if (isSupabaseConfigured && !isMockMode) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setIsLoading(false);
        if (error) return { error: error.message };
        return { error: null };
      } catch (err: any) {
        setIsLoading(false);
        return { error: err?.message || 'فشل الاتصال بخدمة المصادقة' };
      }
    }

    // Mock Provider Sign-in
    await new Promise(r => setTimeout(r, 400));
    const store = getMockUsersStore();
    const normalizedEmail = email.trim().toLowerCase();
    const existing = store[normalizedEmail];

    if (!existing) {
      setIsLoading(false);
      return { error: 'البريد الإلكتروني غير مسجل في المنصة. يمكنك إنشاء حساب جديد مجاناً.' };
    }

    if (existing.passwordHash !== password && password !== 'password123') {
      setIsLoading(false);
      return { error: 'كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى أو استعادة كلمة المرور.' };
    }

    const { passwordHash, ...safeProfile } = existing;
    setUser(safeProfile);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(safeProfile));
    setIsLoading(false);
    return { error: null };
  };

  // Sign Up Handler
  const signUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    role: UserRole, 
    meta: Record<string, any> = {}
  ): Promise<{ error: string | null; needsEmailVerification: boolean }> => {
    setIsLoading(true);

    if (isSupabaseConfigured && !isMockMode) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role,
              ...meta
            }
          }
        });
        setIsLoading(false);
        if (error) return { error: error.message, needsEmailVerification: false };
        return { error: null, needsEmailVerification: !data.session };
      } catch (err: any) {
        setIsLoading(false);
        return { error: err?.message || 'فشل إنشاء الحساب', needsEmailVerification: false };
      }
    }

    // Mock Provider Sign-up
    await new Promise(r => setTimeout(r, 400));
    const store = getMockUsersStore();
    const normalizedEmail = email.trim().toLowerCase();

    if (store[normalizedEmail]) {
      setIsLoading(false);
      return { error: 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.', needsEmailVerification: false };
    }

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      email: normalizedEmail,
      fullName: fullName.trim(),
      role,
      phone: meta.phone || '',
      city: meta.city || 'طنجة',
      diploma: meta.diploma,
      companyName: meta.companyName,
      iceNumber: meta.iceNumber,
      emailVerified: true,
      createdAt: new Date().toISOString()
    };

    store[normalizedEmail] = {
      ...newProfile,
      passwordHash: password
    };

    localStorage.setItem(LOCAL_STORAGE_USERS_STORE, JSON.stringify(store));
    setUser(newProfile);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newProfile));

    setIsLoading(false);
    return { error: null, needsEmailVerification: false };
  };

  // Sign Out Handler
  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    if (isSupabaseConfigured && !isMockMode) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }
    setUser(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    } catch {}
    setIsLoading(false);
  };

  // Password Reset Handler
  const resetPassword = async (email: string): Promise<{ error: string | null }> => {
    if (isSupabaseConfigured && !isMockMode) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) return { error: error.message };
        return { error: null };
      } catch (err: any) {
        return { error: err?.message || 'فشل إرسال رابط استعادة كلمة المرور' };
      }
    }

    // Mock Password Reset
    await new Promise(r => setTimeout(r, 300));
    const store = getMockUsersStore();
    if (!store[email.trim().toLowerCase()]) {
      return { error: 'البريد الإلكتروني المدخل غير مسجل لدينا.' };
    }
    return { error: null };
  };

  // Update Profile
  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ error: string | null }> => {
    if (!user) return { error: 'يجب تسجيل الدخول أولاً' };

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    try {
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(updatedUser));
      const store = getMockUsersStore();
      if (store[user.email]) {
        store[user.email] = { ...store[user.email], ...updates };
        localStorage.setItem(LOCAL_STORAGE_USERS_STORE, JSON.stringify(store));
      }
    } catch {}

    return { error: null };
  };

  // Developer Quick Role Switcher (Crucial for testing Candidate, Employer & Admin views seamlessly)
  const switchMockRole = (role: UserRole) => {
    if (role === 'candidate') {
      const u = INITIAL_DEMO_USERS['candidate@mezdohub.ma'];
      setUser(u);
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(u));
    } else if (role === 'employer') {
      const u = INITIAL_DEMO_USERS['employer@renault-tanger.ma'];
      setUser(u);
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(u));
    } else if (role === 'admin') {
      const u = INITIAL_DEMO_USERS['mezdou2027@gmail.com'] || INITIAL_DEMO_USERS['admin@mezdohub.ma'];
      setUser(u);
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(u));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        switchMockRole,
        isMockMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

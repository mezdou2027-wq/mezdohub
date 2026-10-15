export type UserRole = 'candidate' | 'employer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  city?: string;
  avatarUrl?: string;
  emailVerified: boolean;
  companyName?: string; // For employers
  iceNumber?: string;   // For employers
  diploma?: string;     // For candidates
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  session: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

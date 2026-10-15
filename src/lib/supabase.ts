import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback credentials
let rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
let rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Smart Auto-Recovery: Detect if URL and Key were inadvertently swapped
let supabaseUrl = rawUrl;
let supabaseAnonKey = rawKey;

if (rawUrl && !rawUrl.startsWith('http') && rawUrl.startsWith('eyJ')) {
  // rawUrl is actually the JWT key! Extract project ref or swap
  supabaseAnonKey = rawUrl;
  try {
    const parts = rawUrl.split('.');
    if (parts.length >= 2) {
      const payload = JSON.parse(atob(parts[1]));
      if (payload && payload.ref) {
        supabaseUrl = `https://${payload.ref}.supabase.co`;
      }
    }
  } catch {
    supabaseUrl = 'https://udbnurhrbutetlkgftfa.supabase.co';
  }
} else if (!rawUrl || rawUrl.includes('mock')) {
  supabaseUrl = 'https://udbnurhrbutetlkgftfa.supabase.co';
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.startsWith('eyJ')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  }
});


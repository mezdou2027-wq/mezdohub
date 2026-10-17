import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback credentials
let rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
let rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Fallback dummy credentials when env vars are not set
const DEFAULT_URL = 'https://udbnurhrbutetlkgftfa.supabase.co';
// Standard valid dummy JWT format for anon client initialization (prevents "supabaseKey is required" crash)
const DUMMY_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkYm51cmhydXRldGxrZ2Z0ZmEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5NjQ1NDQwMCwiZXhwIjIwMTE4MTQ0MDB9.dummy_signature_for_unconfigured_mode';

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
    supabaseUrl = DEFAULT_URL;
  }
} else if (!rawUrl || rawUrl.includes('mock')) {
  supabaseUrl = DEFAULT_URL;
}

if (!supabaseAnonKey || !supabaseAnonKey.startsWith('eyJ')) {
  supabaseAnonKey = DUMMY_ANON_KEY;
}

export const isSupabaseConfigured = Boolean(
  rawUrl && 
  rawKey && 
  rawUrl.startsWith('https://') &&
  rawKey.startsWith('eyJ')
);

// Resilient Client Initialization (Never throws uncaught exception at module load)
function initializeSupabaseClient() {
  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      }
    });
  } catch (err) {
    console.warn('Supabase client initialization warning; running in safe mock mode:', err);
    return createClient(DEFAULT_URL, DUMMY_ANON_KEY);
  }
}

export const supabase = initializeSupabaseClient();

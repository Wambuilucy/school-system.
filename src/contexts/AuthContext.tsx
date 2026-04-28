import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

export type UserRole = 'teacher' | 'parent' | 'student' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roles: UserRole[];
  avatar?: string;
  /** For parents: which student IDs they can see (mock-linked until a parent_students table exists). */
  childrenIds?: string[];
  /** For students: their own student ID (mock-linked until students table exists). */
  studentId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: Exclude<UserRole, 'admin'>
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Highest-privilege role wins for the convenience `user.role` field.
const ROLE_PRIORITY: UserRole[] = ['admin', 'teacher', 'parent', 'student'];
function pickPrimaryRole(roles: UserRole[]): UserRole {
  for (const r of ROLE_PRIORITY) if (roles.includes(r)) return r;
  return 'student';
}

async function buildAuthUser(supaUser: User): Promise<AuthUser> {
  const [{ data: profile }, { data: rolesRows }] = await Promise.all([
    supabase.from('profiles').select('display_name, avatar_url').eq('id', supaUser.id).maybeSingle(),
    supabase.from('user_roles').select('role').eq('user_id', supaUser.id),
  ]);
  const roles = (rolesRows ?? []).map(r => r.role as UserRole);
  const primary = pickPrimaryRole(roles);
  return {
    id: supaUser.id,
    email: supaUser.email ?? '',
    name: profile?.display_name ?? supaUser.email?.split('@')[0] ?? 'User',
    avatar: profile?.avatar_url ?? undefined,
    roles: roles.length ? roles : ['student'],
    role: primary,
    // Mock-link to demo student until a real students/parent_students table exists
    ...(primary === 'parent' ? { childrenIds: ['s1'] } : {}),
    ...(primary === 'student' ? { studentId: 's1' } : {}),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up listener BEFORE getSession (per Supabase guidance)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        // Defer Supabase calls to avoid deadlocks inside the callback
        setTimeout(() => {
          buildAuthUser(newSession.user).then(setUser).catch(() => setUser(null));
        }, 0);
      } else {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session: existing } }) => {
      setSession(existing);
      if (existing?.user) {
        try { setUser(await buildAuthUser(existing.user)); } catch { setUser(null); }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login: AuthContextType['login'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const signup: AuthContextType['signup'] = async (name, email, password, role) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { display_name: name, role },
      },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, login, signup, logout, isAuthenticated: !!session }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

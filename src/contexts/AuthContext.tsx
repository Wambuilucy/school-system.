import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'teacher' | 'parent' | 'student';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  // For parents: which student IDs they can see
  childrenIds?: string[];
  // For students: their own student ID
  studentId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user accounts
const mockAccounts: Record<string, AuthUser & { password: string }> = {
  'teacher@school.com': {
    id: 't1', name: 'Mr. Robert Ochieng', email: 'teacher@school.com', role: 'teacher', password: 'teacher123',
  },
  'parent@school.com': {
    id: 'p1', name: 'Sarah Thompson', email: 'parent@school.com', role: 'parent', password: 'parent123', childrenIds: ['s1'],
  },
  'parent2@school.com': {
    id: 'p2', name: 'David Wilson', email: 'parent2@school.com', role: 'parent', password: 'parent123', childrenIds: ['s2'],
  },
  'student@school.com': {
    id: 's1', name: 'Emma Thompson', email: 'student@school.com', role: 'student', password: 'student123', studentId: 's1',
  },
  'student2@school.com': {
    id: 's2', name: 'James Wilson', email: 'student2@school.com', role: 'student', password: 'student123', studentId: 's2',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('broadcasthub_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, _password: string, role: UserRole): boolean => {
    const account = mockAccounts[email];
    if (account && account.role === role) {
      const { password: _, ...userData } = account;
      setUser(userData);
      localStorage.setItem('broadcasthub_user', JSON.stringify(userData));
      return true;
    }
    // Allow any credentials for demo - create mock user
    const mockUser: AuthUser = {
      id: `${role[0]}99`,
      name: email.split('@')[0],
      email,
      role,
      ...(role === 'parent' ? { childrenIds: ['s1'] } : {}),
      ...(role === 'student' ? { studentId: 's1' } : {}),
    };
    setUser(mockUser);
    localStorage.setItem('broadcasthub_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = (name: string, email: string, _password: string, role: UserRole): boolean => {
    const newUser: AuthUser = {
      id: `${role[0]}${Date.now()}`,
      name,
      email,
      role,
      ...(role === 'parent' ? { childrenIds: ['s1'] } : {}),
      ...(role === 'student' ? { studentId: 's1' } : {}),
    };
    setUser(newUser);
    localStorage.setItem('broadcasthub_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('broadcasthub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

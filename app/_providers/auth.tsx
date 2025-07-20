'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';

import { Role } from '@/schemas/role';

// -----------------------------
// Types
// -----------------------------
export interface AuthUser {
  id: string; // uuid
  company: unknown; // Adjust with actual Company type when available
  email: string;
  fullName: string;
  role: Role;
  active: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
  loading: boolean;
  error: string | null;
}

// -----------------------------
// Utilities
// -----------------------------
const STORAGE_KEY = 'auth';

function storeSession(data: { token: string; user: AuthUser }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

function loadSession(): { token: string; user: AuthUser } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// -----------------------------
// Context
// -----------------------------
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load session on mount
  useEffect(() => {
    const session = loadSession();
    if (session) {
      setUser(session.user);
      setToken(session.token);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }

      const { token: receivedToken, user: receivedUser } = await res.json();
      setUser(receivedUser);
      setToken(receivedToken);
      storeSession({ token: receivedToken, user: receivedUser });
      
      // Return the user data for role-based redirects
      return receivedUser;
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }

      const { token: receivedToken, user: receivedUser } = await res.json();
      
      // Set user and token directly from registration response
      setUser(receivedUser);
      setToken(receivedToken);
      storeSession({ token: receivedToken, user: receivedUser });
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
      throw err; // Re-throw to handle in the component
    } finally {
      setLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    clearSession();
  }, []);

  const hasRole = useCallback(
    (...roles: Role[]) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    hasRole,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

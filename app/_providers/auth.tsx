'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import Cookies from 'js-cookie';

import { Role } from '@/schemas/role';

// Backend role mapping
const ROLE_MAPPING: Record<string, Role> = {
  'MANAGER': Role.Manager,
  'SHIPHOLDER': Role.Shipholder,
  'SHIPOWNER': Role.Shipholder, // Alternative naming
  'TECHNICIAN': Role.Technician,
};

// -----------------------------
// Types
// -----------------------------
export interface AuthUser {
  userId: number;
  email: string;
  fullName: string;
  role: Role;
  active: boolean;
  companyId: number;
  createdAt: string;
}

interface RegisterData {
  companyName: string;
  companyEmail: string;
  billingAddress: string;
  taxNumber: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
  loading: boolean;
  error: string | null;
}

// -----------------------------
// Utilities
// -----------------------------
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function storeSession(data: { token: string; user: AuthUser }) {
  // Store token in httpOnly-like cookie (as secure as possible on client)
  Cookies.set(TOKEN_KEY, data.token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  // Store user data in cookie as well
  Cookies.set(USER_KEY, JSON.stringify(data.user), {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
}

function clearSession() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
}

function loadSession(): { token: string; user: AuthUser } | null {
  try {
    const token = Cookies.get(TOKEN_KEY);
    const userStr = Cookies.get(USER_KEY);
    
    if (!token || !userStr) return null;
    
    const user = JSON.parse(userStr);
    return { token, user };
  } catch {
    return null;
  }
}

function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
}

// Utility function to get token for API requests
export function getAuthToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

// Utility function to make authenticated API requests
export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const apiUrl = getApiUrl();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(`${apiUrl}${url}`, {
    ...options,
    headers,
  });
}

// Utility function to verify user with backend
export async function verifyUserWithBackend(): Promise<AuthUser | null> {
  console.log("🔍 Verifying user with backend...");
  try {
    const response = await authenticatedFetch('/users/me');
    console.log("📡 Verification response status:", response.status);
    
    if (!response.ok) {
      if (response.status === 401) {
        console.log("❌ Token is invalid, clearing session");
        // Token is invalid, clear session
        clearSession();
      } else {
        console.error("❌ Verification failed with status:", response.status);
      }
      return null;
    }
    
    const userData = await response.json();
    console.log("✅ User verification successful:", {
      userId: userData.userId,
      email: userData.email,
      role: userData.role
    });
    
    // Map backend role to frontend role
    const mappedRole = ROLE_MAPPING[userData.role] || Role.Technician;
    console.log("🎭 Role mapping in verification:", { 
      backendRole: userData.role, 
      frontendRole: mappedRole 
    });
    
    return {
      userId: userData.userId,
      email: userData.email,
      fullName: userData.fullName,
      role: mappedRole,
      active: userData.active,
      companyId: userData.companyId,
      createdAt: userData.createdAt,
    };
  } catch (error) {
    console.error('💥 Error verifying user:', error);
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

  // Load session on mount and verify with backend
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔄 Initializing authentication...");
      const session = loadSession();
      if (session) {
        console.log("📦 Found existing session, verifying with backend...");
        // Verify session with backend
        const verifiedUser = await verifyUserWithBackend();
        if (verifiedUser) {
          console.log("✅ Session verified successfully");
          setUser(verifiedUser);
          setToken(session.token);
          // Update stored session with verified user data
          storeSession({ token: session.token, user: verifiedUser });
        } else {
          console.log("❌ Session verification failed, clearing session");
          // Clear invalid session
          clearSession();
        }
      } else {
        console.log("📭 No existing session found");
      }
      console.log("🏁 Authentication initialization completed");
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    console.log("🚀 Login process started for:", email);
    setLoading(true);
    setError(null);
    try {
      const apiUrl = getApiUrl();
      console.log("📍 API URL:", apiUrl);
      
      // Step 1: Authenticate and get token
      console.log("🔐 Step 1: Authenticating with /auth/signin...");
      const authRes = await fetch(`${apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("📡 Auth Response Status:", authRes.status);

      if (!authRes.ok) {
        const data = await authRes.json();
        console.error("❌ Authentication failed:", data);
        throw new Error(data.message || data.error || 'Login failed');
      }

      const authData = await authRes.json();
      console.log("✅ Authentication successful:", { 
        hasToken: !!authData.accessToken,
        tokenLength: authData.accessToken?.length || 0,
        message: authData.message,
        fullResponse: authData
      });
      
      const { accessToken: access_token } = authData;
      
      // Step 2: Store token temporarily
      console.log("🍪 Step 2: Storing token in cookies...");
      setToken(access_token);
      Cookies.set(TOKEN_KEY, access_token, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      console.log("✅ Token stored successfully");

      // Step 3: Get user details using /users/me
      console.log("👤 Step 3: Fetching user details from /users/me...");
      const userRes = await fetch(`${apiUrl}/users/me`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("📡 User Response Status:", userRes.status);

      if (!userRes.ok) {
        console.error("❌ Failed to fetch user details:", userRes.status);
        // Clear the token if user fetch fails
        clearSession();
        throw new Error('Failed to fetch user details');
      }

      const userData = await userRes.json();
      console.log("👤 User data received:", {
        userId: userData.userId,
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role,
        active: userData.active
      });
      
      // Step 4: Map backend role to frontend role
      console.log("🔄 Step 4: Mapping backend role to frontend role...");
      const mappedRole = ROLE_MAPPING[userData.role] || Role.Technician;
      console.log("🎭 Role mapping:", { 
        backendRole: userData.role, 
        frontendRole: mappedRole 
      });
      
      const user: AuthUser = {
        userId: userData.userId,
        email: userData.email,
        fullName: userData.fullName,
        role: mappedRole,
        active: userData.active,
        companyId: userData.companyId,
        createdAt: userData.createdAt,
      };

      // Step 5: Store complete session
      console.log("💾 Step 5: Storing complete session...");
      setUser(user);
      storeSession({ token: access_token, user });
      console.log("✅ Session stored successfully");
      console.log("🎉 Login process completed successfully!");
      
      return user;
    } catch (err: any) {
      console.error("💥 Login error:", err);
      setError(err.message ?? 'Unknown error');
      throw err;
    } finally {
      console.log("🏁 Login process finished");
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: RegisterData) => {
    console.log("📝 Registration process started");
    
    // Validate phone number format
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(userData.phoneNumber)) {
      throw new Error('Phone number must be in a valid format (e.g., +1 (555) 123-4567)');
    }
    
    console.log("📋 Registration data:", {
      companyName: userData.companyName,
      companyEmail: userData.companyEmail,
      email: userData.email,
      fullName: userData.fullName,
      role: userData.role,
      phoneNumber: userData.phoneNumber
    });
    setLoading(true);
    setError(null);
    try {
      const apiUrl = getApiUrl();
      console.log("📡 Registering with:", `${apiUrl}/auth/signup`);
      
      const res: Response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log("📡 Registration response status:", res.status);

      if (!res.ok) {
        const data: any = await res.json();
        console.error("❌ Registration failed:", data);
        throw new Error(data.message || data.error || 'Registration failed');
      }

      const regData: any = await res.json();
      console.log("✅ Registration successful:", regData);
    } catch (err: any) {
      console.error("💥 Registration error:", err);
      setError(err.message ?? 'Unknown error');
      throw err;
    } finally {
      console.log("🏁 Registration process finished");
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    console.log("🚪 Logging out user...");
    setUser(null);
    setToken(null);
    clearSession();
    console.log("✅ User logged out successfully");
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

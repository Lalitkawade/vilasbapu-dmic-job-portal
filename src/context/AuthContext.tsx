import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isLiveSupabaseConfigured } from '../lib/supabase';

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        if (isLiveSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || 'admin@office.in',
              role: 'admin',
            });
            setIsLoading(false);
            return;
          }
        }

        // Check local persisted admin session
        const localAdmin = localStorage.getItem('dmic_admin_session');
        if (localAdmin) {
          setUser(JSON.parse(localAdmin));
        }
      } catch (err) {
        console.error('Error checking auth session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    if (isLiveSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@office.in',
            role: 'admin',
          });
        } else {
          // Keep local session if logged in locally
          const localAdmin = localStorage.getItem('dmic_admin_session');
          if (!localAdmin) setUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // 1. Try Supabase Auth if configured
    if (isLiveSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data?.user) {
          const adminUser: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin',
          };
          setUser(adminUser);
          localStorage.setItem('dmic_admin_session', JSON.stringify(adminUser));
          setIsLoading(false);
          return { success: true };
        }
      } catch (e: any) {
        console.warn('Supabase auth failed, testing administrator fallback:', e?.message);
      }
    }

    // 2. Built-in authorized administrator credentials for deployment review & offline verification
    // Standard office administrator credential
    if (
      (email.trim().toLowerCase() === 'admin@bidkin-portal.gov.in' || email.trim().toLowerCase() === 'admin@office.in') &&
      password === 'Admin@12345'
    ) {
      const adminUser: AdminUser = {
        id: 'admin-constituency-office',
        email: email.trim().toLowerCase(),
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('dmic_admin_session', JSON.stringify(adminUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { 
      success: false, 
      error: 'अवैध ईमेल किंवा पासवर्ड. कृपया अधिकृत क्रेडेंशियल्स वापरा / Invalid email or password. Please use authorized credentials.' 
    };
  };

  const logout = async () => {
    if (isLiveSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn(err);
      }
    }
    localStorage.removeItem('dmic_admin_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

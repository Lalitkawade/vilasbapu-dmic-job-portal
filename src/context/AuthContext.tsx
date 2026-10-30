import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isLiveSupabaseConfigured } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
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
    // Check initial active Supabase session
    const checkSession = async () => {
      try {
        if (isLiveSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: 'admin',
            });
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error verifying administrative session:', err);
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
            email: session.user.email || '',
            role: 'admin',
          });
        } else {
          setUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    // Authenticate exclusively through Supabase Auth
    if (isLiveSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data?.user) {
          const adminUser: AdminUser = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            role: 'admin',
          };
          setUser(adminUser);
          setIsLoading(false);
          return { success: true };
        }

        setIsLoading(false);
        return { 
          success: false, 
          error: error?.message || 'अवैध ईमेल किंवा पासवर्ड. कृपया अधिकृत क्रेडेंशियल्स वापरा / Invalid email or password.' 
        };
      } catch (e: any) {
        setIsLoading(false);
        return { 
          success: false, 
          error: 'ऑथेंटिकेशन सेवा संपर्क त्रुटी / Authentication service error: ' + (e?.message || 'Connection failed') 
        };
      }
    }

    setIsLoading(false);
    return { 
      success: false, 
      error: 'प्रशासकीय लॉगिनसाठी Supabase ऑथेंटिकेशन सेवा कॉन्फिगर केलेली असणे आवश्यक आहे. / Administrative login requires a configured authentication backend.' 
    };
  };

  const logout = async () => {
    if (isLiveSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
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

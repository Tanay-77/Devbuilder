import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail, 
  signOutUser, 
  onAuthStateChange,
  updateUserAvatar
} from '../services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  createFreshProfile: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        setUser(user);
        return true;
      }
      return false;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await signInWithGoogle();
      if (user) {
        setUser(user);
        return true;
      }
      return false;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await signUpWithEmail(name, email, password);
      if (user) {
        setUser(user);
        return true;
      }
      return false;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signOutUser();
      setUser(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createFreshProfile = async (): Promise<void> => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const newAvatar = await updateUserAvatar(user.id);
      setUser(prev => prev ? { ...prev, avatar: newAvatar } : null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    signup,
    logout,
    isLoading,
    isAuthenticated: !!user,
    createFreshProfile,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
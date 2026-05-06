import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { loginWithMock, signupWithMock } from '../app/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, expectedRole?: UserRole) => Promise<User | null>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const persistUser = (nextUser: User | null) => {
    if (!nextUser) {
      localStorage.removeItem('eventra_user');
      return;
    }

    localStorage.setItem('eventra_user', JSON.stringify(nextUser));
  };

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('eventra_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, expectedRole?: UserRole) => {
    const foundUser = await loginWithMock({ email, password, expectedRole });
    if (!foundUser) {
      return null;
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    persistUser(foundUser);
    return foundUser;
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    const newUser = await signupWithMock({ name, email, password, role });

    setUser(newUser);
    setIsAuthenticated(true);
    persistUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    persistUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      persistUser(updatedUser);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      persistUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        switchRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

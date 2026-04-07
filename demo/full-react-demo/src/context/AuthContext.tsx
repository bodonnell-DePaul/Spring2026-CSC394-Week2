// ============================================================
// AuthContext — Context API for Authentication State
// ============================================================
// WHAT THIS DOES:
//   Shares the current user's login state across all components.
//   Any component can call useAuth() to check if the user is
//   logged in, see their role, or trigger login/logout.
//
// WITHOUT THIS:
//   Every component that needs auth info would require the user
//   object passed down as a prop through every parent. Logging
//   out from a deeply nested component would need a callback
//   prop drilled through the entire tree. The code becomes
//   fragile and tightly coupled.
// ============================================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('demoUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demoUser');
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  // Load user from localStorage on mount (useEffect with empty deps)
  useEffect(() => {
    const saved = localStorage.getItem('demoUser');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Restore the Date object which gets serialized to string
        parsed.lastActive = new Date(parsed.lastActive);
        setUser(parsed);
      } catch {
        localStorage.removeItem('demoUser');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../api/AuthCheck';

interface AuthContextType {
  isAuthenticated: boolean | null; // null = loading, true = authenticated, false = not authenticated
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      const authenticated = await checkAuth();
      setIsAuthenticated(authenticated);
      
      // Handle navigation based on authentication status
      if (authenticated) {
        navigate("/");
      } else {
        navigate("/login/unauthorized");
      }
    } catch (error) {
      console.error('인증 확인 실패:', error);
      setIsAuthenticated(false);
      navigate("/login/auth");
    }
  };

  useEffect(() => {
    // Only check auth on initial load, not on every render
    if (isAuthenticated === null) {
      checkAuthStatus();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
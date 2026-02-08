import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAccessToken, getUser, saveTokens, saveUser, clearAuth } from '../utils/storage';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        const savedUser = await getUser();
        if (savedUser) {
          setUser(savedUser);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    const { accessToken, refreshToken, user: userData } = response.data;

    await saveTokens(accessToken, refreshToken);
    await saveUser(userData);

    setUser(userData);
    setIsAuthenticated(true);
  };

  const register = async (userData) => {
    await authApi.register(userData);
  };

  const logout = async () => {
    await clearAuth();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

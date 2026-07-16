import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'easyhisaab.auth.user';

const mockUsers = [
  {
    id: 'mock-owner-1',
    fullName: 'Rajesh Kumar',
    shopName: 'Kirana House',
    mobile: '9876543210',
    email: 'rajesh@example.com',
    password: 'Password123',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ identifier, password }) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const normalizedIdentifier = String(identifier || '').trim().toLowerCase();
    const matchedUser = mockUsers.find((candidate) => {
      const emailMatches = candidate.email.toLowerCase() === normalizedIdentifier;
      const mobileMatches = candidate.mobile === normalizedIdentifier;
      return emailMatches || mobileMatches;
    });

    if (!matchedUser || matchedUser.password !== password) {
      setLoading(false);
      throw new Error('Invalid email/mobile or password.');
    }

    const safeUser = {
      id: matchedUser.id,
      fullName: matchedUser.fullName,
      shopName: matchedUser.shopName,
      mobile: matchedUser.mobile,
      email: matchedUser.email,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    setLoading(false);
    return safeUser;
  };

  const register = async (formData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const duplicate = mockUsers.find((candidate) => candidate.email.toLowerCase() === String(formData.email || '').trim().toLowerCase());
    if (duplicate) {
      setLoading(false);
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: `mock-owner-${Date.now()}`,
      fullName: formData.fullName,
      shopName: formData.shopName,
      mobile: formData.mobile,
      email: formData.email,
    };

    mockUsers.push({ ...newUser, password: formData.password });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
    return newUser;
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
    register,
    loading,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

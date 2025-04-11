// context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      setLoading(true);
      const response = await authService.checkSession();
      setUser(response.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials) => {
    try {
      setError(null);
      const response = await authService.signup(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message); // err.message is now a string
      throw err;
    }
  };

  const signin = async (credentials) => {
    try {
      setError(null);
      const response = await authService.signin(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message); // err.message is now a string
      throw err;
    }
  };

  const signout = async () => {
    try {
      await authService.signout();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      setError(null);
      return await authService.changePassword(passwordData);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      return await authService.forgotPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const resetPassword = async (resetData) => {
    try {
      setError(null);
      return await authService.resetPassword(resetData);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const hasRole = (role) => user?.role === role;

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    changePassword,
    forgotPassword,
    resetPassword,
    checkSession,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
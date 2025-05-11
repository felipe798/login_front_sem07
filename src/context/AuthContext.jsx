// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const user = await AuthService.login(username, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  const register = async (username, email, password) => {
    try {
      await AuthService.register(username, email, password);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.roles?.includes("ROLE_ADMIN"),
    isModerator: currentUser?.roles?.includes("ROLE_MODERATOR"),
    login,
    logout,
    register,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
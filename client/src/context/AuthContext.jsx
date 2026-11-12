
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore existing session
  const refreshUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();

      if (!response.success || !response.user) {
        setUser(null);
        return null;
      }

      setUser(response.user);
      return response.user;

    } catch (error) {
      setUser(null);
      return null;
    }
  }, []);

  // Initialize authentication on application load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [refreshUser]);

  // Login
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    if (!response.success || !response.user) {
      throw new Error(response.message || "Login failed");
    }

    setUser(response.user);

    return response;
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

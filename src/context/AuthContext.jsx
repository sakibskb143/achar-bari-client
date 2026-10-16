import { createContext, useContext, useEffect, useState } from "react";

import {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
  sendPasswordReset,
  subscribeToAuthChanges,
  updateUserDisplayName,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserProfile = async (name) => {
    const updatedUser = await updateUserDisplayName(name);

    setCurrentUser(updatedUser);

    return updatedUser;
  };

  const value = {
    currentUser,
    authLoading,
    isAuthenticated: Boolean(currentUser),
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    sendPasswordReset,
    logoutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
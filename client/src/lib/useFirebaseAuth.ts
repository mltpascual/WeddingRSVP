import { useState, useEffect, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "./firebase";

export type AuthState = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

/**
 * React hook for Firebase Authentication.
 * Provides login (email/password), logout, and auth state.
 */
export function useFirebaseAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase is not configured. Please set environment variables.");
    }
    setError(null);
    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      const message =
        err?.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : err?.code === "auth/too-many-requests"
          ? "Too many attempts. Please try again later."
          : err?.message || "Login failed. Please try again.";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (err: any) {
      console.error("Logout failed:", err);
    }
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
  };
}

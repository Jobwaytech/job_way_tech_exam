/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import toast from "react-hot-toast";

interface UserData {
  uid: string;
  email: string | null;
  role: string;
  fullName: string;
  department?: string;
  permissions: string[];
}

interface AuthState {
  user: any | null;
  userData: UserData | null;
  loading: boolean;
  userRole: "hr" | "user";
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: any | null) => void;
  setUserData: (userData: UserData | null) => void;
}

const API_URL = "http://localhost:5000/api";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userData: null,
  loading: false,
  userRole: "user",

  signIn: async (email: string, password: string) => {
    const lockoutUntilRaw = localStorage.getItem("exam_lockout_until");
    if (lockoutUntilRaw) {
      const lockoutUntil = parseInt(lockoutUntilRaw, 10);
      if (!Number.isNaN(lockoutUntil) && Date.now() < lockoutUntil) {
        throw new Error("User is currently locked out");
      }
    }

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Invalid login credentials");
    }

    localStorage.setItem("exam_token", data.token);
    localStorage.setItem("exam_user", JSON.stringify(data.user));

    const userRole = data.user.role === "hr" ? "hr" : "user";

    set({
      user: data.user,
      userData: data.user,
      userRole,
      loading: false,
    });

    toast.success("Successfully signed in!");
  },

  signOut: async () => {
    localStorage.removeItem("exam_token");
    localStorage.removeItem("exam_user");
    set({ user: null, userData: null, userRole: "user" });
    toast.success("Successfully signed out!");
  },

  setUser: (user) => {
    const userRole = user?.role === "hr" ? "hr" : "user";
    set({ user, loading: false, userRole });
  },

  setUserData: (userData) => set({ userData }),
}));

if (typeof window !== "undefined") {
  const savedUser = localStorage.getItem("exam_user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    useAuthStore.getState().setUser(parsedUser);
    useAuthStore.getState().setUserData(parsedUser);
  }
}
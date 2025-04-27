import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: any | null;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn:
    typeof window !== "undefined" ? !!localStorage.getItem("authToken") : false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  user: null,
  setUser: (user) => set({ user }),
}));

import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: any | null;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn:
    typeof window !== "undefined" ? Boolean(Cookies.get("authToken")) : false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  user: null,
  setUser: (user) => set({ user }),
}));

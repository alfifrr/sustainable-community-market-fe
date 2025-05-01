import { create } from "zustand";
import Cookies from "js-cookie";

interface UserData {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  date_joined: string;
  last_activity: string;
  role: "buyer" | "seller";
}

export interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  role: "seller" | "buyer" | null;
  setRole: (role: "seller" | "buyer" | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn:
    typeof window !== "undefined" ? Boolean(Cookies.get("authToken")) : false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  user: null,
  setUser: (user) => set({ user }),
  role: null,
  setRole: (role) => {
    if (role) {
      Cookies.set("userRole", role);
    } else {
      Cookies.remove("userRole");
    }
    set({ role });
  },
}));

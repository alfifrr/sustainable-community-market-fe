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
}

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn:
    typeof window !== "undefined" ? Boolean(Cookies.get("authToken")) : false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  user: null,
  setUser: (user) => set({ user }),
}));

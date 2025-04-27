"use client";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuthStore();

  const login = (tokens: { access_token: string; refresh_token: string }) => {
    localStorage.setItem("authToken", tokens.access_token);
    localStorage.setItem("refreshToken", tokens.refresh_token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, login, user, logout };
};

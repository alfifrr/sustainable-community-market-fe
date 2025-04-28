"use client";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";

export const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuthStore();

  const login = (tokens: { access_token: string; refresh_token: string }) => {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("refreshToken");

    // localStorage.setItem("authToken", tokens.access_token);
    // localStorage.setItem("refreshToken", tokens.refresh_token);
    Cookies.set("authToken", tokens.access_token, {
      expires: 1 / 96, // 15 minutes
      path: "/",
    });
    Cookies.set("refreshToken", tokens.refresh_token, {
      expires: 30, // 30 days
      path: "/",
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("refreshToken");
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, login, user, logout };
};

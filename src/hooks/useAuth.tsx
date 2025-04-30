"use client";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

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

  const register = async (userData: any) => {
    try {
      const response = await axios.post(API_ENDPOINTS.USERS, userData);
      if (response.data) {
        // After successful registration, log the user in
        login({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
        setUser(response.data.user);
        return response.data;
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return { isLoggedIn, login, user, logout, register };
};

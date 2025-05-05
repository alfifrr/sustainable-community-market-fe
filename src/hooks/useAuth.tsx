"use client";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface LoginCredentials {
  username: string;
  password: string;
  role: "BUYER" | "SELLER";
}

export const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
      if (response.data) {
        Cookies.set("authToken", response.data.access_token, {
          expires: 1 / 96, // 15 minutes
          path: "/",
        });
        Cookies.set("refreshToken", response.data.refresh_token, {
          expires: 30, // 30 days
          path: "/",
        });
        setIsLoggedIn(true);
        setUser(response.data.user);
        return response.data;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
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
          username: userData.username,
          password: userData.password,
          role: userData.role,
        });
        return response.data;
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return { isLoggedIn, login, user, logout, register };
};

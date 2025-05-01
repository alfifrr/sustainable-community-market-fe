"use client";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "@/lib/endpoints";
import axiosInstance from "@/lib/interceptor";
import type { ProfileResponse } from "@/lib/types";

export const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser, setRole } = useAuthStore();

  const login = async (tokens: {
    access_token: string;
    refresh_token: string;
  }) => {
    Cookies.set("authToken", tokens.access_token, {
      expires: 1 / 96, // 15 minutes
      path: "/",
    });
    Cookies.set("refreshToken", tokens.refresh_token, {
      expires: 30, // 30 days
      path: "/",
    });
    setIsLoggedIn(true);

    // Fetch profile immediately after login to sync role
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        API_ENDPOINTS.PROFILE
      );
      if (response.data.status === "success") {
        setRole(response.data.data.role);
      }
    } catch (err) {
      console.error("Error fetching profile after login:", err);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    setUser(null);
    setRole(null);
  };

  return { isLoggedIn, login, user, logout };
};

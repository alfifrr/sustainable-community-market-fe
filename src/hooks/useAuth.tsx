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

    // Fetch profile immediately after login to sync role and user data
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        API_ENDPOINTS.PROFILE
      );
      if (response.data.status === "success") {
        const profileData = response.data.data;
        // Set both role and user data
        setRole(profileData.role);
        setUser({
          id: profileData.id.toString(),
          username: profileData.username,
          email: profileData.contact_info.email,
          first_name: profileData.contact_info.first_name,
          last_name: profileData.contact_info.last_name,
          is_verified: profileData.is_verified,
          date_joined: profileData.date_joined,
          last_activity: profileData.last_activity || "",
          role: profileData.role,
        });
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

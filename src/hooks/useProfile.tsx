"use client";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { Profile, ProfileResponse } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";
import type { AuthState } from "@/store/authStore";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { setRole, setUser } = useAuthStore((state: AuthState) => state);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<ProfileResponse>(
        API_ENDPOINTS.PROFILE
      );
      if (response.data.status === "success") {
        const profileData = response.data.data;
        setProfile(profileData);
        // Sync role and user data with auth store
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
      setError("Failed to load profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  }, [setRole, setUser]);

  const refreshProfile = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, refreshProfile };
};

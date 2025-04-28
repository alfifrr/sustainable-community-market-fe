"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { Profile, ProfileResponse } from "@/lib/types";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<ProfileResponse>(
        API_ENDPOINTS.PROFILE
      );
      if (response.data.status === "success") {
        setProfile(response.data.data);
      }
    } catch (err) {
      setError("Failed to load profile data");
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = () => {
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, isLoading, error, refreshProfile };
};

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/authStore";

export const useAuthSync = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const checkAuthStatus = () => {
      const hasToken = Boolean(Cookies.get("authToken"));
      setIsLoggedIn(hasToken);
    };

    // Check initially
    checkAuthStatus();

    // Set up an interval to check periodically
    const interval = setInterval(checkAuthStatus, 1000);

    // Clean up
    return () => clearInterval(interval);
  }, [setIsLoggedIn]);
};

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

export const useAuthSync = () => {
  const { setIsLoggedIn, user } = useAuthStore();
  const setCurrentCartId = useCartStore((state) => state.setCurrentCartId);

  useEffect(() => {
    const checkAuthStatus = () => {
      const hasToken = Boolean(Cookies.get("authToken"));
      setIsLoggedIn(hasToken);

      // Set current cart ID based on auth status
      if (hasToken && user?.id) {
        setCurrentCartId(user.id);
      } else {
        setCurrentCartId("guest");
      }
    };

    // Check initially
    checkAuthStatus();

    // Set up an interval to check periodically
    const interval = setInterval(checkAuthStatus, 1000);

    // Clean up
    return () => clearInterval(interval);
  }, [setIsLoggedIn, setCurrentCartId, user?.id]);
};

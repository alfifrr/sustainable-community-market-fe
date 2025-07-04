import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/authStore";
import { API_ENDPOINTS } from "./endpoints";

interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const { access_token } = response.data.data;
    Cookies.set("authToken", access_token, {
      expires: 1 / 96, // 15 minutes
      path: "/",
    });

    useAuthStore.getState().setIsLoggedIn(true);
    return access_token;
  } catch {
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    useAuthStore.getState().setIsLoggedIn(false);
    useAuthStore.getState().setUser(null);
    return null;
  }
};

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("authToken");

    if (!token && Cookies.get("refreshToken")) {
      token = await refreshAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = await refreshAccessToken();
        if (token) {
          processQueue(null, token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
        throw new Error("Failed to refresh token");
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

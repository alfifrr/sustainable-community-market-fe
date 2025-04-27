import axios from "axios";
import { isTokenExpired } from "@/utils/tokenUtils";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshTokenPromise: Promise<string> | null = null;

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const response = await axios.post("/api/refresh-token", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });
    const { access_token } = response.data.data;
    localStorage.setItem("authToken", access_token);
    return access_token;
  } catch (error) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (isTokenExpired(token)) {
        try {
          refreshTokenPromise = refreshTokenPromise || refreshAccessToken();
          const newToken = await refreshTokenPromise;
          config.headers.Authorization = `Bearer ${newToken}`;
        } finally {
          refreshTokenPromise = null;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        refreshTokenPromise = refreshTokenPromise || refreshAccessToken();
        const newToken = await refreshTokenPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // const refreshToken = localStorage.getItem("refreshToken");
        // const response = await axios.post("/api/refresh", {
        //   refresh_token: refreshToken,
        // });

        // const { access_token } = response.data.data;
        // localStorage.setItem("authToken", access_token);

        // // Retry original request with new token
        // originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } finally {
        // catch (refreshError) {
        //   // If refresh token is invalid, logout user
        //   localStorage.removeItem("authToken");
        //   localStorage.removeItem("refreshToken");
        //   window.location.href = "/login";
        //   return Promise.reject(refreshError);
        // }
        refreshTokenPromise = null;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

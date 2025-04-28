// Use relative URLs since we're using rewrites
export const API_ENDPOINTS = {
  USERS: "/api/users",
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  PRODUCTS: "/api/products",
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  LOGIN: "/api/login",
  PROFILE: "/api/profile",
  REFRESH_TOKEN: "/api/refresh-token",
  // Add other endpoints as needed
};

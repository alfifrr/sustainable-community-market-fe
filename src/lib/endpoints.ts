// Use relative URLs since we're using rewrites in next.config.ts
export const API_ENDPOINTS = {
  USERS: "/api/users",
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  PRODUCTS: "/api/products",
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  CATEGORY: "/api/category",
  ADDRESSES: "/api/addresses",
  LOGIN: "/api/login",
  PROFILE: "/api/profile",
  REFRESH_TOKEN: "/api/refresh-token",
  DEPOSIT: "/api/deposit",
  BUY: "/api/buy",
  PRODUCT_HISTORY: "/api/product-history",
  CANCEL: "/api/cancel",
  PROCESS: "/api/process",
  PROCESSED_PRODUCT: "/api/processed-products",
  PROCESSED_PRODUCT_BY_ID: (id: string) => `/api/processed-products/${id}`,
  TRANSACTIONS: "/api/transactions",
  EXPEDITIONS: "/api/expeditions",
  SEND_ACTIVATION: "/api/send-activation",
  AVAILABLE_CERTIFICATIONS: "/api/sustainability/certifications",
  // Add other endpoints as needed
};

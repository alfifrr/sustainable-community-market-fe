// export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const API_ENDPOINTS = {
//   USERS: `${API_URL}/users`,
//   USER_BY_ID: (id: string) => `${API_URL}/users/${id}`,
//   PRODUCTS: `${API_URL}/products`,
//   PRODUCT_BY_ID: (id: string) => `${API_URL}/products/${id}`,
//   // Add other endpoints as needed
// };

// Use relative URLs since we're using rewrites
export const API_ENDPOINTS = {
  USERS: "/api/users",
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  PRODUCTS: "/api/products",
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  LOGIN: "/api/login",
  // Add other endpoints as needed
};

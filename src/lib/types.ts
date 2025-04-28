export interface User {
  id: string;
  name: string;
  date_joined: string;
  date_updated: string;
  is_verified: false;
  last_activity: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface PickupAddress {
  id: number;
  label: string;
  address: string;
  contact_person: string;
  details: string;
}

export interface ProductUser {
  id: number;
  name: string;
  is_verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  expiration_date: string;
  product_posted: string;
  product_updated: string | null;
  category: Category;
  pickup_address: PickupAddress;
  user: ProductUser;
}

export interface ContactInfo {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface Profile {
  balance: number;
  contact_info: ContactInfo;
  date_joined: string;
  date_updated: string;
  id: number;
  is_verified: boolean;
  last_activity: string;
  username: string;
}

export interface ProfileResponse {
  data: Profile;
  message: string;
  status: string;
}

export interface ApiError {
  status: string;
  message: string;
  errors?: Record<string, string[]>;
}

export interface SignupRequest {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface SignupError {
  error: string;
  message: Record<string, string[]>;
  status: string;
}

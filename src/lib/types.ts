export interface User {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  date_joined: string;
  last_activity: string;
}

export interface Category {
  id: string;
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
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: Category;
  user: ProductUser;
  product_posted: string;
  expiration_date: string;
  pickup_address: PickupAddress;
  created_at: string;
  updated_at: string;
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

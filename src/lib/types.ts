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
  id: number;
  username: string;
  role: "seller" | "buyer";
  contact_info: ContactInfo;
  balance: number;
  is_verified: boolean;
  date_joined: string;
  date_updated: string;
  last_activity: string | null;
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

interface Address {
  id: number;
  label: string;
  address: string;
  contact_person: string;
  details: string;
  date_created: string;
  date_updated: string | null;
  user_id: number;
}

interface ProductDetails extends Product {
  description: string;
  price: number;
  stock: number;
  expiration_date: string;
  product_posted: string;
  product_updated: string | null;
  imageUrl?: string;
  category: Category;
  applied_discounts?: {
    bulk?: {
      amount: number;
      percentage: number;
    };
    expiration?: {
      amount: number;
      percentage: number;
    };
  };
  user: User & { is_verified: boolean };
  pickup_address: Omit<Address, "user_id" | "date_created" | "date_updated">;
}

export interface Transaction {
  id: number;
  buyer: User;
  seller: User;
  product: Product;
  product_details: ProductDetails;
  quantity: number;
  total_price: number;
  delivery_status: "pending" | "processing" | "completed" | "cancelled";
  delivery_address_details: Address;
  pickup_address_details: Address;
  created_at: string;
  updated_at: string | null;
  rating: number | null;
  review_date: string | null;
  testimonial: string | null;
}

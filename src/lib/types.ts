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

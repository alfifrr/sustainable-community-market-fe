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
  average_rating?: number;
  total_items_sold?: number;
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

// interface ProductDetails extends Product {
//   description: string;
//   price: number;
//   stock: number;
//   expiration_date: string;
//   product_posted: string;
//   product_updated: string | null;
//   imageUrl?: string;
//   category: Category;
//   applied_discounts?: {
//     bulk?: {
//       amount: number;
//       percentage: number;
//     };
//     expiration?: {
//       amount: number;
//       percentage: number;
//     };
//   };
//   user: ProductUser & { is_verified: boolean };
//   pickup_address: PickupAddress;
// }

export interface Transaction {
  id: number;
  buyer: User;
  seller: User;
  product: Product;
  product_details: {
    id: string;
    name: string;
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
    user: ProductUser & { is_verified: boolean };
    pickup_address: PickupAddress;
  };
  quantity: number;
  total_price: number;
  delivery_status:
    | "pending"
    | "cancelled"
    | "processed"
    | "delivered"
    | "rated";
  delivery_address_details: Address;
  pickup_address_details: Address;
  created_at: string;
  updated_at: string | null;
  rating: number | null;
  review_date: string | null;
  testimonial: string | null;
}

export interface ProcessedTransaction {
  id: number;
  buyer: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  product_details: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    expiration_date: string;
    product_posted: string;
    product_updated: string | null;
    category: {
      id: number;
      name: string;
    };
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
    user: {
      id: number;
      name: string;
      is_verified: boolean;
    };
    pickup_address: {
      id: number;
      label: string;
      address: string;
      contact_person: string;
      details: string;
    };
  };
  delivery_status: string;
  delivery_address_details: {
    id: number;
    label: string;
    address: string;
    contact_person: string;
    details: string;
    date_created: string;
    date_updated: string | null;
    user_id: number;
  };
  pickup_address_details: {
    id: number;
    label: string;
    address: string;
    contact_person: string;
    details: string;
    date_created: string;
    date_updated: string | null;
    user_id: number;
  };
  quantity: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  confirmation_details: {
    confirmation_date: string | null;
    confirmed_by: string | null;
  };
  rating: number | null;
  review_date: string | null;
  testimonial: string | null;
}

export interface ProductReviewResponse {
  data: {
    average_rating?: number;
    product_id: number;
    reviews: {
      rating: number;
      review_date: string;
      reviewer: {
        id: number;
        name: string;
      };
      testimonial: string | null;
    }[];
    total_items_sold: number;
    total_reviews?: number;
  };
  message: string;
  status: string;
}

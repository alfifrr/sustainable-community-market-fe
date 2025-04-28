export interface User {
  id: string;
  name: string;
  date_joined: string;
  date_updated: string;
  is_verified: false;
  last_activity: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
    is_verified: boolean;
  };
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

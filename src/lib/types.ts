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

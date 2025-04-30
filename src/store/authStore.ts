import { create } from "zustand";
import Cookies from "js-cookie";
import { UserRole, Permission, RolePermissions } from "@/lib/types";

interface UserData {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  date_joined: string;
  last_activity: string;
  role: UserRole;
  permissions: Permission[];
}

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  hasRole: (role: UserRole) => boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  getRolePermissions: () => Permission[];
  updateUserRole: (newRole: UserRole) => void;
  mockLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock users for testing
const mockUsers: Record<string, UserData> = {
  'admin123': {
    id: '1',
    username: 'admin123',
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    is_verified: true,
    date_joined: '2024-01-01',
    last_activity: new Date().toISOString(),
    role: UserRole.ADMIN,
    permissions: RolePermissions[UserRole.ADMIN]
  },
  'seller123': {
    id: '2',
    username: 'seller123',
    email: 'seller@example.com',
    first_name: 'Seller',
    last_name: 'User',
    is_verified: true,
    date_joined: '2024-01-01',
    last_activity: new Date().toISOString(),
    role: UserRole.SELLER,
    permissions: RolePermissions[UserRole.SELLER]
  },
  'buyer123': {
    id: '3',
    username: 'buyer123',
    email: 'buyer@example.com',
    first_name: 'Buyer',
    last_name: 'User',
    is_verified: true,
    date_joined: '2024-01-01',
    last_activity: new Date().toISOString(),
    role: UserRole.BUYER,
    permissions: RolePermissions[UserRole.BUYER]
  }
};

// Mock passwords for testing
const mockPasswords: Record<string, string> = {
  'admin123': 'admin123',
  'seller123': 'seller123',
  'buyer123': 'buyer123'
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: typeof window !== "undefined" ? Boolean(Cookies.get("authToken")) : false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  user: null,
  setUser: (user) => {
    if (user) {
      Cookies.set("userRole", user.role);
      Cookies.set("authToken", "mock-token");
      // Set default permissions based on role if not provided
      if (!user.permissions || user.permissions.length === 0) {
        user.permissions = RolePermissions[user.role];
      }
    } else {
      Cookies.remove("userRole");
      Cookies.remove("authToken");
    }
    set({ user });
  },
  hasRole: (role) => {
    const { user } = get();
    return user?.role === role;
  },
  hasPermission: (permission) => {
    const { user } = get();
    return user?.permissions.includes(permission) ?? false;
  },
  hasAnyPermission: (permissions) => {
    const { user } = get();
    return permissions.some(permission => user?.permissions.includes(permission)) ?? false;
  },
  hasAllPermissions: (permissions) => {
    const { user } = get();
    return permissions.every(permission => user?.permissions.includes(permission)) ?? false;
  },
  getRolePermissions: () => {
    const { user } = get();
    return user ? RolePermissions[user.role] : [];
  },
  updateUserRole: (newRole) => {
    const { user } = get();
    if (user) {
      const updatedUser = {
        ...user,
        role: newRole,
        permissions: RolePermissions[newRole]
      };
      set({ user: updatedUser });
      Cookies.set("userRole", newRole);
    }
  },
  mockLogin: async (username: string, password: string) => {
    const user = mockUsers[username];
    const correctPassword = mockPasswords[username];

    if (user && password === correctPassword) {
      get().setUser(user);
      set({ isLoggedIn: true });
      return true;
    }
    return false;
  },
  logout: () => {
    get().setUser(null);
    set({ isLoggedIn: false });
  }
})); 
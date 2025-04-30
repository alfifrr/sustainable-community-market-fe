export enum UserRole {
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  BUYER = "BUYER"
}

export enum Permission {
  // Admin permissions
  MANAGE_USERS = "MANAGE_USERS",
  MANAGE_ROLES = "MANAGE_ROLES",
  MANAGE_PRODUCTS = "MANAGE_PRODUCTS",
  MANAGE_ORDERS = "MANAGE_ORDERS",
  MANAGE_SETTINGS = "MANAGE_SETTINGS",
  
  // Seller permissions
  CREATE_PRODUCT = "CREATE_PRODUCT",
  EDIT_PRODUCT = "EDIT_PRODUCT",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  VIEW_ORDERS = "VIEW_ORDERS",
  MANAGE_INVENTORY = "MANAGE_INVENTORY",
  
  // Buyer permissions
  PLACE_ORDER = "PLACE_ORDER",
  VIEW_PRODUCTS = "VIEW_PRODUCTS",
  RATE_PRODUCTS = "RATE_PRODUCTS",
  MANAGE_PROFILE = "MANAGE_PROFILE"
}

export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.MANAGE_ROLES,
    Permission.MANAGE_PRODUCTS,
    Permission.MANAGE_ORDERS,
    Permission.MANAGE_SETTINGS
  ],
  [UserRole.SELLER]: [
    Permission.CREATE_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.DELETE_PRODUCT,
    Permission.VIEW_ORDERS,
    Permission.MANAGE_INVENTORY
  ],
  [UserRole.BUYER]: [
    Permission.PLACE_ORDER,
    Permission.VIEW_PRODUCTS,
    Permission.RATE_PRODUCTS,
    Permission.MANAGE_PROFILE
  ]
}; 
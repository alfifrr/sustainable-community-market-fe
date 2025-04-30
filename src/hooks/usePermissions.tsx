import { useAuthStore } from "@/store/authStore";
import { Permission, UserRole } from "@/lib/types";

export const usePermissions = () => {
  const { user, hasRole, hasPermission, hasAnyPermission, hasAllPermissions } = useAuthStore();

  const checkPermission = (permission: Permission): boolean => {
    return hasPermission(permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    return hasAnyPermission(permissions);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    return hasAllPermissions(permissions);
  };

  const checkRole = (role: UserRole): boolean => {
    return hasRole(role);
  };

  const isAdmin = (): boolean => {
    return checkRole(UserRole.ADMIN);
  };

  const isSeller = (): boolean => {
    return checkRole(UserRole.SELLER);
  };

  const isBuyer = (): boolean => {
    return checkRole(UserRole.BUYER);
  };

  const canManageProducts = (): boolean => {
    return checkAnyPermission([
      Permission.CREATE_PRODUCT,
      Permission.EDIT_PRODUCT,
      Permission.DELETE_PRODUCT
    ]);
  };

  const canManageOrders = (): boolean => {
    return checkPermission(Permission.MANAGE_ORDER);
  };

  const canManageUsers = (): boolean => {
    return checkPermission(Permission.MANAGE_USERS);
  };

  const canViewAnalytics = (): boolean => {
    return checkAnyPermission([
      Permission.VIEW_ANALYTICS,
      Permission.SELLER_ANALYTICS
    ]);
  };

  return {
    user,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    checkRole,
    isAdmin,
    isSeller,
    isBuyer,
    canManageProducts,
    canManageOrders,
    canManageUsers,
    canViewAnalytics
  };
}; 
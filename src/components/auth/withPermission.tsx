import React, { ComponentType } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/lib/types';

interface WithPermissionProps {
  requiredPermission?: Permission;
  requiredPermissions?: Permission[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
}

export function withPermission<P extends object>(
  WrappedComponent: ComponentType<P>,
  {
    requiredPermission,
    requiredPermissions,
    requireAll = false,
    fallback = null
  }: WithPermissionProps
) {
  return function WithPermissionComponent(props: P) {
    const {
      checkPermission,
      checkAnyPermission,
      checkAllPermissions
    } = usePermissions();

    const hasAccess = () => {
      if (requiredPermission) {
        return checkPermission(requiredPermission);
      }

      if (requiredPermissions) {
        return requireAll
          ? checkAllPermissions(requiredPermissions)
          : checkAnyPermission(requiredPermissions);
      }

      return true;
    };

    if (!hasAccess()) {
      return fallback;
    }

    return <WrappedComponent {...props} />;
  };
} 
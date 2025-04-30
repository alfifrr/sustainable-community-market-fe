import React from 'react';
import Link from 'next/link';
import { usePermissions } from '@/hooks/usePermissions';
import { UserRole } from '@/lib/types';

interface NavItem {
  label: string;
  href: string;
  roles: UserRole[];
  icon?: React.ReactNode;
}

const navigationItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    roles: [UserRole.BUYER, UserRole.SELLER, UserRole.ADMIN]
  },
  {
    label: 'Products',
    href: '/products',
    roles: [UserRole.BUYER, UserRole.SELLER, UserRole.ADMIN]
  },
  {
    label: 'Create Product',
    href: '/products/create',
    roles: [UserRole.SELLER, UserRole.ADMIN]
  },
  {
    label: 'Manage Products',
    href: '/products/manage',
    roles: [UserRole.SELLER, UserRole.ADMIN]
  },
  {
    label: 'Orders',
    href: '/orders',
    roles: [UserRole.BUYER, UserRole.SELLER, UserRole.ADMIN]
  },
  {
    label: 'Seller Dashboard',
    href: '/seller/dashboard',
    roles: [UserRole.SELLER]
  },
  {
    label: 'Admin Dashboard',
    href: '/admin',
    roles: [UserRole.ADMIN]
  },
  {
    label: 'User Management',
    href: '/admin/users',
    roles: [UserRole.ADMIN]
  },
  {
    label: 'Role Management',
    href: '/admin/roles',
    roles: [UserRole.ADMIN]
  }
];

export const RoleBasedNav: React.FC = () => {
  const { user, checkRole } = usePermissions();

  if (!user) {
    return null;
  }

  const filteredNavItems = navigationItems.filter(item =>
    item.roles.includes(user.role)
  );

  return (
    <nav className="flex flex-col space-y-2">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center px-4 py-2 text-base-content hover:bg-base-200 rounded-lg transition-colors"
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}; 
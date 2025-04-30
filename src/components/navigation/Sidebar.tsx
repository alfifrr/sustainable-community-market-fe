"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/lib/types";

interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  // Admin Navigation
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "📊",
    roles: [UserRole.ADMIN, UserRole.SELLER, UserRole.BUYER],
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "👥",
    roles: [UserRole.ADMIN],
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: "📦",
    roles: [UserRole.ADMIN],
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: "🛒",
    roles: [UserRole.ADMIN],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: "📈",
    roles: [UserRole.ADMIN],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "⚙️",
    roles: [UserRole.ADMIN],
  },

  // Seller Navigation
  {
    title: "My Products",
    href: "/seller/products",
    icon: "📦",
    roles: [UserRole.SELLER],
  },
  {
    title: "Orders",
    href: "/seller/orders",
    icon: "🛒",
    roles: [UserRole.SELLER],
  },
  {
    title: "Inventory",
    href: "/seller/inventory",
    icon: "📋",
    roles: [UserRole.SELLER],
  },
  {
    title: "Sales",
    href: "/seller/sales",
    icon: "💰",
    roles: [UserRole.SELLER],
  },
  {
    title: "Store Settings",
    href: "/seller/settings",
    icon: "⚙️",
    roles: [UserRole.SELLER],
  },

  // Buyer Navigation
  {
    title: "My Orders",
    href: "/buyer/orders",
    icon: "🛒",
    roles: [UserRole.BUYER],
  },
  {
    title: "Saved Items",
    href: "/buyer/saved",
    icon: "❤️",
    roles: [UserRole.BUYER],
  },
  {
    title: "Profile",
    href: "/buyer/profile",
    icon: "👤",
    roles: [UserRole.BUYER],
  },
  {
    title: "Addresses",
    href: "/buyer/addresses",
    icon: "📍",
    roles: [UserRole.BUYER],
  },
  {
    title: "Payment Methods",
    href: "/buyer/payment",
    icon: "💳",
    roles: [UserRole.BUYER],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (!user) return null;

  const filteredNavItems = navigationItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
      <div className="p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Marketplace</h2>
          <p className="text-sm text-gray-500">Welcome, {user.first_name}</p>
        </div>

        <nav className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 
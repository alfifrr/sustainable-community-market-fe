"use client";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/navigation/Sidebar";

export default function Dashboard() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content with Sidebar Offset */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.first_name}!
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Role: {user.role}
                </span>
                <button
                  onClick={() => useAuthStore.getState().logout()}
                  className="btn btn-sm btn-outline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Role-specific content */}
          {user.role === UserRole.ADMIN && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Users"
                description="Manage user accounts and roles"
                icon="👥"
                onClick={() => handleCardClick("/admin/users")}
              />
              <DashboardCard
                title="Products"
                description="Manage all products in the marketplace"
                icon="📦"
                onClick={() => handleCardClick("/admin/products")}
              />
              <DashboardCard
                title="Orders"
                description="View and manage all orders"
                icon="🛒"
                onClick={() => handleCardClick("/admin/orders")}
              />
              <DashboardCard
                title="Analytics"
                description="View marketplace statistics"
                icon="📊"
                onClick={() => handleCardClick("/admin/analytics")}
              />
              <DashboardCard
                title="Settings"
                description="Configure marketplace settings"
                icon="⚙️"
                onClick={() => handleCardClick("/admin/settings")}
              />
            </div>
          )}

          {user.role === UserRole.SELLER && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="My Products"
                description="Manage your product listings"
                icon="📦"
                onClick={() => handleCardClick("/seller/products")}
              />
              <DashboardCard
                title="Orders"
                description="View and manage your orders"
                icon="🛒"
                onClick={() => handleCardClick("/seller/orders")}
              />
              <DashboardCard
                title="Inventory"
                description="Manage your product inventory"
                icon="📋"
                onClick={() => handleCardClick("/seller/inventory")}
              />
              <DashboardCard
                title="Sales"
                description="View your sales analytics"
                icon="💰"
                onClick={() => handleCardClick("/seller/sales")}
              />
              <DashboardCard
                title="Store Settings"
                description="Configure your store settings"
                icon="⚙️"
                onClick={() => handleCardClick("/seller/settings")}
              />
            </div>
          )}

          {user.role === UserRole.BUYER && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="My Orders"
                description="View your order history"
                icon="🛒"
                onClick={() => handleCardClick("/buyer/orders")}
              />
              <DashboardCard
                title="Saved Items"
                description="View your saved products"
                icon="❤️"
                onClick={() => handleCardClick("/buyer/saved")}
              />
              <DashboardCard
                title="Profile"
                description="Manage your profile settings"
                icon="👤"
                onClick={() => handleCardClick("/buyer/profile")}
              />
              <DashboardCard
                title="Addresses"
                description="Manage your delivery addresses"
                icon="📍"
                onClick={() => handleCardClick("/buyer/addresses")}
              />
              <DashboardCard
                title="Payment Methods"
                description="Manage your payment methods"
                icon="💳"
                onClick={() => handleCardClick("/buyer/payment")}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

function DashboardCard({ title, description, icon, onClick }: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-4xl">{icon}</div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
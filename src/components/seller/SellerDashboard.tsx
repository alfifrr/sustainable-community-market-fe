import React, { useState, useEffect } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

interface RecentOrder {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export const SellerDashboard: React.FC = () => {
  const { isSeller, canViewAnalytics } = usePermissions();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Here you would typically make an API call to fetch dashboard data
      // For now, we'll use mock data
      const mockStats: DashboardStats = {
        totalProducts: 25,
        activeProducts: 18,
        totalOrders: 150,
        pendingOrders: 5,
        totalRevenue: 15000,
        monthlyRevenue: 2500
      };

      const mockOrders: RecentOrder[] = [
        {
          id: '1',
          customerName: 'John Doe',
          productName: 'Organic Tomatoes',
          amount: 25.99,
          status: 'pending',
          date: '2024-03-15'
        },
        {
          id: '2',
          customerName: 'Jane Smith',
          productName: 'Fresh Lettuce',
          amount: 15.50,
          status: 'completed',
          date: '2024-03-14'
        }
      ];

      setStats(mockStats);
      setRecentOrders(mockOrders);
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (!isSeller() || !canViewAnalytics()) {
    return (
      <div className="alert alert-error">
        You don't have permission to access this page.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{stats.totalProducts}</div>
          <div className="stat-desc">
            {stats.activeProducts} active products
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{stats.totalOrders}</div>
          <div className="stat-desc">
            {stats.pendingOrders} pending orders
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats.totalRevenue}</div>
          <div className="stat-desc">
            ${stats.monthlyRevenue} this month
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Orders</h2>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.productName}</td>
                    <td>${order.amount.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${
                        order.status === 'completed'
                          ? 'badge-success'
                          : order.status === 'pending'
                          ? 'badge-warning'
                          : 'badge-error'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">
              Add New Product
            </button>
            <button className="btn btn-secondary">
              View All Orders
            </button>
            <button className="btn btn-accent">
              Update Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
import React, { useState, useEffect } from 'react';
import DashboardStats from '../../components/admin/dashboardStats';
import ProductManagement from '../../components/admin/productManagement';
import OrderManagement from '../../components/admin/orderManagement';
import TabNavigation from '../../components/admin/tabNav';
import apiService from '../../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await apiService.getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({
          overview: {
            totalProducts: 0,
            pendingProducts: 0,
            totalOrders: 0,
            completedOrders: 0,
            totalUsers: 0,
            totalRevenue: 0
          },
          recentActivity: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardStats stats={stats} />;
      case 'products': return <ProductManagement />;
      case 'orders': return <OrderManagement />;
      default: return <DashboardStats stats={stats} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">SafeSwap Admin</h1>
            <div className="text-sm text-gray-500">Welcome back, Admin</div>
          </div>
        </div>
      </div>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;


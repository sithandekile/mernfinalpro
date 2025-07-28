import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  CheckCircle, Clock, Truck, ShoppingCart, 
  Package, Users, DollarSign, TrendingUp 
} from 'lucide-react';

const DashboardStats = ({ stats }) => {
  if (!stats) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  );

  // Data for charts
  const orderStatusData = [
    { name: 'Completed', value: stats.overview.completedOrders, color: '#10B981' },
    { name: 'Pending', value: stats.overview.totalOrders - stats.overview.completedOrders, color: '#F59E0B' }
  ];

  // Mock monthly data - should eventually come from API
  const monthlyData = [
    { month: 'Jan', revenue: 12000, orders: 45 },
    { month: 'Feb', revenue: 15000, orders: 52 },
    { month: 'Mar', revenue: 13500, orders: 48 },
    { month: 'Apr', revenue: 18000, orders: 63 },
    { month: 'May', revenue: 16500, orders: 58 },
    { month: 'Jun', revenue: 19200, orders: 67 }
  ];

  // Overview card component
  const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-sky-600 mt-1">
            <span className="inline-flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </span>
          </p>
        </div>
        <div className="p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );

  // Recent activity item component
  const ActivityItem = ({ activity }) => {
    const statusConfig = {
      completed: { bg: 'bg-sky-100', icon: <CheckCircle className="w-5 h-5 text-sky-600" /> },
      pending: { bg: 'bg-yellow-100', icon: <Clock className="w-5 h-5 text-yellow-600" /> },
      default: { bg: 'bg-blue-100', icon: <Truck className="w-5 h-5 text-blue-600" /> }
    };

    const status = statusConfig[activity.status] || statusConfig.default;

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${status.bg}`}>
            {status.icon}
          </div>
          <div>
            <p className="font-medium text-gray-900">{activity.product}</p>
            <p className="text-sm text-gray-600">Buyer: {activity.buyer}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">${activity.amount}</p>
          <p className="text-sm text-gray-600 capitalize">{activity.status}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={stats.overview.totalProducts} 
          icon={<div className="bg-blue-50"><Package className="w-6 h-6 text-blue-600" /></div>}
          trend="+12% from last month"
        />
        
        <StatCard 
          title="Total Orders" 
          value={stats.overview.totalOrders} 
          icon={<div className="bg-sky-50"><ShoppingCart className="w-6 h-6 text-sky-600" /></div>}
          trend="+8% from last month"
        />
        
        <StatCard 
          title="Total Users" 
          value={stats.overview.totalUsers} 
          icon={<div className="bg-purple-50"><Users className="w-6 h-6 text-purple-600" /></div>}
          trend="+15% from last month"
        />
        
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.overview.totalRevenue.toLocaleString()}`} 
          icon={<div className="bg-yellow-50"><DollarSign className="w-6 h-6 text-yellow-600" /></div>}
          trend="+22% from last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#057791ff" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
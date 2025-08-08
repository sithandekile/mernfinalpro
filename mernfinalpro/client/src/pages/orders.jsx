import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import apiService from '../services/api'; 

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiService.getUserOrders();
        setOrders(data.orders || []); 
      } catch (err) {
        setError(err.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
          {loading ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <>
              <Package size={64} className="text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
              <p className="text-gray-600 mb-8">
                Your order history will appear here once you make your first purchase.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>
              <ul className="text-left space-y-4">
                {orders.map((order, index) => (
                  <li key={order._id || index} className="border-b pb-4">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ${order.total || 'N/A'}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Orders Page Component
import { Package } from 'lucide-react';

export const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
          <Package size={64} className="text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">Your order history will appear here once you make your first purchase</p>
        </div>
      </div>
    </div>
  );
};
// Product Details Component
import { useState, useEffect } from 'react';
import { Shield, Star, Truck, MapPin } from 'lucide-react';
import { apiService } from '../services/apiService';
import { useCart } from '../context/cartContext.jsx';

export const ProductDetails = () => {
  const{ productId, cartItems, onAddToCart, setCurrentPage }=useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

const productfilterd = cartItems.find(p => p.id === productId); // or search from full list

  useEffect(() => {
    apiService.getProduct(productId).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [productId]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-xl mb-8"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => setCurrentPage('shop')}
          className="text-orange-600 hover:text-orange-700 mb-6 inline-flex items-center"
        >
          ← Back to Shop
        </button>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <div className="flex items-center bg-white rounded-full px-3 py-2 text-sm font-medium text-orange-600 shadow-sm">
                  <Shield size={16} className="mr-2" />
                  Admin Verified
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
                  {product.condition}
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">Quality Score: {product.qualityScore}/10</span>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="text-lg text-gray-500 line-through ml-3">${product.originalPrice}</span>
                <div className="text-sm text-orange-600 mt-1">
                  Save ${product.originalPrice - product.price} ({Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                </div>
              </div>
              
              <p className="text-gray-600 mb-8">{product.description}</p>
              
              {/* Escrow Information */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-orange-800 mb-2">🔒 Escrow Protection Included</h3>
                <p className="text-sm text-orange-700">Your payment is held securely until you confirm delivery and satisfaction. Full refund available if not as described.</p>
              </div>
              
              {/* Delivery Options */}
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Options:</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Truck size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm">Local Delivery (3-5 days) - $15</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm">Pickup Available - Free</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

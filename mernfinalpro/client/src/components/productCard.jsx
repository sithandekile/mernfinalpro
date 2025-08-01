import React from 'react';
import { Shield, Star } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'bg-orange-100 text-orange-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={product.images}
          alt={product.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onViewDetails(product)}
        />
        <div className="absolute top-3 left-3">
          <div className="flex items-center bg-white rounded-full px-2 py-1 text-xs font-medium text-orange-600">
            <Shield size={12} className="mr-1" />
            Verified
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
            {product.condition}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3
          className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-orange-600 transition-colors"
          onClick={() => onViewDetails(product)}
        >
          {product.title}
        </h3>

        {/* <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.qualityScore}</span>
          </div>
        </div> */}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
};



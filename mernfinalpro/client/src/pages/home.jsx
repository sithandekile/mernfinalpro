// Homepage Component
import { useEffect, useState } from 'react';
import { ChevronRight, Shield, CheckCircle, Gift } from 'lucide-react';
import { ProductCard } from '../components/productCard';
import { apiService } from '../services/apiService';
import { useCart } from '../context/cartContext';
import React from 'react'


export const Homepage = () => {
  const{ setCurrentPage, onAddToCart }=useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    apiService.getProducts().then(products => {
      setFeaturedProducts(products.slice(0, 3));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Shop Verified Pre-Owned<br />
            <span className="text-orange-600">Household Goods, Scam-Free</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every product is admin-verified with quality ratings. Shop with confidence using our secure escrow system.
          </p>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors inline-flex items-center"
          >
            Browse Products
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Verified</h3>
              <p className="text-gray-600">Every product is inspected and approved by our team before listing.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Escrow Protection</h3>
              <p className="text-gray-600">Your payment is secured until you confirm delivery and satisfaction.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Referral Rewards</h3>
              <p className="text-gray-600">Earn store credits by referring friends to our marketplace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Banner */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Refer Friends, Earn Credits!</h2>
          <p className="text-orange-100 mb-6">Get $25 store credit for every friend who makes their first purchase.</p>
          <button 
            onClick={() => setCurrentPage('referral')}
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
                onViewDetails={(product) => setCurrentPage(`product-${product.id}`)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

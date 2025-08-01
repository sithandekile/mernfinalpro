// pages/shop.jsx
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { useCart } from '../context/cartContext.jsx';

export const ShopPage = () => {
  const { onAddToCart, setCurrentPage } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    condition: 'All',
    priceRange: 'All',
    status: "approved"
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await apiService.getProducts(filters);
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const filteredProducts = (Array.isArray(products) ? products : []).filter((product) => {
    if (filters.category !== 'All' && product.category !== filters.category) return false;
    if (filters.condition !== 'All' && product.condition !== filters.condition) return false;
    if (filters.priceRange !== 'All') {
      if (filters.priceRange === 'Under $200' && product.price >= 200) return false;
      if (filters.priceRange === '$200-$500' && (product.price < 200 || product.price > 500)) return false;
      if (filters.priceRange === 'Over $500' && product.price <= 500) return false;
    }
    return true;
  });

  const categories = ['All', 'Furniture', 'Kitchen Appliances', 'Electronics'];
  const conditions = ['All', 'Excellent', 'Good', 'Fair'];
  const priceRanges = ['All', 'Under $200', '$200-$500', 'Over $500'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop Verified Products</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select
                value={filters.condition}
                onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found matching your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id || product._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => setCurrentPage(`product-${product.id || product._id}`)}
              >
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
                  <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                  <p className="mt-2 text-purple-700 font-bold text-lg">${product.price}</p>
                  <button
                    onClick={() =>
                      onAddToCart(product)
                    }
                    className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
};

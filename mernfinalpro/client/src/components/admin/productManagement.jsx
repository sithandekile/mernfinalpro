import React, { useState, useEffect } from 'react';
import { Package, Edit3, Trash2, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductForm from './productForm';
import apiService from '../../services/api';
import { CATEGORIES } from '../../constants/adminConstants';
import StatusBadge from '../ui/StatusBadge';
import Pagination from '../ui/pagination';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, categoryFilter, statusFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await apiService.getProducts({
        page: currentPage,
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined
      });
      if (response.success) {
        setProducts(response.data || []);
        setPagination(response.pagination || {});
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        const response = await apiService.put(`/admin/products/${editingProduct._id}`, productData);
        if (response.success) {
          setProducts(prev => prev.map(p =>
            p._id === editingProduct._id ? { ...response.data, ...productData } : p
          ));
          alert('Product updated successfully!');
        }
      } else {
        const response = await apiService.createProduct(productData);
        if (response.success) {
          setProducts(prev => [response.data, ...prev]);
          alert('Product created successfully!');
        }
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Error ${editingProduct ? 'updating' : 'creating'} product: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await apiService.delete(`/admin/products/${productId}`);
        if (response.success) {
          setProducts(prev => prev.filter(p => p._id !== productId));
          alert('Product deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Error deleting product: ${error.message || 'Unknown error'}`);
      }
    }
  };


  const handleApproveProduct = async (productId) => {
    if (window.confirm('Are you sure you want to approve this product?')) {
      try {
        const response = await apiService.approveProduct(productId);
        if (response.success) {
          setProducts(prev => prev.filter(p => p._id !== productId));
          alert('Product Approved successfully!');
        }
      } catch (error) {
        console.error('Error approving product:', error);
        alert(`Error approving product: ${error.message || 'Unknown error'}`);
      }
    }
  }
  // const filteredProducts = products.filter(product =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   product.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="lg:w-48 flex-shrink-0">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'}
                    // alt={product.images[0] || product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl font-bold text-sky-600">${product.price}</span>
                        <StatusBadge status={product.condition} type="condition" />
                        <StatusBadge status={product.status} type="product" />
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                          {product.category.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowForm(true);
                        }}
                        className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleApproveProduct(product._id);
                        }}
                        className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{product.description}</p>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className="ml-2 font-medium">{product.stock} unit{product.stock !== 1 ? 's' : ''}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="ml-2 font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Delivery:</span>
                      <div className="mt-1 space-x-1">
                        {/* {product.deliveryOptions?.map((option) => (
                          <span
                            key={option}
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize"
                          >
                            {option.replace('-', ' ')}
                          </span>
                        ))} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first product.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProductManagement;
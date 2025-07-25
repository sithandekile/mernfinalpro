import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  // Set authorization token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get authorization headers
  getHeaders(contentType = 'application/json') {
    const headers = {
      'Content-Type': contentType,
    };

  const token = this.token || localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }


    return headers;
  }

  // Generic request method using Axios
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const headers = this.getHeaders();

    const config = {
      method,
      url,
      headers,
      data: options.body ? JSON.parse(options.body) : undefined,
      params: options.params || undefined,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error.response?.data || error;
    }
  }

  // GET
  async get(endpoint, params) {
    return this.request(endpoint, { method: 'GET', params });
  }

  // POST
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // ===== USER AUTHENTICATION =====
  async register(userData) {
    return this.post('/users/register', userData);
  }

  async login(credentials) {
    const response = await this.post('/users/login', credentials);
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async getProfile() {
    return this.get('/users/profile');
  }

  async updateProfile(profileData) {
    return this.put('/users/profile', profileData);
  }

  async getStoreCredit() {
    return this.get('/users/store-credit');
  }

  // ===== PRODUCTS =====
  async getProducts(params = {}) {
    return this.get('/products', params);
  }

  async getProduct(id) {
    return this.get(`/products/${id}`);
  }

  async getFeaturedProducts(limit = 6) {
    return this.get('/products/featured', { limit });
  }

  async getProductsByCategory(category, limit = 8) {
    return this.get(`/products/category/${category}`, { limit });
  }

  async createProduct(productData) {
    return this.post('/products', productData);
  }

  // ===== ORDERS =====
  async createOrder(orderData) {
    return this.post('/orders', orderData);
  }

  async getUserOrders(params = {}) {
    return this.get('/orders', params);
  }

  async getOrder(id) {
    return this.get(`/orders/${id}`);
  }

  async updateOrderStatus(id, statusData) {
    return this.put(`/orders/${id}/status`, statusData);
  }

  async confirmDelivery(id) {
    return this.put(`/orders/${id}/confirm-delivery`);
  }

  // ===== REFERRALS =====
  async getReferralStats() {
    return this.get('/referrals/stats');
  }

  async getReferralInfo() {
    return this.get('/referrals/info');
  }

  async applyReferralCode(referralData) {
    return this.post('/referrals/apply', referralData);
  }

  async completeReferral(data) {
    return this.post('/referrals/complete', data);
  }

  // ===== ADMIN FUNCTIONS =====
  
  // Dashboard Stats
  async getDashboardStats() {
    return this.get('/admin/dashboard/stats');
  }

  // Product Management
  async getAllProducts(params = {}) {
    return this.get('/admin/products', params);
  }

  async updateProduct(id, productData) {
    return this.put(`/admin/products/${id}`, productData);
  }

  async deleteProduct(id) {
    return this.delete(`/admin/products/${id}`);
  }

  // Legacy product approval (if still needed)
  async getPendingProducts(params = {}) {
    return this.get('/admin/products/pending', params);
  }

  async approveProduct(id, approvalData) {
    return this.put(`/admin/products/${id}/approve`, approvalData);
  }

  async rejectProduct(id, rejectionData) {
    return this.put(`/admin/products/${id}/reject`, rejectionData);
  }

  // Order Management
  async getAllOrders(params = {}) {
    return this.get('/admin/orders', params);
  }

  async updateAdminOrderStatus(id, statusData) {
    return this.put(`/admin/orders/${id}/status`, statusData);
  }

  // User Management
  async getAllUsers(params = {}) {
    return this.get('/admin/users', params);
  }

  async updateUserStatus(id, statusData) {
    return this.put(`/admin/users/${id}/status`, statusData);
  }

  // ===== UTILITY =====
  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }

  // Get current user role (you might need to decode JWT or store role separately)
  getUserRole() {
    if (!this.token) return null;
    try {
      // Decode JWT token to get user role
      const payload = JSON.parse(atob(this.token.split('.')[1]));
      return payload.role || 'user';
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isAdmin() {
    return this.getUserRole() === 'admin';
  }
}

const apiService = new ApiService();
export default apiService;
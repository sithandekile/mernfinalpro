import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  setUser(userData) {
    this.user = userData;
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  }

  getCurrentUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getHeaders(contentType = 'application/json') {
    const headers = { 'Content-Type': contentType };
    const token = this.token || localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${api.defaults.baseURL}${endpoint}`;
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

  // ==== CRUD Methods ====
  async get(endpoint, params) {
    return this.request(endpoint, { method: 'GET', params });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // ==== Authentication ====
  async register(userData) {
    return this.post('/users/register', userData);
  }

  async login(credentials) {
    const response = await this.post('/users/login', credentials);
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
      this.setUser(response.data.user); // Save user info
    }
    return response;
  }

  async getProfile() {
  const response = await this.get('/users/profile');
  return response.data; 
}


  logout() {
    this.setToken(null);
    this.setUser(null);
  }

  getUserRole() {
    if (!this.token) return null;
    try {
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

  // ==== Products ====
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

  // ==== Orders ====
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

  // ==== Referrals ====
  async getReferralStats() {
    return this.get('/referrals/stats');
  }

  async getReferralInfo() {
    return this.get('/referrals/info');
  }

  async applyReferralCode(data) {
    return this.post('/referrals/apply', data);
  }

  async completeReferral(data) {
    return this.post('/referrals/complete', data);
  }

  // ==== Admin ====
  async getDashboardStats() {
    return this.get('/admin/stats');
  }

  async getAllProducts(params = {}) {
    return this.get('/admin/products', params);
  }

  async updateProduct(id, productData) {
    return this.put(`/admin/products/${id}`, productData);
  }

  async deleteProduct(id) {
    return this.delete(`/admin/products/${id}`);
  }

  async getPendingProducts(params = {}) {
    return this.get('/admin/products/pending', params);
  }

  async approveProduct(id, approvalData) {
    return this.put(`/admin/products/${id}/approve`, approvalData);
  }

  async rejectProduct(id, rejectionData) {
    return this.put(`/admin/products/${id}/reject`, rejectionData);
  }

  async getAllOrders(params = {}) {
    return this.get('/admin/orders', params);
  }

  async updateAdminOrderStatus(id, statusData) {
    return this.put(`/admin/orders/${id}/status`, statusData);
  }

  async getAllUsers(params = {}) {
    return this.get('/admin/users', params);
  }

  async updateUserStatus(id, statusData) {
    return this.put(`/admin/users/${id}/status`, statusData);
  }
  // ==== Payment ====
async createPaymentIntent(amount, orderId) {
  return this.post('/payment/create-payment-intent', { amount, orderId });
}

async capturePayment(paymentIntentId) {
  return this.post('/payment/capture-payment', { paymentIntentId });
}

async refundPayment(paymentIntentId, amount) {
  return this.post('/payment/refund-payment', { paymentIntentId, amount });
}

}

const apiService = new ApiService();
export default apiService;

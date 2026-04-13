import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  signup: (data: { name: string; email: string; phone: string; password: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
};

// Product API
export const productAPI = {
  getAll: (params?: { category?: string; search?: string; page?: number; size?: number }) =>
    api.get('/products', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
  getFeatured: () => api.get('/products/featured'),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (data: { productId: number; variantId: number; quantity: number }) =>
    api.post('/cart/items', data),
  updateItem: (itemId: number, quantity: number) =>
    api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId: number) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
};

// Order API
export const orderAPI = {
  place: (data: { addressId: number; notes?: string }) =>
    api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id: number) => api.get(`/orders/${id}`),
  cancel: (id: number) => api.put(`/orders/${id}/cancel`),
};

// Payment API
export const paymentAPI = {
  createOrder: (orderId: number) =>
    api.post('/payments/create-order', { orderId }),
  verify: (data: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) =>
    api.post('/payments/verify', data),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: { name?: string; phone?: string }) =>
    api.put('/users/profile', data),
  getAddresses: () => api.get('/users/addresses'),
  addAddress: (data: any) => api.post('/users/addresses', data),
  updateAddress: (id: number, data: any) => api.put(`/users/addresses/${id}`, data),
  deleteAddress: (id: number) => api.delete(`/users/addresses/${id}`),
};

// Review API
export const reviewAPI = {
  getProductReviews: (slug: string, page?: number) =>
    api.get(`/products/${slug}/reviews`, { params: { page } }),
  addReview: (slug: string, data: { rating: number; comment: string }) =>
    api.post(`/products/${slug}/reviews`, data),
};

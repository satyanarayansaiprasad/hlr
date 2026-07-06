import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5005/api' : '/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const loginAdmin = (username, password) => api.post('/auth/login', { username, password });
export const verifyAdminSession = () => api.get('/auth/verify');

// Dashboard Endpoints
export const getDashboardStats = () => api.get('/dashboard/stats');

// Reviews/Posts Endpoints
export const getReviews = (params = {}) => api.get('/posts', { params });
export const getReviewsAdmin = (params = {}) => api.get('/posts', { params: { ...params, admin: 'true' } });
export const getReviewBySlug = (slug) => api.get(`/posts/${slug}`);
export const createReview = (data) => api.post('/posts', data);
export const updateReview = (id, data) => api.put(`/posts/${id}`, data);
export const deleteReview = (id) => api.delete(`/posts/${id}`);
export const restoreReview = (id) => api.post(`/posts/${id}/restore`);
export const duplicateReview = (id) => api.post(`/posts/${id}/duplicate`);
export const bulkReviewsAction = (data) => api.post('/posts/bulk', data);
export const seedDatabase = (force = false) => api.post(`/posts/seed?force=${force}`);

// Categories Endpoints
export const getCategories = () => api.get('/categories');
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Tags Endpoints
export const getTags = () => api.get('/tags');
export const mergeTags = (sourceTag, targetTag) => api.post('/tags/merge', { sourceTag, targetTag });

// Media Endpoints
export const getMedia = () => api.get('/media');
export const uploadMedia = (formData) => api.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const deleteMedia = (id) => api.delete(`/media/${id}`);

// Authors & Products
export const getAuthors = () => api.get('/authors');
export const createAuthor = (data) => api.post('/authors', data);
export const getProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);

export default api;

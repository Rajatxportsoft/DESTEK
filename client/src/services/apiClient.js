import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;}
    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

// API functions
export const saveFormData = (data) => apiClient.post('/save', data);
export const logIn = (data) => apiClient.post('/login', data);
export const fetchReferralUsers = (page) => apiClient.get(`/referrals?page=${page}`);
export const deleteReferralUser = (id) => apiClient.delete(`/referrals/${id}`);
export const getProfile = (data) => apiClient.put('/profile', data);
export const updateProfile = (data) => apiClient.put('/update', data);


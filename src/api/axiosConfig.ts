import axios from 'axios';

// Konfigurasi utama Axios
const apiClient = axios.create({
  baseURL: 'https://your-backend-api-url.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request 
apiClient.interceptors.request.use(
  (config) => {
    // Ambil token dari local storage atau state global 
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani error response global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Tangani logika jika token tidak valid atau expired
      console.log('Unauthorized, please login again');
      // Misalnya, redirect ke halaman login
    }
    return Promise.reject(error);
  }
);

export default apiClient;


// import axios from 'axios';

// const Api = axios.create({
//   baseURL: 'http://localhost:8000/api',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
// });

// // Intercepteur pour les requêtes
// Api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// // Intercepteur pour les réponses
// Api.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response.status === 401) {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   }
//   return Promise.reject(error);
// });

// export default Api;

// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Adaptez selon votre URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour injecter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
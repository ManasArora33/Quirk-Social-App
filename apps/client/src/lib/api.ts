import axios from "axios";
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://your-backend.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export default api;

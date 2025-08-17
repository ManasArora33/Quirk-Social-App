import axios from "axios";

export const API_BASE_URL =
  import.meta.env.BASE_URL ||
  (typeof window !== 'undefined' ? `${window.location.origin}/api/v1` : 'http://localhost:3000/api/v1');

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export default api;

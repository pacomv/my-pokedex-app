import axios from "axios";
import { AUTH_KEYS } from "../contexts/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const apiClient = axios.create({ baseURL: BASE_URL });

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN); // Obtén el token almacenado
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

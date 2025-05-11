// src/services/api.service.js
import axios from "axios";
import AuthService from "./auth.service";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Crear instancia de axios con URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token a solicitudes
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido - desloguear usuario
      AuthService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

class ApiService {
  getPublicContent() {
    return api.get("/test/all");
  }

  getUserContent() {
    return api.get("/test/user");
  }

  getModeratorContent() {
    return api.get("/test/mod");
  }

  getAdminContent() {
    return api.get("/test/admin");
  }
}

export default new ApiService();
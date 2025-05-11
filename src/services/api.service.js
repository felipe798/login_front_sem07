// src/services/api.service.js
import axios from "axios";
import AuthService from "./auth.service";

// La variable de entorno debería ser solo el dominio base del backend sin '/api'
// Por ejemplo: https://node-jwt-auth-backend.onrender.com
const BASE_URL = import.meta.env.VITE_API_URL;

// Para depuración
console.log("Base API URL:", BASE_URL);

// Crear instancia de axios con URL base correcta
const api = axios.create({
  baseURL: BASE_URL,
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
    console.error("API Error:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      // Token inválido - desloguear usuario
      AuthService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Usar las rutas completas que coincidan con el backend
  getPublicContent() {
    return api.get("/api/test/all");
  }

  getUserContent() {
    return api.get("/api/test/user");
  }

  getModeratorContent() {
    return api.get("/api/test/mod");
  }

  getAdminContent() {
    return api.get("/api/test/admin");
  }
}

export default new ApiService();
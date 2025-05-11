// src/services/auth.service.js
import axios from "axios";

// La variable de entorno debería ser el dominio base del backend sin '/api'
// Por ejemplo: https://node-jwt-auth-backend.onrender.com
const BASE_URL = import.meta.env.VITE_API_URL;

// Para depuración
console.log("Auth API URL:", BASE_URL);

class AuthService {
  async login(username, password) {
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, {
      username,
      password
    });
    
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password) {
    return axios.post(`${BASE_URL}/api/auth/signup`, {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user && !!user.accessToken;
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.accessToken;
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role);
  }

  isAdmin() {
    return this.hasRole("ROLE_ADMIN");
  }

  isModerator() {
    return this.hasRole("ROLE_MODERATOR");
  }
}

export default new AuthService();
// src/services/auth.service.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

class AuthService {
  async login(username, password) {
    const response = await axios.post(`${API_URL}/auth/signin`, {
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
    return axios.post(`${API_URL}/auth/signup`, {
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
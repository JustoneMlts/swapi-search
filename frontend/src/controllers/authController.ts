import axios from "axios";

require('dotenv').config()

const API_URL = process.env.REACT_APP_BASE_URL;

export const authController = {
  login: async (username: string, password: string): Promise<{ message: string; token: string }> => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      console.log(response)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error("Échec de l'authentification");
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },

  getAuthHeaders: (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

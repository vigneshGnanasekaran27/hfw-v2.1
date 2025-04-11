// services/authService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/"; // Update to HTTPS in production

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  async signup(credentials) {
    try {
      const response = await axiosInstance.post("/sign_up", credentials);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.errors || error.response?.data?.error || "Signup failed";
      throw new Error(Array.isArray(errorMsg) ? errorMsg.join(", ") : errorMsg);
    }
  },

  async signin(credentials) {
    try {
      const response = await axiosInstance.post("/sign_in", credentials);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Sign in failed";
      throw new Error(errorMsg);
    }
  },

  async signout() {
    try {
      const response = await axiosInstance.delete("/destroy"); // Match controller's `destroy`
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Sign out failed";
      throw new Error(errorMsg);
    }
  },

  async changePassword(passwordData) {
    try {
      const response = await axiosInstance.put("/password/change", passwordData); // Align with Clearance
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Password change failed";
      throw new Error(errorMsg);
    }
  },

  async forgotPassword(email) {
    try {
      const response = await axiosInstance.post("/password", { email }); // Clearance default
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to send reset instructions";
      throw new Error(errorMsg);
    }
  },

  async resetPassword(resetData) {
    try {
      const response = await axiosInstance.put("/password", resetData); // Clearance default
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Password reset failed";
      throw new Error(errorMsg);
    }
  },

  async checkSession() {
    try {
      const response = await axiosInstance.get("/status"); // Match controller's `status`
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Session check failed";
      throw new Error(errorMsg);
    }
  },
};

import api from "./api";

export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};

export const resendOTP = async (email) => {
  const response = await api.post("/auth/resend-otp", { email });
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Get currently authenticated user
export const getCurrentUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};
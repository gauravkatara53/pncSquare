import axios, { AxiosInstance } from "axios";
import { auth } from "@clerk/nextjs/server"; // ✅ safe in server file

const BASE_URL =
  process.env.API_INTERNAL_URL || "https://pnc-backend.onrender.com/api/v1";
// check
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach Clerk token only on server
api.interceptors.request.use(async (config) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn("⚠️ Clerk token fetch failed:", err);
  }
  return config;
});

export default api;

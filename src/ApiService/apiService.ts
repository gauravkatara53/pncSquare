// src/api/apiService.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Set your main API URL. Use environment variable for flexibility.
// const BASE_URL =
//   typeof window === "undefined"
//     ? "http://localhost:3000/api/v1" // SSR/Node side
//     : "/api/v1"; // Browser side
const BASE_URL = "/api/v1"; // Browser side

// process.env.NEXT_PUBLIC_API_URL ||

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // 60 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor for logging, auth, etc.
// Removed unnecessary empty interface; use AxiosRequestConfig directly.

interface RequestInterceptorError {
  message: string;
  config?: AxiosRequestConfig;
  code?: string;
  request?: unknown;
  response?: AxiosResponse;
  isAxiosError?: boolean;
  toJSON?: () => object;
}

api.interceptors.request.use(
  (
    config: import("axios").InternalAxiosRequestConfig
  ): import("axios").InternalAxiosRequestConfig => {
    if (process.env.NODE_ENV === "development") {
      console.log("🔄 Making request to:", config.url);
    }
    return config;
  },
  (error: RequestInterceptorError): Promise<RequestInterceptorError> =>
    Promise.reject(error)
);

// Optional: Add refresh token/401 logic here, as needed for authentication.

// Generic typed API service
export interface ApiService {
  get<T = unknown>(url: string, params?: object): Promise<T>;
  post<T = unknown>(url: string, data: unknown, config?: object): Promise<T>;
  put<T = unknown>(url: string, data: unknown): Promise<T>;
  patch<T = unknown>(url: string, data: unknown, config?: object): Promise<T>;
  delete<T = unknown>(url: string): Promise<T>;
}

export const apiService: ApiService = {
  get: <T = unknown>(url: string, params = {}) =>
    api.get<T>(url, { params }).then((res: AxiosResponse<T>) => res.data),
  post: <T = unknown>(url: string, data: unknown, config = {}) =>
    api.post<T>(url, data, config).then((res: AxiosResponse<T>) => res.data),
  put: <T = unknown>(url: string, data: unknown) =>
    api.put<T>(url, data).then((res: AxiosResponse<T>) => res.data),
  patch: <T = unknown>(url: string, data: unknown, config = {}) =>
    api.patch<T>(url, data, config).then((res: AxiosResponse<T>) => res.data),
  delete: <T = unknown>(url: string) =>
    api.delete<T>(url).then((res: AxiosResponse<T>) => res.data),
};

export default api;

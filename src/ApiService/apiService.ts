import axios, { AxiosInstance, AxiosResponse } from "axios";

const isServer = typeof window === "undefined";

const BASE_URL = isServer
  ? process.env.API_INTERNAL_URL || "https://pnc-backend.onrender.com/api/v1"
  : "/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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

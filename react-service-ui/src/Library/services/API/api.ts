import type { AxiosRequestConfig } from 'axios';
import { handleApiResponse, handleFullApiResponse } from './responseHandler';
import type { APIBaseResponse } from './responseHandler'; // ✅ Import this type
import axiosInstance from './axiosInstance';

export const API = {
  GET: <T>(url: string, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.get<APIBaseResponse<T>>(url, config)),

  POST: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.post<APIBaseResponse<T>>(url, data, config), data),

  // Get full response (for pagination)
  POST_FULL: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleFullApiResponse<T>(axiosInstance.post<APIBaseResponse<T>>(url, data, config), data),

  PUT: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.put<APIBaseResponse<T>>(url, data, config), data),

  PATCH: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.patch<APIBaseResponse<T>>(url, data, config), data),

  DELETE: <T>(url: string, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.delete<APIBaseResponse<T>>(url, config)),
};


const removeNulls = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(removeNulls) as T;
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj as Record<string, unknown>)
      .filter(([, value]) => value !== null)
      .reduce((acc, [k, v]) => {
        (acc as Record<string, unknown>)[k] = removeNulls(v);
        return acc;
      }, {} as Record<string, unknown>) as T;
  }
  return obj;
};
export default removeNulls;

import type { AxiosRequestConfig } from 'axios';
import { handleApiResponse } from './responseHandler';
import type { APIBaseResponse } from './responseHandler'; // ✅ Import this type
import axiosInstance from './axiosInstance';

export const API = {
  GET: <T>(url: string, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.get<APIBaseResponse<T>>(url, config)),

  POST: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.post<APIBaseResponse<T>>(url, data, config), data),

  PUT: <T>(url: string, data?: unknown, config?:   AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.put<APIBaseResponse<T>>(url, data, config), data),

  PATCH: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.patch<APIBaseResponse<T>>(url, data, config), data),

  DELETE: <T>(url: string, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.delete<APIBaseResponse<T>>(url, config)),
};

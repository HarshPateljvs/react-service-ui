import type { AxiosError, AxiosResponse } from 'axios';
import { HookLoggerConfig } from '../../customHooks/hookLoggerConfig';
import { ToastService } from '../toastService';

export interface APIBaseResponse<T> {
  Data: T;
  TotalCount: number;
  ErrorMessage: string[];
  InfoMessage: string[];
  WarningMessage: string[];
  ValidationMessage: string[];
  SuccessMessage: string[];
  HasError: boolean;
  ResponseCode: string;
  StatusCode: number;
}

// 🛠️ Add optional input for logging request data
export async function handleApiResponse<T>(
  promise: Promise<AxiosResponse<APIBaseResponse<T>>>,
  requestData?: unknown
): Promise<T> {
  try {
    if (HookLoggerConfig.ENABLE_LOGGING && requestData !== undefined) {
      console.log('[API Request]', requestData);
    }

    const response = await promise;
    const result = response.data;

    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log('[API Response]', result);
    }

    result.ErrorMessage?.forEach((msg: string) => ToastService.ERROR(msg));
    result.InfoMessage?.forEach((msg: string) => ToastService.INFO(msg));
    result.WarningMessage?.forEach((msg: string) => ToastService.WARNING(msg));
    result.ValidationMessage?.forEach((msg: string) => ToastService.ERROR(msg));
    result.SuccessMessage?.forEach((msg: string) => ToastService.SUCCES(msg));

    if (result.HasError) {
      // ToastService.ERROR('API returned error(s).');
    }

    return result.Data;
  } catch (err: unknown) {
    // 👇 If it's an AxiosError and has a response, handle gracefully
    const axiosError = err as AxiosError<APIBaseResponse<T>>;
    if (axiosError?.response?.status === 401) {
      ToastService.WARNING("Unauthorized. Redirecting to login...");
      localStorage.clear(); // Clear token/session
      window.location.href = "/"; // Redirect to login
      return {} as T; // Return empty object to satisfy return type
    }
    if (axiosError?.response?.data) {
      const result = axiosError.response.data;
      if (HookLoggerConfig.ENABLE_LOGGING) {
        console.error('[API Error Response]', result);
      }

      result.ErrorMessage?.forEach((msg: string) => ToastService.ERROR(msg));
      result.InfoMessage?.forEach((msg: string) => ToastService.INFO(msg));
      result.WarningMessage?.forEach((msg: string) => ToastService.WARNING(msg));
      result.ValidationMessage?.forEach((msg: string) => ToastService.ERROR(msg));
      result.SuccessMessage?.forEach((msg: string) => ToastService.SUCCES(msg));

      if (result.HasError) {
        // ToastService.ERROR('API returned error(s).');
      }

      // ✅ Still return the data (or empty)
      return result.Data;
    }

    // 👇 Fallback for unexpected error
    ToastService.ERROR(axiosError.message || 'Unexpected API error');
    throw axiosError;
  }
}


export async function handleFullApiResponse<T>(
  promise: Promise<AxiosResponse<APIBaseResponse<T>>>,
  requestData?: unknown
): Promise<APIBaseResponse<T>> {
  try {
    if (HookLoggerConfig.ENABLE_LOGGING && requestData !== undefined) {
      console.log('[API Request]', requestData);
    }

    const response = await promise;
    const result = response.data;

    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log('[API Response]', result);
    }

    result.ErrorMessage?.forEach((msg: string) => ToastService.ERROR(msg));
    result.InfoMessage?.forEach((msg: string) => ToastService.INFO(msg));
    result.WarningMessage?.forEach((msg: string) => ToastService.WARNING(msg));
    result.ValidationMessage?.forEach((msg: string) => ToastService.ERROR(msg));
    result.SuccessMessage?.forEach((msg: string) => ToastService.SUCCES(msg));

    if (result.HasError) {
      // ToastService.ERROR('API returned error(s).');
    }
    return result;
  } catch (err: unknown) {
    // 👇 If it's an AxiosError and has a response, handle gracefully
    const axiosError = err as AxiosError<APIBaseResponse<T>>;
    if (axiosError?.response?.status === 401) {
      ToastService.WARNING("Unauthorized. Redirecting to login...");
      localStorage.clear();
      window.location.href = "/";
      return {
        Data: {} as T,
        TotalCount: 0,
        ErrorMessage: ["Unauthorized"],
        InfoMessage: [],
        WarningMessage: [],
        ValidationMessage: [],
        SuccessMessage: [],
        HasError: true,
        ResponseCode: "UNAUTHORIZED",
        StatusCode: 401,
      };
    }

    if (axiosError?.response?.data) {
      const result = axiosError.response.data;
      if (HookLoggerConfig.ENABLE_LOGGING) {
        console.error('[API Error Response]', result);
      }

      result.ErrorMessage?.forEach((msg: string) => ToastService.ERROR(msg));
      result.InfoMessage?.forEach((msg: string) => ToastService.INFO(msg));
      result.WarningMessage?.forEach((msg: string) => ToastService.WARNING(msg));
      result.ValidationMessage?.forEach((msg: string) => ToastService.ERROR(msg));
      result.SuccessMessage?.forEach((msg: string) => ToastService.SUCCES(msg));

      return result;
    }

    ToastService.ERROR(axiosError.message || 'Unexpected API error');
    throw axiosError;
  }
}
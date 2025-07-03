import { toast } from 'react-toastify'; 
import type { ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
};

export const ToastService = {
  SUCCES: (message: string, options?: ToastOptions) => toast.success(message, { ...defaultOptions, ...options }),
  ERROR: (message: string, options?: ToastOptions) => toast.error(message, { ...defaultOptions, ...options }),
  INFO: (message: string, options?: ToastOptions) => toast.info(message, { ...defaultOptions, ...options }),
  WARNING: (message: string, options?: ToastOptions) => toast.warn(message, { ...defaultOptions, ...options }),
};

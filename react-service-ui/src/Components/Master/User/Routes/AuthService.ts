// src/utils/auth.ts

import type { UserRole } from "./UserRole";


export const AuthService = {
  getToken: () => localStorage.getItem("access_token"),
  getRole: (): UserRole | null => localStorage.getItem("user_role") as UserRole | null,
  isAuthenticated: () => !!localStorage.getItem("access_token"),
  logout: () => {
    localStorage.clear();
    window.location.href = "/";
  },
};

// src/utils/auth.ts

import type { UserRole } from "./UserRole";


export const AuthService = {
  getToken: () => localStorage.getItem("access_token"),
  getRole: (): UserRole => {
    const role = localStorage.getItem("user_role") as UserRole;
    console.log("📥 [AuthService] Fetched role:", role); // ✅ log the role
    return role;
  },
  setRole: (role: UserRole) => {
    localStorage.setItem("user_role", role);
    console.log("seted form the use Role user_role", role);
  },
  isAuthenticated: () => !!localStorage.getItem("access_token"),
  logout: () => {
    localStorage.clear();
    window.location.href = "/";
  },
};

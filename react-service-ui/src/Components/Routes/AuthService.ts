// src/utils/auth.ts

import type { UserRole } from "./UserRole";


export const AuthService = {
  getToken: () => localStorage.getItem("access_token"),
  getRole: (): UserRole => {
    const roleId = localStorage.getItem("user_role_id");
    const parsedId = roleId ? parseInt(roleId, 10) : 0;
    console.log("📥 [AuthService] Fetched role ID:", parsedId);
    return parsedId as UserRole;

  },
  setRole: (roleId: UserRole) => {
    localStorage.setItem("user_role_id", roleId.toString());
    console.log("✅ Set role ID in storage:", roleId);
  },
  isAuthenticated: () => !!localStorage.getItem("access_token"),
  logout: () => {
    localStorage.clear();
    window.location.href = "/";
  },
};

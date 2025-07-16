import { AppRoutes } from "../../../../Components/Routes/AppRoutes";
import { AuthService } from "../../../../Components/Routes/AuthService";
import type { UserRole } from "../../../../Components/Routes/UserRole";

export interface NavRoute {
  path: string;
  label: string;
}

export const flattenSidebarRoutes = (): NavRoute[] => {
  const userRole = AuthService.getRole();
  const result: NavRoute[] = [];

  AppRoutes.forEach((route) => {
    const parentPath = route.path;

    if (route.children?.length) {
      route.children.forEach((child) => {
        const allowed =
          !child.allowedRoles || child.allowedRoles.includes(userRole as UserRole);

        if (child.showInNavbar && child.label && allowed) {
          const fullPath = `${parentPath}/${child.path}`.replace(/\/+/g, "/");
          result.push({ path: fullPath, label: child.label });
        }
      });
    }
  });

  return result;
};

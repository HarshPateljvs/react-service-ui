// src/Library/Routes/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Suspense } from "react";
import RouteLoader from "./RouteLoader";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthService } from "./AuthService";
import type { UserRole } from "./UserRole";

const renderRoutes = (routes: AppRoute[]): React.ReactNode[] => {
  const currentRole = AuthService.getRole();

  return routes.map(({ path, element, children, allowedRoles }) => {
    const isAllowed = !allowedRoles || allowedRoles.includes(currentRole as UserRole);

    return (
      <Route
        key={path}
        path={path}
        element={isAllowed ? element : <Navigate to="/login12" replace />}
      >
        {children?.map((child) => {
          const childAllowed =
            !child.allowedRoles || child.allowedRoles.includes(currentRole as UserRole);

          return (
            <Route
              key={child.path}
              path={child.path}
              element={childAllowed ? child.element : <Navigate to="/Home" replace />}
            />
          );
        })}
      </Route>
    );
  });
};

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<RouteLoader />}>
        <Routes>{renderRoutes(AppRoutes)}</Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;

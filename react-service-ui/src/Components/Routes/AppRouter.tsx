// src/Library/Routes/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { Suspense } from "react";
import RouteLoader from "./RouteLoader";
import { BrowserRouter as Router } from "react-router-dom";
// import { AuthService } from "./AuthService";
import type { UserRole } from "./UserRole";
import Login from "../../Library/Components/Common/Layout1/Login";
// import { AVTUseEffect, AVTUseState } from "../../../../Library/customHooks";

const renderRoutes = (
  routes: AppRoute[],
  currentRole: UserRole | null
): React.ReactNode[] => {
  return routes.map(({ path, element, children, allowedRoles }) => {
    const isAllowed =
      !allowedRoles || allowedRoles.includes(currentRole as UserRole);
    return (
      <Route
        key={path}
        path={path}
        element={isAllowed ? element : <Navigate to="/login12" replace />}
      >
        {children?.map((child) => {
          const childAllowed =
            !child.allowedRoles ||
            child.allowedRoles.includes(currentRole as UserRole);

          return (
            <Route
              key={child.path}
              path={child.path}
              element={
                childAllowed ? child.element : <Navigate to="/Home" replace />
              }
            />
          );
        })}
      </Route>
    );
  });
};
interface AppRouterProps {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
}
const AppRouter = ({ role, setRole }: AppRouterProps) => {
  //  const [currentRole, setCurrentRole] = AVTUseState<UserRole | null>("AppRouter",null);
  //  AVTUseEffect("AppRouterEffect",() => {
  // const role = AuthService.getRole();
  //   setCurrentRole(role);
  // }, [currentRole]);
  return (
    <Router>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Login setRole={setRole} />} />
          {renderRoutes(AppRoutes, role)}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;

// src/Library/Routes/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

const renderRoutes = (routes: typeof AppRoutes) =>
  routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children?.map((child) => (
        <Route key={child.path} path={child.path} element={child.element} />
      ))}
    </Route>
  ));

const AppRouter = () => {
  return <Routes>{renderRoutes(AppRoutes)}</Routes>;
};

export default AppRouter;

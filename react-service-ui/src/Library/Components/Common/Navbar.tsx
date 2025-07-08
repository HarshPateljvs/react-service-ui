import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../Components/Master/User/Routes/AppRoutes";
import CommonButton from "../Form/CommonButton";
import type { UserRole } from "../../../Components/Master/User/Routes/UserRole";
import { AuthService } from "../../../Components/Master/User/Routes/AuthService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelectors";

const flattenRoutesForNavbar = (): NavRoute[] => {
    const userRole = AuthService.getRole();
  const result: NavRoute[] = [];

  AppRoutes.forEach((route) => {
    const parentPath = route.path;

    if (route.children?.length) {
      route.children.forEach((child) => {
        const allowed =
          !child.allowedRoles || child.allowedRoles.includes(userRole as UserRole);

        if (child.showInNavbar && child.label && allowed) {
          const fullPath = `${parentPath}/${child.path}`.replace(/\/+/g, "/"); // remove double slashes
          result.push({
            path: fullPath,
            label: child.label,
          });
        }
      });
    }

    // Also support top-level routes
    if (
      route.showInNavbar &&
      route.label &&
      (!route.allowedRoles || route.allowedRoles.includes(userRole as UserRole))
    ) {
      result.push({
        path: route.path,
        label: route.label,
      });
    }
  });

  return result;
};

const Navbar = () => {
  const navLinks = flattenRoutesForNavbar();
  const currentUser = useSelector(selectCurrentUser);
  const handleLogout = () => {
    AuthService.logout(); // ✅ Use AuthService
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        {navLinks.map((route) => (
          <Button
            key={route.path}
            component={Link}
            to={route.path}
            color="inherit"
          >
            {route.label}
          </Button>
        ))}

        {AuthService.isAuthenticated() && currentUser && (
          <Box ml="auto" display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">
              Welcome, <strong>{currentUser.FirstName +" "+currentUser.LastName || currentUser.Email}</strong>
            </Typography>
            <CommonButton onClick={handleLogout}>Logout</CommonButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

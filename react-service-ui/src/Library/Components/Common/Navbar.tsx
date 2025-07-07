
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppRoutes } from "../../../Components/Master/User/Routes/AppRoutes";
import { selectCurrentUser } from "../../../redux/user/userSelectors";



const flattenRoutesForNavbar = (): NavRoute[] => {
  const result: NavRoute[] = [];

  AppRoutes.forEach((route) => {
      if (route.children && route.children.length > 0) {
      route.children.forEach((child) => {
        if (child.showInNavbar && child.label) {
          result.push({
            path: `/${child.path}`,
            label: child.label,
          });
        }
      });
    }
    else if (route.showInNavbar && route.label) {
      result.push({
        path: route.path,
        label: route.label,
      });
    }
  });

  return result;
};

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navLinks = flattenRoutesForNavbar();

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

        {currentUser && (
          <Box ml={2}>
            <Typography variant="body2">
              Welcome, <strong>{currentUser.Email}</strong>
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

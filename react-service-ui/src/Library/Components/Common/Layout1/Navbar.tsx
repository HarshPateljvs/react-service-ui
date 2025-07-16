import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../../../Components/Routes/AppRoutes";
import CommonButton from "../../Form/CommonButton";
import type { UserRole } from "../../../../Components/Routes/UserRole";
import { AuthService } from "../../../../Components/Routes/AuthService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/user/userSelectors";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AVTUseState } from "../../../customHooks";
import stylesnav from "./Navbar.module.css";
interface NavRoute {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

const flattenRoutesForNavbar = (): NavRoute[] => {
  const userRole = AuthService.getRole();
  const result: NavRoute[] = [];

  AppRoutes.forEach((route) => {
    const parentPath = route.path;
    if (route.children?.length) {
      route.children.forEach((child) => {
        const allowed =
          !child.allowedRoles ||
          child.allowedRoles.includes(userRole as UserRole);

        if (child.showInNavbar && child.label && allowed) {
          const fullPath = `${parentPath}/${child.path}`.replace(/\/+/g, "/");
          result.push({ path: fullPath, label: child.label, icon: child.icon });
        }
      });
    }
    if (
      route.showInNavbar &&
      route.label &&
      (!route.allowedRoles || route.allowedRoles.includes(userRole as UserRole))
    ) {
      result.push({ path: route.path, label: route.label, icon: route.icon });
    }
  });

  return result;
};

const Navbar = () => {
  const navLinks = flattenRoutesForNavbar();
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = AVTUseState("", false);

  const handleLogout = () => {
    AuthService.logout();
  };

  const drawerContent = (
    <Box sx={{ width: 220 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {navLinks.map((route) => (
          <ListItem key={route.path} disablePadding>
            <ListItemButton component={Link} to={route.path}>
              {route.icon}
              <ListItemText primary={route.label} sx={{ ml: 1 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        className={`${stylesnav.navbarWrapper} ${
          isMobile ? stylesnav.navbarWrapperMobile : ""
        }`}
      >
        <AppBar
          position="static"
          className={`${stylesnav.appBar} ${
            isMobile ? stylesnav.appBarMobile : ""
          }`}
        >
          <Toolbar
            className={`${stylesnav.toolbar} ${
              isMobile ? stylesnav.toolbarMobile : ""
            }`}
          >
            <Box
              className={`${stylesnav.navLinks} ${
                isMobile ? stylesnav.navLinksMobile : ""
              }`}
            >
              {isMobile && (
                <IconButton
                  onClick={() => setOpen(true)}
                  size="small"
                  sx={{ p: 0.5 }}
                >
                  <MenuIcon fontSize="small" />
                </IconButton>
              )}

              {!isMobile &&
                navLinks.map((route) => (
                  <Button
                    key={route.path}
                    component={Link}
                    to={route.path}
                    className={`${stylesnav.navLinkButton} ${
                      location.pathname === route.path
                        ? stylesnav.navLinkButtonActive
                        : ""
                    }`}
                    startIcon={route.icon}
                  >
                    {route.label}
                  </Button>
                ))}
            </Box>

            {AuthService.isAuthenticated() && currentUser && (
              <Box className={stylesnav.logoutWrapper}>
                <CommonButton onClick={handleLogout}>Logout</CommonButton>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 220,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {drawerContent}
      </Drawer>

      <Box
        className={`${stylesnav.offset} ${
          isMobile ? stylesnav.offsetMobile : ""
        }`}
      />
    </>
  );
};

export default Navbar;

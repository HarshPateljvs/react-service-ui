import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import { AppRoutes } from "../../../../Components/Routes/AppRoutes";
import { AVTUseState } from "../../../customHooks";

const Sidebar = () => {
  const [open, setOpen] = AVTUseState("Sidebar open", true);
  const [expandedMenus, setExpandedMenus] = AVTUseState<string | null>("Expanded menu", null);
  const location = useLocation();

  const handleExpandClick = (label: string) => {
    setExpandedMenus((prev) => (prev === label ? null : label));
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? 220 : 60,
        "& .MuiDrawer-paper": {
          width: open ? 220 : 60,
          boxSizing: "border-box",
        },
      }}
    >
      <IconButton onClick={() => setOpen(!open)} className="m-2">
        <MenuIcon />
      </IconButton>

      <List disablePadding>
        {AppRoutes.filter((x) => x.showInNavbar).map((route) => (
          <div key={route.path}>
            <ListItemButton onClick={() => handleExpandClick(route.label || "")}>
              {route.icon && <ListItemIcon>{route.icon}</ListItemIcon>}
              {open && <ListItemText primary={route.label} />}
              {route.children ? (expandedMenus === route.label ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>

            <Collapse in={expandedMenus === route.label} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {route.children
                  ?.filter((child) => child.showInNavbar)
                  .map((child) => {
                    const fullPath = `${route.path}/${child.path}`.replace(/\/+/g, "/");
                    return (
                      <ListItemButton
                        key={child.path}
                        sx={{ pl: 4 }}
                        component={Link}
                        to={fullPath}
                        selected={location.pathname === fullPath}
                        onClick={() => console.log(`Clicked menu: ${child.label}`)}
                      >
                        {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    );
                  })}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

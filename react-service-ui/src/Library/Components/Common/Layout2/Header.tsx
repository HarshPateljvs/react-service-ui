import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: 1000, ml: { sm: "240px" } }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    React Admin Panel
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000", // Your primary color
    },
    secondary: {
      main: "#9c27b0", // Your secondary color
    },
    background: {
      default: "#f5f7fa", // Body background color
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  });

export default theme;

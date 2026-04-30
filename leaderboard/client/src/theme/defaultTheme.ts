import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c3aed",
    },
    secondary: {
      main: "#10b981",
    },
    background: {
      default: "#0f0f1a",
      paper: "#1a1a2e",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
});

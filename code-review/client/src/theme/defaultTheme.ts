import { createTheme } from "@mui/material/styles";

const { palette: { augmentColor } } = createTheme();
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor, contrastText: "white" } });

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: createColor("#3F51B5"),
    secondary: createColor("#F50057"),
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    divider: "#212121",
    text: {
      primary: "#212121",
      secondary: "#212121",
    },
    action: {
      disabledBackground: "#878f99",
      disabled: "white",
    },
  },
});

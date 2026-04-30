import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { createStyleHook } from "../hooks/styleHooks";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter/AppRouter";

const useAppStyles = createStyleHook(() => {
  return {
    root: {
      height: "100%",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: theme.palette.background.default,
    },
  };
});

export const App = () => {
  const styles = useAppStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.root}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

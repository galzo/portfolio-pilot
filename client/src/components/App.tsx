import { Box, ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { createStyleHook } from "../hooks/styleHooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "../consts/routes";
import { HomePage } from "../pages/Homepage";
import { UserContextProvider } from "../contexts/UserContext/UserContext.provider";

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
      <UserContextProvider>
        <Box sx={styles.root}>
          <BrowserRouter>
            <Routes>
              <Route path={AppRoutes.root} element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </UserContextProvider>
    </ThemeProvider>
  );
};

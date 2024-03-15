import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "../../consts/routes";
import { HomePage } from "../../pages/Homepage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.root} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

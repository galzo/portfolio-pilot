import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../consts/routes";
import { HomePage } from "../../pages/Homepage";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { LoginPage } from "../../pages/LoginPage";

export const AppRouter = () => {
  const { user, token, isInit } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInit) {
      const hasNoUser = !user || !token;
      if (hasNoUser) navigate(AppRoutes.login);
    }
  }, [isInit, navigate, token, user]);

  return (
    <Routes>
      <Route path={AppRoutes.root} element={<HomePage />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
    </Routes>
  );
};

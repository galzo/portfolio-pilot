import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../../consts/routes";
import { RootPage } from "../../pages/RootPage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";
import { PortfolioPage } from "../../pages/PortfolioPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.root} element={<RootPage />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.signup} element={<SignupPage />} />
      <Route path={AppRoutes.portfolio} element={<PortfolioPage />} />
    </Routes>
  );
};

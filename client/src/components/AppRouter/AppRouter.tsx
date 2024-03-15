import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../../consts/routes";
import { HomePage } from "../../pages/Homepage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.root} element={<HomePage />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.signup} element={<SignupPage />} />
    </Routes>
  );
};

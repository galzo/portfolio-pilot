import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../consts/routes";
import { useAuth } from "../hooks/useAuth";

const useRootPageStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default,
    },
  };
});

export const RootPage = () => {
  const styles = useRootPageStyles();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const redirectRoute = isLoggedIn() ? AppRoutes.portfolio : AppRoutes.login;
    navigate(redirectRoute);
  }, [isLoggedIn, navigate]);

  return (
    <PageContainer>
      <Box sx={styles.root}></Box>
    </PageContainer>
  );
};

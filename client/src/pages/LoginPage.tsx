import { LoginCard } from "../components/LoginCard/LoginCard";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box } from "@mui/material";
import { AppTitle } from "../components/AppTitle/AppTitle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "../consts/routes";
import { useEffect } from "react";
import { useSignedInRedirect } from "../hooks/useRedirect";

const useLoginPageStyles = createStyleHook((theme) => {
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

export const LoginPage = () => {
  const styles = useLoginPageStyles();
  const { isLoggedIn } = useAuth();
  useSignedInRedirect({ redirectTo: AppRoutes.portfolio });

  // Block user from seeting this page if they're logged in
  if (isLoggedIn()) {
    return null;
  }

  return (
    <PageContainer>
      <Box sx={styles.root}>
        <AppTitle />
        <LoginCard />
      </Box>
    </PageContainer>
  );
};

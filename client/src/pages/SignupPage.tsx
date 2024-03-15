import { Box } from "@mui/material";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { AppTitle } from "../components/AppTitle/AppTitle";
import { SignupCard } from "../components/SignupCard/SignupCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "../consts/routes";
import { useEffect } from "react";

const useSignupPageStyles = createStyleHook((theme) => {
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

export const SignupPage = () => {
  const styles = useSignupPageStyles();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(AppRoutes.portfolio);
    }
  }, [isLoggedIn, navigate]);

  // Block user from seeting this page if they're logged in
  if (isLoggedIn()) {
    return null;
  }

  return (
    <PageContainer>
      <Box sx={styles.root}>
        <AppTitle />
        <SignupCard />
      </Box>
    </PageContainer>
  );
};

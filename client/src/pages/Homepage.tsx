import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box } from "@mui/material";
import { AppTitle } from "../components/AppTitle/AppTitle";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../consts/routes";

const useHomePageStyles = createStyleHook((theme) => {
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

export const HomePage = () => {
  const styles = useHomePageStyles();
  const { user, token, isInit } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInit) {
      const hasNoUser = !user || !token;
      if (hasNoUser) navigate(AppRoutes.login);
    }
  }, [isInit, navigate, token, user]);

  return (
    <PageContainer>
      <Box sx={styles.root}></Box>
    </PageContainer>
  );
};

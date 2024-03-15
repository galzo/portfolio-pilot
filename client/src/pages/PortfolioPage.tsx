import { LoginCard } from "../components/LoginCard/LoginCard";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box, Typography } from "@mui/material";
import { AppTitle } from "../components/AppTitle/AppTitle";
import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const usePortfolioPageStyles = createStyleHook((theme) => {
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

export const PortfolioPage = () => {
  const styles = usePortfolioPageStyles();
  const { getUser, getToken } = useAuth();
  console.log("user", getUser());
  console.log("token", getToken());
  return (
    <PageContainer>
      <Box sx={styles.root}>
        <Typography color={"black"}>{"Portfolio"}</Typography>
      </Box>
    </PageContainer>
  );
};

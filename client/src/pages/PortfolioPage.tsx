import { LoginCard } from "../components/LoginCard/LoginCard";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box, Typography } from "@mui/material";
import { AppTitle } from "../components/AppTitle/AppTitle";
import { useContext, useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRedirect } from "../hooks/useRedirect";
import { AppRoutes } from "../consts/routes";
import { useFetchPortfolio } from "../hooks/useFetchPortfolio";
import { PortfolioCard } from "../components/PortfolioCard/PortfolioCard";

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
  const { isLoggedIn, isAdmin, getUser } = useAuth();
  useRedirect({ predicate: () => !isLoggedIn(), redirectTo: AppRoutes.login });
  useRedirect({ predicate: () => isAdmin(), redirectTo: AppRoutes.admin });

  const user = useMemo(() => {
    return getUser();
  }, [getUser]);

  const { isLoading, portfolio, portfolioError } = useFetchPortfolio(user);

  // Block user from seeting this page if they're not logged in or they're admin
  if (isAdmin() || !portfolio || !user) {
    return null;
  }

  return (
    <PageContainer>
      <Box sx={styles.root}>
        <PortfolioCard portfolio={portfolio} user={user} />
      </Box>
    </PageContainer>
  );
};

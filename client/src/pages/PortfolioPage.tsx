import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box, Button } from "@mui/material";
import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRedirect } from "../hooks/useRedirect";
import { AppRoutes } from "../consts/routes";
import { useFetchPortfolio } from "../hooks/useFetchPortfolio";
import { PortfolioCard } from "../components/PortfolioCard/PortfolioCard";
import { Player } from "@lottiefiles/react-lottie-player";
import coinsAnimation from "..//assets/animations/coinsAnimation.json";
import { useWindowSize } from "../hooks/useWindowSize";
import { PortfolioPositions } from "../components/PortfolioCard/PortfolioPositions";
import { SignOutButton } from "../components/SignOutButton/SignOutButton";
import { PortfolioActions } from "../components/PortfolioActions/PortfolioActions";

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

  const { portfolio, refreshPortfolio } = useFetchPortfolio(user);

  // Block user from seeting this page if they're not logged in or they're admin
  if (isAdmin() || !portfolio || !user) {
    return null;
  }

  return (
    <PageContainer>
      <SignOutButton />
      <Box sx={styles.root}>
        <Player
          autoplay={true}
          src={coinsAnimation}
          loop={true}
          style={{
            height: "200px",
          }}
        />
        <PortfolioCard portfolio={portfolio} user={user} />
        <PortfolioPositions positions={portfolio.positions} />
        <PortfolioActions portfolio={portfolio} user={user} refreshPortfolioData={refreshPortfolio} />
      </Box>
    </PageContainer>
  );
};

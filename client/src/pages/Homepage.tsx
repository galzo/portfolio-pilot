import { LoginCard } from "../components/LoginCard/LoginCard";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box, Typography } from "@mui/material";
import firstAnim from "../assets/animations/thirdAnim.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { AppTitle } from "../components/AppTitle/AppTitle";

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
  return (
    <PageContainer>
      <Box sx={styles.root}>
        <AppTitle />
        <LoginCard />
      </Box>
    </PageContainer>
  );
};

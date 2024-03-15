import { LoginCard } from "../components/LoginCard/LoginCard";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box } from "@mui/material";
import { AppTitle } from "../components/AppTitle/AppTitle";

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
  return (
    <PageContainer>
      <Box sx={styles.root}>
        <AppTitle />
        <LoginCard />
      </Box>
    </PageContainer>
  );
};

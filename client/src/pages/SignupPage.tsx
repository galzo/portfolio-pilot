import { Box } from "@mui/material";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { AppTitle } from "../components/AppTitle/AppTitle";
import { SignupCard } from "../components/SignupCard/SignupCard";

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
  return (
    <PageContainer>
      <Box sx={styles.root}>
        <AppTitle />
        <SignupCard />
      </Box>
    </PageContainer>
  );
};

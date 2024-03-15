import { PageContainer } from "../components/pageComponents/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { Box, Typography } from "@mui/material";

const useHomePageStyles = createStyleHook(() => {
  return {
    root: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  };
});

export const HomePage = () => {
  const styles = useHomePageStyles();
  return (
    <PageContainer>
      <Box sx={styles.root}>
        <Typography variant="h1">{"Hello world"}</Typography>
      </Box>
    </PageContainer>
  );
};

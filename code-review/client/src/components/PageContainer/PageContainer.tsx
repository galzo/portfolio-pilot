import { Box, Fade } from "@mui/material";
import { FC, ReactNode } from "react";
import { createStyleHook } from "../../hooks/styleHooks";

interface PageContainerProps {
  children: ReactNode;
  centered?: boolean;
}

const usePageContainerStyles = createStyleHook((_theme, props: { centered: boolean }) => {
  return {
    root: {
      width: "100%",
      minHeight: "100vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: props.centered ? "center" : "flex-start",
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: props.centered ? 0 : "60px",
      paddingBottom: "60px",
    },
  };
});

export const PageContainer: FC<PageContainerProps> = ({ children, centered = false }) => {
  const styles = usePageContainerStyles({ centered });

  return (
    <Box sx={styles.root}>
      <Fade in timeout={1000}>
        <Box sx={styles.content}>{children}</Box>
      </Fade>
    </Box>
  );
};

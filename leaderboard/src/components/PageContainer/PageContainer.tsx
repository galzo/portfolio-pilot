import { Box, Fade } from "@mui/material";
import { FC, ReactNode } from "react";
import { createStyleHook } from "../../hooks/styleHooks";

interface PageContainerProps {
  children: ReactNode;
}

const usePageContainerStyles = createStyleHook(() => {
  return {
    root: {
      width: "100%",
      height: "100%",
      overflowY: "scroll",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    content: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      marginTop: "80px",
    },
  };
});

export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  const styles = usePageContainerStyles();

  return (
    <Box sx={styles.root}>
      <Fade in timeout={1000}>
        <Box sx={styles.content}>{children}</Box>
      </Fade>
    </Box>
  );
};

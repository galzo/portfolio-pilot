import { Box, Typography, useTheme } from "@mui/material";
import { createStyleHook } from "../../hooks/styleHooks";

import phoneAnimation from "../../assets/animations/phoneAnimation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useWindowSize } from "../../hooks/useWindowSize";

const useAppTitleStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      color: theme.palette.text.primary,
      fontFamily: "roboto",
      marginBottom: "20px",
    },
    textContainer: {
      display: "flex",
      flexDirection: "row",
      userSelect: "none",
    },
  };
});

export const AppTitle = () => {
  const windowSize = useWindowSize();
  const styles = useAppTitleStyles();
  const theme = useTheme();
  return (
    <Box sx={styles.root}>
      <Player
        autoplay={true}
        src={phoneAnimation}
        loop={true}
        style={{
          width: windowSize.innerWidth >= 800 ? "300px" : "150px",
        }}
      />
      <Box component={"span"} sx={styles.textContainer}>
        <Typography variant="h3">{"PortfolioPilot."}</Typography>
        <Typography variant="h3" color={theme.palette.secondary.main}>
          {"io"}
        </Typography>
      </Box>
    </Box>
  );
};

import { Box, Typography, useTheme } from "@mui/material";
import { createStyleHook } from "../../hooks/styleHooks";

import phoneAnimation from "../../assets/animations/thirdAnim.json";
import { Player } from "@lottiefiles/react-lottie-player";

const useAppTitleStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      color: theme.palette.text.primary,
      fontFamily: "roboto",
    },
    textContainer: {
      display: "flex",
      flexDirection: "row",
    },
  };
});

export const AppTitle = () => {
  const styles = useAppTitleStyles();
  const theme = useTheme();
  return (
    <Box sx={styles.root}>
      <Player
        autoplay={true}
        src={phoneAnimation}
        loop={true}
        style={{
          width: "300px",
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

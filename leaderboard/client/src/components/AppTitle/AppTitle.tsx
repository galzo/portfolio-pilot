import { Box, Typography, useTheme } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { useAppTitleStyles } from "./AppTitle.styles";
import { useWindowSize } from "../../hooks/useWindowSize";
import phoneAnimation from "../../assets/animations/phoneAnimation.json";

interface AppTitleProps {
  subtitle?: string;
}

export const AppTitle = ({ subtitle }: AppTitleProps) => {
  const windowSize = useWindowSize();
  const styles = useAppTitleStyles();
  const theme = useTheme();
  return (
    <Box sx={styles.root}>
      <Player
        autoplay
        src={phoneAnimation}
        loop
        style={{
          width: windowSize.innerWidth >= 800 ? "260px" : "150px",
        }}
      />
      <Box component="span" sx={styles.textContainer}>
        <Typography variant="h3">PortfolioPilot.</Typography>
        <Typography variant="h3" color={theme.palette.secondary.main}>
          io
        </Typography>
      </Box>
      {subtitle && (
        <Typography variant="subtitle1" sx={styles.subtitle}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

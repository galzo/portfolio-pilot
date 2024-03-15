import React from "react";
import { createStyleHook } from "../../hooks/styleHooks";
import { Box, Typography, useTheme } from "@mui/material";
import { AppColors } from "../../consts/colors";
import { IconLock } from "@tabler/icons-react";
import firstAnim from "../../assets/animations/firstAnim.json";
import { Player } from "@lottiefiles/react-lottie-player";

const useLoginCardStyles = createStyleHook((theme) => {
  return {
    root: {
      width: "476px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      padding: "20px",
      boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    titleContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      backgroundColor: theme.palette.secondary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      borderRadius: "100%",
    },
    text: {
      color: theme.palette.text.primary,
    },
  };
});

export const LoginCard = () => {
  const styles = useLoginCardStyles();
  const theme = useTheme();

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleContainer}>
        <Box sx={styles.icon}>
          <IconLock color={theme.palette.background.default} strokeWidth={2} />
        </Box>
        <Typography sx={styles.text} variant="h5">
          {"Sign in"}
        </Typography>
      </Box>
    </Box>
  );
};

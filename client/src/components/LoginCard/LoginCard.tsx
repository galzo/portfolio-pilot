import React from "react";
import { createStyleHook } from "../../hooks/styleHooks";
import { Box, Button, Link, TextField, Typography, useTheme } from "@mui/material";
import { AppColors } from "../../consts/colors";
import { IconLock } from "@tabler/icons-react";
import firstAnim from "../../assets/animations/firstAnim.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { combineStyles } from "../../utils/styleUtils";

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
    signInText: {
      color: theme.palette.text.primary,
    },
    input: {
      height: "56px",
    },
    marginBottom: {
      marginBottom: "24px",
    },
  };
});

export const LoginCard = () => {
  const styles = useLoginCardStyles();
  const theme = useTheme();

  return (
    <Box sx={styles.root}>
      <Box sx={combineStyles(styles.titleContainer, styles.marginBottom)}>
        <Box sx={styles.icon}>
          <IconLock color={theme.palette.background.default} strokeWidth={2} />
        </Box>
        <Typography sx={styles.signInText} variant="h5">
          {"Sign in"}
        </Typography>
      </Box>
      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        fullWidth={true}
        label="Email"
        variant="outlined"
        required={true}
        type="email"
        autoFocus={true}
      />
      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        label="Password"
        variant="outlined"
        required={true}
        type="password"
        fullWidth={true}
        error={true}
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" color="primary" sx={styles.marginBottom}>
        Sign In
      </Button>
      <Link href="#" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
};

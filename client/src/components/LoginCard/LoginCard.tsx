import { Box, Button, Link, TextField, Typography, useTheme } from "@mui/material";
import { IconLock } from "@tabler/icons-react";
import { combineStyles } from "../../utils/styleUtils";
import { useLoginCardStyles } from "./LoginCard.styles";
import { useCallback, useState } from "react";
import { isEmailAddressValid, isPasswordValid } from "../../utils/inputUtils";
import { useLogin } from "./useLogin";
import { AppRoutes } from "../../consts/routes";

export const LoginCard = () => {
  const styles = useLoginCardStyles();
  const theme = useTheme();

  const {
    handleEmailChange,
    handlePasswordChange,
    handleKeypress,
    handleSubmit,
    email,
    password,
    error,
    emailError,
    passwordError,
  } = useLogin();

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
        onChange={(event) => handleEmailChange(event.target.value)}
        onKeyDown={handleKeypress}
        fullWidth={true}
        required={true}
        autoFocus={true}
        label="Email"
        variant="outlined"
        type="email"
        error={Boolean(error || emailError)}
        helperText={error || emailError}
      />
      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        onChange={(event) => handlePasswordChange(event.target.value)}
        onKeyDown={handleKeypress}
        label="Password"
        variant="outlined"
        required={true}
        type="password"
        fullWidth={true}
        autoComplete="current-password"
        error={Boolean(error || passwordError)}
        helperText={passwordError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={styles.marginBottom}
        onClick={handleSubmit}
      >
        Sign In
      </Button>
      <Link href={AppRoutes.signup} variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
};

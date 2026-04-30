import { Box, Button, Link, TextField, Typography, useTheme } from "@mui/material";
import { IconLock } from "@tabler/icons-react";
import { combineStyles } from "../../utils/styleUtils";
import { useLoginCardStyles } from "./LoginCard.styles";
import { useLogin } from "./useLogin";
import { AppRoutes } from "../../consts/routes";

export const LoginCard = () => {
  const styles = useLoginCardStyles();
  const theme = useTheme();

  const { details, errors, callbacks } = useLogin();

  return (
    <Box sx={styles.root}>
      <Box sx={combineStyles(styles.titleContainer, styles.marginBottom)}>
        <Box sx={styles.icon}>
          <IconLock color={theme.palette.background.default} strokeWidth={2} />
        </Box>
        <Typography sx={styles.loginText} variant="h5">
          {"Sign In"}
        </Typography>
      </Box>
      {errors.apiError && (
        <Typography sx={combineStyles(styles.errorText, styles.marginBottom)}>{errors.apiError}</Typography>
      )}
      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        onChange={(event) => callbacks.handleEmailChange(event.target.value)}
        onKeyDown={callbacks.handleKeypress}
        fullWidth={true}
        required={true}
        autoFocus={true}
        label="Email"
        variant="outlined"
        type="email"
        error={Boolean(errors.emailError)}
        helperText={errors.emailError}
      />
      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        onChange={(event) => callbacks.handlePasswordChange(event.target.value)}
        onKeyDown={callbacks.handleKeypress}
        label="Password"
        variant="outlined"
        required={true}
        type="password"
        fullWidth={true}
        autoComplete="current-password"
        error={Boolean(errors.passwordError)}
        helperText={errors.passwordError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={styles.marginBottom}
        onClick={callbacks.handleSubmit}
        disabled={details.isLoading}
      >
        {details.isLoading ? "Signing In..." : "Sign In"}
      </Button>
      <Link href={AppRoutes.signup} variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
};

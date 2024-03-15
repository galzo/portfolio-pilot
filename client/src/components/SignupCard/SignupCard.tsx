import { useSignupCardStyles } from "./SignupCard.styles";
import { useSignup } from "./useSignup";
import { Box, Button, Link, TextField, Typography, useTheme } from "@mui/material";
import { combineStyles } from "../../utils/styleUtils";
import { IconLockHeart } from "@tabler/icons-react";
import { AppRoutes } from "../../consts/routes";

export const SignupCard = () => {
  const styles = useSignupCardStyles();
  const theme = useTheme();

  const { details, errors, callbacks } = useSignup();

  return (
    <Box sx={styles.root}>
      <Box sx={combineStyles(styles.titleContainer, styles.marginBottom)}>
        <Box sx={styles.icon}>
          <IconLockHeart color={theme.palette.background.default} strokeWidth={2} />
        </Box>
        <Typography sx={styles.signupText} variant="h5">
          {"Sign Up"}
        </Typography>
      </Box>
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
        error={Boolean(errors.error || errors.emailError)}
        helperText={errors.error || errors.emailError}
      />
      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        onChange={(event) => callbacks.handleNameChange(event.target.value)}
        onKeyDown={callbacks.handleKeypress}
        fullWidth={true}
        required={true}
        label="User Name"
        variant="outlined"
        type="text"
        error={Boolean(errors.error || errors.nameError)}
        helperText={errors.nameError}
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
        error={Boolean(errors.error || errors.passwordError)}
        helperText={errors.passwordError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={styles.marginBottom}
        onClick={callbacks.handleSubmit}
      >
        Sign Up
      </Button>
      <Link href={AppRoutes.login} variant="body2">
        {"Already have an account? Sign In"}
      </Link>
    </Box>
  );
};

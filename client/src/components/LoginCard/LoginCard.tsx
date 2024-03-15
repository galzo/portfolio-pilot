import { Box, Button, Link, TextField, Typography, useTheme } from "@mui/material";
import { IconLock } from "@tabler/icons-react";
import { combineStyles } from "../../utils/styleUtils";
import { useLoginCardStyles } from "./LoginCard.styles";
import { useCallback, useState } from "react";
import { isEmailAddressValid, isPasswordValid } from "../../utils/inputUtils";

export const LoginCard = () => {
  const styles = useLoginCardStyles();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const handleEmailChange = useCallback((email: string) => {
    setEmailError("");
    setEmail(email);
  }, []);

  const handlePasswordChange = useCallback((password: string) => {
    setPasswordError("");
    setPassword(password);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isEmailAddressValid(email)) {
      setEmailError("Please fill in a valid email address");
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Please fill in a password");
      return;
    }
  }, [email, password]);

  const handleKeypress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

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
      <Link href="#" variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>
    </Box>
  );
};

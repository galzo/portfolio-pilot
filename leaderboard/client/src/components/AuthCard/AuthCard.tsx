import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { IconLock, IconLockHeart } from "@tabler/icons-react";
import { useState } from "react";
import { combineStyles } from "../../utils/styleUtils";
import { useAuthCardStyles } from "./AuthCard.styles";

interface AuthCardProps {
  onAuthenticated: (user: { id: number; username: string }) => void;
}

const apiUrl = (path: string) => `http://localhost:3002/api/${path}`;

export const AuthCard = ({ onAuthenticated }: AuthCardProps) => {
  const styles = useAuthCardStyles();
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(apiUrl(isLogin ? "login" : "signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.isSuccess) {
        onAuthenticated({ id: data.userId, username: data.username });
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (_err) {
      setError("Network error. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleSubmit();
  };

  return (
    <Box sx={styles.root}>
      <Box sx={combineStyles(styles.titleContainer, styles.marginBottom)}>
        <Box sx={styles.icon}>
          {isLogin ? (
            <IconLock color={theme.palette.background.default} strokeWidth={2} />
          ) : (
            <IconLockHeart color={theme.palette.background.default} strokeWidth={2} />
          )}
        </Box>
        <Typography sx={styles.title} variant="h5">
          {isLogin ? "Sign In" : "Sign Up"}
        </Typography>
      </Box>

      <ToggleButtonGroup
        sx={styles.toggleRow}
        value={isLogin}
        exclusive
        onChange={(_e, val) => {
          if (val !== null) {
            setIsLogin(val);
            setError("");
          }
        }}
        color="primary"
      >
        <ToggleButton sx={styles.toggle} value={true}>
          Sign In
        </ToggleButton>
        <ToggleButton sx={styles.toggle} value={false}>
          Sign Up
        </ToggleButton>
      </ToggleButtonGroup>

      {error && (
        <Typography sx={combineStyles(styles.errorText, styles.marginBottom)} variant="body2">
          {error}
        </Typography>
      )}

      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        onChange={(event) => setUsername(event.target.value)}
        onKeyDown={handleKeydown}
        fullWidth
        required
        autoFocus
        label="Username"
        variant="outlined"
        value={username}
      />
      <TextField
        sx={combineStyles(styles.input, styles.marginBottom)}
        onChange={(event) => setPassword(event.target.value)}
        onKeyDown={handleKeydown}
        fullWidth
        required
        label="Password"
        variant="outlined"
        type="password"
        autoComplete={isLogin ? "current-password" : "new-password"}
        value={password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Working..." : isLogin ? "Sign In" : "Sign Up"}
      </Button>
    </Box>
  );
};

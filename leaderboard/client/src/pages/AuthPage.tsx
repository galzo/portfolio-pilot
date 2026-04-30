import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";

interface Props {
  onLogin: (user: any) => void;
}

export const AuthPage = ({ onLogin }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? "login" : "signup";
      const res = await fetch(`http://localhost:3002/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.isSuccess) {
        onLogin({ id: data.userId, username: data.username });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Network error.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        <Typography variant="h4" align="center">CTF Leaderboard</Typography>
        
        <ToggleButtonGroup
          value={isLogin}
          exclusive
          onChange={(e, val) => { if (val !== null) setIsLogin(val); }}
          fullWidth
        >
          <ToggleButton value={true}>Login</ToggleButton>
          <ToggleButton value={false}>Sign Up</ToggleButton>
        </ToggleButtonGroup>

        <TextField label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} fullWidth />
        <TextField label="Password" type="password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
        
        {error && <Typography color="error">{error}</Typography>}
        
        <Button variant="contained" color="primary" onClick={handleSubmit} size="large">
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </Paper>
    </Container>
  );
};

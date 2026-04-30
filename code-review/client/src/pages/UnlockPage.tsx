import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsUnlocked: (val: boolean) => void;
}

export const UnlockPage = ({ setIsUnlocked }: Props) => {
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUnlock = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/challenge/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flag }),
      });
      const data = await res.json();
      if (data.isSuccess) {
        setIsUnlocked(true);
        navigate("/challenge");
      } else {
        setError(data.error || "Invalid flag.");
      }
    } catch (err) {
      setError("Network error. Make sure the server is running.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Code Review Challenge
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          Submit a valid flag from a previous challenge to unlock.
        </Typography>
        <TextField
          label="Flag"
          variant="outlined"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleUnlock} size="large">
          Unlock Challenge
        </Button>
      </Paper>
    </Container>
  );
};

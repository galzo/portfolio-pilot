import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface Props {
  user: { id: number; username: string };
  onLogout: () => void;
}

export const LeaderboardPage = ({ user, onLogout }: Props) => {
  const [flag, setFlag] = useState("");
  const [captchaQ, setCaptchaQ] = useState({ num1: 0, num2: 0 });
  const [captchaA, setCaptchaA] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  const generateCaptcha = () => {
    setCaptchaQ({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1
    });
    setCaptchaA("");
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:3002/api/leaderboard");
      const data = await res.json();
      if (data.isSuccess) setLeaderboard(data.leaderboard);
    } catch (err) {}
  };

  useEffect(() => {
    generateCaptcha();
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:3002/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: user.id, 
          flag, 
          captchaAnswer: captchaA, 
          captchaExpected: captchaQ.num1 + captchaQ.num2 
        }),
      });
      const data = await res.json();
      generateCaptcha();
      if (data.isSuccess) {
        setSuccess(data.message);
        setFlag("");
        fetchLeaderboard();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Network error.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h3">CTF Leaderboard</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>Welcome, {user.username}</Typography>
          <Button variant="outlined" onClick={onLogout}>Logout</Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
        <Paper elevation={3} sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column", gap: 3, height: "fit-content" }}>
          <Typography variant="h5">Submit Flag</Typography>
          <TextField label="Flag" variant="outlined" placeholder="flag{...}" value={flag} onChange={e => setFlag(e.target.value)} fullWidth />
          
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>What is {captchaQ.num1} + {captchaQ.num2}?</Typography>
            <TextField label="Answer" type="number" variant="outlined" value={captchaA} onChange={e => setCaptchaA(e.target.value)} size="small" />
          </Box>

          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success.main">{success}</Typography>}

          <Button variant="contained" color="primary" onClick={handleSubmit} size="large">Submit</Button>
          
          <Box sx={{ mt: 2, bgcolor: "rgba(255,255,255,0.05)", p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary">
              * First submission for a flag gives 100 points.<br/>
              * Points drop by 5 for each subsequent solver.<br/>
              * First 3 incorrect submissions are free. Afterward, 1 point is deducted per incorrect submission.
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ flex: 2, p: 3 }}>
          <Typography variant="h5" gutterBottom>Top Hackers</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((u, idx) => (
                  <TableRow key={u.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell sx={{ fontWeight: u.id === user.id ? "bold" : "normal" }}>{u.username}</TableCell>
                    <TableCell align="right">{u.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

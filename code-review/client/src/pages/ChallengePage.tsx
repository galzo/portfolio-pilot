import { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { CodeSnippet } from "../components/CodeSnippet";

export const ChallengePage = () => {
  const [vuln1From, setVuln1From] = useState("");
  const [vuln1To, setVuln1To] = useState("");
  const [vuln1Type, setVuln1Type] = useState("");

  const [vuln2From, setVuln2From] = useState("");
  const [vuln2To, setVuln2To] = useState("");
  const [vuln2Type, setVuln2Type] = useState("");

  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      setFlag("");
      const vulnerabilities = [
        { fromLine: parseInt(vuln1From), toLine: parseInt(vuln1To), type: vuln1Type },
        { fromLine: parseInt(vuln2From), toLine: parseInt(vuln2To), type: vuln2Type },
      ];

      const res = await fetch("http://localhost:3001/api/challenge/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vulnerabilities }),
      });
      const data = await res.json();
      if (data.isSuccess) {
        setFlag(data.flag);
      } else {
        setError(data.error || "Incorrect vulnerabilities. Keep trying!");
      }
    } catch (err) {
      setError("Network error. Make sure the server is running.");
    }
  };

  const owaspOptions = [
    "Broken Object Level Authorization (BOLA)",
    "Broken Authentication",
    "Broken Object Property Level Authorization",
    "Unrestricted Resource Consumption",
    "Broken Function Level Authorization (BFLA)",
    "Unrestricted Access to Sensitive Business Flows",
    "Server Side Request Forgery (SSRF)",
    "Security Misconfiguration",
    "Improper Inventory Management",
    "Unsafe Consumption of APIs",
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Code Review Challenge
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Find the two vulnerabilities in the code below. Provide the line numbers (inclusive) and the type.
      </Typography>
      
      <Box sx={{ display: "flex", gap: 4, mt: 4, flexDirection: { xs: "column", md: "row" } }}>
        <Paper elevation={3} sx={{ flex: 2, height: "70vh", overflowY: "auto", bgcolor: "#1e1e1e" }}>
          <CodeSnippet />
        </Paper>

        <Paper elevation={3} sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6">Submit Findings</Typography>
          
          <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>Vulnerability 1</Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField label="From Line" type="number" value={vuln1From} onChange={e => setVuln1From(e.target.value)} fullWidth />
              <TextField label="To Line" type="number" value={vuln1To} onChange={e => setVuln1To(e.target.value)} fullWidth />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={vuln1Type} onChange={e => setVuln1Type(e.target.value as string)} label="Type">
                {owaspOptions.map(o => (
                  <MenuItem key={o} value={o.includes('BOLA') ? 'BOLA' : o.includes('BFLA') ? 'BFLA' : o}>{o}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>Vulnerability 2</Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField label="From Line" type="number" value={vuln2From} onChange={e => setVuln2From(e.target.value)} fullWidth />
              <TextField label="To Line" type="number" value={vuln2To} onChange={e => setVuln2To(e.target.value)} fullWidth />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={vuln2Type} onChange={e => setVuln2Type(e.target.value as string)} label="Type">
                {owaspOptions.map(o => (
                  <MenuItem key={o} value={o.includes('BOLA') ? 'BOLA' : o.includes('BFLA') ? 'BFLA' : o}>{o}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button variant="contained" color="primary" onClick={handleSubmit} size="large">
            Submit
          </Button>

          {error && <Typography color="error" variant="body1">{error}</Typography>}
          {flag && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "success.light", color: "success.contrastText", borderRadius: 1 }}>
              <Typography variant="h6">Success!</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{flag}</Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

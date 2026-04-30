import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { IconKey } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUnlockCardStyles } from "./UnlockCard.styles";

interface Props {
  setIsUnlocked: (val: boolean) => void;
}

export const UnlockCard = ({ setIsUnlocked }: Props) => {
  const styles = useUnlockCardStyles();
  const theme = useTheme();
  const [flag, setFlag] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = async () => {
    if (!flag) {
      setError("Enter a valid flag from a previous challenge.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/challenge/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ flag }),
      });
      const data = await res.json();
      if (data.isSuccess) {
        setIsUnlocked(true);
        navigate("/challenge");
      } else {
        setError(data.error || "Invalid flag.");
      }
    } catch (_err) {
      setError("Network error. Make sure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleContainer}>
        <Box sx={styles.icon}>
          <IconKey color={theme.palette.background.default} strokeWidth={2} />
        </Box>
        <Typography sx={styles.title} variant="h5">
          Code Review Challenge
        </Typography>
      </Box>
      <Typography sx={styles.blurb} variant="body2">
        Submit any flag you've already solved to unlock the final challenge.
      </Typography>
      <TextField
        sx={styles.input}
        label="Flag"
        placeholder="flag{...}"
        variant="outlined"
        fullWidth
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
        error={!!error}
        helperText={error || " "}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handleUnlock}
        disabled={isLoading}
      >
        {isLoading ? "Unlocking..." : "Unlock Challenge"}
      </Button>
    </Box>
  );
};

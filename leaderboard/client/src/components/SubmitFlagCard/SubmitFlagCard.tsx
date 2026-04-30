import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { IconFlag2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { combineStyles } from "../../utils/styleUtils";
import { useSubmitFlagCardStyles } from "./SubmitFlagCard.styles";
import coinsAnimation from "../../assets/animations/coinsAnimation.json";

interface SubmitFlagCardProps {
  userId: number;
  onScored: () => void;
}

interface CaptchaState {
  captchaId: string;
  prompt: string;
}

const apiUrl = (path: string) => `http://localhost:3002/api/${path}`;

export const SubmitFlagCard = ({ userId, onScored }: SubmitFlagCardProps) => {
  const styles = useSubmitFlagCardStyles();
  const [flag, setFlag] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaState | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCaptcha = async () => {
    try {
      const res = await fetch(apiUrl("captcha"));
      const data = await res.json();
      if (data.isSuccess) {
        setCaptcha({ captchaId: data.captchaId, prompt: data.prompt });
        setCaptchaAnswer("");
      }
    } catch (_err) {
      // silent — UI will show captcha unavailable
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async () => {
    if (!flag) {
      setError("Enter a flag.");
      return;
    }
    if (!captcha) {
      setError("Captcha not loaded yet — please wait.");
      return;
    }
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(apiUrl("submit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          flag,
          captchaId: captcha.captchaId,
          captchaAnswer,
        }),
      });
      const data = await res.json();
      if (data.isSuccess) {
        setSuccess(data.message);
        setFlag("");
        onScored();
      } else {
        setError(data.error || "Submission rejected.");
      }
    } catch (_err) {
      setError("Network error.");
    } finally {
      setIsLoading(false);
      fetchCaptcha();
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleRow}>
        <Box sx={styles.titleIcon}>
          <IconFlag2 size={20} />
        </Box>
        <Typography sx={styles.title} variant="h5">
          Submit a Flag
        </Typography>
      </Box>

      <TextField
        sx={styles.input}
        label="Flag"
        placeholder="flag{...}"
        variant="outlined"
        fullWidth
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
      />

      <Box sx={styles.captchaRow}>
        <Typography variant="body1" sx={styles.captchaPrompt}>
          {captcha ? captcha.prompt : "Loading captcha…"}
        </Typography>
        <TextField
          label="Answer"
          variant="outlined"
          size="small"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
        />
      </Box>

      <Button
        sx={styles.submitButton}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading || !captcha}
        size="large"
        fullWidth
      >
        {isLoading ? "Submitting…" : "Submit"}
      </Button>

      {error && (
        <Alert severity="error" sx={combineStyles({ marginTop: "16px" })}>
          {error}
        </Alert>
      )}
      {success && (
        <>
          <Alert severity="success" sx={combineStyles({ marginTop: "16px" })}>
            {success}
          </Alert>
          <Player
            autoplay
            keepLastFrame
            src={coinsAnimation}
            style={{ width: "120px", alignSelf: "center", marginTop: "8px" }}
          />
        </>
      )}
    </Box>
  );
};

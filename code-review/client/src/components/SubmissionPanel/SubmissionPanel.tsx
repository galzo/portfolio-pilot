import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { IconBug } from "@tabler/icons-react";
import { useState } from "react";
import coinsAnimation from "../../assets/animations/coinsAnimation.json";
import { useSubmissionPanelStyles } from "./SubmissionPanel.styles";

export interface VulnEntry {
  fromLine: string;
  toLine: string;
  type: string;
}

interface SubmissionPanelProps {
  entries: VulnEntry[];
  onEntryChange: (idx: number, patch: Partial<VulnEntry>) => void;
  onActivate: (idx: number) => void;
  activeIdx: number;
  onSubmitFlag: (flag: string) => void;
}

const owaspOptions: Array<{ value: string; label: string; description: string }> = [
  {
    value: "BOLA",
    label: "Broken Object Level Authorization",
    description: "Object access where the user isn't the owner.",
  },
  {
    value: "BROKEN_AUTH",
    label: "Broken Authentication",
    description: "Identity not verified, weak token handling.",
  },
  {
    value: "BOPLA",
    label: "Broken Object Property Level Authorization",
    description: "Sensitive properties readable / writable.",
  },
  {
    value: "RESOURCE",
    label: "Unrestricted Resource Consumption",
    description: "No bounds on cost-heavy work.",
  },
  {
    value: "BFLA",
    label: "Broken Function Level Authorization",
    description: "Privileged function exposed to non-admins.",
  },
  {
    value: "BUSINESS_FLOW",
    label: "Unrestricted Access to Business Flows",
    description: "Workflow abuse (mass account creation, etc.).",
  },
  {
    value: "SSRF",
    label: "Server-Side Request Forgery (SSRF)",
    description: "Server fetches attacker-chosen URLs.",
  },
  {
    value: "MISCONFIG",
    label: "Security Misconfiguration",
    description: "Insecure defaults, exposed surfaces.",
  },
  {
    value: "INVENTORY",
    label: "Improper Inventory Management",
    description: "Stale endpoints, undocumented API versions.",
  },
  {
    value: "API_CONSUMPTION",
    label: "Unsafe Consumption of APIs",
    description: "Downstream API responses trusted blindly.",
  },
];

export const SubmissionPanel = ({
  entries,
  onEntryChange,
  onActivate,
  activeIdx,
  onSubmitFlag,
}: SubmissionPanelProps) => {
  const styles = useSubmissionPanelStyles();
  const [error, setError] = useState("");
  const [flag, setFlag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cardStates, setCardStates] = useState<Array<{ checking: boolean; result: "correct" | "wrong" | null }>>(
    () => entries.map(() => ({ checking: false, result: null }))
  );

  const setCardState = (idx: number, patch: Partial<(typeof cardStates)[number]>) => {
    setCardStates((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  const handleCheck = async (idx: number) => {
    const entry = entries[idx];
    setCardState(idx, { checking: true, result: null });
    try {
      const res = await fetch("http://localhost:3001/api/challenge/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          vulnerability: {
            fromLine: parseInt(entry.fromLine, 10),
            toLine: parseInt(entry.toLine, 10),
            type: entry.type,
          },
        }),
      });
      const data = await res.json();
      setCardState(idx, { checking: false, result: data.isSuccess ? "correct" : "wrong" });
    } catch {
      setCardState(idx, { checking: false, result: "wrong" });
    }
  };

  const handleSubmit = async () => {
    setError("");
    setFlag("");
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/challenge/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          vulnerabilities: entries.map((e) => ({
            fromLine: parseInt(e.fromLine, 10),
            toLine: parseInt(e.toLine, 10),
            type: e.type,
          })),
        }),
      });
      const data = await res.json();
      if (data.isSuccess) {
        setFlag(data.flag);
        onSubmitFlag(data.flag);
      } else {
        setError(data.error || "Not quite.");
      }
    } catch (_err) {
      setError("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleRow}>
        <Box sx={styles.titleIcon}>
          <IconBug size={20} />
        </Box>
        <Typography sx={styles.title} variant="h5">
          Submit Findings
        </Typography>
      </Box>
      <Typography sx={styles.blurb} variant="body2">
        Identify exactly two vulnerabilities.
      </Typography>

      {entries.map((entry, idx) => {
        const cardState = cardStates[idx] ?? { checking: false, result: null };
        return (
          <Box
            key={idx}
            sx={styles.vulnCard}
            onClick={() => onActivate(idx)}
            style={{
              outline: idx === activeIdx ? "2px solid #F50057" : "none",
              outlineOffset: "-2px",
            }}
          >
            <Box sx={styles.vulnHeader}>
              <Typography sx={styles.vulnTitle}>Vulnerability #{idx + 1}</Typography>
              {idx === activeIdx && <Typography variant="caption">active</Typography>}
            </Box>
            <Box sx={styles.rangeRow}>
              <TextField
                label="From line"
                type="number"
                value={entry.fromLine}
                onChange={(e) => onEntryChange(idx, { fromLine: e.target.value })}
                fullWidth
                size="small"
              />
              <TextField
                label="To line"
                type="number"
                value={entry.toLine}
                onChange={(e) => onEntryChange(idx, { toLine: e.target.value })}
                fullWidth
                size="small"
              />
            </Box>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={entry.type}
                onChange={(e) => onEntryChange(idx, { type: e.target.value })}
              >
                {owaspOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body2">{opt.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {opt.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disabled={cardState.checking || !entry.fromLine || !entry.toLine || !entry.type}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheck(idx);
                }}
              >
                {cardState.checking ? "Checking…" : "Check"}
              </Button>
              {cardState.result === "correct" && (
                <Typography variant="caption" sx={{ color: "#4caf50", fontWeight: 600 }}>
                  ✓ Correct
                </Typography>
              )}
              {cardState.result === "wrong" && (
                <Typography variant="caption" sx={{ color: "#f44336", fontWeight: 600 }}>
                  Not quite.
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}

      <Button
        variant="contained"
        color="primary"
        size="large"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "Submitting…" : "Submit"}
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
      {flag && (
        <Box sx={styles.successBox}>
          <Player autoplay keepLastFrame src={coinsAnimation} style={{ width: "120px" }} />
          <Typography variant="h6">Final Flag</Typography>
          <Typography sx={styles.flagText}>{flag}</Typography>
        </Box>
      )}
    </Box>
  );
};

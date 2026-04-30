import { Box, Container, Typography } from "@mui/material";
import { IconShieldLock } from "@tabler/icons-react";
import { useState } from "react";
import { CodeSnippet, LineSelection } from "../components/CodeSnippet/CodeSnippet";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { SubmissionPanel, VulnEntry } from "../components/SubmissionPanel/SubmissionPanel";
import { createStyleHook } from "../hooks/styleHooks";

const useChallengePageStyles = createStyleHook((theme) => {
  return {
    container: {
      paddingTop: "16px",
      paddingBottom: "16px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "16px",
      marginBottom: "24px",
    },
    titleIcon: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
      width: "48px",
      height: "48px",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    titleText: {
      color: theme.palette.text.primary,
    },
    subtitle: {
      color: theme.palette.text.primary,
      opacity: 0.65,
    },
    grid: {
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      gap: "24px",
      width: "100%",
      alignItems: "flex-start",
    },
    codeColumn: {
      flex: 2,
      minWidth: 0,
    },
    panelColumn: {
      flex: 1,
      minWidth: 0,
    },
  };
});

const initialEntries: VulnEntry[] = [
  { fromLine: "", toLine: "", type: "" },
  { fromLine: "", toLine: "", type: "" },
];

export const ChallengePage = () => {
  const styles = useChallengePageStyles();
  const [entries, setEntries] = useState<VulnEntry[]>(initialEntries);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateEntry = (idx: number, patch: Partial<VulnEntry>) => {
    setEntries((prev) => prev.map((e, i) => (i === idx ? { ...e, ...patch } : e)));
  };

  const activeSelection: LineSelection | null = (() => {
    const e = entries[activeIdx];
    const from = parseInt(e.fromLine, 10);
    const to = parseInt(e.toLine, 10);
    if (Number.isInteger(from) && Number.isInteger(to) && from <= to) {
      return { fromLine: from, toLine: to };
    }
    return null;
  })();

  const handleRangeSelect = (fromLine: number, toLine: number) => {
    setEntries((prev) => {
      const next = [...prev];
      next[activeIdx] = { ...next[activeIdx], fromLine: String(fromLine), toLine: String(toLine) };
      return next;
    });
  };

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={styles.container}>
        <Box sx={styles.header}>
          <Box sx={styles.titleIcon}>
            <IconShieldLock size={28} />
          </Box>
          <Box>
            <Typography variant="h4" sx={styles.titleText}>
              Code Review Challenge
            </Typography>
            <Typography variant="subtitle1" sx={styles.subtitle}>
              Find the vulnerabilities in this Express service. Watch out for red herrings — and AI hallucinations.
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.grid}>
          <Box sx={styles.codeColumn}>
            <CodeSnippet onRangeSelect={handleRangeSelect} selection={activeSelection} />
          </Box>
          <Box sx={styles.panelColumn}>
            <SubmissionPanel
              entries={entries}
              onEntryChange={updateEntry}
              onActivate={setActiveIdx}
              activeIdx={activeIdx}
              onSubmitFlag={() => {}}
            />
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

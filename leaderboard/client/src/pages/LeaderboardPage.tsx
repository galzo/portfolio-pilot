import { Box, Button, Container, Typography } from "@mui/material";
import {
  IconAlertTriangle,
  IconFlag,
  IconGavel,
  IconLogout,
  IconMath,
  IconMinus,
  IconScale,
  IconTrophy,
  IconCoin,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { LeaderboardEntry, LeaderboardTable } from "../components/LeaderboardTable/LeaderboardTable";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { StatCard, StatRow } from "../components/StatCard/StatCard";
import { SubmitFlagCard } from "../components/SubmitFlagCard/SubmitFlagCard";
import { createStyleHook } from "../hooks/styleHooks";

interface Props {
  user: { id: number; username: string };
  onLogout: () => void;
}

interface Me {
  rank: number | null;
  score: number;
  wrongAttempts: number;
  flagsSolved: number;
}

const apiUrl = (path: string) => `http://localhost:3002/api/${path}`;

const useLeaderboardPageStyles = createStyleHook((theme) => {
  return {
    container: {
      paddingTop: "16px",
      paddingBottom: "16px",
    },
    headerRow: {
      width: "100%",
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      justifyContent: "space-between",
      alignItems: { xs: "flex-start", sm: "center" },
      marginBottom: "16px",
      gap: "12px",
    },
    welcome: {
      color: theme.palette.text.primary,
    },
    welcomeUser: {
      color: theme.palette.secondary.main,
      fontWeight: 600,
    },
    grid: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: "24px",
      width: "100%",
    },
    leftColumn: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      minWidth: 0,
    },
    rightColumn: {
      flex: 1.4,
      display: "flex",
      minWidth: 0,
    },
  };
});

export const LeaderboardPage = ({ user, onLogout }: Props) => {
  const styles = useLeaderboardPageStyles();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [me, setMe] = useState<Me | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch(apiUrl(`leaderboard?userId=${user.id}`));
      const data = await res.json();
      if (data.isSuccess) {
        setEntries(data.leaderboard);
        setMe(data.me ?? null);
      }
    } catch (_err) {
      // leave existing data alone on transient error
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  const totalUsers = entries.length;
  const wrongAttemptsRemaining = Math.max(0, 3 - (me?.wrongAttempts ?? 0));

  const statRows: StatRow[] = [
    {
      icon: <IconTrophy size={14} />,
      label: "Rank",
      value: me?.rank ? `#${me.rank} of ${totalUsers}` : "—",
    },
    {
      icon: <IconCoin size={14} />,
      label: "Score",
      value: me ? `${me.score} pts` : "—",
    },
    {
      icon: <IconAlertTriangle size={14} />,
      label: "Free wrong attempts left",
      value: me ? `${wrongAttemptsRemaining} of 3` : "—",
    },
    {
      icon: <IconFlag size={14} />,
      label: "Flags solved",
      value: me ? me.flagsSolved : "—",
    },
  ];

  const rulesRows: StatRow[] = [
    {
      icon: <IconTrophy size={14} />,
      label: "First solver",
      value: "100 pts",
    },
    {
      icon: <IconMinus size={14} />,
      label: "Each next solver",
      value: "−5 pts (floor 10)",
    },
    {
      icon: <IconScale size={14} />,
      label: "First 3 wrong guesses",
      value: "free",
    },
    {
      icon: <IconGavel size={14} />,
      label: "Wrong guess #4+",
      value: "−1 pt each",
    },
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg" sx={styles.container}>
        <Box sx={styles.headerRow}>
          <Typography variant="h4" sx={styles.welcome}>
            Welcome back,{" "}
            <Box component="span" sx={styles.welcomeUser}>
              {user.username}
            </Box>
          </Typography>
          <Button variant="outlined" color="primary" startIcon={<IconLogout size={18} />} onClick={onLogout}>
            Sign out
          </Button>
        </Box>

        <Box sx={styles.grid}>
          <Box sx={styles.leftColumn}>
            <StatCard title="Your Stats" rows={statRows} />
            <SubmitFlagCard userId={user.id} onScored={fetchLeaderboard} />
            <StatCard title="Scoring Rules" rows={rulesRows} />
          </Box>
          <Box sx={styles.rightColumn}>
            <LeaderboardTable entries={entries} currentUserId={user.id} isLoading={isLoading} />
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

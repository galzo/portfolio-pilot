import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { IconAward, IconCrown, IconMedal, IconTrophy } from "@tabler/icons-react";
import { combineStyles } from "../../utils/styleUtils";
import { useLeaderboardTableStyles } from "./LeaderboardTable.styles";

export interface LeaderboardEntry {
  id: number;
  username: string;
  score: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId: number;
  isLoading: boolean;
}

const RankCell = ({ rank }: { rank: number }) => {
  const styles = useLeaderboardTableStyles();
  if (rank === 1) {
    return (
      <Box sx={combineStyles(styles.rankBadge, styles.medalGold)} aria-label="Gold medal">
        <IconTrophy size={16} />
      </Box>
    );
  }
  if (rank === 2) {
    return (
      <Box sx={combineStyles(styles.rankBadge, styles.medalSilver)} aria-label="Silver medal">
        <IconAward size={16} />
      </Box>
    );
  }
  if (rank === 3) {
    return (
      <Box sx={combineStyles(styles.rankBadge, styles.medalBronze)} aria-label="Bronze medal">
        <IconMedal size={16} />
      </Box>
    );
  }
  return <Box sx={styles.rankBadge}>{rank}</Box>;
};

export const LeaderboardTable = ({ entries, currentUserId, isLoading }: LeaderboardTableProps) => {
  const styles = useLeaderboardTableStyles();

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titleRow}>
        <Box sx={styles.titleIcon}>
          <IconCrown size={20} />
        </Box>
        <Typography sx={styles.title} variant="h5">
          Leaderboard
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.headerCell} width="80px">
                Rank
              </TableCell>
              <TableCell sx={styles.headerCell}>Username</TableCell>
              <TableCell sx={styles.headerCell} align="right">
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              [0, 1, 2, 3, 4].map((i) => (
                <TableRow key={`skel-${i}`}>
                  <TableCell>
                    <Skeleton variant="circular" width={28} height={28} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width="40px" sx={{ marginLeft: "auto" }} />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && entries.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} sx={styles.emptyText}>
                  No submissions yet — be the first.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              entries.map((entry, idx) => {
                const rank = idx + 1;
                const isYou = entry.id === currentUserId;
                return (
                  <TableRow key={entry.id} sx={isYou ? styles.rowYou : undefined}>
                    <TableCell>
                      <RankCell rank={rank} />
                    </TableCell>
                    <TableCell sx={isYou ? styles.nameYou : undefined}>
                      {entry.username}
                      {isYou && " (you)"}
                    </TableCell>
                    <TableCell align="right" sx={styles.score}>
                      {entry.score}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

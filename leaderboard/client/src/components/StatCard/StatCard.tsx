import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useStatCardStyles } from "./StatCard.styles";

export interface StatRow {
  icon: ReactNode;
  label: string;
  value: string | number;
}

interface StatCardProps {
  title: string;
  rows: StatRow[];
}

export const StatCard = ({ title, rows }: StatCardProps) => {
  const styles = useStatCardStyles();
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h5">
        {title}
      </Typography>
      {rows.map((row) => (
        <Box key={row.label} sx={styles.row}>
          <Box sx={styles.iconContainer}>{row.icon}</Box>
          <Typography sx={styles.label} variant="subtitle2">
            {`${row.label}:`}
          </Typography>
          <Typography sx={styles.value} variant="subtitle2">
            {row.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

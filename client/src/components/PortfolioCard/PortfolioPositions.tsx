import React, { FC, useMemo } from "react";
import { PortfolioPosition } from "../../types/portfolio.types";
import { PortfolioPositionCard } from "../PortfolioPositionCard/PortfolioPositionCard";
import { createStyleHook } from "../../hooks/styleHooks";
import { Box } from "@mui/material";

interface PortfolioPositionsProps {
  positions: PortfolioPosition[];
}

const usePortfolioPositionsStyles = createStyleHook(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
    },
  };
});

export const PortfolioPositions: FC<PortfolioPositionsProps> = ({ positions }) => {
  const styles = usePortfolioPositionsStyles();

  return (
    <Box sx={styles.root}>
      {positions.map((position) => (
        <PortfolioPositionCard position={position} />
      ))}
    </Box>
  );
};

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
      marginBottom: "40px",
    },
    cardContainer: {
      marginRight: "8px",
    },
  };
});

export const PortfolioPositions: FC<PortfolioPositionsProps> = ({ positions }) => {
  const styles = usePortfolioPositionsStyles();

  return (
    <Box sx={styles.root}>
      {positions.map((position) => (
        <Box sx={styles.cardContainer} key={position.stock.id}>
          <PortfolioPositionCard position={position} />
        </Box>
      ))}
    </Box>
  );
};

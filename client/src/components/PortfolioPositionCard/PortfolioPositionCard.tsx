import React, { FC, useMemo } from "react";
import { Stock } from "../../types/stock.types";
import { PortfolioPosition } from "../../types/portfolio.types";
import { usePortfolioPositionCardStyles } from "./PortfolioPositionCard.styles";
import { Box, Typography } from "@mui/material";
import { IconCoins, IconMoneybag } from "@tabler/icons-react";
import { formatUsdCurrency } from "../../utils/textFormatUtils";
import { calculateTotalPositionValue } from "../../utils/portfolioUtils";

export interface PortfolioPositionCardProps {
  position: PortfolioPosition;
}

export const PortfolioPositionCard: FC<PortfolioPositionCardProps> = ({ position }) => {
  const styles = usePortfolioPositionCardStyles();
  const positionValue = useMemo(() => {
    return calculateTotalPositionValue(position);
  }, [position]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography sx={styles.title} variant="subtitle1">
          {position.stock.ticker}
        </Typography>
        <Typography sx={styles.subtitle} variant="subtitle2">
          {position.stock.name}
        </Typography>
        <Typography sx={styles.money} variant="subtitle2">
          {formatUsdCurrency(position.stock.price)}
        </Typography>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.iconContainer}>
          <IconCoins />
        </Box>
        <Typography sx={styles.subtitle} variant="body2">{`${position.amount} Shares`}</Typography>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.iconContainer}>
          <IconMoneybag />
        </Box>
        <Typography sx={styles.subtitle} variant="body2">
          {formatUsdCurrency(positionValue)}
        </Typography>
      </Box>
    </Box>
  );
};

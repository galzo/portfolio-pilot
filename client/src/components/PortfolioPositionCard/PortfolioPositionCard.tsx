import React, { FC } from "react";
import { Stock } from "../../types/stock.types";
import { PortfolioPosition } from "../../types/portfolio.types";
import { usePortfolioPositionCardStyles } from "./PortfolioPositionCard.styles";
import { Box, Typography } from "@mui/material";
import { IconCoins, IconMoneybag } from "@tabler/icons-react";
import { formatUsdCurrency } from "../../utils/textFormatUtils";

export interface PortfolioPositionCardProps {
  position: PortfolioPosition;
}

export const PortfolioPositionCard: FC<PortfolioPositionCardProps> = ({ position }) => {
  const styles = usePortfolioPositionCardStyles();

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
          {formatUsdCurrency(32)}
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
          {formatUsdCurrency(100)}
        </Typography>
      </Box>
    </Box>
  );
};

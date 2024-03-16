import React from "react";
import { Portfolio } from "../../types/portfolio.types";
import { User } from "../../types/user.types";
import { Box, Typography } from "@mui/material";
import { IconCoins, IconCurrencyDollar, IconMoneybag } from "@tabler/icons-react";
import { capitalizeFirstLetter, formatUsdCurrency } from "../../utils/textFormatUtils";
import { usePortfolioCardStyles } from "./PortfolioCard.styles";

interface PortfolioCardProps {
  user: User;
  portfolio: Portfolio;
}

export const PortfolioCard: React.FunctionComponent<PortfolioCardProps> = ({ portfolio }) => {
  const styles = usePortfolioCardStyles();

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h4">
        {capitalizeFirstLetter(portfolio.name)}
      </Typography>
      <Box sx={styles.row}>
        <Box sx={styles.iconContainer}>
          <IconCurrencyDollar />
        </Box>
        <Typography sx={styles.subtitle} variant="subtitle2">{`Total Cash:`}</Typography>
        <Typography sx={styles.subtitleMarked} variant="subtitle2">{`${formatUsdCurrency(portfolio.cash)}`}</Typography>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.iconContainer}>
          <IconCoins />
        </Box>
        <Typography sx={styles.subtitle} variant="subtitle2">{`Total Positions:`}</Typography>
        <Typography sx={styles.subtitleMarked} variant="subtitle2">{`${portfolio.positions.length}`}</Typography>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.iconContainer}>
          <IconMoneybag />
        </Box>
        <Typography sx={styles.subtitle} variant="subtitle2">{`Total Position Evaluation:`}</Typography>
        <Typography sx={styles.subtitleMarked} variant="subtitle2">
          {formatUsdCurrency(1000)}
        </Typography>
      </Box>
    </Box>
  );
};

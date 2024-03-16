import React from "react";
import { Portfolio } from "../../types/portfolio.types";
import { createStyleHook } from "../../hooks/styleHooks";
import { User } from "../../types/user.types";
import { Box, Typography, useTheme } from "@mui/material";
import { IconCoins, IconCurrencyDollar, IconMoneybag } from "@tabler/icons-react";
import { capitalizeFirstLetter, formatUsdCurrency } from "../../utils/textFormatUtils";

interface PortfolioCardProps {
  user: User;
  portfolio: Portfolio;
}

const usePortfolioCardStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: theme.palette.background.paper,
      padding: "40px",
      boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "8px",
    },
    iconContainer: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
      width: "20px",
      height: "20px",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4px",
      marginRight: "12px",
    },
    title: {
      color: theme.palette.secondary.main,
      fontFamily: "roboto",
      marginBottom: "20px",
    },
    subtitle: {
      color: theme.palette.text.primary,
      fontFamily: "roboto",
      marginRight: "4px",
    },
    subtitleMarked: {
      color: theme.palette.secondary.main,
      fontFamily: "roboto",
    },
  };
});

export const PortfolioCard: React.FunctionComponent<PortfolioCardProps> = ({ portfolio }) => {
  const styles = usePortfolioCardStyles();
  const theme = useTheme();

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

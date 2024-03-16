import React, { FC } from "react";
import { User } from "../../types/user.types";
import { Portfolio } from "../../types/portfolio.types";
import { usePortfolioActionsStyles } from "./PortfolioActions.styles";
import { Box, Button } from "@mui/material";
import { IconFileAnalytics, IconShoppingCart, IconShoppingCartOff } from "@tabler/icons-react";
import { combineStyles } from "../../utils/styleUtils";

interface PortfolioActionsProps {
  user: User;
  portfolio: Portfolio;
}

export const PortfolioActions: FC<PortfolioActionsProps> = () => {
  const styles = usePortfolioActionsStyles();

  return (
    <Box sx={styles.root}>
      <Button color="primary" variant="contained" sx={combineStyles(styles.button, styles.marginRight)}>
        <Box sx={styles.icon}>
          <IconShoppingCart />
        </Box>
        {"Buy Position"}
      </Button>
      <Button color="secondary" variant="contained">
        <Box sx={styles.icon}>
          <IconShoppingCartOff />
        </Box>
        {"Sell Position"}
      </Button>
    </Box>
  );
};

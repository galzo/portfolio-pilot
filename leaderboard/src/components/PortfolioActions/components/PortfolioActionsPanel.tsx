import { Box, Button } from "@mui/material";
import { combineStyles } from "../../../utils/styleUtils";
import { usePortfolioActionsStyles } from "../PortfolioActions.styles";
import { IconShoppingCart, IconShoppingCartOff } from "@tabler/icons-react";
import { PortfolioActionsPanelProps } from "../PortfolioActions.types";
import { FC } from "react";

export const PortfolioActionsPanel: FC<PortfolioActionsPanelProps> = ({ onActionSelect }) => {
  const styles = usePortfolioActionsStyles();

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        sx={combineStyles(styles.button, styles.marginRight)}
        onClick={() => onActionSelect("buy")}
      >
        <Box sx={styles.icon}>
          <IconShoppingCart />
        </Box>
        {"Buy Position"}
      </Button>
      <Button color="secondary" variant="contained" onClick={() => onActionSelect("sell")}>
        <Box sx={styles.icon}>
          <IconShoppingCartOff />
        </Box>
        {"Sell Position"}
      </Button>
    </>
  );
};

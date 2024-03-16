import React, { FC, useCallback, useMemo, useState } from "react";
import { User } from "../../types/user.types";
import { Portfolio } from "../../types/portfolio.types";
import { usePortfolioActionsStyles } from "./PortfolioActions.styles";
import { Box, Button, Modal, Typography } from "@mui/material";
import { IconShoppingCart, IconShoppingCartOff } from "@tabler/icons-react";
import { combineStyles } from "../../utils/styleUtils";
import { useFetchStocks } from "../../hooks/useFetchStocks";
import { PortfolioActionType, PortfolioActionsProps } from "./PortfolioActions.types";
import { PortfolioActionsPanel } from "./components/PortfolioActionsPanel";
import { BuyPosition } from "./components/BuyPosition";

export const PortfolioActions: FC<PortfolioActionsProps> = ({ user, portfolio }) => {
  const styles = usePortfolioActionsStyles();
  const [selectedAction, setSelectedAction] = useState<PortfolioActionType>("none");
  const { isLoading, stocks, stocksError } = useFetchStocks();

  const handleActionSelect = useCallback((actionType: PortfolioActionType) => {
    setSelectedAction(actionType);
  }, []);

  const renderActionsPanel = useCallback(() => {
    switch (selectedAction) {
      case "none":
        return <PortfolioActionsPanel onActionSelect={handleActionSelect} />;
      case "buy":
        return <BuyPosition stocks={stocks} user={user} portfolio={portfolio} />;
      case "sell":
        return null;
    }
  }, [selectedAction]);

  return <Box sx={styles.root}>{renderActionsPanel()}</Box>;
};

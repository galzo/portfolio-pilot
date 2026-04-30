import { FC, useCallback } from "react";
import { usePortfolioActionsStyles } from "./PortfolioActions.styles";
import { Box } from "@mui/material";
import { useFetchStocks } from "../../hooks/useFetchStocks";
import { PortfolioActionsProps } from "./PortfolioActions.types";
import { PortfolioActionsPanel } from "./components/PortfolioActionsPanel";
import { BuyPosition } from "./components/BuyPosition";
import { PortfolioActionsAlert } from "./components/PortfolioActionAlert";
import { useAlert } from "./hooks/useAlert";
import { useSelectedAction } from "./hooks/useSelectedAction";
import { SellPosition } from "./components/SellPosition";

export const PortfolioActions: FC<PortfolioActionsProps> = ({ user, portfolio, refreshPortfolioData }) => {
  const styles = usePortfolioActionsStyles();
  const { stocks } = useFetchStocks();
  const { selectedAction, onSelectAction } = useSelectedAction();
  const { isAlertOpen, alertMessage, handleOpenAlert, handleCloseAlert } = useAlert();

  const renderActionsPanel = useCallback(() => {
    switch (selectedAction) {
      case "none":
        return <PortfolioActionsPanel onActionSelect={onSelectAction} />;
      case "buy":
        return (
          <BuyPosition
            stocks={stocks}
            user={user}
            portfolio={portfolio}
            triggerAlert={handleOpenAlert}
            onCancel={() => onSelectAction("none")}
            onComplete={() => {
              refreshPortfolioData();
              onSelectAction("none");
              handleOpenAlert("Succesfully Purchased Stocks");
            }}
          />
        );
      case "sell":
        return (
          <SellPosition
            stocks={portfolio.positions.map((position) => position.stock)}
            user={user}
            portfolio={portfolio}
            triggerAlert={handleOpenAlert}
            onCancel={() => onSelectAction("none")}
            onComplete={() => {
              refreshPortfolioData();
              onSelectAction("none");
              handleOpenAlert("Succesfully Sold Stocks");
            }}
          />
        );
    }
  }, [handleOpenAlert, onSelectAction, portfolio, refreshPortfolioData, selectedAction, stocks, user]);

  return (
    <Box sx={styles.root}>
      {renderActionsPanel()}
      <PortfolioActionsAlert isOpen={isAlertOpen} onClose={handleCloseAlert} message={alertMessage} />
    </Box>
  );
};

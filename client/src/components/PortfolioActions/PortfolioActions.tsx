import { FC, useCallback, useState } from "react";
import { usePortfolioActionsStyles } from "./PortfolioActions.styles";
import { Box } from "@mui/material";
import { useFetchStocks } from "../../hooks/useFetchStocks";
import { PortfolioActionType, PortfolioActionsProps } from "./PortfolioActions.types";
import { PortfolioActionsPanel } from "./components/PortfolioActionsPanel";
import { BuyPosition } from "./components/BuyPosition";
import { PortfolioActionsAlert } from "./components/PortfolioActionAlert";

export const PortfolioActions: FC<PortfolioActionsProps> = ({ user, portfolio }) => {
  const styles = usePortfolioActionsStyles();
  const { stocks } = useFetchStocks();

  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleTriggerAlert = useCallback((message: string) => {
    setAlertOpen(true);
    setAlertMessage(message);
  }, []);

  const [selectedAction, setSelectedAction] = useState<PortfolioActionType>("none");
  const handleActionSelect = useCallback((actionType: PortfolioActionType) => {
    setSelectedAction(actionType);
  }, []);

  const renderActionsPanel = useCallback(() => {
    switch (selectedAction) {
      case "none":
        return <PortfolioActionsPanel onActionSelect={handleActionSelect} />;
      case "buy":
        return (
          <BuyPosition
            stocks={stocks}
            user={user}
            portfolio={portfolio}
            triggerAlert={handleTriggerAlert}
            onCancel={() => handleActionSelect("none")}
          />
        );
      case "sell":
        return null;
    }
  }, [handleActionSelect, handleTriggerAlert, portfolio, selectedAction, stocks, user]);

  return (
    <Box sx={styles.root}>
      {renderActionsPanel()}
      <PortfolioActionsAlert isOpen={isAlertOpen} onClose={() => setAlertOpen(false)} message={alertMessage} />
    </Box>
  );
};

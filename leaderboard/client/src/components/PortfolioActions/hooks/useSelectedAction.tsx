import { useCallback, useState } from "react";
import { PortfolioActionType } from "../PortfolioActions.types";

export const useSelectedAction = () => {
  const [selectedAction, setSelectedAction] = useState<PortfolioActionType>("none");
  const handleActionSelect = useCallback((actionType: PortfolioActionType) => {
    setSelectedAction(actionType);
  }, []);

  return {
    selectedAction,
    onSelectAction: handleActionSelect,
  };
};

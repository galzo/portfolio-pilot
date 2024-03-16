import { Portfolio } from "../../types/portfolio.types";
import { User } from "../../types/user.types";

export interface PortfolioActionsProps {
  user: User;
  portfolio: Portfolio;
}

export interface PortfolioActionsPanelProps {
  onActionSelect: (actionType: PortfolioActionType) => void;
}

export type PortfolioActionType = "buy" | "sell" | "none";

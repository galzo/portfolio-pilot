import { SelectChangeEvent } from "@mui/material";
import { Portfolio } from "../../types/portfolio.types";
import { Stock } from "../../types/stock.types";
import { User } from "../../types/user.types";

export interface PortfolioActionsProps {
  user: User;
  portfolio: Portfolio;
}

export interface PortfolioActionsPanelProps {
  onActionSelect: (actionType: PortfolioActionType) => void;
}

export interface StockPickerProps {
  stocks: Stock[];
  selectedStock: string | undefined;
  onSelectStock: (event: SelectChangeEvent<string>) => void;
}

export interface BuyPositionProps {
  stocks: Stock[];
  user: User;
  portfolio: Portfolio;
  triggerAlert: (message: string) => void;
}

export type PortfolioActionType = "buy" | "sell" | "none";

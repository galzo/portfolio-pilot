import { Stock } from "./stock.types";

export type PortfolioId = number;

export interface Portfolio {
  id: PortfolioId;
  name: string;
  cash: number;
  positions: PortfolioPosition[];
}

export interface PortfolioPosition {
  amount: number;
  stock: Stock;
}

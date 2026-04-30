import { PortfolioPosition } from "../types/portfolio.types";

export const calculateTotalPositionValue = (position: PortfolioPosition) => {
  return position.amount * position.stock.price;
};

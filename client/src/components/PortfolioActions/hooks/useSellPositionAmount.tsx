import { useCallback, useState } from "react";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock } from "../../../types/stock.types";

interface SellPositionAmountProps {
  selectedStock: Stock | undefined;
  portfolio: Portfolio;
  triggerAlert: (message: string) => void;
}

export const useSellPositionAmount = ({ selectedStock, portfolio, triggerAlert }: SellPositionAmountProps) => {
  const [amount, setAmount] = useState<number>();
  const [totalValue, setTotalValue] = useState<number>();

  const handleSelectAmount = useCallback(
    (newAmount: number) => {
      if (newAmount < 0) {
        return;
      }

      const positionOnPortfolio = portfolio.positions.find((position) => position.stock.id === selectedStock?.id);
      if (!positionOnPortfolio) {
        triggerAlert("No position was found on portfolio");
        return;
      }

      if (newAmount > positionOnPortfolio?.amount) {
        triggerAlert("Not enough stocks to sell");
        return;
      }

      const totalValue = (selectedStock?.price ?? 0) * newAmount;
      setAmount(newAmount);
      setTotalValue(totalValue);
    },
    [triggerAlert, portfolio.positions, selectedStock?.id, selectedStock?.price]
  );

  return {
    amount,
    totalValue,
    onSelectAmount: handleSelectAmount,
  };
};

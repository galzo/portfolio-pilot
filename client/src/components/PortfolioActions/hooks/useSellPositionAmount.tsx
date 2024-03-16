import { useCallback, useState } from "react";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock } from "../../../types/stock.types";

interface SellPositionAmountProps {
  selectedStock: Stock | undefined;
  portfolio: Portfolio;
  onError: VoidFunction;
}

export const useSellPositionAmount = ({ selectedStock, portfolio, onError }: SellPositionAmountProps) => {
  const [amount, setAmount] = useState<number>();
  const [totalValue, setTotalValue] = useState<number>();

  const handleSelectAmount = useCallback(
    (newAmount: number) => {
      if (newAmount < 0) {
        return;
      }

      const positionOnPortfolio = portfolio.positions.find((position) => position.stock.id === selectedStock?.id);
      if (!positionOnPortfolio) {
        onError();
        return;
      }

      if (newAmount > positionOnPortfolio?.amount) {
        onError();
        return;
      }

      const totalValue = (selectedStock?.price ?? 0) * newAmount;
      setAmount(newAmount);
      setTotalValue(totalValue);
    },
    [onError, portfolio.positions, selectedStock?.id, selectedStock?.price]
  );

  return {
    amount,
    totalValue,
    onSelectAmount: handleSelectAmount,
  };
};

import { useCallback, useState } from "react";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock } from "../../../types/stock.types";

interface BuyPositionAmountProps {
  selectedStock: Stock | undefined;
  portfolio: Portfolio;
  triggerAlert: (message: string) => void;
}

export const useBuyPositionAmount = ({ selectedStock, portfolio, triggerAlert }: BuyPositionAmountProps) => {
  const [amount, setAmount] = useState<number>();
  const [totalValue, setTotalValue] = useState<number>();

  const handleSelectAmount = useCallback(
    (newAmount: number) => {
      if (newAmount < 0) {
        triggerAlert("Amount cannot be negative");
        return;
      }

      const totalValue = (selectedStock?.price ?? 0) * newAmount;
      if (totalValue <= portfolio.cash) {
        setAmount(newAmount);
        setTotalValue(totalValue);
      } else {
        triggerAlert("Not enough cash to buy more stocks");
      }
    },
    [triggerAlert, portfolio.cash, selectedStock?.price]
  );

  return {
    amount,
    totalValue,
    onSelectAmount: handleSelectAmount,
  };
};

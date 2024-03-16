import { useCallback, useState } from "react";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock } from "../../../types/stock.types";
import { Optional } from "../../../types/common.types";

interface BuyPositionAmountProps {
  selectedStock: Stock | undefined;
  portfolio: Portfolio;
  onError: VoidFunction;
}

export const useBuyPositionAmount = ({ selectedStock, portfolio, onError }: BuyPositionAmountProps) => {
  const [amount, setAmount] = useState<number>();
  const [totalValue, setTotalValue] = useState<number>();

  const handleSelectAmount = useCallback(
    (newAmount: number) => {
      if (newAmount < 0) {
        return;
      }

      const totalValue = (selectedStock?.price ?? 0) * newAmount;
      if (totalValue <= portfolio.cash) {
        setAmount(newAmount);
        setTotalValue(totalValue);
      } else {
        onError();
      }
    },
    [onError, portfolio.cash, selectedStock?.price]
  );

  return {
    amount,
    totalValue,
    onSelectAmount: handleSelectAmount,
  };
};

import { Box, FormControl, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createStyleHook } from "../../../hooks/styleHooks";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock, StockId } from "../../../types/stock.types";
import { User } from "../../../types/user.types";
import { FC, useCallback, useState } from "react";
import { useStockSelection } from "../hooks/useStockSelection";
import { usePortfolioActionsStyles } from "../PortfolioActions.styles";
import { StockPicker } from "./StockPicker";
import { useBuyPositionAmount } from "../hooks/useBuyPositionAmount";

interface BuyPositionProps {
  stocks: Stock[];
  user: User;
  portfolio: Portfolio;
  triggerAlert: (message: string) => void;
}

export const BuyPosition: FC<BuyPositionProps> = ({ stocks, portfolio, triggerAlert }) => {
  const styles = usePortfolioActionsStyles();
  const { selectedTicker, onSelectTicker, selectedStock } = useStockSelection({ allStocks: stocks });
  const { onSelectAmount, amount } = useBuyPositionAmount({
    selectedStock: selectedStock,
    portfolio: portfolio,
    onError: () => triggerAlert("Not enough cash to buy more stocks"),
  });

  return (
    <Box sx={styles.root}>
      <StockPicker stocks={stocks} selectedStock={selectedTicker} onSelectStock={onSelectTicker} />
      <TextField
        label="Number Of Shares To Buy"
        variant="outlined"
        value={amount}
        required={true}
        type="number"
        fullWidth={true}
        onChange={(event) => onSelectAmount(Number(event.target.value))}
      />
    </Box>
  );
};

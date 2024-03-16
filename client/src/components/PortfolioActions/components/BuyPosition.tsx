import { Box, FormControl, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createStyleHook } from "../../../hooks/styleHooks";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock, StockId } from "../../../types/stock.types";
import { User } from "../../../types/user.types";
import { FC, useCallback, useState } from "react";
import { useStockSelection } from "../hooks/useStockSelection";

const useBuyPositionStyles = createStyleHook(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
    },
    selectContainer: {
      width: "200px",
      marginRight: "16px",
    },
  };
});

interface BuyPositionProps {
  stocks: Stock[];
  user: User;
  portfolio: Portfolio;
}

export const BuyPosition: FC<BuyPositionProps> = ({ stocks }) => {
  const styles = useBuyPositionStyles();
  const { selectedTicker, onSelectTicker, selectedStock } = useStockSelection({ allStocks: stocks });
  console.log(selectedStock);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.selectContainer}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{"Pick A Stock"}</InputLabel>
          <Select id="select-stock" value={selectedTicker} label="Pick a stock" onChange={onSelectTicker}>
            {stocks.map((stock) => {
              return <MenuItem value={stock.ticker}>{stock.ticker}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <TextField label="Number Of Shares To Buy" variant="outlined" required={true} type="number" fullWidth={true} />
    </Box>
  );
};

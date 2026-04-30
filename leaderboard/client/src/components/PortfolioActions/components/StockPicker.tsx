import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { usePortfolioActionsStyles } from "../PortfolioActions.styles";
import { Stock } from "../../../types/stock.types";
import { FC, useState } from "react";
import { StockPickerProps } from "../PortfolioActions.types";

export const StockPicker: FC<StockPickerProps> = ({ stocks, selectedStock, onSelectStock }) => {
  const styles = usePortfolioActionsStyles();

  return (
    <Box sx={styles.stockPicker}>
      <FormControl fullWidth>
        <InputLabel id="select-stock">{"Pick A Stock"}</InputLabel>
        <Select id="select-stock" value={selectedStock} label="Pick a stock" onChange={onSelectStock}>
          {stocks.map((stock) => {
            return <MenuItem value={stock.ticker}>{stock.ticker}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

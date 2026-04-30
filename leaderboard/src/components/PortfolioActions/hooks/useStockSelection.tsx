import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { Stock } from "../../../types/stock.types";

export const useStockSelection = (props: { allStocks: Stock[] }) => {
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const [selectedStock, setSelectedStock] = useState<Stock>();
  const handleSelectTicker = (event: SelectChangeEvent<string>) => {
    setSelectedTicker(event.target.value as string);
  };

  useEffect(() => {
    if (selectedTicker) {
      const currentStock = props.allStocks.find((stock) => stock.ticker === selectedTicker);
      setSelectedStock(currentStock);
    }
  }, [props.allStocks, selectedTicker]);

  return {
    selectedTicker: selectedTicker,
    selectedStock: selectedStock,
    onSelectTicker: handleSelectTicker,
  };
};

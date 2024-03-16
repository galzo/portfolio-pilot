import { useCallback, useEffect, useState } from "react";
import { StockApi } from "../api/stock.api";
import { Stock } from "../types/stock.types";

export const useFetchStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stocksError, setStocksError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllStocks = useCallback(async () => {
    setIsLoading(true);

    const response = await StockApi.getAllStocks();
    if (response.isSuccess) {
      setStocks(response.payload.stocks);
    } else {
      setStocksError(response.error);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const shouldTrigger = !isLoading && stocks.length <= 0 && !stocksError;
    if (shouldTrigger) {
      fetchAllStocks();
    }
  }, [fetchAllStocks, isLoading, stocks, stocksError]);

  return { stocks, stocksError, isLoading };
};

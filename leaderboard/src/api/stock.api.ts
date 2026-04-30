import axios from "axios";
import { ApiResponse } from "../types/api.types";
import { Stock } from "../types/stock.types";
import { getAuthHeaders, resolveApiErrorMessage } from "../utils/apiUtils";
import { ApiRoutes } from "../consts/api";

export interface getAllStocksResponse {
  stocks: Stock[];
}

const getAllStocks = async (): Promise<ApiResponse<getAllStocksResponse>> => {
  try {
    console.log("Fetching all stocks");
    const response = await axios.get<getAllStocksResponse>(ApiRoutes.stock.getAll, { headers: getAuthHeaders() });
    console.log("Fetched all stocks");

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    console.error("Error fetching all stocks", e);
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

export const StockApi = {
  getAllStocks,
};

import axios from "axios";
import { ApiResponse } from "../types/api.types";
import { resolveApiErrorMessage } from "../utils/apiUtils";
import { ApiRoutes } from "../consts/api";

export interface GetPortfolioResponse {
  id: number;
  name: string;
  cash: number;
  positions: Array<{
    amount: number;
    stock: {
      id: number;
      name: string;
      ticker: string;
    };
  }>;
}

const getPortfolio = async (userId: string): Promise<ApiResponse<GetPortfolioResponse>> => {
  try {
    console.log(`Fetching portfolio for userId ${userId}`);
    const response = await axios.get<GetPortfolioResponse>(`${ApiRoutes.portfolio.get}?userId=${userId}`);
    console.log("Fetched portfolio.", response.data);

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    console.error("Error fetching portfolio", e);
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

export const PortfolioApi = {
  getPortfolio,
};

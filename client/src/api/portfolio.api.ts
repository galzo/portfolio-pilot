import axios from "axios";
import { ApiResponse } from "../types/api.types";
import { getAuthHeaders, resolveApiErrorMessage } from "../utils/apiUtils";
import { ApiRoutes } from "../consts/api";
import { Portfolio } from "../types/portfolio.types";

export type GetPortfolioResponse = Portfolio;

export interface AddFundsRequest {
  portfolioId: number;
  cash: number;
}

export interface BuyPositionRequest {
  userId: number;
  stockId: number;
  amount: number;
}

export interface SellPositionRequest {
  userId: number;
  stockId: number;
  amount: number;
}

export interface BuyPositionResponse {
  isSuccess: boolean;
}

export interface SellPositionResponse {
  isSuccess: boolean;
}

export interface AddFundsResponse {
  isSuccess: boolean;
}

const getPortfolio = async (userId: number): Promise<ApiResponse<GetPortfolioResponse>> => {
  try {
    console.log(`Fetching portfolio for userId ${userId}`);
    const response = await axios.get<GetPortfolioResponse>(`${ApiRoutes.portfolio.get}?userId=${userId}`, {
      headers: getAuthHeaders(),
    });
    console.log("Fetched portfolio.", response.data);

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    console.error("Error fetching portfolio", e);
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

const buyPosition = async (payload: BuyPositionRequest): Promise<ApiResponse<BuyPositionResponse>> => {
  try {
    console.log(`Buying position for userId ${payload.userId}`);
    const response = await axios.post<BuyPositionResponse>(`${ApiRoutes.portfolio.buy}`, payload, {
      headers: getAuthHeaders(),
    });
    console.log("Bought position");

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    console.error("Error buying position", e);
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

const sellPosition = async (payload: SellPositionRequest): Promise<ApiResponse<SellPositionResponse>> => {
  try {
    console.log(`Selling position for userId ${payload.userId}`);
    const response = await axios.post<SellPositionResponse>(`${ApiRoutes.portfolio.sell}`, payload, {
      headers: getAuthHeaders(),
    });
    console.log("sold position");

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    console.error("Error selling position", e);
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

const addFunds = async (payload: AddFundsRequest): Promise<ApiResponse<AddFundsResponse>> => {
  try {
    console.log(`add funds for portfolioId ${payload.portfolioId}`);
    const response = await axios.post<AddFundsResponse>(ApiRoutes.portfolio.addFunds, payload, {
      headers: getAuthHeaders(),
    });
    console.log("added funds to portfolio");

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    console.error("Error add funds to portfolio", e);
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

export const PortfolioApi = {
  getPortfolio,
  buyPosition,
  sellPosition,
  addFunds,
};

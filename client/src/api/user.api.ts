/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ApiRoutes } from "../consts/api";
import { ApiResponse } from "../types/api.types";
import { resolveApiErrorMessage } from "../utils/apiUtils";

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface SignupResponse {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

const signup = async (payload: SignupRequest): Promise<ApiResponse<SignupResponse>> => {
  try {
    console.log("Signing up user...", payload);
    const response = await axios.post<SignupResponse>(ApiRoutes.user.signup, payload);
    console.log("Signup complete");

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    console.error("Error signing up", e);
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

const login = async (payload: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    console.log("Logging in user...", payload);
    const response = await axios.post<LoginResponse>(ApiRoutes.user.login, payload);
    console.log("Login complete");

    return { isSuccess: true, payload: response.data };
  } catch (e: unknown) {
    return { isSuccess: false, error: resolveApiErrorMessage(e) };
  }
};

export const UserApi = {
  signup,
  login,
};

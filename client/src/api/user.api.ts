/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ApiRoutes } from "../consts/api";
import { AuthService } from "../services/authService";
import { ApiResponse } from "../types/api.types";

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
  token: string;
}

const signup = async (payload: SignupRequest): Promise<ApiResponse<SignupResponse>> => {
  try {
    console.log("Signing up user...", payload);
    const response = await axios.post<SignupResponse>(ApiRoutes.user.signup, payload);

    console.log("Signup complete");
    return { isSuccess: true, payload: response.data };
  } catch (e: any) {
    console.error("Error signing up", e);
    return { isSuccess: false, error: e.message };
  }
};

const login = async (payload: LoginRequest) => {
  try {
    console.log("Logging in user...", payload);

    const response = await axios.post<LoginResponse>(ApiRoutes.user.login, payload);
    const { token } = response.data;

    console.log("Login complete", token);
    return true;
  } catch (e) {
    console.error("Error logging in", e);
    return false;
  }
};

export const UserApi = {
  signup,
  login,
};

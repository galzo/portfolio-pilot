/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginResponse } from "./../api/user.api";
import { SignupResponse } from "../api/user.api";
import { User } from "../types/user.types";
import { AxiosError } from "axios";

export const resolveUserFromUserResponse = (response: SignupResponse | LoginResponse) => {
  const user: User = {
    email: response.email,
    name: response.name,
    id: response.id,
    isAdmin: response.isAdmin,
  };
  return user;
};

export const resolveTokenFromUserResponse = (response: SignupResponse | LoginResponse) => {
  return response.token;
};

export const resolveApiErrorMessage = (e: unknown): string => {
  if (e instanceof AxiosError) {
    return e.response?.data.error;
  }

  return (e as any).message;
};

import { SignupResponse } from "../api/user.api";
import { User } from "../types/user.types";

export const resolveUserFromSignupResponse = (response: SignupResponse) => {
  const user: User = {
    email: response.email,
    name: response.name,
    id: response.id,
    isAdmin: response.isAdmin,
  };
  return user;
};

export const resolveTokenFromSignupResponse = (response: SignupResponse) => {
  return response.token;
};

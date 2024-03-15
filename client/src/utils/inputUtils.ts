import { Optional } from "../types/common.types";

export const isEmailAddressValid = (email: Optional<string>) => {
  if (!email || email.trim().length <= 0) return false;

  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isPasswordValid = (password: Optional<string>) => {
  return password && password.trim().length > 0;
};

import { createContext } from "react";
import { UserContextType } from "./UserContext.types";
import { noop } from "lodash";

export const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  setUser: noop,
  setToken: noop,
  isInit: false,
});

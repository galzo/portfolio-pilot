import { Optional } from "../../types/common.types";
import { User, UserAuthToken } from "../../types/user.types";

export interface UserContextType {
  user: Optional<User>;
  token: Optional<UserAuthToken>;
  setUser: (user: User) => void;
  setToken: (token: UserAuthToken) => void;
}

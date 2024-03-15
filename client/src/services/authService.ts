import { AuthTokenStorageKey, UserDetailsStorageKey } from "../consts/keys";
import { Optional } from "../types/common.types";
import { User, UserAuthToken } from "../types/user.types";

export class AuthService {
  storeAuthToken = (token: UserAuthToken) => {
    localStorage.setItem(AuthTokenStorageKey, token);
  };

  clearAuthToken = () => {
    localStorage.removeItem(AuthTokenStorageKey);
  };

  getAuthToken = (): Optional<UserAuthToken> => {
    const token = localStorage.getItem(AuthTokenStorageKey);
    return token ? (token as UserAuthToken) : null;
  };

  storeUserDetails = (user: User) => {
    localStorage.setItem(UserDetailsStorageKey, JSON.stringify(user));
  };

  clearUserDetails = () => localStorage.removeItem(UserDetailsStorageKey);

  getUserDetails = (): Optional<User> => {
    const user = localStorage.get(UserDetailsStorageKey);
    return user ? (JSON.parse(user) as User) : null;
  };
}

import { useMemo } from "react";
import { AuthService } from "../services/authService";
import { User, UserAuthToken } from "../types/user.types";
import { Optional } from "../types/common.types";

export const useAuth = () => {
  const authService = useMemo(() => {
    return new AuthService();
  }, []);

  const getUser = (): Optional<User> => {
    return authService.getUserDetails();
  };

  const setUser = (user: User) => {
    authService.storeUserDetails(user);
  };

  const getToken = (): Optional<UserAuthToken> => {
    return authService.getAuthToken();
  };

  const setToken = (token: UserAuthToken) => {
    return authService.storeAuthToken(token);
  };

  const clear = () => {
    authService.clearAuthToken();
    authService.clearUserDetails();
  };

  const isLoggedIn = () => {
    const user = getUser();
    const token = getToken();
    return Boolean(user && token);
  };

  return {
    getUser,
    setUser,
    getToken,
    setToken,
    clear,
    isLoggedIn,
  };
};

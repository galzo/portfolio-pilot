import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { User, UserAuthToken } from "../../types/user.types";
import { UserContextType } from "./UserContext.types";
import { UserContext } from "./UserContext";
import { AuthService } from "../../services/authService";

export interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<UserAuthToken>();
  const [isInit, setIsInit] = useState(false);

  const authService = useMemo(() => {
    return new AuthService();
  }, []);

  useMemo(() => {
    const user = authService.getUserDetails();
    const token = authService.getAuthToken();

    if (user && token) {
      setUser(user);
      setToken(token);
    }

    setIsInit(true);
  }, [authService]);

  const handleSetUser = useCallback(
    (user: User) => {
      authService.storeUserDetails(user);
      setUser(user);
    },
    [authService]
  );

  const handleSetToken = useCallback(
    (token: UserAuthToken) => {
      authService.storeAuthToken(token);
      setToken(token);
    },
    [authService]
  );

  const contextValue: UserContextType = {
    user: user,
    token: token,
    setToken: handleSetToken,
    setUser: handleSetUser,
    isInit: isInit,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

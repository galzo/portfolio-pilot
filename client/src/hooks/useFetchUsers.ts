import { useCallback, useEffect, useState } from "react";
import { UserApi } from "../api/user.api";
import { User } from "../types/user.types";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersError, setUsersError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllUsers = useCallback(async () => {
    setIsLoading(true);

    const response = await UserApi.getAllUsers();
    if (response.isSuccess) {
      setUsers(response.payload.users);
    } else {
      setUsersError(response.error);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const shouldTrigger = !isLoading && users.length <= 0 && !usersError;
    if (shouldTrigger) {
      fetchAllUsers();
    }
  }, [fetchAllUsers, isLoading, users.length, usersError]);

  return { users, usersError, isLoading };
};

import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../../types/user.types";

export const useUserSelection = (props: { allUsers: User[] }) => {
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const handleSelectUserEmail = (event: SelectChangeEvent<string>) => {
    setSelectedUserEmail(event.target.value as string);
  };
  const resetSelection = useCallback(() => {
    setSelectedUser(undefined);
    setSelectedUserEmail(undefined);
  }, []);

  useEffect(() => {
    if (selectedUserEmail) {
      const currentUser = props.allUsers.find((user) => user.email === selectedUserEmail);
      setSelectedUser(currentUser);
    }
  }, [props.allUsers, selectedUserEmail]);

  return {
    selectedUser,
    selectedUserEmail,
    onSelectUserEmail: handleSelectUserEmail,
    resetSelection,
  };
};

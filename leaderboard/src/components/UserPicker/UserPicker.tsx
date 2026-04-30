import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useState } from "react";
import { User } from "../../types/user.types";

interface UserPickerProps {
  users: User[];
  selectedUserEmail: string | undefined;
  onSelectUserEmail: (event: SelectChangeEvent<string>) => void;
}

export const UserPicker: FC<UserPickerProps> = ({ users, onSelectUserEmail, selectedUserEmail }) => {
  return (
    <Box sx={{ width: "300px" }}>
      <FormControl fullWidth>
        <InputLabel id="select-user">{"Pick A User"}</InputLabel>
        <Select id="select-user" value={selectedUserEmail} label="Pick a user" onChange={onSelectUserEmail}>
          {users.map((user) => {
            return <MenuItem value={user.email}>{user.email}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

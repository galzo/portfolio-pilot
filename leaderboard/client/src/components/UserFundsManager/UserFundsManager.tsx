import { Box, Button, TextField } from "@mui/material";
import { createStyleHook } from "../../hooks/styleHooks";
import { UserPicker } from "../UserPicker/UserPicker";
import { User } from "../../types/user.types";
import { FC, useCallback, useState } from "react";
import { useUserSelection } from "../UserPicker/hooks/useUserSelection";
import { PortfolioApi } from "../../api/portfolio.api";

const useUserFundsManagerStyles = createStyleHook(() => {
  return {
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    marginBottom: {
      marginBottom: "16px",
    },
  };
});

interface UserFundsManagerProps {
  users: User[];
  onComplete: VoidFunction;
}

export const UserFundsManager: FC<UserFundsManagerProps> = ({ users, onComplete }) => {
  const styles = useUserFundsManagerStyles();
  const { selectedUser, selectedUserEmail, onSelectUserEmail } = useUserSelection({ allUsers: users });
  const [amount, setAmount] = useState<number>();

  const addFundsToPortfolio = useCallback(async () => {
    if (!selectedUser || !amount) return;

    const portfolioResponse = await PortfolioApi.getPortfolio(selectedUser.id);
    if (!portfolioResponse.isSuccess) return;

    const response = await PortfolioApi.addFunds({ portfolioId: portfolioResponse.payload.id, cash: amount });
    if (response.isSuccess) {
      alert("funds were successfully added to portfolio");
      onComplete();
    } else {
      alert(response.error);
      onComplete();
    }
  }, [amount, onComplete, selectedUser]);

  return (
    <Box sx={styles.row}>
      <UserPicker users={users} selectedUserEmail={selectedUserEmail} onSelectUserEmail={onSelectUserEmail} />
      <TextField
        disabled={!selectedUser}
        label={selectedUser ? "Funds to add to portfolio" : ""}
        sx={{ marginRight: "16px", width: "250px" }}
        variant="outlined"
        value={amount}
        required={true}
        type="number"
        onChange={(event) => setAmount(Number(event.target.value))}
        ref={(ref) => ref}
      />
      <Button
        color="primary"
        variant="contained"
        size="large"
        disabled={!selectedUser || !amount}
        onClick={addFundsToPortfolio}
      >
        {"Add Funds"}
      </Button>
    </Box>
  );
};

import { Box, Button, TextField, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { useAuth } from "../hooks/useAuth";
import { useRedirect } from "../hooks/useRedirect";
import { AppRoutes } from "../consts/routes";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { useCallback, useMemo, useRef, useState } from "react";
import { useUserSelection } from "../components/UserPicker/hooks/useUserSelection";
import { UserPicker } from "../components/UserPicker/UserPicker";
import { combineStyles } from "../utils/styleUtils";
import { SignOutButton } from "../components/SignOutButton/SignOutButton";
import { PortfolioApi } from "../api/portfolio.api";

const useAdminPageStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default,
    },
    title: {
      color: theme.palette.text.primary,
    },
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

export const AdminPage = () => {
  const styles = useAdminPageStyles();
  const { isAdmin } = useAuth();

  useRedirect({ predicate: () => !isAdmin(), redirectTo: AppRoutes.root });
  const { users } = useFetchUsers();
  const { selectedUser, selectedUserEmail, onSelectUserEmail, resetSelection } = useUserSelection({ allUsers: users });
  const [amount, setAmount] = useState<number>();
  const [showFundsSelection, setShowFundsSelection] = useState(false);

  const handleComplete = useCallback(() => {
    resetSelection();
    setShowFundsSelection(false);
  }, [resetSelection]);

  const addFundsToPortfolio = useCallback(async () => {
    if (!selectedUser || !amount) return;

    const portfolioResponse = await PortfolioApi.getPortfolio(selectedUser.id);
    if (!portfolioResponse.isSuccess) return;

    const response = await PortfolioApi.addFunds({ portfolioId: portfolioResponse.payload.id, cash: amount });
    if (response.isSuccess) {
      alert("funds were successfully added to portfolio");
      handleComplete();
    } else {
      alert(response.error);
      handleComplete();
    }
  }, [amount, handleComplete, selectedUser]);

  if (!isAdmin()) {
    return null;
  }

  return (
    <PageContainer>
      <SignOutButton />
      <Box sx={styles.root}>
        <Typography sx={styles.title} variant="h3">
          {"Admin Panel"}
        </Typography>
        <Typography sx={combineStyles(styles.title, styles.marginBottom)} variant="h4">
          {"System Users"}
        </Typography>
        {showFundsSelection && (
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
        )}
        {!showFundsSelection && (
          <Button color="secondary" variant="contained" size="large" onClick={() => setShowFundsSelection(true)}>
            {"Add Funds To User Portfolios"}
          </Button>
        )}
      </Box>
    </PageContainer>
  );
};

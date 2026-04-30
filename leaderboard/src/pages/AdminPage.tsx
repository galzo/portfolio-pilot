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
import { UserFundsManager } from "../components/UserFundsManager/UserFundsManager";

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
  const [showFundsSelection, setShowFundsSelection] = useState(false);

  const handleComplete = useCallback(() => {
    setShowFundsSelection(false);
  }, []);

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
        {showFundsSelection && <UserFundsManager users={users} onComplete={handleComplete} />}
        {!showFundsSelection && (
          <Button color="secondary" variant="contained" size="large" onClick={() => setShowFundsSelection(true)}>
            {"Add Funds To User Portfolios"}
          </Button>
        )}
      </Box>
    </PageContainer>
  );
};

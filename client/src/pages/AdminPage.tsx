import { Box, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { createStyleHook } from "../hooks/styleHooks";
import { useAuth } from "../hooks/useAuth";
import { useRedirect } from "../hooks/useRedirect";
import { AppRoutes } from "../consts/routes";
import { useFetchUsers } from "../hooks/useFetchUsers";

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
  };
});

export const AdminPage = () => {
  const styles = useAdminPageStyles();
  const { isAdmin } = useAuth();
  useRedirect({ predicate: () => !isAdmin(), redirectTo: AppRoutes.root });
  const { users } = useFetchUsers();
  console.log(users);

  if (!isAdmin()) {
    return null;
  }

  return (
    <PageContainer>
      <Box sx={styles.root}>
        <Typography color={"black"}>{"Admin Panel"}</Typography>
      </Box>
    </PageContainer>
  );
};

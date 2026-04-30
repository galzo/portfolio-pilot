import { Button } from "@mui/material";
import { createStyleHook } from "../../hooks/styleHooks";
import { useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../consts/routes";

const useSignOutButtonStyles = createStyleHook(() => {
  return {
    button: {
      position: "absolute",
      top: 20,
      left: 30,
    },
  };
});

export const SignOutButton = () => {
  const styles = useSignOutButtonStyles();
  const { clear } = useAuth();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    clear();
    navigate(AppRoutes.root);
  }, [clear, navigate]);
  return (
    <Button sx={styles.button} onClick={handleClick}>
      {"Sign out"}
    </Button>
  );
};

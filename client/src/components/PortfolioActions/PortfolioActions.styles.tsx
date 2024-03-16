import { createStyleHook } from "../../hooks/styleHooks";

export const usePortfolioActionsStyles = createStyleHook(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    marginRight: {
      marginRight: "16px",
    },
    icon: {
      marginTop: "4px",
      marginRight: "8px",
    },
  };
});

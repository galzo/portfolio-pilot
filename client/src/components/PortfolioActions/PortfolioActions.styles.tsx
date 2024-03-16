import { createStyleHook } from "../../hooks/styleHooks";

export const usePortfolioActionsStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      height: "30px",
    },
    smallMarginRight: {
      marginRight: "8px",
    },
    marginRight: {
      marginRight: "16px",
    },
    largeMarginRight: {
      marginRight: "40px",
    },
    marginBottom: {
      marginBottom: "20px",
    },
    icon: {
      marginTop: "4px",
      marginRight: "8px",
    },
    stockPicker: {
      width: "250px",
      marginRight: "16px",
    },
    amountOverview: {
      color: theme.palette.secondary.main,
    },
  };
});

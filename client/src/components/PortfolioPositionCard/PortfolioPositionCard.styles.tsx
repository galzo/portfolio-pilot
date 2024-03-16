import { createStyleHook } from "../../hooks/styleHooks";

export const usePortfolioPositionCardStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: theme.palette.background.paper,
      padding: "40px",
      boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    header: {
      marginBottom: "20px",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "8px",
    },
    iconContainer: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
      width: "20px",
      height: "20px",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4px",
      marginRight: "12px",
    },
    title: {
      color: theme.palette.secondary.main,
      fontFamily: "roboto",
    },
    subtitle: {
      color: theme.palette.text.primary,
      fontFamily: "roboto",
    },
    money: {
      color: theme.palette.info.main,
      fontFamily: "roboto",
    },
    subtitleMarked: {
      color: theme.palette.secondary.main,
      fontFamily: "roboto",
    },
  };
});

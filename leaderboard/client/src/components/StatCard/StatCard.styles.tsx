import { createStyleHook } from "../../hooks/styleHooks";

export const useStatCardStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: theme.palette.background.paper,
      padding: "32px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      width: "100%",
      boxSizing: "border-box",
    },
    title: {
      color: theme.palette.secondary.main,
      fontFamily: "roboto",
      marginBottom: "16px",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "10px",
      width: "100%",
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
      flexShrink: 0,
    },
    label: {
      color: theme.palette.text.primary,
      fontFamily: "roboto",
      marginRight: "6px",
    },
    value: {
      color: theme.palette.secondary.main,
      fontFamily: "roboto",
      fontWeight: 600,
    },
  };
});

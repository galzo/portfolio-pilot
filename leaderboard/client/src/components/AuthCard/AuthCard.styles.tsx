import { createStyleHook } from "../../hooks/styleHooks";

export const useAuthCardStyles = createStyleHook((theme) => {
  return {
    root: {
      width: "476px",
      maxWidth: "92vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      padding: "24px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    titleContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      backgroundColor: theme.palette.secondary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40px",
      height: "40px",
      borderRadius: "100%",
      marginBottom: "8px",
    },
    title: {
      color: theme.palette.text.primary,
    },
    errorText: {
      color: theme.palette.error.main,
      alignSelf: "flex-start",
    },
    input: {
      height: "56px",
    },
    marginBottom: {
      marginBottom: "20px",
    },
    toggleRow: {
      width: "100%",
      marginBottom: "20px",
    },
    toggle: {
      flex: 1,
    },
  };
});

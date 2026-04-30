import { createStyleHook } from "../../hooks/styleHooks";

export const useSubmitFlagCardStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      padding: "32px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      width: "100%",
      boxSizing: "border-box",
    },
    titleRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "20px",
    },
    titleIcon: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
      width: "32px",
      height: "32px",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "12px",
    },
    title: {
      color: theme.palette.text.primary,
    },
    captchaRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "16px",
      marginTop: "12px",
    },
    captchaPrompt: {
      flex: 1,
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    input: {
      height: "56px",
    },
    submitButton: {
      marginTop: "20px",
    },
  };
});

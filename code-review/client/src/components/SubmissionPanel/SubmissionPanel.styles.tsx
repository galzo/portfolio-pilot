import { createStyleHook } from "../../hooks/styleHooks";

export const useSubmissionPanelStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      padding: "32px",
      gap: "20px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      width: "100%",
      boxSizing: "border-box",
      position: "sticky",
      top: "16px",
    },
    titleRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
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
    blurb: {
      color: theme.palette.text.primary,
      opacity: 0.7,
    },
    vulnCard: {
      border: `1px solid ${theme.palette.divider}`,
      padding: "16px",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    vulnHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    vulnTitle: {
      color: theme.palette.secondary.main,
      fontWeight: 600,
    },
    rangeRow: {
      display: "flex",
      flexDirection: "row",
      gap: "12px",
    },
    successBox: {
      backgroundColor: "rgba(76, 175, 80, 0.12)",
      border: "1px solid rgba(76, 175, 80, 0.4)",
      padding: "16px",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
    },
    flagText: {
      fontFamily: "monospace",
      fontSize: "16px",
      color: theme.palette.secondary.main,
      fontWeight: 600,
    },
  };
});

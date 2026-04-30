import { createStyleHook } from "../../hooks/styleHooks";

export const useCodeSnippetStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      width: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#252526",
      color: "#d4d4d4",
      padding: "10px 16px",
      gap: "10px",
      borderBottom: "1px solid #3c3c3c",
    },
    headerDot: {
      width: "12px",
      height: "12px",
      borderRadius: "100%",
    },
    fileName: {
      flex: 1,
      color: "#cccccc",
      fontFamily: "monospace",
      fontSize: "13px",
    },
    selectionPill: {
      color: "#d4d4d4",
      fontSize: "12px",
      backgroundColor: "rgba(245, 0, 87, 0.18)",
      padding: "2px 10px",
      borderRadius: "12px",
      fontFamily: "monospace",
    },
    body: {
      maxHeight: "70vh",
      overflowY: "auto",
      backgroundColor: "#1e1e1e",
    },
    pre: {
      margin: 0,
      padding: "16px 0 16px 0",
      fontSize: "13px !important",
      backgroundColor: "#1e1e1e !important",
    },
    loading: {
      padding: "32px",
      textAlign: "center",
      color: "#cccccc",
      backgroundColor: "#1e1e1e",
    },
    hint: {
      padding: "8px 16px",
      backgroundColor: "#252526",
      color: "#a0a0a0",
      fontSize: "12px",
      borderTop: "1px solid #3c3c3c",
    },
    decoy: {
      display: "none",
    },
  };
});

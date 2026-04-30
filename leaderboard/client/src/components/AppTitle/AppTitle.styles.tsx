import { createStyleHook } from "../../hooks/styleHooks";

export const useAppTitleStyles = createStyleHook((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: theme.palette.text.primary,
      fontFamily: "roboto",
      marginBottom: "24px",
    },
    textContainer: {
      display: "flex",
      flexDirection: "row",
      userSelect: "none",
      alignItems: "baseline",
    },
    subtitle: {
      color: theme.palette.text.primary,
      fontFamily: "roboto",
      marginTop: "4px",
      opacity: 0.65,
    },
  };
});

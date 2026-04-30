import { createStyleHook } from "../../hooks/styleHooks";
import { AppColors } from "../../consts/colors";

export const useLeaderboardTableStyles = createStyleHook((theme) => {
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
    headerCell: {
      fontWeight: 600,
      color: theme.palette.text.primary,
      borderBottom: `2px solid ${theme.palette.divider}`,
    },
    rankBadge: {
      width: "28px",
      height: "28px",
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "13px",
      fontWeight: 600,
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.primary.main,
    },
    medalGold: {
      backgroundColor: AppColors.gold,
    },
    medalSilver: {
      backgroundColor: AppColors.silver,
    },
    medalBronze: {
      backgroundColor: AppColors.bronze,
    },
    rowYou: {
      backgroundColor: "rgba(245, 0, 87, 0.08)",
    },
    nameYou: {
      fontWeight: 700,
      color: theme.palette.secondary.main,
    },
    score: {
      fontWeight: 600,
    },
    emptyText: {
      padding: "32px",
      textAlign: "center",
      color: theme.palette.text.primary,
      opacity: 0.6,
    },
  };
});

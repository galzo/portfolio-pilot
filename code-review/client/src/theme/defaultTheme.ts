import { createTheme } from "@mui/material";
import { AppColors } from "../consts/colors";

const {
  palette: { augmentColor },
} = createTheme();

const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor, contrastText: "white" } });

export const defaultTheme = createTheme({
  palette: {
    primary: createColor(AppColors.primary),
    secondary: createColor(AppColors.secondary),
    background: { default: AppColors.background, paper: AppColors.paper },
    divider: AppColors.divider,
    text: {
      primary: AppColors.text,
      secondary: AppColors.text,
      disabled: AppColors.text,
    },
    action: {
      disabledBackground: "#878f99",
      disabled: "white",
    },
  },
});

import { createStyleHook } from "../../../hooks/styleHooks";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock } from "../../../types/stock.types";
import { User } from "../../../types/user.types";

const useBuyPositionStyles = createStyleHook(() => {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
    },
  };
});

interface BuyPositionProps {
  stocks: Stock[];
  user: User;
  portfolio: Portfolio[];
}

export const BuyPosition = () => {};

import { Box, Button, TextField, Typography } from "@mui/material";
import { Portfolio } from "../../../types/portfolio.types";
import { Stock } from "../../../types/stock.types";
import { User } from "../../../types/user.types";
import { FC } from "react";
import { useStockSelection } from "../hooks/useStockSelection";
import { usePortfolioActionsStyles } from "../PortfolioActions.styles";
import { StockPicker } from "./StockPicker";
import { useBuyPositionAmount } from "../hooks/useBuyPositionAmount";
import { BuyPositionProps } from "../PortfolioActions.types";
import { combineStyles } from "../../../utils/styleUtils";
import { formatUsdCurrency } from "../../../utils/textFormatUtils";

export const BuyPosition: FC<BuyPositionProps> = ({ stocks, portfolio, triggerAlert }) => {
  const styles = usePortfolioActionsStyles();

  const { selectedTicker, onSelectTicker, selectedStock } = useStockSelection({ allStocks: stocks });
  const { onSelectAmount, amount, totalValue } = useBuyPositionAmount({
    selectedStock: selectedStock,
    portfolio: portfolio,
    onError: () => triggerAlert("Not enough cash to buy more stocks"),
  });

  return (
    <Box sx={styles.column}>
      <Box sx={combineStyles(styles.root, styles.marginBottom)}>
        <StockPicker stocks={stocks} selectedStock={selectedTicker} onSelectStock={onSelectTicker} />
        <TextField
          disabled={!selectedStock}
          label={selectedStock ? "Num of shares" : ""}
          sx={styles.largeMarginRight}
          variant="outlined"
          value={amount}
          required={true}
          type="number"
          onChange={(event) => onSelectAmount(Number(event.target.value))}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled={!selectedStock || !amount}
          sx={styles.smallMarginRight}
        >
          {"Buy"}
        </Button>
        <Button color="error" variant="contained" size="large" disabled={!selectedStock || !amount}>
          {"Cancel"}
        </Button>
      </Box>
      {totalValue && (
        <Typography sx={styles.amountOverview}>{`Total Position Value: ${formatUsdCurrency(totalValue)}`}</Typography>
      )}
    </Box>
  );
};

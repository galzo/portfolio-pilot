import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useStockSelection } from "../hooks/useStockSelection";
import { usePortfolioActionsStyles } from "../PortfolioActions.styles";
import { StockPicker } from "./StockPicker";
import { useBuyPositionAmount } from "../hooks/useBuyPositionAmount";
import { PositionActionProps } from "../PortfolioActions.types";
import { combineStyles } from "../../../utils/styleUtils";
import { formatUsdCurrency } from "../../../utils/textFormatUtils";
import { PortfolioApi } from "../../../api/portfolio.api";
import { useSellPositionAmount } from "../hooks/useSellPositionAmount";

export const SellPosition: FC<PositionActionProps> = ({
  user,
  stocks,
  portfolio,
  triggerAlert,
  onCancel,
  onComplete,
}) => {
  const styles = usePortfolioActionsStyles();

  const { selectedTicker, onSelectTicker, selectedStock } = useStockSelection({ allStocks: stocks });
  const { onSelectAmount, amount, totalValue } = useSellPositionAmount({
    selectedStock: selectedStock,
    portfolio: portfolio,
    triggerAlert,
  });

  const sellPosition = useCallback(async () => {
    if (selectedStock && amount) {
      const response = await PortfolioApi.sellPosition({ userId: user.id, stockId: selectedStock.id, amount });
      if (response.isSuccess) {
        onComplete();
      } else {
        triggerAlert(response.error);
        onCancel();
      }
    }
  }, [amount, onCancel, onComplete, selectedStock, triggerAlert, user.id]);

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
          onClick={sellPosition}
        >
          {"Sell"}
        </Button>
        <Button color="error" variant="contained" size="large" onClick={onCancel}>
          {"Cancel"}
        </Button>
      </Box>
      {totalValue && (
        <Typography sx={styles.amountOverview}>{`Total Position Value: ${formatUsdCurrency(totalValue)}`}</Typography>
      )}
    </Box>
  );
};

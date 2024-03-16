/* eslint-disable @typescript-eslint/no-explicit-any */
import { Snackbar } from "@mui/material";
import { FC } from "react";

interface PortfolioActionsAlertProps {
  isOpen: boolean;
  onClose: VoidFunction;
  message: string;
}

export const PortfolioActionsAlert: FC<PortfolioActionsAlertProps> = ({ isOpen, onClose, message }) => {
  const handleClose = (_event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

import { useCallback, useState } from "react";

export const useAlert = () => {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleOpenAlert = useCallback((message: string) => {
    setAlertOpen(true);
    setAlertMessage(message);
  }, []);

  const handleCloseAlert = () => {
    setAlertOpen(false);
    setAlertMessage("");
  };

  return {
    isAlertOpen,
    alertMessage,
    handleOpenAlert,
    handleCloseAlert,
  };
};

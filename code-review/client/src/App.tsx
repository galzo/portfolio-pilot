import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UnlockPage } from "./pages/UnlockPage";
import { ChallengePage } from "./pages/ChallengePage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { defaultTheme } from "./theme/defaultTheme";

export const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UnlockPage setIsUnlocked={setIsUnlocked} />} />
          <Route path="/challenge" element={isUnlocked ? <ChallengePage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

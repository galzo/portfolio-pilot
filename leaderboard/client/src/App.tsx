import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { defaultTheme } from "./theme/defaultTheme";

export const App = () => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('leaderboard_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (userData: any) => {
    localStorage.setItem('leaderboard_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('leaderboard_user');
    setUser(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={!user ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <LeaderboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

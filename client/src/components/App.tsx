import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <div>
          <h1>{"hello world"}</h1>
        </div>
      </>
    </ThemeProvider>
  );
};

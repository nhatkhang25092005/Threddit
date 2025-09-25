import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MainThemeProvider } from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainThemeProvider>
      <App />
    </MainThemeProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { syncDocumentTextLocale } from "./constant/text/runtime/config";
import { ThemeProvider } from "./theme";

syncDocumentTextLocale()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

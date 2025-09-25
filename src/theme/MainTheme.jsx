import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const mainTheme = createTheme({
  palette: {
    background: {
      default: "#0A0B0B",
    },
  },
});

export default function MainThemeProvider({ children }) {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

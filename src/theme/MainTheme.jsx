import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { typographyTheme } from "./typographyTheme";
import { paletteTheme} from "./paletteTheme"
import {buttonTheme} from "./buttonTheme"

const mainTheme = createTheme({
  palette : paletteTheme,
  typography: typographyTheme,
  components:{
    MuiButton:buttonTheme
  }
});

export default function MainThemeProvider({ children }) {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

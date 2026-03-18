import { APP_FONT_FAMILY } from "../typographyTheme";

export const typographyProps = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      },
      body: {
        fontFamily: APP_FONT_FAMILY,
        fontSynthesis: "none",
      },
      "#root": {
        fontFamily: APP_FONT_FAMILY,
      },
      "button, input, textarea, select": {
        fontFamily: "inherit",
        fontSynthesis: "none",
      },
      ".MuiTypography-root, .MuiButtonBase-root, .MuiButton-root, .MuiInputBase-root, .MuiInputBase-input, .MuiInputLabel-root, .MuiMenuItem-root, .MuiTab-root": {
        fontSynthesis: "none",
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontSynthesis: "none",
      },
    },
  }
}

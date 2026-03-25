import { APP_FONT_FAMILY } from "../typographyTheme";
import { APP_PALETTE } from "../color";

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
        backgroundColor: APP_PALETTE.page,
        color: APP_PALETTE.text,
      },
      "#root": {
        fontFamily: APP_FONT_FAMILY,
      },
      "::selection": {
        backgroundColor: APP_PALETTE.primary,
        color: APP_PALETTE.white,
      },
      "*": {
        scrollbarColor: `${APP_PALETTE.faint} transparent`,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: APP_PALETTE.faint,
        borderRadius: "999px",
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
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

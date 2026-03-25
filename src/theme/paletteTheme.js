import { APP_PALETTE } from "./color";

const sharedPalette = {
  mode: "dark",
  primary: {
    main: APP_PALETTE.primary,
    contrastText: APP_PALETTE.white,
  },
  secondary: {
    main: APP_PALETTE.cyan,
    contrastText: APP_PALETTE.black,
  },
  success: {
    main: APP_PALETTE.success,
    contrastText: APP_PALETTE.black,
  },
  background: {
    default: APP_PALETTE.page,
    paper: APP_PALETTE.screen,
  },
  text: {
    primary: APP_PALETTE.text,
    secondary: APP_PALETTE.muted,
  },
  divider: APP_PALETTE.border,
  common: {
    black: APP_PALETTE.black,
    white: APP_PALETTE.white,
  },
  action: {
    hover: APP_PALETTE.primarySoft,
    selected: APP_PALETTE.primarySoft,
    focus: APP_PALETTE.primarySoft,
    disabled: APP_PALETTE.faint,
    disabledBackground: APP_PALETTE.border,
  },
  app: APP_PALETTE,
};

export const paletteTheme = {
  dark: sharedPalette,
  light: sharedPalette,
};

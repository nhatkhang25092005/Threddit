export const APP_PALETTE = {
  page: "#071120",
  screen: "#0F1723",
  screenAlt: "#0B121E",
  header: "rgba(10, 18, 30, 0.82)",
  panel: "#131F31",
  panelAlt: "#182334",
  border: "#243041",
  borderSoft: "rgba(51, 65, 85, 0.55)",
  text: "#FFFFFF",
  muted: "#94A3B8",
  subtle: "#64748B",
  faint: "#475569",
  primary: "#3B82F6",
  primarySoft: "rgba(59, 130, 246, 0.16)",
  cyan: "#00F2FF",
  success: "#22C55E",
  white: "#FFFFFF",
  black: "#000000",
};

const SHARED_SHADOW = {
  soft: "rgba(0, 0, 0, 0.24)",
  medium: "rgba(0, 0, 0, 0.34)",
  strong: "rgba(0, 0, 0, 0.46)",
};

const SHARED_MODE = {
  screen: APP_PALETTE.screen,
  paper: APP_PALETTE.panel,
  elevated: APP_PALETTE.panelAlt,
  text: APP_PALETTE.text,
  muted: APP_PALETTE.muted,
  subtle: APP_PALETTE.subtle,
  border: APP_PALETTE.border,
  borderSoft: APP_PALETTE.borderSoft,
  primary: APP_PALETTE.primary,
  primarySoft: APP_PALETTE.primarySoft,
  cyan: APP_PALETTE.cyan,
  success: APP_PALETTE.success,
};

export const COLOR = {
  app: APP_PALETTE,
  background: {
    main: {
      dark: APP_PALETTE.page,
      light: APP_PALETTE.page,
    },
    surface: {
      default: {
        dark: {
          bg: SHARED_MODE.screen,
          shadow: SHARED_SHADOW.soft,
        },
        light: {
          bg: SHARED_MODE.screen,
          shadow: SHARED_SHADOW.soft,
        },
      },
      auth: {
        dark: SHARED_MODE.screen,
        light: SHARED_MODE.screen,
      },
      menu: {
        default: {
          dark: SHARED_MODE.paper,
          light: SHARED_MODE.paper,
        },
      },
      navigate: {
        dark: APP_PALETTE.header,
        light: APP_PALETTE.header,
      },
      modal: {
        dark: SHARED_MODE.paper,
        light: SHARED_MODE.paper,
      },
    },
  },
  text: {
    primary: {
      dark: SHARED_MODE.text,
      light: SHARED_MODE.text,
    },
    secondary: {
      dark: SHARED_MODE.muted,
      light: SHARED_MODE.muted,
    },
    placeholder: {
      dark: SHARED_MODE.subtle,
      light: SHARED_MODE.subtle,
    },
  },
  button: {
    primary: {
      default: {
        bg: {
          dark: SHARED_MODE.primary,
          light: SHARED_MODE.primary,
        },
        text: {
          dark: APP_PALETTE.white,
          light: APP_PALETTE.white,
        },
        shadow: {
          dark: SHARED_SHADOW.soft,
          light: SHARED_SHADOW.soft,
        },
      },
      disable: {
        bg: {
          dark: SHARED_MODE.border,
          light: SHARED_MODE.border,
        },
        text: {
          dark: SHARED_MODE.subtle,
          light: SHARED_MODE.subtle,
        },
        shadow: {
          dark: SHARED_SHADOW.soft,
          light: SHARED_SHADOW.soft,
        },
      },
    },
    secondary: {
      bg: {
        dark: SHARED_MODE.elevated,
        light: SHARED_MODE.elevated,
      },
      text: {
        dark: SHARED_MODE.text,
        light: SHARED_MODE.text,
      },
      shadow: {
        dark: SHARED_SHADOW.soft,
        light: SHARED_SHADOW.soft,
      },
      hover: {
        bg: {
          dark: SHARED_MODE.border,
          light: SHARED_MODE.border,
        },
      },
    },
    google: {
      bg: SHARED_MODE.paper,
      shadow: {
        dark: SHARED_SHADOW.soft,
        light: SHARED_SHADOW.soft,
      },
      border: {
        dark: SHARED_MODE.border,
        light: SHARED_MODE.border,
      },
      hover: SHARED_MODE.elevated,
    },
    warning: {
      dark: {
        bg: SHARED_MODE.primary,
        shadow: SHARED_SHADOW.soft,
        text: APP_PALETTE.white,
      },
      light: {
        bg: SHARED_MODE.primary,
        shadow: SHARED_SHADOW.soft,
        text: APP_PALETTE.white,
      },
    },
    dialog: {
      bg: {
        dark: APP_PALETTE.header,
        light: APP_PALETTE.header,
      },
    },
    outline: {
      bg: {
        dark: "transparent",
        light: "transparent",
      },
      border: {
        dark: SHARED_MODE.border,
        light: SHARED_MODE.border,
      },
    },
  },
  textfield: {
    border: {
      default: {
        dark: SHARED_MODE.borderSoft,
        light: SHARED_MODE.borderSoft,
      },
      after: {
        dark: SHARED_MODE.primary,
        light: SHARED_MODE.primary,
      },
      focus: {
        dark: SHARED_MODE.primary,
        light: SHARED_MODE.primary,
      },
      error: {},
      hover: {},
      disable: {},
    },
    background: {
      default: {
        dark: SHARED_MODE.screen,
        light: SHARED_MODE.screen,
      },
      focus: {
        dark: SHARED_MODE.paper,
        light: SHARED_MODE.paper,
      },
    },
    text: {
      value: {
        dark: SHARED_MODE.text,
        light: SHARED_MODE.text,
      },
      placeholder: {
        dark: SHARED_MODE.muted,
        light: SHARED_MODE.muted,
      },
      label: {
        default: {
          dark: SHARED_MODE.muted,
          light: SHARED_MODE.muted,
        },
        focus: {
          dark: SHARED_MODE.primary,
          light: SHARED_MODE.primary,
        },
      },
    },
  },
  link: {
    primary: {
      default: {
        dark: SHARED_MODE.text,
        light: SHARED_MODE.text,
      },
      hover: {
        dark: SHARED_MODE.primary,
        light: SHARED_MODE.primary,
      },
    },
    secondary: {
      default: {
        dark: SHARED_MODE.cyan,
        light: SHARED_MODE.cyan,
      },
      hover: {
        dark: SHARED_MODE.primary,
        light: SHARED_MODE.primary,
      },
    },
  },
  divider: {
    dark: SHARED_MODE.border,
    light: SHARED_MODE.border,
  },
  form_label: {
    dark: SHARED_MODE.text,
    light: SHARED_MODE.text,
  },
  radio: {
    dark: SHARED_MODE.primary,
    light: SHARED_MODE.primary,
  },
  shadow: {
    menu: {
      default: {
        dark: SHARED_SHADOW.medium,
        light: SHARED_SHADOW.medium,
      },
    },
    modal: {
      dark: SHARED_SHADOW.strong,
      light: SHARED_SHADOW.strong,
    },
    card: {
      dark: SHARED_SHADOW.soft,
      light: SHARED_SHADOW.soft,
    },
  },
  tabs: {
    indicator: {
      dark: SHARED_MODE.primary,
      light: SHARED_MODE.primary,
    },
    text: {
      dark: SHARED_MODE.text,
      light: SHARED_MODE.text,
    },
  },
  border: {
    surface: {
      card: {
        light: SHARED_MODE.border,
        dark: SHARED_MODE.border,
      },
    },
  },
};

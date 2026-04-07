import "@fontsource/satisfy";
import { Typography } from "@mui/material";

const logoSizes = {
  small: {
    fontSize: "1.35rem",
  },
  normal: {
    fontSize: "1.9rem",
  },
  large: {
    fontSize: "3.75rem",
  },
}

export default function Logo({ sx, size = "large" }) {
  return (
    <Typography
      component="span"
      aria-label="Threddit logo"
      sx={[
        {
          display: "inline-block",
          lineHeight: 1,
          whiteSpace: "nowrap",
          userSelect: "none",
          fontFamily: '"Satisfy", cursive',
          fontWeight: 400,
          color: "#3B82F6",
        },
        logoSizes[size] ?? null,
        sx,
      ]}
    >
      Threddit
    </Typography>
  )
}

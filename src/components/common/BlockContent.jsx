import { Box } from "@mui/material";
export default function BlockContent({
  customStyle,
  header,
  children,
  footer,
  debug = false,
}) {
  const style = {
    borderBottom: "1px solid #A6A6A6",
    px: "0.5rem",
    ...customStyle,
    ...(debug && { border: "solid red 1px" }),
  };
  return (
    <Box sx={style}>
      {header && <Box>{header}</Box> }
      {children && <Box>{children}</Box>}
      {footer && <Box sx={{ p: "1rem" }}>{footer}</Box>}
    </Box>
  );
}

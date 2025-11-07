import { Box } from "@mui/material";
/**
 * Used to display block content with optional header and footer
 */
export default function BlockContent({
  bodyStyle,
  headerStyle,
  footerStyle,
  customStyle,
  header,
  children,
  footer,
  debug = false,
  onClick = () => {} 
}) {
  const style = {
    px: "0.5rem",
    ...customStyle,
  };

  const childrenStyle = {
    px: "0.5rem",
    ...bodyStyle
  }
  return (
    <Box sx={{...style,display:"flex", flexDirection:"column", ...(debug && { border: "solid red 1px" }),}} onClick ={onClick}>
      {header && <Box sx={{...headerStyle, width:"100%"}}>{header}</Box> }
      {children && <Box sx={childrenStyle}>{children}</Box>}
      {footer && <Box sx={{...footerStyle, width:"100%"}}>{footer}</Box>}
    </Box>
  );
}

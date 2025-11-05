import { Box } from "@mui/material";
export default function BlockContent({
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
  return (
    <Box sx={{display:"flex", flexDirection:"column", ...(debug && { border: "solid red 1px" }),}} onClick ={onClick}>
      {header && <Box sx={headerStyle}>{header}</Box> }
      {children && <Box sx={style}>{children}</Box>}
      {footer && <Box sx={footerStyle}>{footer}</Box>}
    </Box>
  );
}

import { Box, CircularProgress } from "@mui/material";
export default function LoadingScreen() {
  return (
    <Box
      display="flex"
      alignItems="center"
      top ={0}
      left = {0}
      justifyContent="center"
      position="fixed"
      minHeight="100vh"
      minWidth="100vw"
      bgcolor="#00000069"
      zIndex={10}
    >
      <CircularProgress />
    </Box>
  );
}

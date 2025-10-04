import { Box, CircularProgress } from "@mui/material";
export default function LoadingScreen({ control }) {
  if (!control) return null;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      minHeight="100vh"
      minWidth="100vw"
      bgcolor="#00000069"
      zIndex={10}
      left="50%"
    sx={{transform:"translateX(-50%)"}}
    >
      <CircularProgress />
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import ArrowIcon from '../../assets/icons/arrow.svg?react';

export default function ArrowButton({ data, sx }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "3px",
        height: "100%",
        bgcolor: "#302F30",
        px: "10px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#1b1b1bff",
        },
        ...sx,
      }}
    >
      {/* Arrow Up */}
      <ArrowIcon
        style={{
          transform: "rotate(-45deg) translateY(3px)",
        }}
      />

      <Typography>{data}</Typography>

      {/* Arrow Down */}
      <ArrowIcon
        style={{
          transform: "rotate(135deg) translateY(3px)",
        }}
        width={30}
        height={30}
      />
    </Box>
  );
}

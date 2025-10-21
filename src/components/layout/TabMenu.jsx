import React from "react";
import { Box, Button } from "@mui/material";

export default function TabMenu({ tabs, value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f0f0f",
        border: "1px solid #A6A6A6",
        borderBottom: "1px solid #222",
        borderRadius: "12px 12px 0 0",
        width: "80%",
        mx: "auto",
        mt: 2,
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          sx={{
            flex: 1,
            textTransform: "none",
            color: value === tab.value ? "#fff" : "#bfbfbf",
            fontWeight: value === tab.value ? "50%" : "50%",
            backgroundColor:
              value === tab.value ? "#1e1e1e" : "transparent",
            borderRadius: "12px 12px 0 0",
            "&:hover": {
              backgroundColor: "#2b2b2b",
            },
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
}

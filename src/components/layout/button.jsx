import { Button } from "@mui/material";

export default function CustomButton({
  label = "Đăng nhập",
  onClick,
  sx = {},
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: "8px",
        px: 3,
        py: 1,
        fontSize: "19px",
        boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: "#e5e5e5",
          boxShadow: "0px 0px 6px rgba(255,255,255,0.3)",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}

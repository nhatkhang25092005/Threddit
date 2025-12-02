import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constant";
import {CircularProgress} from "@mui/material";
export default function UserFollowCard({
  name,
  buttonText,
  onFollow,
  disabled,
  hideButton,
  loading
}) {
  const isFollowing = buttonText === "Đã theo dõi";
  const navigate = useNavigate()
  return (
    <Box
      onClick = {(e)=>{e.preventDefault();navigate(ROUTES.CLIENT_PAGE + `/${name}`)}}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        borderTop: "1px solid #333",
        px: 3,
        py: 1.5,
        width: "100%",
        color: "white",
        cursor:"pointer",
        transition: "0.2s",
        "&:last-child": {
          borderBottom: "1px solid #333",
          borderRadius: "0 0 12px 12px",
        },
        "&:hover": { backgroundColor: "#222" },
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: 15 }}>
        {name}
      </Typography>

      {!hideButton && (
        <Button
          startIcon = {loading ? <CircularProgress sx={{color:"white"}} size={24}/> : null}
          variant="contained"
          disabled={disabled}
          onClick={(e)=>{e.stopPropagation(); onFollow()}}
          sx={{
            backgroundColor: isFollowing ? "#444" : "#fff",
            color: isFollowing ? "#fff" : "#000",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            minWidth: "110px",
            cursor:'pointer',
            "&:hover": {
              backgroundColor: isFollowing ? "#555" : "#e5e5e5",
            },
            transition: "all 0.25s ease",
          }}
        >
          {isFollowing ? "Đã theo dõi" : "Theo dõi"}
        </Button>
      )}
    </Box>
  );
}

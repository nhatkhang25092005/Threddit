import { Button, Tooltip, Box, CircularProgress } from "@mui/material"
import { friend } from "../../../constant/text/vi/friend.text"

const btnContainerSx = {
  my: "auto",
  height: "fit-content",
  textTransform: "none",
  py: 0,
  px: 2,
  maxWidth: "100%",
  width: "auto",
  ml: 1,
  minWidth: "unset",
  whiteSpace: "nowrap",
  alignItems: "center",
  borderRadius: 999,
  "&:hover": {
    backgroundColor: "action.hover",
  },
}

function ButtonContent({ loading }) {
  if (!loading) {
    return friend.text_on_profile.status.friend
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CircularProgress size={14} color="inherit" />
      {friend.text_on_profile.button.profile_friend_loading_unfriend}
    </Box>
  )
}

export default function UnfriendButton({
  sx,
  loading = false,
  disabled = false,
  onClick,
}) {
  return (
    <Tooltip title={friend.text_on_profile.tool_tip.unfriend} placement="top" >
      <Button
        variant="outlined"
        color="white"
        sx={{ ...btnContainerSx, ...sx }}
        disabled={disabled || loading}
        onClick={onClick}
      >
        <ButtonContent loading={loading} />
      </Button>
    </Tooltip>
  )
}

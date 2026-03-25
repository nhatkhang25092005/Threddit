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
    return friend.text_on_profile.status.pending
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CircularProgress size={14} color="inherit" />
      {friend.text_on_sent_list?.button?.cancel_request || friend.text_on_profile.status.pending}
    </Box>
  )
}

export default function CancelRequestButton({
  sx,
  loading = false,
  disabled = false,
  onClick,
}) {
  return (
    <Tooltip
      title={friend.text_on_sent_list?.button?.cancel_request || friend.text_on_profile.tool_tip.cancel_request_friend}
      placement="top"
    >
      <Button
        onClick={onClick}
        variant="secondary"
        disabled={disabled || loading}
        sx={{ ...btnContainerSx, ...sx }}
      >
        <ButtonContent loading={loading} />
      </Button>
    </Tooltip>
  )
}

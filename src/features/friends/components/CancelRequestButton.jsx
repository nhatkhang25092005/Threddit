import { Button, Tooltip, Box, CircularProgress } from "@mui/material"
import { friend } from "../../../constant/text/vi/friend.text"
import { useNotify } from "../../../hooks/useNotify"
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

export default function CancelRequestButton({
  sx,
}) {
  const notify = useNotify()
  return (
    <Tooltip title={friend.text_on_profile.tool_tip.cancel_request_friend} placement="top">
      <Button
        onClick={()=>{notify.snackbar(friend.text_on_profile.notification.cancel_request_instruction, 4000, 'info')}}
        variant="secondary"
        sx={{ ...btnContainerSx, ...sx }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {friend.text_on_profile.status.pending}
        </Box>
      </Button>
    </Tooltip>
  )
}1 

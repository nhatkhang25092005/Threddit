import { Button, Tooltip, Box, CircularProgress } from "@mui/material"
import { block } from "../../../constant/text/vi/block.text"

const btnSx = {
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
    return block.unblock_button.label
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CircularProgress size={14} color="inherit" />
      {block.unblock_button.loadingLabel}
    </Box>
  )
}

export default function UnblockButton({
  sx,
  loading = false,
}) {
  return (
    <Tooltip title={block.unblock_button.tooltip} placement="top">
      <Button
        variant="outlined"
        color="white"
        sx={{ ...btnSx, ...sx }}
        disabled={loading}
      >
        <ButtonContent loading={loading} />
      </Button>
    </Tooltip>
  )
}

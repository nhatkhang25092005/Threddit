import { Button, Tooltip, Box, CircularProgress } from "@mui/material"
import BlockIcon from '@mui/icons-material/Block';
import { useProfileModal } from "../provider/useProfileModal";
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
    return <BlockIcon color="white"/>
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CircularProgress size={14} color="inherit" />
      Đang chặn...
    </Box>
  )
}

export default function BlockUserButton({
  sx,
  loading = false,
  disabled = false,
}){
  const {openModal} = useProfileModal()
  return (
    <Tooltip title="Thêm vào danh sách chặn" placement="top">
      <Button
        variant="outlined"
        color="error"
        sx={{ ...btnSx, ...sx }}
        disabled={disabled || loading}
        onClick={()=>openModal('confirm_block')}
      >
        <ButtonContent loading={loading} />
      </Button>
    </Tooltip>
  )
}

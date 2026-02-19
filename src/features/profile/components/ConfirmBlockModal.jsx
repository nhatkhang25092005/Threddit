import Surface from "../../../components/common/Surface";
import { Typography, Avatar, Box, Button, Divider, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BlockIcon from "@mui/icons-material/Block";
import { keyframes } from "@mui/system";
import { useProfileContext } from "../hooks";
import { style } from "../style";
import {block} from '../../../constant/text/vi/block.text'
import {useBlockContext} from '../../../core/block/hooks/useBlockContext'
import { useNavigate } from "react-router-dom";
import {routes} from '../../../constant/routes'


const sx = style.modal.block
/* ================= Animations ================= */

const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(-12px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)     scale(1);    }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.35); }
  50%       { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
`;


export default function ConfirmBlockModal({ onClose }) {
  const {
    state: {
      displayName,
      avatarUrl,
      username
    },
  } = useProfileContext();
  const navigate = useNavigate()

  const {
    actions:{blockUser},
    state:{loading:{global:{blockUser:loading}}}
  } = useBlockContext()

  const handleConfirm = async () => {
    await blockUser?.({username, displayName, avatarUrl});
    onClose?.();
    navigate(`${routes.profile}?tab=block`,{replace:true})
  };

  return (
    <Surface variant="modal" sx={(t)=>sx.modalSx(t, fadeSlideIn)}>
      <Box onClick={onClose} sx={sx.closeBtnSx}>
        <CloseIcon sx={{ fontSize: 18 }} />
      </Box>

      <Box sx={sx.bodySx}>
        <Box sx={sx.avatarWrapperSx}>
          <Avatar src={avatarUrl} sx={sx.avatarSx} />

          <Box sx={sx.blockIconWrapperSx(pulse)}>
            <BlockIcon sx={{ fontSize: 14, color: "#fff" }} />
          </Box>
        </Box>

        <Box sx={sx.textWrapperSx}>
          <Typography variant="title" sx={sx.titleSx}>
            {block.confirmModal.title.replace("{displayName}", displayName)}
          </Typography>

          <Typography variant="body2" sx={sx.descriptionSx}>
            {block.confirmModal.description}
          </Typography>
        </Box>

        <Divider sx={sx.dividerSx} />

        <Box sx={sx.consequencesBoxSx}>
          {block.confirmModal.consequences.map((item) => (
            <Box key={item} sx={sx.consequenceItemSx}>
              <Box sx={sx.dotSx} />
              <Typography variant="body2" sx={sx.consequenceTextSx}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={sx.actionsWrapperSx}>
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth
            sx={sx.cancelBtnSx}
          >
            {block.confirmModal.cancelButton}
          </Button>

          <Button
            disabled = {loading}
            onClick={handleConfirm}
            fullWidth
            sx={sx.confirmBtnSx}
          >
            {loading ? <CircularProgress size={20} color="white"/> : block.confirmModal.confirmButton}
          </Button>
        </Box>
      </Box>
    </Surface>
  );
}

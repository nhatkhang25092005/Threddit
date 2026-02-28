import { Box, ButtonBase, Divider } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import ReactionButton from "../../../reaction/ReactionButton";
export default function PostActions({ sx, postId }) {
  return (
    <>
      <Divider />
      <Box sx={sx.section}>
        <Box sx={sx.actionsRow}>
          <ReactionButton postId={postId}/>
          <ButtonBase sx={sx.actionBtn}>
            <ChatBubbleOutlineIcon sx={sx.actionIcon} />
            Bình luận
          </ButtonBase>
          <ButtonBase sx={sx.actionBtn}>
            <ShareIcon sx={sx.actionIcon} />
            Chia sẻ
          </ButtonBase>
        </Box>
      </Box>
    </>
  );
}

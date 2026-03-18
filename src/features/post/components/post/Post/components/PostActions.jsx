import { Box, ButtonBase, CircularProgress, Divider, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import ReactionButton from "../../../reaction/ReactionButton";
import { post } from "../../../../../../constant/text/vi/post/post";
import { usePostContext } from "../../../../hooks";
import { usePostModal } from "../../../../provider/usePostModal";

const actionButtonSx = {
  minHeight: "2.3rem",
  borderRadius: "0.45rem",
  color: (theme) => (theme.palette.mode === "dark" ? "#B0B3B8" : "#65676B"),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.35rem",
  fontSize: "0.88rem",
  fontWeight: 600,
  width: "100%",
  "&:hover": {
    backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#3A3B3C" : "#F2F3F5"),
  },
};

const actionIconSx = {
  fontSize: "1.35rem",
};

const activeShareColor = "#1877F2";

export default function PostActions({ sx, postId, onCommentClick }) {
  const {
    actions: { unsharePost },
    selector: {
      post: {
        getIsOwnerByPostIdOf,
        getShareLoadingByPostIdOf,
        getShareStatusByPostIdOf,
      }
    }
  } = usePostContext();
  const { openModal } = usePostModal();
  const isOwner = getIsOwnerByPostIdOf(postId);
  const isShareLoading = getShareLoadingByPostIdOf(postId);
  const isShared = getShareStatusByPostIdOf(postId);
  

  const handleShareClick = () => {
    if (postId == null || isShareLoading) return;

    if (isShared) {
      unsharePost(postId);
      return;
    }

    openModal("create_share_post_modal", { postId });
  };

  const handleCommentClick = () => {
    if (postId == null) return;

    if (typeof onCommentClick === "function") {
      onCommentClick(postId);
      return;
    }

    openModal("detail_post_modal", { postId });
  };

  return (
    <>
      <Divider />
      <Box sx={sx.section}>
        <Box
          sx={[
            sx.actionsRow,
            isOwner && { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }
          ]}
        >
          <ReactionButton postId={postId} />

          <ButtonBase onClick={handleCommentClick} sx={actionButtonSx}>
            <ChatBubbleOutlineIcon sx={actionIconSx} />
            <Typography component="span" sx={{ fontSize: "inherit", color: "inherit" }}>
              {post.actionComment}
            </Typography>
          </ButtonBase>

          {!isOwner && (
            <ButtonBase
              sx={{
                ...actionButtonSx,
                ...(isShared ? { color: activeShareColor } : {})
              }}
              onClick={handleShareClick}
              disabled={isShareLoading}
            >
              {isShareLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <>
                  <ShareIcon sx={actionIconSx} />
                  <Typography component="span" sx={{ fontSize: "inherit", color: "inherit" }}>
                    {post.actionShare}
                  </Typography>
                </>
              )}
            </ButtonBase>
          )}
        </Box>
      </Box>
    </>
  );
}

import { Box } from "@mui/material";
import VoteButton from "./VoteButton";
import CommentButton from "../CommentButton";
import SaveButton from "../saveButton/SaveButton";
import ShareButton from "../ShareButton";
import { memo } from "react";

const actionStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  mx: "1rem",
};

const PostActions = memo(({ vote, comment, save, share }) => {
  // console.log(save)
  return (
    <Box sx={actionStyle}>
      <VoteButton
        voteState={vote.state}
        score={vote.score}
        onVote={vote.onVote}
      />
      <CommentButton
        onClick={comment.onClick}
        data={comment.count}
        sx={{ width: "130px" }}
      />
      <SaveButton
        initCount={Number(save.count)}
        sx={{ width: "130px" }}
        initSaveState={save.isSaved}
        postId={save.postId}
        // onClick={save.onToggle}
      />
      <ShareButton onNotification={share.onShare} postId={share.postId} />
    </Box>
  );
});

PostActions.displayName = "PostAction";
export default PostActions;

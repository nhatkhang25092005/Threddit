import { Box, Divider } from "@mui/material";
import { useCallback, useRef } from "react";
import Surface from "../../../../../components/common/Surface";
import { detailPost } from "../../../../../constant/text/vi/post/detailpost.text";
import { CreatePostModalHeader } from "../CreatePostModal/components";
import { DetailPostModalContentPanel } from "./components";
import { useDetailPostModalData } from "./hooks/useDetailPostModalData";
import { style } from "./style";

const sx = style.modal;

export default function DetailPostModal({ onClose, postId }) {
  const detail = useDetailPostModalData(postId)
  const commentSectionRef = useRef(null);
  const handleCommentClick = useCallback(() => {
    commentSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  if (!detail) {
    return null;
  }

  return (
    <Surface variant="modal" sx={sx.surface}>
      <CreatePostModalHeader
        sx={sx}
        onClose={onClose}
        title={detailPost.title}
      />

      <Divider sx={sx.divider} />

      <Box sx={sx.layout}>
        <DetailPostModalContentPanel
          commentSectionRef={commentSectionRef}
          detail={detail}
          onCommentClick={handleCommentClick}
        />
      </Box>
    </Surface>
  );
}

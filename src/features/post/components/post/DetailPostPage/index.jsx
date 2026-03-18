import { Box } from "@mui/material";
import { CommentList } from "../../comment";
import {
  DetailPostPageMediaViewer,
  DetailPostPagePostContent,
  DetailPostPageState,
} from "./components";
import { useDetailPostPage } from "./hooks/useDetailPostPage";
import { style } from "./style";

const sx = style.page;

export default function DetailPostPage() {
  const detail = useDetailPostPage();

  if (detail.isLoading) {
    return (
      <DetailPostPageState
        description={detail.statusDescription}
        loading
        onBack={detail.handleClose}
        title={detail.statusTitle}
      />
    );
  }

  if (!detail.post || !detail.activeMedia) {
    return (
      <DetailPostPageState
        description={detail.statusDescription}
        onBack={detail.handleClose}
        title={detail.statusTitle}
      />
    );
  }

  return (
    <Box sx={sx.root}>
      <DetailPostPageMediaViewer
        activeIndex={detail.activeIndex}
        activeMedia={detail.activeMedia}
        canGoNext={detail.canGoNext}
        canGoPrev={detail.canGoPrev}
        mediaCount={detail.mediaCount}
        onClose={detail.handleClose}
        onNext={detail.handleNext}
        onPrev={detail.handlePrev}
      />

      <Box sx={sx.sidebar}>
        <Box sx={sx.sidebarScroll}>
          <DetailPostPagePostContent
            canInteract={detail.canInteract}
            detail={detail}
            onCommentClick={detail.handleCommentClick}
          />

          <Box ref={detail.commentSectionRef}>
            <CommentList
              initialCount={detail?.post?.stats?.commentNumber ?? 0}
              postId={detail?.post?.id}
              variant="page"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

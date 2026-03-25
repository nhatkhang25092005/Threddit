import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CommentList } from "../../comment";
import { CommentListSkeleton } from "../../comment/components";
import { style } from "../style";

const stopEventPropagation = (event) => {
  event.stopPropagation()
}

export default function ReelCommentSidebar({
  isCommentPrefetched = false,
  isCommentPrefetching = false,
  isOpen = false,
  onClose,
  onCommentCountChange,
  reel,
}) {
  const isExpanded = Boolean(isOpen && reel?.id)
  const reelId = reel?.id ?? null
  const authorLabel = reel?.author?.displayName || reel?.author?.username || "Reel hien tai"
  const [shouldRenderBody, setShouldRenderBody] = useState(false)

  useEffect(() => {
    if (!isExpanded) {
      setShouldRenderBody(false)
      return
    }

    const timerId = window.setTimeout(() => {
      setShouldRenderBody(true)
    }, 120)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [isExpanded])

  return (
    <Box sx={[style.commentSidebarShell, isExpanded ? style.commentSidebarShellOpen : null]}>
      <Box
        onClick={stopEventPropagation}
        onTouchMove={stopEventPropagation}
        onWheel={stopEventPropagation}
        sx={style.commentSidebarPanel}
      >
        <Box sx={style.commentSidebarHeader}>
          <Box sx={style.commentSidebarMeta}>
            <Box sx={style.commentSidebarBadge}>
              <ForumRoundedIcon sx={style.commentSidebarBadgeIcon} />
            </Box>

            <Box sx={style.commentSidebarHeading}>
              <Typography sx={style.commentSidebarTitle}>
                Binh luan
              </Typography>

              <Typography sx={style.commentSidebarSubtitle}>
                {authorLabel}
              </Typography>
            </Box>
          </Box>

          <IconButton
            aria-label="An binh luan"
            onClick={onClose}
            sx={style.commentSidebarCloseButton}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </Box>

        {isExpanded ? (
          <Box
            data-reel-wheel-lock="true"
            onTouchMove={stopEventPropagation}
            onWheel={stopEventPropagation}
            sx={shouldRenderBody ? style.commentSidebarBody : style.commentSidebarBodyPending}
          >
            {shouldRenderBody ? (
              isCommentPrefetching && !isCommentPrefetched ? (
                <CommentListSkeleton />
              ) : (
                <CommentList
                  key={reelId ?? "reel-comment-sidebar"}
                  initialCount={reel?.stats?.commentNumber ?? 0}
                  onCountChange={(nextCount) => onCommentCountChange?.(reelId, nextCount)}
                  postId={reelId}
                  usePrefetchedThread={isCommentPrefetched}
                  variant="page"
                />
              )
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

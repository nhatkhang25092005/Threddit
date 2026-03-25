import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { REACTION_META } from "../../../../../constant/emoji";
import ReactionBar from "../../reaction/ReactionBar";
import { usePostContext } from "../../../hooks";
import { usePostModal } from "../../../provider/usePostModal";
import { style } from "../style";
import { formatCount } from "../utils";
import ReelProfileAvatar from "./ReelProfileAvatar";

const REACTION_OPEN_DELAY = 180
const REACTION_CLOSE_DELAY = 100
const ACTIVE_SHARE_COLOR = "#3B82F6"

const normalizeReaction = (reaction) => {
  if (!reaction) return null

  const key = String(reaction).toUpperCase()
  return REACTION_META[key] ? key : null
}

const buildActions = (stats = {}) => ([
  {
    icon: FavoriteBorderRoundedIcon,
    key: "reaction",
    value: stats.reactionNumber ?? 0,
  },
  {
    icon: ChatBubbleOutlineRoundedIcon,
    key: "comment",
    value: stats.commentNumber ?? 0,
  },
  {
    icon: ShareRoundedIcon,
    key: "share",
    value: stats.shareNumber ?? 0,
  },
  {
    icon: BookmarkBorderRoundedIcon,
    key: "save",
    value: stats.saveNumber ?? 0,
  },
])

export default function ReelActionRail({
  commentCount = 0,
  isCommentPanelOpen = false,
  onToggleCommentPanel,
  reel,
}) {
  const [isReactionBarOpen, setIsReactionBarOpen] = useState(false)
  const reactionTimerRef = useRef(null)
  const {
    actions: {
      reaction: reactPost,
      savePost,
      unsharePost,
      unsavePost,
    },
    selector: {
      post: {
        getIsOwnerByPostIdOf,
        getPostById,
        getShareLoadingByPostIdOf,
        getShareStatusByPostIdOf,
        getSaveLoadingByPostIdOf,
        getSaveStatusByPostIdOf,
      },
      reaction: { getMyReactionOf },
    },
  } = usePostContext()
  const { openModal } = usePostModal()
  const incomingReelId = reel?.id ?? null
  const safeReel = getPostById(incomingReelId) ?? reel ?? {}
  const reelId = safeReel.id ?? incomingReelId
  const selectedReaction = normalizeReaction(getMyReactionOf(reelId))
  const selectedReactionMeta = selectedReaction ? REACTION_META[selectedReaction] : null
  const isOwner = getIsOwnerByPostIdOf(reelId)
  const isShared = getShareStatusByPostIdOf(reelId)
  const isShareLoading = getShareLoadingByPostIdOf(reelId)
  const isSaved = getSaveStatusByPostIdOf(reelId)
  const isSaveLoading = getSaveLoadingByPostIdOf(reelId)
  const actions = buildActions(safeReel.stats)

  const clearReactionTimer = useCallback(() => {
    if (reactionTimerRef.current) {
      window.clearTimeout(reactionTimerRef.current)
      reactionTimerRef.current = null
    }
  }, [])

  useEffect(() => () => clearReactionTimer(), [clearReactionTimer])

  const handleToggleReaction = () => {
    if (reelId == null || typeof reactPost !== "function") return

    reactPost(reelId, selectedReaction, selectedReaction || "LIKE")
  }

  const openReactionBar = useCallback(() => {
    clearReactionTimer()
    reactionTimerRef.current = window.setTimeout(() => {
      setIsReactionBarOpen(true)
      reactionTimerRef.current = null
    }, REACTION_OPEN_DELAY)
  }, [clearReactionTimer])

  const keepReactionBarOpen = useCallback(() => {
    clearReactionTimer()
    setIsReactionBarOpen(true)
  }, [clearReactionTimer])

  const closeReactionBar = useCallback(() => {
    clearReactionTimer()
    reactionTimerRef.current = window.setTimeout(() => {
      setIsReactionBarOpen(false)
      reactionTimerRef.current = null
    }, REACTION_CLOSE_DELAY)
  }, [clearReactionTimer])

  const handleSelectReaction = useCallback((nextReaction) => {
    if (reelId == null || typeof reactPost !== "function") return

    clearReactionTimer()
    reactPost(reelId, selectedReaction, nextReaction)
    setIsReactionBarOpen(false)
  }, [clearReactionTimer, reactPost, reelId, selectedReaction])

  const handleToggleSave = useCallback(() => {
    if (reelId == null || isSaveLoading) return

    if (isSaved) {
      unsavePost?.(reelId)
      return
    }

    savePost?.(reelId)
  }, [isSaveLoading, isSaved, reelId, savePost, unsavePost])

  const handleShareClick = useCallback(() => {
    if (reelId == null || isShareLoading) return

    if (isShared) {
      unsharePost?.(reelId)
      return
    }

    openModal("create_share_post_modal", { postId: reelId })
  }, [isShareLoading, isShared, openModal, reelId, unsharePost])

  return (
    <Box sx={style.actionRail}>
      {actions.map((action) => {
        const isReactionAction = action.key === "reaction"
        const isCommentAction = action.key === "comment"
        const isShareAction = action.key === "share"
        const isSaveAction = action.key === "save"
        const Icon = action.icon
        const value = isCommentAction ? commentCount : action.value
        const isActive = isCommentAction
          ? isCommentPanelOpen
          : (
            isReactionAction
              ? Boolean(selectedReaction)
              : isShareAction
                ? isShared
                : isSaveAction
                  ? isSaved
                  : false
          )
        const actionLabel = isReactionAction
          ? (selectedReaction ? "Bo reaction reel" : "Reaction reel")
          : (isCommentAction
            ? (isCommentPanelOpen ? "An binh luan" : "Mo binh luan")
            : (
              isShareAction
                ? (isShared ? "Huy chia se reel" : "Chia se reel")
                : (isSaveAction ? (isSaved ? "Bo luu reel" : "Luu reel") : undefined)
            ))
        const iconSx = isReactionAction && selectedReactionMeta
          ? { color: selectedReactionMeta.color }
          : (isShareAction && isShared
            ? { color: ACTIVE_SHARE_COLOR }
            : null)
        const countSx = isReactionAction && selectedReactionMeta
          ? { color: selectedReactionMeta.color }
          : (isShareAction && isShared
            ? { color: ACTIVE_SHARE_COLOR }
            : null)
        const handleClick = isCommentAction
          ? onToggleCommentPanel
          : (
            isReactionAction
              ? handleToggleReaction
              : isShareAction
                ? handleShareClick
                : isSaveAction
                  ? handleToggleSave
                  : undefined
          )
        const actionWrapSx = isReactionAction
          ? [style.actionItem, style.actionItemReaction]
          : style.actionItem
        const isDisabled = isShareAction
          ? isShareLoading || reelId == null || isOwner
          : (isSaveAction ? isSaveLoading || reelId == null : false)
        const ResolvedIcon = isSaveAction && isSaved ? BookmarkRoundedIcon : Icon

        return (
          <Box
            key={action.key}
            onMouseEnter={isReactionAction ? openReactionBar : undefined}
            onMouseLeave={isReactionAction ? closeReactionBar : undefined}
            sx={actionWrapSx}
          >
            {isReactionAction && isReactionBarOpen ? (
              <Box sx={style.reactionPopover}>
                <ReactionBar
                  onMouseEnter={keepReactionBarOpen}
                  onMouseLeave={closeReactionBar}
                  onReact={handleSelectReaction}
                />
              </Box>
            ) : null}

            <IconButton
              aria-label={actionLabel}
              aria-pressed={isReactionAction || isCommentAction || isShareAction || isSaveAction ? isActive : undefined}
              disabled={isDisabled}
              onClick={handleClick}
              sx={[
                style.actionButton,
                isActive ? style.actionButtonActive : null,
              ]}
            >
              {isShareAction && isShareLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : isSaveAction && isSaveLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : isReactionAction && selectedReactionMeta ? (
                <Box component="span" sx={style.actionReactionEmoji}>
                  {selectedReactionMeta.emoji}
                </Box>
              ) : (
                <ResolvedIcon sx={iconSx} />
              )}
            </IconButton>
            <Typography
              sx={[
                style.actionCount,
                isActive ? style.actionCountActive : null,
                countSx,
              ]}
            >
              {formatCount(value)}
            </Typography>
          </Box>
        )
      })}

      <ReelProfileAvatar
        avatarSx={style.actionAvatar}
        avatarUrl={safeReel.author?.avatarUrl}
        buttonSx={style.actionAvatarButton}
        username={safeReel.author?.username}
      />
    </Box>
  )
}

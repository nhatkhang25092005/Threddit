import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { REACTION_META } from "../../../../../constant/emoji";
import ReactionBar from "../../reaction/ReactionBar";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { normalizeCommentReaction } from "../utils/comment.utils";

const OPEN_DELAY = 280;
const CLOSE_DELAY = 120;

const actionSx = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
};

const buttonSx = {
  minHeight: "1.75rem",
  px: "0.2rem",
  borderRadius: "999rem",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.28rem",
  color: (theme) => (theme.palette.mode === "dark" ? "#AAB2BD" : "#667588"),
  fontSize: "0.82rem",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "transparent",
  },
};

const popoverSx = {
  position: "absolute",
  bottom: "calc(100% + 0.4rem)",
  left: 0,
  zIndex: 3,
};

export default function CommentReactionButton({
  reaction = null,
  onReact,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const selectedReaction = normalizeCommentReaction(reaction);
  const selectedMeta = selectedReaction ? REACTION_META[selectedReaction] : null;

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const openPopover = useCallback(() => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
      timeoutRef.current = null;
    }, OPEN_DELAY);
  }, [clearTimer]);

  const closePopover = useCallback(() => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, CLOSE_DELAY);
  }, [clearTimer]);

  const keepOpen = useCallback(() => {
    clearTimer();
    setIsOpen(true);
  }, [clearTimer]);

  const handleSelectReaction = useCallback(
    (nextReaction) => {
      clearTimer();
      setIsOpen(false);

      if (selectedReaction === normalizeCommentReaction(nextReaction)) {
        onReact?.(null);
        return;
      }

      onReact?.(nextReaction);
    },
    [clearTimer, onReact, selectedReaction]
  );

  const handleQuickClick = () => {
    if (selectedReaction) {
      onReact?.(null);
      return;
    }

    onReact?.("LIKE");
  };

  return (
    <Box onMouseEnter={openPopover} onMouseLeave={closePopover} sx={actionSx}>
      <ButtonBase onClick={handleQuickClick} sx={buttonSx}>
        {selectedMeta ? (
          <>
            <Box component="span" sx={{ fontSize: "1rem", lineHeight: 1 }}>
              {selectedMeta.emoji}
            </Box>
            <Typography component="span" sx={{ color: selectedMeta.color, fontSize: "inherit", fontWeight: "inherit" }}>
              {selectedMeta.label}
            </Typography>
          </>
        ) : (
          <>
            <ThumbUpAltOutlinedIcon sx={{ fontSize: "1rem" }} />
            <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
              {commentText.actionLike}
            </Typography>
          </>
        )}

      </ButtonBase>

      {isOpen ? (
        <Box sx={popoverSx}>
          <ReactionBar
            onMouseEnter={keepOpen}
            onMouseLeave={closePopover}
            onReact={handleSelectReaction}
          />
        </Box>
      ) : null}
    </Box>
  );
}

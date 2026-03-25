import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Box, IconButton } from "@mui/material";
import { style } from "../style";
import ReelActionRail from "./ReelActionRail";
import ReelMedia from "./ReelMedia";

export default function ReelCard({
  canNavigateNext,
  canNavigatePrev,
  commentCount = 0,
  isCommentPanelOpen,
  isActive,
  onNavigateNext,
  onNavigatePrev,
  onToggleCommentPanel,
  reel,
}) {
  const isCondensed = isCommentPanelOpen

  return (
    <Box sx={style.itemFrame}>
      <Box sx={[style.mediaColumn, isCondensed ? style.mediaColumnCondensed : null]}>
        <Box sx={[style.card, isCondensed ? style.cardCondensed : null]}>
          <ReelMedia
            isActive={isActive}
            isCondensed={isCondensed}
            reel={reel}
          />
        </Box>
      </Box>

      <Box sx={style.actionRailShell}>
        <Box sx={style.sideRail}>
          <Box sx={style.navRail}>
            <IconButton
              aria-label="Reel truoc"
              disabled={!canNavigatePrev}
              onClick={onNavigatePrev}
              sx={style.navButton}
            >
              <KeyboardArrowUpRoundedIcon />
            </IconButton>

            <IconButton
              aria-label="Reel tiep theo"
              disabled={!canNavigateNext}
              onClick={onNavigateNext}
              sx={style.navButton}
            >
              <KeyboardArrowDownRoundedIcon />
            </IconButton>
          </Box>

          <ReelActionRail
            commentCount={commentCount}
            isCommentPanelOpen={isCommentPanelOpen}
            onToggleCommentPanel={onToggleCommentPanel}
            reel={reel}
          />
        </Box>
      </Box>
    </Box>
  )
}

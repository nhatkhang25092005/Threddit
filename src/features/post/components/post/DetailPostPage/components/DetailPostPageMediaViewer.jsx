import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { detailPostPage } from "../../../../../../constant/text/vi/post/detailpostpage.text";
import {
  isImageType,
  isVideoType,
} from "../utils/detailPostPage.utils";
import { style } from "../style";

const sx = style.page;

export default function DetailPostPageMediaViewer({
  activeIndex,
  activeMedia,
  canGoNext,
  canGoPrev,
  mediaCount,
  onClose,
  onNext,
  onPrev,
}) {
  if (!activeMedia) {
    return null;
  }

  return (
    <Box sx={sx.viewer}>
      <Box sx={sx.viewerTopBar}>
        <Box sx={sx.viewerTopBarLeft}>
          <IconButton
            aria-label={detailPostPage.closeLabel}
            onClick={onClose}
            sx={sx.closeButton}
          >
            <CloseRoundedIcon />
          </IconButton>

          <Typography sx={sx.topBarTitle}>
            {detailPostPage.title}
          </Typography>
        </Box>

        <Typography sx={sx.counterBadge}>
          {`${activeIndex + 1} / ${mediaCount}`}
        </Typography>
      </Box>

      <IconButton
        aria-label={detailPostPage.prevLabel}
        disabled={!canGoPrev}
        onClick={onPrev}
        sx={sx.navButton("left")}
      >
        <ChevronLeftRoundedIcon sx={sx.navIcon} />
      </IconButton>

      <Box sx={sx.viewerMediaWrap}>
        {isImageType(activeMedia?.type) ? (
          <Box
            alt={detailPostPage.mediaAlt}
            component="img"
            loading="eager"
            src={activeMedia.url}
            sx={sx.viewerMedia}
          />
        ) : null}

        {isVideoType(activeMedia?.type) ? (
          <Box
            autoPlay
            component="video"
            controls
            playsInline
            preload="metadata"
            src={activeMedia.url}
            sx={sx.viewerMedia}
          />
        ) : null}
      </Box>

      <IconButton
        aria-label={detailPostPage.nextLabel}
        disabled={!canGoNext}
        onClick={onNext}
        sx={sx.navButton("right")}
      >
        <ChevronRightRoundedIcon sx={sx.navIcon} />
      </IconButton>
    </Box>
  );
}

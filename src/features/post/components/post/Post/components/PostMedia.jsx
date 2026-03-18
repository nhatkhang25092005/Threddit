import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Tooltip, Typography } from "@mui/material";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { post } from "../../../../../../constant/text/vi/post/post";
import { style } from "../../style";
import {
  buildDetailPostPageRoute,
  getReturnToPath,
} from "../../DetailPostPage/utils/detailPostPageRoute";

const normalizeType = (type = "") => String(type || "").toLowerCase();

const isImageType = (type = "") => {
  const value = normalizeType(type);
  return value.startsWith("image") || value === "img" || value === "photo";
};

const isVideoType = (type = "") => {
  const value = normalizeType(type);
  return value.startsWith("video");
};

const isAudioType = (type = "") => {
  const value = normalizeType(type);
  return value.startsWith("audio");
};

const splitMedia = (items = []) => {
  const normalizedItems = Array.isArray(items) ? items.filter((item) => item?.url) : [];

  const visualMedia = normalizedItems.filter(
    (item) => isImageType(item.type) || isVideoType(item.type)
  );
  const audioMedia = normalizedItems.filter((item) => isAudioType(item.type));

  return {
    audioMedia,
    visualMedia,
  };
};

const sx = style.post.media;

export default function PostMedia({ items = [], postId = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { visualMedia, audioMedia } = splitMedia(items);
  const visualPreviewList = visualMedia.slice(0, 4);
  const hiddenVisualCount = visualMedia.length - visualPreviewList.length;
  const canOpenDetailPage = postId != null && visualMedia.length > 0;

  const handleOpenDetailPage = useCallback((index) => {
    if (!canOpenDetailPage) return;

    navigate(buildDetailPostPageRoute(postId, index), {
      state: {
        backgroundLocation: location,
        returnTo: getReturnToPath(location),
      },
    });
  }, [canOpenDetailPage, location, navigate, postId]);

  if (visualPreviewList.length === 0 && audioMedia.length === 0) return null;

  return (
    <>
      {visualPreviewList.length > 0 ? (
        <Box sx={sx.mediaBlock}>
          <Box sx={sx.mediaGrid(visualPreviewList.length)}>
            {visualPreviewList.map((item, index) => {
              const mediaType = normalizeType(item.type);
              const key = `${item.id || item.url}-${index}`;

              return (
                <Box
                  key={key}
                  onClick={() => handleOpenDetailPage(index)}
                  sx={{
                    ...sx.mediaTile(visualPreviewList.length, index),
                    ...(canOpenDetailPage ? { cursor: "pointer" } : {}),
                  }}
                >
                  {isImageType(mediaType) ? (
                    <Box
                      alt={post.mediaAlt}
                      component="img"
                      loading="lazy"
                      src={item.url}
                      sx={sx.mediaElement}
                    />
                  ) : null}

                  {isVideoType(mediaType) ? (
                    <>
                      <Box
                        component="video"
                        controls={canOpenDetailPage ? false : visualPreviewList.length === 1}
                        preload="metadata"
                        src={item.url}
                        sx={sx.mediaElement}
                      />

                      {visualPreviewList.length > 1 || canOpenDetailPage ? (
                        <Tooltip title={post.mediaPlayTooltip} placement="top">
                          <Box sx={sx.videoPlayOverlay}>
                            <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                          </Box>
                        </Tooltip>
                      ) : null}
                    </>
                  ) : null}

                  {hiddenVisualCount > 0 && index === visualPreviewList.length - 1 ? (
                    <Box sx={sx.mediaMoreOverlay}>
                      <Typography sx={sx.mediaMoreText}>+{hiddenVisualCount}</Typography>
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : null}

      {audioMedia.length > 0 ? (
        <Box sx={sx.audioList}>
          {audioMedia.map((item, index) => (
            <Box
              key={`${item.id || item.url}-audio-${index}`}
              component="audio"
              controls
              src={item.url}
              sx={sx.audioMedia}
            />
          ))}
        </Box>
      ) : null}
    </>
  );
}

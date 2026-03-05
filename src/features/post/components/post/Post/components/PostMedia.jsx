import { Box, Typography, Tooltip } from "@mui/material";
import { style } from "../../style";
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
    visualMedia,
    audioMedia,
  };
};

const sx = style.post.media
export default function PostMedia({ items = [] }) {
  const { visualMedia, audioMedia } = splitMedia(items)
  const visualPreviewList = visualMedia.slice(0, 4);
  const hiddenVisualCount = visualMedia.length - visualPreviewList.length;

  if (visualPreviewList.length === 0 && audioMedia.length === 0) return null;

  return (
    <>
      {visualPreviewList.length > 0 && (
        <Box sx={sx.mediaBlock}>
          <Box sx={sx.mediaGrid(visualPreviewList.length)}>
            {visualPreviewList.map((item, index) => {
              const mediaType = normalizeType(item.type);
              const key = `${item.id || item.url}-${index}`;

              return (
                <Box key={key} sx={sx.mediaTile(visualPreviewList.length, index)}>
                  {isImageType(mediaType) && (
                    <Box component="img" src={item.url} alt="Post media" sx={sx.mediaElement} />
                  )}

                  {isVideoType(mediaType) && (
                      <>
                        <Box
                          component="video"
                          src={item.url}
                          controls = {visualPreviewList.length == 1 ? true : false }
                          preload="metadata"
                          sx={sx.mediaElement}
                        />
                        {visualPreviewList.length > 1 && <Tooltip title="Phát" placement="top"><Box sx={sx.videoPlayOverlay}>▶</Box></Tooltip>}
                      </>
                    )}

                  {hiddenVisualCount > 0 && index === visualPreviewList.length - 1 && (
                    <Box sx={sx.mediaMoreOverlay}>
                      <Typography sx={sx.mediaMoreText}>+{hiddenVisualCount}</Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {audioMedia.length > 0 && (
        <Box sx={sx.audioList}>
          {audioMedia.map((item, index) => (
            <Box
              key={`${item.id || item.url}-audio-${index}`}
              component="audio"
              src={item.url}
              controls
              sx={sx.audioMedia}
            />
          ))}
        </Box>
      )}
    </>
  );
}

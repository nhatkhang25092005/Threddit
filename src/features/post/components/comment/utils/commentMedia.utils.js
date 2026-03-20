const COMMENT_AUDIO_TYPES = ["audio", "sound"];
const COMMENT_VIDEO_TYPES = ["video"];

const resolveCommentMediaType = (media) => {
  const rawType =
    media?.type ||
    media?.contentType ||
    media?.mediaType ||
    media?.mimeType ||
    "";
  const normalizedType = String(rawType).toLowerCase();

  if (COMMENT_AUDIO_TYPES.some((type) => normalizedType.includes(type))) {
    return "audio";
  }

  if (COMMENT_VIDEO_TYPES.some((type) => normalizedType.includes(type))) {
    return "video";
  }

  return "image";
};

const resolveCommentMediaId = (media, index) =>
  media?.id ||
  media?.mediaId ||
  media?.mediaKey ||
  media?.key ||
  `${media?.url || media?.src || media?.file?.name || "comment-media"}-${index}`;

export const normalizeComposerMediaList = (mediaList = []) =>
  (Array.isArray(mediaList) ? mediaList : []).map((media, index) => ({
    id: resolveCommentMediaId(media, index),
    type: resolveCommentMediaType(media),
    url: media?.url || media?.src || media?.mediaUrl || media?.fileUrl || "",
    file: media?.file || null,
    name: media?.name || media?.file?.name || "",
    origin: media?.origin || "object-url",
    contentType: media?.contentType || media?.file?.type || "",
    contentLength: media?.contentLength || media?.file?.size || 0,
  }));

export const normalizeRemoteCommentMediaList = (mediaList = []) =>
  (Array.isArray(mediaList) ? mediaList : []).map((media, index) => ({
    id: resolveCommentMediaId(media, index),
    type: resolveCommentMediaType(media),
    url: media?.url || media?.src || media?.mediaUrl || media?.fileUrl || "",
    file: null,
    name: media?.name || "",
    origin: media?.origin || "remote",
    contentType: media?.contentType || media?.mimeType || "",
    contentLength: media?.contentLength || 0,
  }));

export const partitionCommentMedia = (media = []) =>
  (Array.isArray(media) ? media : []).reduce(
    (result, item) => {
      if (item.type === "audio") {
        result.audio.push(item);
        return result;
      }

      result.visual.push(item);
      return result;
    },
    { visual: [], audio: [] }
  );

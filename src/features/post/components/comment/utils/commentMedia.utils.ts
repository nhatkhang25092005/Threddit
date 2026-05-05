import { ComposerMedia, Media } from "@/features/post/types/media.type";
import { resolveId } from "@/features/post/utils/resolveTypes";

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

const buildStableMediaId = (value, index): number => {
  const text = String(value || `comment-media-${index}`);
  let hash = 0;

  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash * 31) + text.charCodeAt(i)) >>> 0;
  }

  return hash || index + 1;
};

const resolveCommentMediaId = (media, index): number | null => (
  resolveId(media?.id ?? media?.mediaId) ??
  buildStableMediaId(
    media?.url || media?.src || media?.file?.name || media?.mediaKey || media?.key,
    index
  )
);

/**
 * Normalize composer media list
 * @param mediaList - Composer Media List
 * @returns - Normalized Composer Media List
 */
export const normalizeComposerMediaList = (mediaList: Partial<ComposerMedia>[] = []): ComposerMedia[] =>
  (Array.isArray(mediaList) ? mediaList : []).map((media, index) => ({
    id: resolveCommentMediaId(media, index),
    type: resolveCommentMediaType(media),
    url: media?.url || media?.mediaUrl || media?.fileUrl || "",
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

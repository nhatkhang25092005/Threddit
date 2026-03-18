import {
  formatDateTime,
  resolveMedia,
} from "../../SharePost/sharedPost.utils";
import { resolveIsSharePost } from "../../../../utils/resolveIsSharePost";

const normalizeMediaType = (type = "") => String(type || "").toLowerCase();

export const isImageType = (type = "") => {
  const mediaType = normalizeMediaType(type);
  return mediaType.startsWith("image") || mediaType === "img" || mediaType === "photo";
};

export const isVideoType = (type = "") => {
  const mediaType = normalizeMediaType(type);
  return mediaType.startsWith("video");
};

export const isAudioType = (type = "") => {
  const mediaType = normalizeMediaType(type);
  return mediaType.startsWith("audio") || mediaType === "sound";
};

export const clampMediaIndex = (index, length) => {
  if (length <= 0) {
    return 0;
  }

  if (!Number.isFinite(index)) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
};

const resolveDetailAuthor = (post, isSharePost) => {
  if (isSharePost) {
    return post?.sharer ?? post?.author ?? null;
  }

  return post?.author ?? null;
};

const resolveDetailCreatedAt = (post, isSharePost) => {
  if (isSharePost) {
    return formatDateTime(post?.time?.sharedAt || post?.time?.createdAt);
  }

  return formatDateTime(post?.time?.createdAt);
};

export const buildDetailPostPageData = (post) => {
  if (!post || post.id == null) {
    return null;
  }

  const resolvedMedia = resolveMedia(post?.mediaFiles);
  const visualMedia = resolvedMedia.filter(
    (item) => isImageType(item?.type) || isVideoType(item?.type)
  );
  const audioMedia = resolvedMedia.filter((item) => isAudioType(item?.type));
  const isSharePost = resolveIsSharePost(post);

  return {
    audioMedia,
    author: resolveDetailAuthor(post, isSharePost),
    createdAt: resolveDetailCreatedAt(post, isSharePost),
    isSharePost,
    post,
    visualMedia,
  };
};

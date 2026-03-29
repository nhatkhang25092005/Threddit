import {
  formatDateTime,
  resolveMedia,
  resolveSharedPost,
} from "../../SharePost/sharedPost.utils";
import { resolveIsSharePost } from "../../../../utils/resolveIsSharePost";

const resolveDetailAuthor = (post, isSharePost) => {
  if (isSharePost) {
    return post?.sharer
  }

  return post?.author ?? null;
};

const resolveDetailCreatedAt = (post, isSharePost) => {
  if (isSharePost) {
    return formatDateTime(post?.time?.sharedAt || post?.time?.createdAt);
  }

  return formatDateTime(post?.time?.createdAt);
};

export const buildDetailPostModalData = (post) => {
  if (!post || post.id == null) {
    return null;
  }

  const isSharePost = resolveIsSharePost(post)
  const sharedPost = resolveSharedPost(post);
  const resolvedMedia = resolveMedia(post?.mediaFiles);

  return {
    ...post,
    author: resolveDetailAuthor(post, isSharePost),
    createdAt: resolveDetailCreatedAt(post, isSharePost),
    inlineMedia: resolvedMedia,
    isSharePost,
    mediaFiles: resolvedMedia,
    post,
    sharedPost,
  };
};

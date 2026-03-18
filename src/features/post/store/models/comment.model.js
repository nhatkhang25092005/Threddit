import { mediaModel } from "./media.model";

const mapCommenter = (commenter) => {
  if (!commenter) return null;

  return {
    username: commenter?.username || null,
    displayName: commenter?.displayName || null,
    avatarUrl: commenter?.avatarUrl ? `${commenter.avatarUrl}?t=${Date.now()}` : null,
  };
};

export const commentModel = (comment = {}) => {
  const mediaFiles = Array.isArray(comment?.mediaFiles)
    ? comment.mediaFiles
    : (Array.isArray(comment?.media) ? comment.media : [])

  return {
    id: comment?.id ?? null,
    text: comment?.text || "",
    createdAt: comment?.createdAt || null,
    updatedAt: comment?.updatedAt || null,
    commenter: mapCommenter(comment?.commenter),
    isCommenter: Boolean(comment?.isCommenter),
    parentCommentId: comment?.parentCommentId ?? null,
    hasChildComment: Boolean(comment?.hasChildComment),
    reaction: comment?.reaction || null,
    reactionNumber: comment?.reactionNumber ?? comment?.stats?.reactionNumber ?? 0,
    mediaFiles: mediaFiles.map((item) => mediaModel(item)),
    mentionedUsers: Array.isArray(comment?.mentionedUsers) ? comment.mentionedUsers : [],
  }
};

import {
  addCommentToTree,
  findCommentByIdInTree,
  normalizeFlatCommentTree,
} from "../../utils/comment.utils";
import { resolveCommentItems } from "../../../../utils/commentCollection.utils";

const isSameCommentId = (leftId, rightId) =>
  leftId != null &&
  rightId != null &&
  String(leftId) === String(rightId);

export function resolveFetchedReplyItems(data) {
  return resolveCommentItems(data);
}

export function normalizeFetchedReplies(
  items = [],
  parentComment,
  viewerUsername = null
) {
  return normalizeFlatCommentTree(items, {
    rootLevel: (Number(parentComment?.level) || 0) + 1,
    rootParentAuthor: parentComment?.author || null,
    rootParentId: parentComment?.id ?? null,
    viewerUsername,
  });
}

export function shouldSyncCreatedReply(
  loadedReplies = [],
  currentComment,
  targetParentId
) {
  if (targetParentId == null) {
    return false;
  }

  if (isSameCommentId(targetParentId, currentComment?.id)) {
    return true;
  }

  return (
    Array.isArray(loadedReplies) &&
    Boolean(findCommentByIdInTree(loadedReplies, targetParentId))
  );
}

export function insertCreatedReplyIntoReplies(
  currentReplies = [],
  currentComment,
  createdComment
) {
  const baseReplies = Array.isArray(currentReplies) ? currentReplies : [];

  if (!createdComment || !currentComment) {
    return baseReplies;
  }

  if (findCommentByIdInTree(baseReplies, createdComment.id)) {
    return baseReplies;
  }

  const preparedComment = {
    ...createdComment,
    children: Array.isArray(createdComment.children) ? createdComment.children : [],
    parentId: createdComment?.parentId ?? currentComment?.id ?? null,
    level: Number.isFinite(createdComment?.level)
      ? createdComment.level
      : (Number(currentComment?.level) || 0) + 1,
    replyTo: createdComment?.replyTo || currentComment?.author || null,
  };

  if (isSameCommentId(preparedComment.parentId, currentComment?.id)) {
    return [preparedComment, ...baseReplies];
  }

  if (!findCommentByIdInTree(baseReplies, preparedComment.parentId)) {
    return baseReplies;
  }

  return addCommentToTree(
    baseReplies,
    preparedComment,
    preparedComment.parentId
  );
}

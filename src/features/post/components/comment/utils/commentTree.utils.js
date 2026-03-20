import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { resolveCommentAuthor } from "./commentAuthor.utils";
import { normalizeComposerMediaList } from "./commentMedia.utils";
import { normalizeCommentReaction } from "./commentNormalization.utils";

let localCommentSeed = 0;

const refreshReplyCount = (comment) => ({
  ...comment,
  hasChildComment: Array.isArray(comment.children) ? comment.children.length > 0 : Boolean(comment?.hasChildComment),
  stats: {
    ...comment.stats,
    replyNumber: Array.isArray(comment.children) ? comment.children.length : 0,
  },
});

const resolveReplyCountValue = (comment, fallbackCount = 0) => {
  const currentReplyCount = Number(comment?.stats?.replyNumber);
  if (Number.isFinite(currentReplyCount)) {
    return currentReplyCount;
  }

  return fallbackCount;
};

export const mergeCommentPage = (current = [], incoming = []) => {
  const merged = [...current];
  const indexMap = new Map(current.map((item, index) => [item.id, index]));

  incoming.forEach((item) => {
    const currentIndex = indexMap.get(item.id);

    if (currentIndex == null) {
      indexMap.set(item.id, merged.length);
      merged.push(item);
      return;
    }

    const currentItem = merged[currentIndex];
    merged[currentIndex] = {
      ...currentItem,
      ...item,
      children: mergeCommentPage(currentItem.children || [], item.children || []),
      stats: {
        ...currentItem.stats,
        ...item.stats,
      },
      viewer: {
        ...currentItem.viewer,
        ...item.viewer,
      },
      meta: {
        ...currentItem.meta,
        ...item.meta,
      },
    };
  });

  return merged;
};

export const findCommentByIdInTree = (comments = [], commentId) => {
  const targetId = String(commentId);

  for (const comment of Array.isArray(comments) ? comments : []) {
    if (String(comment?.id) === targetId) {
      return comment;
    }

    const matchedChild = findCommentByIdInTree(comment?.children || [], targetId);
    if (matchedChild) {
      return matchedChild;
    }
  }

  return null;
};

export const countTotalComments = (comments = []) =>
  (Array.isArray(comments) ? comments : []).reduce(
    (total, comment) => total + 1 + countTotalComments(comment.children || []),
    0
  );

export const formatCommentCount = (count = 0) =>
  new Intl.NumberFormat("vi-VN").format(Number(count) || 0);

export const resolveReplyParentId = (comment) => {
  if (!comment) return null;
  return comment.id ?? null;
};

export const buildLocalComment = ({
  level = 0,
  media = [],
  parentId = null,
  replyTo = null,
  text = "",
  viewer = null,
}) => {
  const now = new Date().toISOString();
  localCommentSeed += 1;

  return {
    id: `local-comment-${Date.now()}-${localCommentSeed}`,
    parentId,
    level,
    author: resolveCommentAuthor(viewer, viewer?.username || null),
    text: String(text || "").trim(),
    media: normalizeComposerMediaList(media),
    time: {
      createdAt: now,
      updatedAt: now,
    },
    meta: {
      createdLabel: commentText.justNow,
      isEdited: false,
      isOwner: true,
    },
    replyTo: parentId && replyTo ? resolveCommentAuthor(replyTo, viewer?.username || null) : null,
    viewer: {
      reaction: null,
    },
    stats: {
      reactionNumber: 0,
      replyNumber: 0,
    },
    children: [],
  };
};

export const addCommentToTree = (comments = [], newComment, parentId = null) => {
  if (!parentId) {
    return [newComment, ...comments];
  }

  const targetId = String(parentId);

  const addToNode = (node) => {
    if (!node) return node;

    if (String(node.id) === targetId) {
      return refreshReplyCount({
        ...node,
        children: [
          {
            ...newComment,
            parentId: node.id,
            level: Number.isFinite(newComment?.level) ? newComment.level : (Number(node?.level) || 0) + 1,
            replyTo: newComment?.replyTo || node?.author || null,
          },
          ...(node.children || []),
        ],
      });
    }

    if (!Array.isArray(node.children) || node.children.length === 0) {
      return node;
    }

    return {
      ...node,
      children: node.children.map(addToNode),
    };
  };

  return comments.map(addToNode);
};

export const countCommentBranch = (comment) => (
  comment ? countTotalComments([comment]) : 0
);

export const removeCommentFromTree = (comments = [], commentId) => {
  const targetId = String(commentId);
  let removedCount = 0;
  const nextComments = [];

  for (const comment of Array.isArray(comments) ? comments : []) {
    if (String(comment?.id) === targetId) {
      removedCount += countCommentBranch(comment);
      continue;
    }

    if (!Array.isArray(comment?.children) || comment.children.length === 0) {
      nextComments.push(comment);
      continue;
    }

    const nextChildrenResult = removeCommentFromTree(comment.children, targetId);
    if (nextChildrenResult.removedCount === 0) {
      nextComments.push(comment);
      continue;
    }

    const directRemovedCount = comment.children.length - nextChildrenResult.comments.length;
    const currentReplyCount = resolveReplyCountValue(comment, comment.children.length);
    const nextReplyCount = directRemovedCount > 0
      ? Math.max(nextChildrenResult.comments.length, currentReplyCount - directRemovedCount)
      : Math.max(currentReplyCount, nextChildrenResult.comments.length);

    nextComments.push({
      ...comment,
      children: nextChildrenResult.comments,
      hasChildComment: nextReplyCount > 0 || nextChildrenResult.comments.length > 0,
      stats: {
        ...comment?.stats,
        replyNumber: nextReplyCount,
      },
    });
    removedCount += nextChildrenResult.removedCount;
  }

  return {
    comments: nextComments,
    removedCount,
  };
};

export const editCommentInTree = (comments = [], commentId, changes = {}) =>
  comments.map((comment) => {
    if (comment.id === commentId) {
      const nextUpdatedAt = new Date().toISOString();

      return {
        ...comment,
        text: String(changes.text ?? comment.text ?? "").trim(),
        media: Array.isArray(changes.media) ? normalizeComposerMediaList(changes.media) : comment.media,
        time: {
          ...comment.time,
          updatedAt: nextUpdatedAt,
        },
        meta: {
          ...comment.meta,
          isEdited: true,
        },
      };
    }

    if (!Array.isArray(comment.children) || comment.children.length === 0) {
      return comment;
    }

    return {
      ...comment,
      children: editCommentInTree(comment.children, commentId, changes),
    };
  });

export const updateCommentReactionInTree = (comments = [], commentId, nextReaction) =>
  comments.map((comment) => {
    if (comment.id === commentId) {
      const currentReaction = normalizeCommentReaction(comment.viewer?.reaction);
      const normalizedNextReaction = normalizeCommentReaction(nextReaction);

      let reactionNumber = comment.stats?.reactionNumber ?? 0;
      let resolvedReaction = normalizedNextReaction;

      if (!currentReaction && normalizedNextReaction) {
        reactionNumber += 1;
      } else if (currentReaction && !normalizedNextReaction) {
        reactionNumber = Math.max(0, reactionNumber - 1);
      } else if (currentReaction === normalizedNextReaction) {
        reactionNumber = Math.max(0, reactionNumber - 1);
        resolvedReaction = null;
      }

      return {
        ...comment,
        viewer: {
          ...comment.viewer,
          reaction: resolvedReaction,
        },
        stats: {
          ...comment.stats,
          reactionNumber,
        },
      };
    }

    if (!Array.isArray(comment.children) || comment.children.length === 0) {
      return comment;
    }

    return {
      ...comment,
      children: updateCommentReactionInTree(comment.children, commentId, nextReaction),
    };
  });

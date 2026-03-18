import { REACTION_META } from "../../../../../constant/emoji";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { convertTime } from "../../../../../utils/formatDate";

let localCommentSeed = 0;

const COMMENT_AUDIO_TYPES = ["audio", "sound"];
const COMMENT_VIDEO_TYPES = ["video"];

const resolveCommentAuthor = (author, viewerUsername = null) => {
  if (!author) {
    return {
      username: null,
      displayName: null,
      avatarUrl: "",
      isViewer: false,
    };
  }

  const username = author?.username || author?.userName || author?.handle || null;
  const displayName = author?.displayName || author?.fullName || username || null;

  return {
    username,
    displayName,
    avatarUrl: author?.avatarUrl || author?.avatar || author?.photoURL || "",
    isViewer: Boolean(viewerUsername && username && viewerUsername === username),
  };
};

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

export const normalizeCommentReaction = (reaction) => {
  if (!reaction) return null;

  const key = String(reaction).toUpperCase();
  return REACTION_META[key] ? key : null;
};

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

const normalizeRemoteMediaList = (mediaList = []) =>
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

const resolveRawChildren = (comment) => {
  if (Array.isArray(comment?.children)) return comment.children;
  if (Array.isArray(comment?.childComments)) return comment.childComments;
  if (Array.isArray(comment?.replies)) return comment.replies;
  if (Array.isArray(comment?.replyComments)) return comment.replyComments;
  if (Array.isArray(comment?.commentList)) return comment.commentList;
  return [];
};

const resolveReplyTo = (comment) =>
  comment?.replyTo || comment?.replyTarget || comment?.parentCommenter || comment?.targetCommenter || null;

const resolveCommentParentId = (comment, fallbackParentId = null) =>
  comment?.parentId ?? comment?.parentCommentId ?? fallbackParentId ?? null;

const hasResolvedAuthor = (author) =>
  Boolean(author?.username || author?.displayName);

const resolveReplyAuthor = (replyTo, fallbackAuthor = null, viewerUsername = null) => {
  if (replyTo) {
    const resolvedAuthor = resolveCommentAuthor(replyTo, viewerUsername);
    if (hasResolvedAuthor(resolvedAuthor)) {
      return resolvedAuthor;
    }
  }

  if (fallbackAuthor) {
    const resolvedFallbackAuthor = resolveCommentAuthor(fallbackAuthor, viewerUsername);
    if (hasResolvedAuthor(resolvedFallbackAuthor)) {
      return resolvedFallbackAuthor;
    }
  }

  return null;
};

const resolveCommentText = (comment) =>
  comment?.text || comment?.content || comment?.comment || comment?.message || "";

const resolveCommentMedia = (comment) => {
  if (Array.isArray(comment?.mediaFiles)) return normalizeRemoteMediaList(comment.mediaFiles);
  if (Array.isArray(comment?.media)) return normalizeRemoteMediaList(comment.media);
  return [];
};

const resolveCommentId = (comment) =>
  comment?.contentId || comment?.commentId || comment?.id || comment?.key || null;

const resolveCommentCreatedAt = (comment) =>
  comment?.createdAt || comment?.contentCreatedAt || comment?.time?.createdAt || new Date().toISOString();

const resolveCommentUpdatedAt = (comment) =>
  comment?.updatedAt || comment?.contentUpdatedAt || comment?.time?.updatedAt || null;

const resolveCommentReactionCount = (comment) =>
  comment?.stats?.reactionNumber ?? comment?.reactionNumber ?? comment?.likeCount ?? 0;

const resolveCommentReplyCount = (comment, children) =>
  comment?.stats?.replyNumber ??
  comment?.replyNumber ??
  comment?.replyCount ??
  comment?.childCommentNumber ??
  children.length;

export const normalizeCommentItem = (comment, options = {}) => {
  const { level = 0, parentId = null, parentAuthor = null, viewerUsername = null } = options;
  const id = resolveCommentId(comment);

  if (!id) return null;

  const createdAt = resolveCommentCreatedAt(comment);
  const updatedAt = resolveCommentUpdatedAt(comment);
  const resolvedParentId = resolveCommentParentId(comment, parentId);
  const author = resolveCommentAuthor(
    comment?.author || comment?.commenter || comment?.actor || comment?.user,
    viewerUsername
  );
  const children = resolveRawChildren(comment)
    .map((child) =>
      normalizeCommentItem(child, {
        level: level + 1,
        parentAuthor: author,
        parentId: id,
        viewerUsername,
      })
    )
    .filter(Boolean);

  return {
    id,
    parentId: resolvedParentId,
    level,
    author,
    text: resolveCommentText(comment),
    media: resolveCommentMedia(comment),
    time: {
      createdAt,
      updatedAt,
    },
    meta: {
      createdLabel: convertTime(createdAt),
      isEdited: Boolean(updatedAt && updatedAt !== createdAt),
      isOwner:
        Boolean(comment?.isOwner) ||
        Boolean(comment?.isCommenter) ||
        Boolean(viewerUsername && viewerUsername === (comment?.author?.username || comment?.commenter?.username)),
    },
    replyTo: resolvedParentId != null
      ? resolveReplyAuthor(resolveReplyTo(comment), parentAuthor, viewerUsername)
      : null,
    viewer: {
      reaction: normalizeCommentReaction(comment?.viewer?.reaction || comment?.reaction || comment?.myReaction),
    },
    stats: {
      reactionNumber: resolveCommentReactionCount(comment),
      replyNumber: resolveCommentReplyCount(comment, children),
    },
    hasChildComment: Boolean(
      comment?.hasChildComment ??
      comment?.hasChildComments ??
      comment?.hasReplies ??
      children.length > 0
    ),
    children,
  };
};

const refreshCommentTreeNode = (
  comment,
  {
    level = 0,
    parentId = null,
    parentAuthor = null,
  } = {}
) => {
  const children = (Array.isArray(comment?.children) ? comment.children : [])
    .map((child) =>
      refreshCommentTreeNode(child, {
        level: level + 1,
        parentAuthor: comment?.author || null,
        parentId: comment?.id ?? null,
      })
    );

  return {
    ...comment,
    parentId,
    level,
    replyTo: parentId != null
      ? resolveReplyAuthor(comment?.replyTo, parentAuthor, null)
      : null,
    hasChildComment: Boolean(comment?.hasChildComment || children.length > 0),
    children,
    stats: {
      ...comment?.stats,
      replyNumber: Math.max(comment?.stats?.replyNumber ?? 0, children.length),
    },
  };
};

export const normalizeFlatCommentTree = (
  items = [],
  {
    rootLevel = 0,
    rootParentAuthor = null,
    rootParentId = null,
    viewerUsername = null,
  } = {}
) => {
  const rootParentKey = rootParentId == null ? null : String(rootParentId);
  const normalized = (Array.isArray(items) ? items : [])
    .map((comment) =>
      normalizeCommentItem(comment, {
        level: rootLevel,
        parentAuthor: null,
        parentId: rootParentId,
        viewerUsername,
      })
    )
    .filter(Boolean)
    .map((comment) => ({
      ...comment,
      children: [],
    }));

  const byId = new Map(normalized.map((comment) => [String(comment.id), comment]));
  const roots = [];

  normalized.forEach((comment) => {
    const currentParentId = comment?.parentId == null ? null : String(comment.parentId);

    if (!currentParentId || currentParentId === rootParentKey) {
      roots.push(comment);
      return;
    }

    const parent = byId.get(currentParentId);
    if (!parent) {
      roots.push(comment);
      return;
    }

    parent.children = [...(parent.children || []), comment];
    parent.hasChildComment = true;
  });

  return roots.map((comment) =>
    refreshCommentTreeNode(comment, {
      level: rootLevel,
      parentAuthor: rootParentAuthor,
      parentId: rootParentId,
    })
  );
};

export const normalizeCommentResponse = (data, options = {}) => {
  const payload = Array.isArray(data) || !data?.data ? data : data.data;

  const rawItems = Array.isArray(payload)
    ? payload
    : payload?.commentList || payload?.comments || payload?.items || payload?.results || [];

  const items = (Array.isArray(rawItems) ? rawItems : [])
    .map((comment) =>
      normalizeCommentItem(comment, {
        level: 0,
        viewerUsername: options.viewerUsername || null,
      })
    )
    .filter(Boolean);

  const cursor =
    payload?.cursor ??
    payload?.nextCursor ??
    payload?.pagination?.cursor ??
    payload?.next?.cursor ??
    null;

  return {
    items,
    cursor,
    hasMore: Boolean(payload?.hasMore ?? payload?.nextPage ?? cursor),
  };
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

const refreshReplyCount = (comment) => ({
  ...comment,
  hasChildComment: Array.isArray(comment.children) ? comment.children.length > 0 : Boolean(comment?.hasChildComment),
  stats: {
    ...comment.stats,
    replyNumber: Array.isArray(comment.children) ? comment.children.length : 0,
  },
});

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

export const deleteCommentInTree = (comments = [], commentId) => {
  let removedCount = 0;

  const nextComments = comments.reduce((list, comment) => {
    if (comment.id === commentId) {
      removedCount += 1 + countTotalComments(comment.children || []);
      return list;
    }

    if (!Array.isArray(comment.children) || comment.children.length === 0) {
      list.push(comment);
      return list;
    }

    const childResult = deleteCommentInTree(comment.children, commentId);
    removedCount += childResult.removedCount;
    list.push(
      refreshReplyCount({
        ...comment,
        children: childResult.comments,
      })
    );
    return list;
  }, []);

  return {
    comments: nextComments,
    removedCount,
  };
};

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

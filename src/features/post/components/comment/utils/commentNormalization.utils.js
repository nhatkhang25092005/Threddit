import { REACTION_META } from "../../../../../constant/emoji";
import { convertTime } from "../../../../../utils/formatDate";
import {
  resolveCommentAuthor,
  resolveReplyAuthor,
} from "./commentAuthor.utils";
import { normalizeRemoteCommentMediaList } from "./commentMedia.utils";

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

const resolveCommentText = (comment) =>
  comment?.text || comment?.content || comment?.comment || comment?.message || "";

const resolveCommentMedia = (comment) => {
  if (Array.isArray(comment?.mediaFiles)) {
    return normalizeRemoteCommentMediaList(comment.mediaFiles);
  }

  if (Array.isArray(comment?.media)) {
    return normalizeRemoteCommentMediaList(comment.media);
  }

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

export const normalizeCommentReaction = (reaction) => {
  if (!reaction) return null;

  const key = String(reaction).toUpperCase();
  return REACTION_META[key] ? key : null;
};

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

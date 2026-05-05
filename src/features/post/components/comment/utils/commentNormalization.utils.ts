import { Reaction } from "@/features/post/types/reaction.type";
import { REACTION_META } from "../../../../../constant/emoji";
import { convertTime } from "../../../../../utils/formatDate";
import { CommentItem, NormalizeCommentItem } from "../types/models.types";
import { resolveId } from "@/features/post/utils/resolveTypes";
import {
  resolveCommentAuthor,
  resolveReplyAuthor,
} from "./commentAuthor.utils";
import { normalizeRemoteCommentMediaList } from "./commentMedia.utils";
import type { CommentNode } from "./commentTree.utils";

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
  resolveId(comment?.parentId ?? comment?.parentCommentId ?? fallbackParentId);

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

const resolveCommentId = (comment): number | null =>
  resolveId(comment?.contentId ?? comment?.commentId ?? comment?.id ?? comment?.key);

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
        parentId: resolveId(comment?.id),
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

/**
 * Normalize the comment reaction to uppercase
 * @param reaction - reaction of the comment
 * @returns ReactionMeta or null
 */
export const normalizeCommentReaction = (reaction: Reaction | string | null | undefined): Reaction | null=> {
  if (!reaction) return null;

  const key = String(reaction).toUpperCase() as Reaction
  return REACTION_META[key] ? key : null;
};

const isCommentNode = (comment: CommentNode | null): comment is CommentNode => Boolean(comment);

export const normalizeCommentItem = (comment, options: NormalizeCommentItem = {}): CommentNode | null => {
  const { level = 0, parentId = null, parentAuthor = null, viewerUsername = null } = options;
  const id = resolveCommentId(comment);

  if (id == null) return null;

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
    .filter(isCommentNode);

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

/**
  1. Normalize all the comment
  2. Build the Tree from the flat list
  3. Re-run all the tree to fix comment level, reply, stats
 */

export const normalizeFlatCommentTree = (
  items = [],
  {
    rootLevel = 0 ,
    rootParentAuthor = null,
    rootParentId = null,
    viewerUsername = null,
  }: CommentItem = {}
) => {
  const rootParentKey = resolveId(rootParentId)

  // Normalization the items array
  const normalized = (Array.isArray(items) ? items : [])
    .map((comment) =>
      normalizeCommentItem(comment, {
        level: rootLevel,
        parentAuthor: null,
        parentId: rootParentId,
        viewerUsername,
      })
    )
    .filter(isCommentNode)
    .map((comment) => ({
      ...comment,
      children: [],
    }));

  const byId = new Map(normalized.map((comment) => [comment.id, comment]));
  const roots: CommentNode[] = [];

  normalized.forEach((comment) => {
    const currentParentId = resolveId(comment?.parentId);

    if (currentParentId == null || currentParentId === rootParentKey) {
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

export const normalizeCommentResponse = (
  data,
  options: { viewerUsername?: string | null } = {}
) => {
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
    .filter(isCommentNode);

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

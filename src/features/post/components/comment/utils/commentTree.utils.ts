import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import type { Media } from "@/features/post/types/media.type";
import { resolveCommentAuthor } from "./commentAuthor.utils";
import { normalizeComposerMediaList } from "./commentMedia.utils";
import { normalizeCommentReaction } from "./commentNormalization.utils";
import type { Author } from "@/features/post/types/author.interface";
import { Reaction } from "@/features/post/types/reaction.type";
import { resolveId } from "@/features/post/utils/resolveTypes";
export type CommentNode = {
  id:number
  parentId: number | null
  level:number
  text: string
  media: Media[]
  author: Author
  replyTo: Author | null
  viewer:{
    reaction:Reaction | null
  },
  stats:{
    reactionNumber: number
    replyNumber: number
  }
  meta:{
    isEdited: boolean,
    isOwner: boolean
    createdLabel?: string
  }
  time:{
    createdAt: string
    updatedAt: string
  }
  hasChildComment: boolean
  children: CommentNode[]
}

export interface ValidCommentChangeProp{
  time?:{
    updatedAt:string
  }
  meta?:{
    isEdited: boolean,
    isOwner: boolean
    createdLabel?: string
  }
  text?:string
  media?:Media[]
  updatedAt?:string
}

let localCommentSeed = 0;

const isSameId = (left: unknown, right: unknown): boolean => {
  const leftId = resolveId(left);
  const rightId = resolveId(right);

  return leftId != null && rightId != null && leftId === rightId;
};

/**
 * Update the reply number of a comment node
 * @param comment - Comment need to update reply number
 * @returns - Updated comment nod
 */
const refreshReplyCount = (comment: CommentNode): CommentNode => ({
  ...comment,
  hasChildComment: Array.isArray(comment.children) ? comment.children.length > 0 : Boolean(comment?.hasChildComment),
  stats: {
    ...comment.stats,
    replyNumber: Array.isArray(comment.children) ? comment.children.length : 0,
  },
});

/**
 *
 * @param comment - handled comment node
 * @param fallbackCount - fallback a count number if the current reply count is not finite
 * @returns reply comment number
 */
const resolveReplyCountValue = (comment: CommentNode, fallbackCount:number = 0): number => {
  const currentReplyCount = Number(comment?.stats?.replyNumber);
  if (Number.isFinite(currentReplyCount)) {
    return currentReplyCount;
  }

  return fallbackCount;
};

/**
 * Merges the current and incoming comments together
 *
 * Existing comments are updated with incoming comment data
 * New comments are appended to the end of the merged array
 * Nested child comments are merged recursively
 * @param current - The current comments
 * @param incoming- The incoming comments
 * @returns - A merged array containing both current and incoming comments
 */
export const mergeCommentPage = (
  current: CommentNode[] = [],
  incoming: CommentNode[] = []
): CommentNode[] => {
  const merged:CommentNode[] = [...current];
  const indexMap:Map<number, number> = new Map(current.map((item, index) => [item.id, index]));
  /**
   * indexMap:{36 => 0, 37 => 1, 38 => 2}
   */

  incoming.forEach((item: CommentNode) => {
    const currentIndex = indexMap.get(item.id);

    if (currentIndex === undefined) {
      indexMap.set(item.id, merged.length) // store the index of the new comment
      merged.push(item) // Append the new comment to the end of the merged array
      return;
    }

    // Use the index to find the existing comment in the merged array
    const currentItem = merged[currentIndex] // get a copy of current comment
    // Merged the existing comment with the incoming comment
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

/**
 * Searches a comment tree for a comment with the specified ID
 * Traverses the provided comments recursively, including all nested child
 * comments, and returns the first comment whose 'id' matches 'commentId'
 * @param comments - The root-level comments to search. Default to an empty array
 * @param commentId - The ID of the comment to find
 * @returns The matching comment node, of 'null' if no matching comment is find
 */
export const findCommentByIdInTree = (
  comments: readonly CommentNode[] = [],
  targetCommentId: number
): CommentNode | null => {
  const targetId = resolveId(targetCommentId);

  if (targetId == null) return null;

  // If there are no comments to find => return null
  if(comments.length == 0) return null

  /**
   * For each comment in the array:
   * - Check the current comment'id first, if it matches the target id, return it
   * - If the comment has no children, skip it and continue with the next comment
   * - Otherwise, recursively search the comment's children
   * - If a matching child is found, return null
  */
  for (const comment of comments) {
    if (isSameId(comment?.id, targetId)) {
      return comment;
    }

    if(comment.children.length == 0) continue

    const matchedChild = findCommentByIdInTree(comment?.children , targetCommentId);
    if (matchedChild) return matchedChild
  }

  return null;
};

/**
 * Recursively count the total number of comments, including all the nested children
 * @param comments- the comment node need to count total comment number
 * @returns The total comment in the comments list
*/
export const countTotalComments = (comments:CommentNode[] = []) : number =>
  (Array.isArray(comments) ? comments : []).reduce(
    (total, comment) => total + 1 + countTotalComments(comment.children || []),
    0
  );

export const formatCommentCount = (count = 0): string =>
  new Intl.NumberFormat("vi-VN").format(Number(count) || 0);

export const resolveReplyParentId = (comment: CommentNode): number | null=> {
  if (!comment) return null;
  return comment.id ?? null;
};

/**
 * Build a local comment
 * @param param - provided meta data of comment
 * @returns new comment
 */
export const buildLocalComment = ({
  level = 0,
  media = [],
  parentId = null,
  replyTo = null,
  text = "",
  viewer = null,
}): CommentNode => {
  const now = new Date().toISOString();
  localCommentSeed += 1;

  return {
    id: Date.now() + localCommentSeed,
    parentId,
    hasChildComment:false,
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
    replyTo: parentId != null && replyTo ? resolveCommentAuthor(replyTo, viewer?.username || null) : null,
    viewer: {
      reaction: null,
    },
    stats: {
      reactionNumber: 0,
      replyNumber: 0,
    },
    children: [],
  };
}
/**
 * Recursively searches the comments list and appends a new comment.
 * @param comments - The comments array scan and append the child comment to
 * @param newComment - The comment to append to the comments tree
 * @param parentId - The ID of the parent comment, or null if this is a root comment
 * @returns - The updated comments list
 */
export const addCommentToTree = (
  comments:CommentNode[] = [],
  newComment:CommentNode,
  parentId: number | null
): CommentNode[] => {

  // If there's no parentId, that means this is a root comment
  if (parentId == null) return [newComment, ...comments];
  
  const targetId = resolveId(parentId);
  if (targetId == null) return comments;

  /**
   * Recursively travers the comments tree, finds the matching parent node,
   * and appends the new comment to that node's children array
   * Rules:
   * - If current node is null -> return as-is
   * - If node.id matches parentId -> append new comment to children
   * - If node has no children -> return as-is
   * - Otherwise -> recuse into children
   * @param node - checking node in the comments/ children comments
   * @returns - the unchanged CommentNode or the refreshed CommentNode
   */
  const addToParentNode = (node: CommentNode): CommentNode => {
    if (!node) return node;

    // Found the parentID of the comment node, append it into it's children array
    if (isSameId(node.id, targetId)) {
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

    // if not, checking node's children length, if length == 0 return the node
    if (!Array.isArray(node.children) || node.children.length === 0)
      return node

    return {
      ...node,
      children: node.children.map(addToParentNode),
    };
  };

  // If parent id is exist, travers the comments to recursively find the id, then
  // add it into it's children
  return comments.map(addToParentNode);
};
/**
 *
 * @param comment - The comment branch need to count the total of comment number
 * @returns - The total comment of the comment branch
 */
export const countCommentBranch = (comment: CommentNode): number => (
  comment ? countTotalComments([comment]) : 0
)

/**
 * Compute the next reply count after children update
 * Rules:
 * - If direct children were removed -> decrease reply count accordingly
 * - Otherwise -> keep current reply count
 * - Always ensure: replyCount >= children.length
 *
 * @param oldComment - Current comment node
 * @param newCommentChildrenLength - Updated children length after removal
 * @returns Updated reply count
 */
const computeNextReplyCount = (oldComment: CommentNode, newCommentChildrenLength: number): number => {
  const oldCommentChildrenLength: number = oldComment.children.length

  // Step 1: number of directly removed children
  const directRemoveNumber: number = oldCommentChildrenLength - newCommentChildrenLength
  const isDirectlyRemoveInChildren: boolean = directRemoveNumber > 0

  // Step 2: current reply count (fallback to children length)
  const currentReplyCount: number = resolveReplyCountValue(oldComment, newCommentChildrenLength)

  // Step 3: compute expected reply count
  const expectReplyNumber: number = isDirectlyRemoveInChildren
    ? currentReplyCount - directRemoveNumber
    : currentReplyCount

  // Step 4: ensure consistency with actual children
  return Math.max(expectReplyNumber, newCommentChildrenLength)
}


type RemovedCommentNode = {
  comments:CommentNode[]
  removedCount:number
}
/**
 * Remove a comment from the comments list
 * @param comments - Comments list need to scan
 * @param commentId - comment ID needs to be removed
 * @returns
 */
export const removeCommentFromTree = (
  comments: CommentNode[] = [],
  commentId: number
): RemovedCommentNode => {
  const targetId = resolveId(commentId);
  let removedCount:number = 0
  const nextComments:CommentNode[] = []

  if (targetId == null) {
    return {
      comments,
      removedCount,
    };
  }

  for (const comment of Array.isArray(comments) ? comments : []) {

    // if the parent node need to be removed, count the total of it's children comment
    // and plus to removeCount variable
    if (isSameId(comment?.id, targetId)) {
      removedCount += countCommentBranch(comment);
      continue;
    }

    // If the comment do not have children and doesn't the need-removing comment
    // push it into the nextComments array
    if (!Array.isArray(comment?.children) || comment.children.length === 0) {
      nextComments.push(comment);
      continue;
    }

    /**
     * - If the comment has children, recurse this children array to continually find
     * - If the comment's children has no need-removed comment, push it into nextComment array
     */
    const nextChildrenResult: RemovedCommentNode = removeCommentFromTree(comment.children, targetId);
    if (nextChildrenResult.removedCount === 0) {
      nextComments.push(comment);
      continue;
    }

    const nextReplyCount: number = computeNextReplyCount(comment, nextChildrenResult.comments.length)
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

/**
 * Recursively edits a specific comment in the comment tree
 * @param comments - comment tree
 * @param commentId - Target comment ID
 * @param changes - Partial changes to apply
 * @returns updated comment tree
 */
export const editCommentInTree = (
  comments: CommentNode[] = [],
  commentId: number,
  changes:ValidCommentChangeProp | null
) => {
  // No changes -> skip
  if(!changes) return comments

  const targetId = resolveId(commentId);
  if (targetId == null) return comments;

  return comments.map((comment) => {
    // Found target comment
    if (isSameId(comment?.id, targetId)) {
      const hasTextChange: boolean = Object.prototype.hasOwnProperty.call(changes || {}, "text");
      const nextTime = changes?.time && typeof changes.time === "object" ? changes.time : {};
      const nextMeta = changes?.meta && typeof changes.meta === "object" ? changes.meta : {};
      const nextUpdatedAt: string = changes?.time?.updatedAt || changes?.updatedAt || new Date().toISOString();

      return {
        ...comment,
        text: hasTextChange ? String(changes.text ?? "").trim() : comment.text,
        media: Array.isArray(changes.media) ? normalizeComposerMediaList(changes.media) : comment.media,
        time: {
          ...comment.time,
          ...nextTime,
          updatedAt: nextUpdatedAt,
        },
        meta: {
          ...comment.meta,
          ...nextMeta,
          isEdited: true,
        },
      };
    }

    // No chidren -> Skip
    if (!Array.isArray(comment.children) || comment.children.length === 0)
      return comment;

    // Recuse
    return {
      ...comment,
      children: editCommentInTree(comment.children, commentId, changes),
    };
  });
};

/**
 * Update new reaction for a comment in comment node tree
 * @param comments - CommentNode list
 * @param commentId - Comment ID need to be update reaction
 * @param nextReaction - update reaction
 * @returns - Updated comment node list with new reaction (or not) of the comment
 */
export const updateCommentReactionInTree = (
  comments: CommentNode[] = [],
  commentId: number,
  nextReaction: Reaction | null
): CommentNode[] =>
  comments.map((comment) => {
    if (isSameId(comment.id, commentId)) {
      const currentReaction: Reaction | null = normalizeCommentReaction(comment.viewer?.reaction);
      const normalizedNextReaction: Reaction | null = normalizeCommentReaction(nextReaction);

      let reactionNumber = comment.stats?.reactionNumber ?? 0;
      let resolvedReaction = normalizedNextReaction;

      // if haven't had reaction before
      if (!currentReaction && normalizedNextReaction) {
        reactionNumber += 1;
      }
      // if choose another reaction
      else if (currentReaction && !normalizedNextReaction) {
        reactionNumber = Math.max(0, reactionNumber - 1);
      }
      // if re-choose the similar reaction
      else if (currentReaction === normalizedNextReaction) {
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
  }
);

import { itemModel } from "../models/item.model";
import { COMMENT } from "../type";
import type { Comment, UpdateCommentPatch } from "../../types/comment.type";
import { resolveId } from "../../utils/resolveTypes";
type CommentId = number
type CommentRecord = Record<CommentId, Comment>
type CommentIndexRecord = Record<CommentId, CommentId[]>
interface CommentState {
  commentById:CommentRecord
  commentList: CommentIndexRecord
  subCommentList:CommentIndexRecord
  loading:{
    item: Record<CommentId, ReturnType<typeof itemModel>>
    [key: string]: unknown
  }
  [key: string]: unknown
}

type PayloadOfCommentActionMap = {
  [COMMENT.ADD_COMMENTS_BY_ID]:Comment[]
  [COMMENT.ADD_COMMENT_BY_ID]:Comment
  [COMMENT.UPDATE_COMMENT_BY_ID]:{
    commentId: CommentId
    updates: UpdateCommentPatch
  }
  [COMMENT.REMOVE_COMMENT_BY_ID]:CommentId
  [COMMENT.SET_POST_COMMENT_INDEX]:{
    postId: CommentId
    commentIds: CommentId[]
  }
  [COMMENT.ADD_POST_COMMENT_INDEX]:{
    postId: CommentId
    commentIds: CommentId[]
  }
  [COMMENT.SET_SUB_COMMENT_INDEX]:{
    parentCommentId: CommentId
    commentIds: CommentId[]
  }
  [COMMENT.ADD_SUB_COMMENT_INDEX]:{
    parentCommentId: CommentId
    commentIds: CommentId[]
  }
}

type CommentAction = {
  [K in keyof PayloadOfCommentActionMap]:{
    type:K,
    payload?: PayloadOfCommentActionMap[K]
  }
}[keyof PayloadOfCommentActionMap]

const unique = <T>(list: T[] = []): T[] => [...new Set(Array.isArray(list) ? list : [])];

const mergeCommentLists = (current: CommentId[] = [], incoming: CommentId[] = []): CommentId[] => (
  unique([...(Array.isArray(current) ? current : []), ...(Array.isArray(incoming) ? incoming : [])])
);

const filterRemovedIds = (list: CommentId[] = [], removedIdKeys = new Set<CommentId>()): CommentId[] => (
  (Array.isArray(list) ? list : []).filter((itemId) => !removedIdKeys.has(resolveId(itemId)))
);

const filterRecordLists = (
  record: CommentIndexRecord = {},
  removedIdKeys = new Set<CommentId>()
): CommentIndexRecord => (
  Object.fromEntries(
    Object.entries(record || {}).map(([key, list]) => [key, filterRemovedIds(list, removedIdKeys)])
  ) as CommentIndexRecord
);

const removeSubCommentEntries = (
  record: CommentIndexRecord = {},
  removedIdKeys = new Set<CommentId>()
): CommentIndexRecord => (
  Object.fromEntries(
    Object.entries(record || {})
      .filter(([key]) => !removedIdKeys.has(resolveId(key)))
      .map(([key, list]) => [key, filterRemovedIds(list, removedIdKeys)])
  ) as CommentIndexRecord
);

/**
 * Recursively collects all comment by IDs in a branch starting from a given comment
 * This function traverses the comment tree using DFS (depth-first search),
 * including the root comment and all of it's descendant comments.
 *
 * @param state - The global comment state containing sub-comment relationships
 * @param commentId - The starting comment ID
 * @param collectedIds - A Set used to accumulate unique comment IDs (prevent duplicates)
 * @returns - A Set of all collected comment IDs in the branch
 */
const collectCommentBranchIds = (
  state: CommentState,
  commentId: CommentId,
  collectedIds = new Set<CommentId>()
): Set<CommentId> => {
  // Stop if the input ID is null or undefined
  if (commentId == null) return collectedIds;

  // Avoid processing the same comment multiple times (prevent infinite loops)
  if (collectedIds.has(commentId)) return collectedIds;

  // Add current comment IDs to the result set
  collectedIds.add(commentId);

  // Get all child comment IDs of the current comment
  const childCommentIds = state.subCommentList?.[commentId] || []

  // Recursively collects IDs from all child comment
  childCommentIds.forEach((childCommentId) => {
    collectCommentBranchIds(state, childCommentId, collectedIds);
  });

  return collectedIds
};

export const commentHandlers = (
  state: CommentState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case COMMENT.ADD_COMMENTS_BY_ID: {
      const comments:Comment[] = action.payload || [];

      const byId = Object.fromEntries(
        comments
          .filter((comment) => comment?.id != null)
          .map((comment) => [comment.id, comment])
      );

      const loadingItem = Object.fromEntries(
        comments
          .filter((comment) => comment?.id != null)
          .map((comment) => [comment.id, itemModel()])
      );

      return {
        ...state,
        commentById: {
          ...state.commentById,
          ...byId,
        },
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            ...loadingItem,
          },
        },
      };
    }

    case COMMENT.ADD_COMMENT_BY_ID: {
      const comment: Comment = action.payload || null;
      if (!comment || comment.id == null) return state;

      return {
        ...state,
        commentById: {
          ...state.commentById,
          [comment.id]: comment,
        },
      };
    }

    case COMMENT.UPDATE_COMMENT_BY_ID: {
      const { commentId, updates } = action.payload || {};
      if (commentId == null) return state;

      const currentComment = state.commentById?.[commentId];
      if (!currentComment) return state;

      return {
        ...state,
        commentById: {
          ...state.commentById,
          [commentId]: {
            ...currentComment,
            ...(updates || {}),
            ...(updates?.commenter ? {
              commenter: {
                ...(currentComment.commenter || {}),
                ...updates.commenter,
              },
            } : {}),
          },
        },
      };
    }

    case COMMENT.REMOVE_COMMENT_BY_ID: {
      const id = action.payload
      if (id == null) return state;

      const removedIdKeys = collectCommentBranchIds(state, id);
      if (removedIdKeys.size === 0) {
        removedIdKeys.add(id);
      }

      const nextCommentById = { ...(state.commentById || {}) };
      const nextLoadingItem = { ...(state.loading?.item || {}) };

      removedIdKeys.forEach((key) => {
        delete nextCommentById[key];
        delete nextLoadingItem[key];
      });

      return {
        ...state,
        commentById: nextCommentById,
        commentList: filterRecordLists(state.commentList, removedIdKeys),
        subCommentList: removeSubCommentEntries(state.subCommentList, removedIdKeys),
        loading: {
          ...state.loading,
          item: nextLoadingItem,
        },
      };
    }

    case COMMENT.SET_POST_COMMENT_INDEX: {
      const { postId, commentIds } = action.payload || {};
      if (postId == null) return state;

      return {
        ...state,
        commentList: {
          ...state.commentList,
          [postId]: unique(commentIds),
        },
      };
    }

    case COMMENT.ADD_POST_COMMENT_INDEX: {
      const { postId, commentIds } = action.payload || {};
      if (postId == null) return state;

      return {
        ...state,
        commentList: {
          ...state.commentList,
          [postId]: mergeCommentLists(state.commentList?.[postId], commentIds),
        },
      };
    }

    case COMMENT.SET_SUB_COMMENT_INDEX: {
      const { parentCommentId, commentIds } = action.payload || {};
      if (parentCommentId == null) return state;

      return {
        ...state,
        subCommentList: {
          ...state.subCommentList,
          [parentCommentId]: unique(commentIds),
        },
      };
    }

    case COMMENT.ADD_SUB_COMMENT_INDEX: {
      const { parentCommentId, commentIds } = action.payload || {};
      if (parentCommentId == null) return state;

      return {
        ...state,
        subCommentList: {
          ...state.subCommentList,
          [parentCommentId]: mergeCommentLists(state.subCommentList?.[parentCommentId], commentIds),
        },
      };
    }

    default:
      return state;
  }
};

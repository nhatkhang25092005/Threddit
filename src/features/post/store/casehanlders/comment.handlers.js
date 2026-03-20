import { itemModel } from "../models/item.model";
import { COMMENT } from "../type";

const unique = (list = []) => [...new Set(Array.isArray(list) ? list : [])];
const normalizeId = (id) => String(id);

const mergeCommentLists = (current = [], incoming = []) => (
  unique([...(Array.isArray(current) ? current : []), ...(Array.isArray(incoming) ? incoming : [])])
);

const filterRemovedIds = (list = [], removedIdKeys = new Set()) => (
  (Array.isArray(list) ? list : []).filter((itemId) => !removedIdKeys.has(normalizeId(itemId)))
);

const filterRecordLists = (record = {}, removedIdKeys = new Set()) => (
  Object.fromEntries(
    Object.entries(record || {}).map(([key, list]) => [key, filterRemovedIds(list, removedIdKeys)])
  )
);

const removeSubCommentEntries = (record = {}, removedIdKeys = new Set()) => (
  Object.fromEntries(
    Object.entries(record || {})
      .filter(([key]) => !removedIdKeys.has(normalizeId(key)))
      .map(([key, list]) => [key, filterRemovedIds(list, removedIdKeys)])
  )
);

const collectCommentBranchIds = (state, commentId, collectedIds = new Set()) => {
  if (commentId == null) return collectedIds;

  const key = normalizeId(commentId);
  if (collectedIds.has(key)) return collectedIds;

  collectedIds.add(key);

  const childCommentIds = state.subCommentList?.[key] || [];
  childCommentIds.forEach((childCommentId) => {
    collectCommentBranchIds(state, childCommentId, collectedIds);
  });

  return collectedIds;
};

export const commentHandlers = (state, action) => {
  switch (action.type) {
    case COMMENT.ADD_COMMENTS_BY_ID: {
      const comments = action.payload || [];

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
      const comment = action.payload || null;
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
      const { id, changes } = action.payload || {};
      if (id == null) return state;

      const currentComment = state.commentById?.[id];
      if (!currentComment) return state;

      return {
        ...state,
        commentById: {
          ...state.commentById,
          [id]: {
            ...currentComment,
            ...(changes || {}),
            ...(changes?.commenter ? {
              commenter: {
                ...(currentComment.commenter || {}),
                ...changes.commenter,
              },
            } : {}),
          },
        },
      };
    }

    case COMMENT.REMOVE_COMMENT_BY_ID: {
      const { id } = action.payload || {};
      if (id == null) return state;

      const removedIdKeys = collectCommentBranchIds(state, id);
      if (removedIdKeys.size === 0) {
        removedIdKeys.add(normalizeId(id));
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

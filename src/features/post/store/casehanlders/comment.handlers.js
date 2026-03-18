import { itemModel } from "../models/item.model";
import { COMMENT } from "../type";

const unique = (list = []) => [...new Set(Array.isArray(list) ? list : [])];

const mergeCommentLists = (current = [], incoming = []) => (
  unique([...(Array.isArray(current) ? current : []), ...(Array.isArray(incoming) ? incoming : [])])
);

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

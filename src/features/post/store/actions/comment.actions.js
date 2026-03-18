import { createAction } from "../models/action.model";
import { CLASS_TYPE, COMMENT } from "../type";

export const commentActions = {
  addComments: (metaData) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_COMMENTS_BY_ID,
      metaData
    )
  ),

  addComment: (commentData) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_COMMENT_BY_ID,
      commentData
    )
  ),

  updateComment: (id, changes = {}) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.UPDATE_COMMENT_BY_ID,
      { id, changes }
    )
  ),

  setPostCommentIndex: (postId, commentIds = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.SET_POST_COMMENT_INDEX,
      { postId, commentIds }
    )
  ),

  addPostCommentIndex: (postId, commentIds = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_POST_COMMENT_INDEX,
      { postId, commentIds }
    )
  ),

  setSubCommentIndex: (parentCommentId, commentIds = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.SET_SUB_COMMENT_INDEX,
      { parentCommentId, commentIds }
    )
  ),

  addSubCommentIndex: (parentCommentId, commentIds = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_SUB_COMMENT_INDEX,
      { parentCommentId, commentIds }
    )
  ),
}

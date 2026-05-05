import { createAction } from "../models/action.model";
import { CLASS_TYPE, COMMENT } from "../type";
import type { Comment, UpdateCommentPatch } from "../../types/comment.type";

export const commentActions = {
  addComments: (comments: Comment[]) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_COMMENTS_BY_ID,
      comments
    )
  ),

  addComment: (commentData: Comment) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_COMMENT_BY_ID,
      commentData
    )
  ),

  updateComment: (commentId: number, updates:UpdateCommentPatch) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.UPDATE_COMMENT_BY_ID,
      { commentId, updates }
    )
  ),

  removeComment: (id: number) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.REMOVE_COMMENT_BY_ID,
      id
    )
  ),

  setPostCommentIndex: (postId: number, commentIds:number[] = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.SET_POST_COMMENT_INDEX,
      { postId, commentIds }
    )
  ),

  addPostCommentIndex: (postId: number, commentIds:number[] = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_POST_COMMENT_INDEX,
      { postId, commentIds }
    )
  ),

  setSubCommentIndex: (parentCommentId: number, commentIds: number[] = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.SET_SUB_COMMENT_INDEX,
      { parentCommentId, commentIds }
    )
  ),

  addSubCommentIndex: (parentCommentId: number, commentIds:number[] = []) => (
    createAction(
      CLASS_TYPE.COMMENT,
      COMMENT.ADD_SUB_COMMENT_INDEX,
      { parentCommentId, commentIds }
    )
  ),
}

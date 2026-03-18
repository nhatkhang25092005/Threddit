import { createAction } from "../models/action.model";
import { CLASS_TYPE, POST_BY_ID } from "../type";

export const postByIdActions ={
  addPosts: (metaData) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.ADD_POSTS_BY_ID,
      metaData
    )
  ),

  addPost: (postData) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.ADD_POST_BY_ID,
      postData
    )
  ),

  updatePost: (id, changes = {}) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.UPDATE_POST_BY_ID,
      { id, changes }
    )
  ),

  increaseCommentNumber: (id, delta = 1) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.INCREASE_POST_COMMENT_NUMBER,
      { id, delta }
    )
  ),

  setSaved: (id, isSaved, saveNumber) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.SET_POST_SAVED,
      { id, isSaved, saveNumber }
    )
  ),

  setShared: (id, isShare, shareMessage) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.SET_POST_SHARED,
      { id, isShare, shareMessage }
    )
  ),

  setPinned: (id, isPinned, username) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.SET_POST_PINNED,
      { id, isPinned, username }
    )
  ),

  removePost: (id) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.REMOVE_POST_BY_ID,
      { id }
    )
  ),
}

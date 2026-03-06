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

  setSaved: (id, isSaved, saveNumber) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.SET_POST_SAVED,
      { id, isSaved, saveNumber }
    )
  ),

  setPinned: (id, isPinned) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.SET_POST_PINNED,
      { id, isPinned }
    )
  ),
}

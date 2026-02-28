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

  setSaved: (contentId, isSaved, saveNumber) => (
    createAction(
      CLASS_TYPE.POST_BY_ID,
      POST_BY_ID.SET_POST_SAVED,
      { contentId, isSaved, saveNumber }
    )
  ),
}

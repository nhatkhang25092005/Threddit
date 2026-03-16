import { createAction } from "../models/action.model"
import { CLASS_TYPE, USERS_POST } from "../type"

export const userPostActions = {
  addTimelineIndex: (username, timelineIndexList) => (
    createAction(
      CLASS_TYPE.USERS_POST,
      USERS_POST.ADD_TIMELINE_INDEX,
      { username, timelineIndexList }
    )
  ),

  prependTimelineIndex: (username, timelineIndex) => (
    createAction(
      CLASS_TYPE.USERS_POST,
      USERS_POST.PREPEND_TIMELINE_INDEX,
      { username, timelineIndex }
    )
  ),

  setTimelineIndex: (username, timelineIndexList = []) => (
    createAction(
      CLASS_TYPE.USERS_POST,
      USERS_POST.SET_TIMELINE_INDEX,
      { username, timelineIndexList }
    )
  ),

  removeUserPostIndex:(username, postId) => (
    createAction(
      CLASS_TYPE.USERS_POST,
      USERS_POST.REMOVE_USERS_POST,
      {username, postId}
    )
  )
}

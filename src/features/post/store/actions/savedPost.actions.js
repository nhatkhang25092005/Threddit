import { createAction } from "../models/action.model"
import { CLASS_TYPE, SAVED_POST } from "../type"

export const savedPostActions = {
  addTimelineIndex: (timelineIndexList) => (
    createAction(
      CLASS_TYPE.SAVED_POST,
      SAVED_POST.ADD_TIMELINE_INDEX,
      timelineIndexList
    )
  ),

  prependTimelineIndex: (timelineIndex) => (
    createAction(
      CLASS_TYPE.SAVED_POST,
      SAVED_POST.PREPEND_TIMELINE_INDEX,
      { timelineIndex }
    )
  ),

  removeTimelineIndex: (timelineIndex) => (
    createAction(
      CLASS_TYPE.SAVED_POST,
      SAVED_POST.REMOVE_TIMELINE_INDEX,
      { timelineIndex }
    )
  )
}

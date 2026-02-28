import { createAction } from "../models/action.model"
import { CLASS_TYPE, USERS_POST } from "../type"

export const userPostActions = {
  addTimelineIndex: (username, timelineIndexList) => (
    createAction(
      CLASS_TYPE.USERS_POST,
      USERS_POST.ADD_TIMELINE_INDEX,
      { username, timelineIndexList }
    )
  )
}

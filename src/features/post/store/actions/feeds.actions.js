import { createAction } from "../models/action.model";
import { CLASS_TYPE, FEEDS } from "../type";

export const feedsActions = {
  setTimelineIndex: (timelineIndexList = []) => (
    createAction(
      CLASS_TYPE.FEEDS,
      FEEDS.SET_TIMELINE_INDEX,
      { timelineIndexList }
    )
  ),
  addTimelineIndex: (timelineIndexList = []) => (
    createAction(
      CLASS_TYPE.FEEDS,
      FEEDS.ADD_TIMELINE_INDEX,
      { timelineIndexList }
    )
  ),
}

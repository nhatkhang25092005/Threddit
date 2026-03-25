import { createAction } from "../models/action.model";
import { CLASS_TYPE, REEL } from "../type";

export const reelActions = {
  setTimelineIndex: (timelineIndexList = []) => (
    createAction(
      CLASS_TYPE.REEL,
      REEL.SET_TIMELINE_INDEX,
      { timelineIndexList }
    )
  ),
  addTimelineIndex: (timelineIndexList = []) => (
    createAction(
      CLASS_TYPE.REEL,
      REEL.ADD_TIMELINE_INDEX,
      { timelineIndexList }
    )
  ),
}

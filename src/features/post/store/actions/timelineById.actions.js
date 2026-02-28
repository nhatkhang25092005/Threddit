import { createAction } from "../models/action.model";
import { CLASS_TYPE, TIMELINE_BY_ID } from "../type";

export const timelineByIdActions = {
  addTimeline: (metaData) => (
    createAction(
      CLASS_TYPE.TIMELINE_BY_ID,
      TIMELINE_BY_ID.ADD_TIMELINE_BY_ID,
      metaData
    )
  )
}

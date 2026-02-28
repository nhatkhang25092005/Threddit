import { TIMELINE_BY_ID } from "../type"

export const timelineByIdHandlers = (state, action) => {
  switch (action.type){
    case TIMELINE_BY_ID.ADD_TIMELINE_BY_ID: {
      const timelineItems = action.payload || []
      const byId = Object.fromEntries(
        timelineItems.map(item => [item.timelineItemId, item])
      )

      return {
        ...state,
        timelineById: {
          ...state.timelineById,
          ...byId
        }
      }
    }

    default:return state
  }
}

import { REEL } from "../type"

const resolveTimelineIndexes = (currentIndexes = [], timelineIndexList = [], mode = "set") => {
  const nextIndexes = (timelineIndexList || []).filter(
    (timelineId) => timelineId != null
  )

  if (mode === "add") {
    return [...new Set([...currentIndexes, ...nextIndexes])]
  }

  return [...new Set(nextIndexes)]
}

export const reelHandlers = (state, action) => {
  switch (action.type) {
    case REEL.SET_TIMELINE_INDEX: {
      const { timelineIndexList } = action.payload || {}
      const nextIndexes = resolveTimelineIndexes([], timelineIndexList)

      return {
        ...state,
        contentList: {
          ...state.contentList,
          reel: nextIndexes,
        }
      }
    }

    case REEL.ADD_TIMELINE_INDEX: {
      const { timelineIndexList } = action.payload || {}
      const currentIndexes = state.contentList.reel ?? []
      const nextIndexes = resolveTimelineIndexes(currentIndexes, timelineIndexList, "add")

      return {
        ...state,
        contentList: {
          ...state.contentList,
          reel: nextIndexes,
        }
      }
    }

    default:
      return state
  }
}

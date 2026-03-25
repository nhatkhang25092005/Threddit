import { FEEDS } from "../type"

const resolveTimelineIndexes = (currentIndexes = [], timelineIndexList = [], mode = "set") => {
  const nextIndexes = (timelineIndexList || []).filter(
    (timelineId) => timelineId != null
  )

  if (mode === "add") {
    return [...new Set([...currentIndexes, ...nextIndexes])]
  }

  return [...new Set(nextIndexes)]
}

export const feedsHandlers = (state, action) => {
  switch (action.type) {
    case FEEDS.SET_TIMELINE_INDEX: {
      const { timelineIndexList } = action.payload || {}
      const nextIndexes = resolveTimelineIndexes([], timelineIndexList)

      return {
        ...state,
        contentList: {
          ...state.contentList,
          home: {
            ...state.contentList.home,
            feeds: nextIndexes,
          }
        }
      }
    }

    case FEEDS.ADD_TIMELINE_INDEX: {
      const { timelineIndexList } = action.payload || {}
      const currentIndexes = state.contentList.home?.feeds ?? []
      const nextIndexes = resolveTimelineIndexes(currentIndexes, timelineIndexList, "add")

      return {
        ...state,
        contentList: {
          ...state.contentList,
          home: {
            ...state.contentList.home,
            feeds: nextIndexes,
          }
        }
      }
    }

    default:
      return state
  }
}

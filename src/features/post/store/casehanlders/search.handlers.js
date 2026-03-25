import { SEARCH } from "../type"

const resolveTimelineIndexes = (currentIndexes = [], timelineIndexList = [], mode = "set") => {
  const nextIndexes = (timelineIndexList || []).filter(
    (timelineId) => timelineId != null
  )

  if (mode === "add") {
    return [...new Set([...currentIndexes, ...nextIndexes])]
  }

  return [...new Set(nextIndexes)]
}

export const searchHandlers = (state, action) => {
  switch (action.type) {
    case SEARCH.SET_SEARCH_KEYWORD: {
      const { keyword = "" } = action.payload || {}

      return {
        ...state,
        searchKeyword: keyword,
      }
    }

    case SEARCH.SET_SEARCH_LIST: {
      const { timelineIndexList } = action.payload || {}
      const nextIndexes = resolveTimelineIndexes([], timelineIndexList)

      return {
        ...state,
        contentList: {
          ...state.contentList,
          searchList: nextIndexes,
        }
      }
    }

    case SEARCH.APPEND_SEARCH_LIST: {
      const { timelineIndexList } = action.payload || {}
      const currentIndexes = state.contentList.searchList ?? []
      const nextIndexes = resolveTimelineIndexes(currentIndexes, timelineIndexList, "add")

      return {
        ...state,
        contentList: {
          ...state.contentList,
          searchList: nextIndexes,
        }
      }
    }

    default:
      return state
  }
}

import { SAVED_POST } from "../type"

export const savedPostHandlers = (state, action) => {
  switch (action.type) {
    case SAVED_POST.ADD_TIMELINE_INDEX: {
      const existingIndexes = state.contentList.savedPost || []
      const nextIndexes = [...new Set(action.payload || [])].filter(
        (timelineId) => timelineId != null && !existingIndexes.includes(timelineId)
      )

      if (nextIndexes.length === 0) return state

      return {
        ...state,
        contentList: {
          ...state.contentList,
          savedPost: [...existingIndexes, ...nextIndexes]
        }
      }
    }

    case SAVED_POST.PREPEND_TIMELINE_INDEX: {
      const { timelineIndex } = action.payload || {}
      if (timelineIndex == null) return state

      const existingIndexes = state.contentList.savedPost || []
      const nextIndexes = [
        timelineIndex,
        ...existingIndexes.filter((id) => id !== timelineIndex)
      ]

      return {
        ...state,
        contentList: {
          ...state.contentList,
          savedPost: nextIndexes
        }
      }
    }

    case SAVED_POST.REMOVE_TIMELINE_INDEX: {
      const { timelineIndex } = action.payload || {}
      if (timelineIndex == null) return state

      const existingIndexes = state.contentList.savedPost || []
      if (!existingIndexes.includes(timelineIndex)) return state

      return {
        ...state,
        contentList: {
          ...state.contentList,
          savedPost: existingIndexes.filter((id) => id !== timelineIndex)
        }
      }
    }

    default:
      return state
  }
}

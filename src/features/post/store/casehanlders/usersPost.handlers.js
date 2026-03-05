import { USERS_POST } from "../type"

export const usersPostHandlers = (state, action) => {
  switch (action.type) {
    case USERS_POST.ADD_TIMELINE_INDEX: {
      const { username, timelineIndexList } = action.payload || {}

      if (!username) return state

      const existingIndexes = state.contentList.usersPost[username] || []
      const nextIndexes = [...new Set(timelineIndexList || [])].filter(
        (timelineId) => timelineId != null && !existingIndexes.includes(timelineId)
      )

      return {
        ...state,
        contentList: {
          ...state.contentList,
          usersPost: {
            ...state.contentList.usersPost,
            [username]: [...nextIndexes,...existingIndexes]
          }
        }
      }
    }

    case USERS_POST.PREPEND_TIMELINE_INDEX: {
      const { username, timelineIndex } = action.payload || {}
      if (!username || timelineIndex == null) return state

      const existingIndexes = state.contentList.usersPost[username] || []
      if (existingIndexes.includes(timelineIndex)) return state

      return {
        ...state,
        contentList: {
          ...state.contentList,
          usersPost: {
            ...state.contentList.usersPost,
            [username]: [timelineIndex, ...existingIndexes]
          }
        }
      }
    }

    default:
      return state
  }
}

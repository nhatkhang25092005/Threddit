import { USERS_POST } from "../type"

export const usersPostHandlers = (state, action) => {
  switch (action.type) {
    case USERS_POST.ADD_TIMELINE_INDEX: {
      const { username, timelineIndexList } = action.payload || {}

      if (!username) return state

      const existingIndexes = state.contentList.usersPost[username] || []
      const nextIndexes = (timelineIndexList || []).filter(
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

    default:
      return state
  }
}

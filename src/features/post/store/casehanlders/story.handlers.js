import { STORY } from "../type"

const normalizeIdList = (list) => (
  [...new Set((list || []).filter((id) => id != null))]
)

const getStoryKey = (username) => username || "pinned_story"

export const storyHandlers = (state, action) => {
  switch (action.type){
    case STORY.SET_STORY_LIST: {
      const payload = action.payload || {}
      const username = Array.isArray(payload) ? null : payload.username
      const storyIndexList = Array.isArray(payload) ? payload : payload.storyIndexList
      const key = getStoryKey(username)

      return {
        ...state,
        storyList: {
          ...(state.storyList || {}),
          [key]: normalizeIdList(storyIndexList)
        }
      }
    }

    case STORY.ADD_STORY_INDEX: {
      const payload = action.payload || {}
      const username = Array.isArray(payload) ? null : payload.username
      const storyIndexList = Array.isArray(payload) ? payload : payload.storyIndexList
      const key = getStoryKey(username)
      const nextIds = normalizeIdList(storyIndexList)
      const existingIds = state.storyList?.[key] || []
      const idsToAppend = nextIds.filter((id) => !existingIds.includes(id))

      if (idsToAppend.length === 0) return state

      return {
        ...state,
        storyList: {
          ...(state.storyList || {}),
          [key]: [...existingIds, ...idsToAppend]
        }
      }
    }

    case STORY.PREPEND_STORY_INDEX: {
      const payload = action.payload || {}
      const username = payload.username
      const storyId = payload.storyId
      if (storyId == null) return state

      const key = getStoryKey(username)
      const existingIds = state.storyList?.[key] || []
      const nextIds = [storyId, ...existingIds.filter((id) => id !== storyId)]

      return {
        ...state,
        storyList: {
          ...(state.storyList || {}),
          [key]: nextIds
        }
      }
    }

    case STORY.CLEAR_STORY_LIST: {
      const payload = action.payload || {}
      const username = typeof payload === "object" ? payload.username : null
      const key = getStoryKey(username)

      if ((state.storyList?.[key] || []).length === 0) return state

      return {
        ...state,
        storyList: {
          ...(state.storyList || {}),
          [key]: []
        }
      }
    }

    default:
      return state
  }
}

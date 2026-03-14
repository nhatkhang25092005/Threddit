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

    case STORY.PREPEND_CURRENT_STORY_INDEX:{
      const {username, currentStoryIndexList} = action.payload
      const currentStories = state.contentList.currentStory[username] ?? []
      const prependList = [
        ...new Set([
          ...currentStoryIndexList,
          ...currentStories
        ])
      ]
      return{
        ...state,
        contentList:{
          ...state.contentList,
          currentStory:{
            ...state.contentList.currentStory,
            [username]:prependList
          }
        }
      }
    }

    case STORY.SET_PIN_STORY:{
      const {username, id, nextPin: shouldPin} = action.payload || {}
      if (id == null) return state

      const key = getStoryKey(username)
      const currentPinnedStory = state.pinnedContents.story?.[key] || []
      const nextPinList = shouldPin
        ? [id, ...currentPinnedStory.filter(storyId => storyId !== id)]
        : currentPinnedStory.filter(storyId => storyId !== id)

      if (
        currentPinnedStory.length === nextPinList.length
        && currentPinnedStory.every((storyId, index) => storyId === nextPinList[index])
      ) {
        return state
      }

      return{
        ...state,
        pinnedContents:{
          ...state.pinnedContents,
          story:{
            ...state.pinnedContents.story,
            [key]:nextPinList
          }
        }
      }
    }

    default:
      return state
  }
}

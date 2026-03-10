import { createAction } from "../models/action.model"
import { CLASS_TYPE, STORY } from "../type"

export const storyActions = {
  setStoryList: (username = null, storyIndexList = []) => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.SET_STORY_LIST,
      { username, storyIndexList }
    )
  ),

  addStoryIndex: (username = null, storyIndexList = []) => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.ADD_STORY_INDEX,
      { username, storyIndexList }
    )
  ),

  prependStoryIndex: (username = null, storyId = null) => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.PREPEND_STORY_INDEX,
      { username, storyId }
    )
  ),

  clearStoryList: (username = null) => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.CLEAR_STORY_LIST,
      { username }
    )
  ),
}

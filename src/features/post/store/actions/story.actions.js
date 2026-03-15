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

  addFriendStoryIndex: (friendStories = {}) => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.ADD_FRIEND_STORY_INDEX,
      { friendStories }
    )
  ),

  addCurrentStoryIndex:(username = null, currentStoryIndexList = []) => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.PREPEND_CURRENT_STORY_INDEX,
      {username, currentStoryIndexList}
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

  clearFriendStoryList: () => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.CLEAR_FRIEND_STORY_LIST,
      null
    )
  ),

  setPinnedStory: (username, id, nextPin) => (
    createAction(
      CLASS_TYPE.STORY,
      STORY.SET_PIN_STORY,
      {username, id, nextPin}
    )
  )
}

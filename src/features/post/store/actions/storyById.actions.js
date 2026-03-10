import { createAction } from "../models/action.model";
import { CLASS_TYPE, STORY_BY_ID } from "../type";

export const storyByIdActions = {
  addStories: (metaData) => (
    createAction(
      CLASS_TYPE.STORY_BY_ID,
      STORY_BY_ID.ADD_STORIES_BY_ID,
      metaData
    )
  ),

  addStory: (storyData) => (
    createAction(
      CLASS_TYPE.STORY_BY_ID,
      STORY_BY_ID.ADD_STORY_BY_ID,
      storyData
    )
  ),

  setPinned: (id, isPinned) => (
    createAction(
      CLASS_TYPE.STORY_BY_ID,
      STORY_BY_ID.SET_STORY_PINNED,
      { id, isPinned }
    )
  ),
};

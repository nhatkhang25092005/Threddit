import { itemModel } from "../models/item.model";
import { STORY_BY_ID } from "../type";

export const storyByIdHandlers = (state, action) => {
  switch (action.type) {
    case STORY_BY_ID.ADD_STORIES_BY_ID: {
      const stories = action.payload || [];

      const byId = Object.fromEntries(
        stories
          .filter((story) => story?.id != null)
          .map((story) => [story.id, story])
      );

      const loadingItem = Object.fromEntries(
        stories
          .filter((story) => story?.id != null)
          .map((story) => [story.id, itemModel()])
      );

      return {
        ...state,
        storyById: {
          ...state.storyById,
          ...byId,
        },
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            ...loadingItem,
          },
        },
      };
    }

    case STORY_BY_ID.ADD_STORY_BY_ID: {
      const story = action.payload || null;
      if (!story || story.id == null) return state;

      return {
        ...state,
        storyById: {
          ...state.storyById,
          [story.id]: story,
        },
      };
    }

    case STORY_BY_ID.SET_STORY_PINNED: {
      const { id, isPinned } = action.payload || {};
      if (id == null) return state;

      const currentStory = state.storyById?.[id];
      if (!currentStory) return state;

      const nextIsPinned = Boolean(isPinned);
      if (Boolean(currentStory.isPinned) === nextIsPinned) return state;

      return {
        ...state,
        storyById: {
          ...state.storyById,
          [id]: {
            ...currentStory,
            isPinned: nextIsPinned,
          },
        },
      };
    }

    default:
      return state;
  }
};

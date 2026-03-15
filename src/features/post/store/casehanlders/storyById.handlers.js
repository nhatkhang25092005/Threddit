import { itemModel } from "../models/item.model";
import { STORY_BY_ID } from "../type";

const removeIdFromList = (list = [], id) => (
  Array.isArray(list)
    ? list.filter((itemId) => itemId !== id)
    : []
);

const removeIdFromRecordLists = (record = {}, id) => (
  Object.fromEntries(
    Object.entries(record || {}).map(([key, list]) => [key, removeIdFromList(list, id)])
  )
);

const mergeStoryChanges = (currentStory, changes = {}) => ({
  ...currentStory,
  ...(changes?.text !== undefined ? { text: changes.text } : {}),
  ...(changes?.type ? { type: changes.type } : {}),
  ...(Array.isArray(changes?.mentionedUsers) ? { mentionedUsers: changes.mentionedUsers } : {}),
  ...(Array.isArray(changes?.mediaFiles) ? { mediaFiles: changes.mediaFiles } : {}),
  ...(changes?.time ? {
    time: {
      ...currentStory.time,
      ...changes.time
    }
  } : {}),
  ...(changes?.author ? {
    author: {
      ...currentStory.author,
      ...changes.author
    }
  } : {}),
  ...(changes?.stats ? {
    stats: {
      ...currentStory.stats,
      ...changes.stats
    }
  } : {}),
  ...(changes?.viewer ? {
    viewer: {
      ...currentStory.viewer,
      ...changes.viewer
    }
  } : {}),
});

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

    case STORY_BY_ID.UPDATE_STORY_BY_ID: {
      const { id, changes } = action.payload || {};
      if (id == null) return state;

      const currentStory = state.storyById?.[id];
      if (!currentStory) return state;

      return {
        ...state,
        storyById: {
          ...state.storyById,
          [id]: mergeStoryChanges(currentStory, changes),
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

    case STORY_BY_ID.REMOVE_STORY_BY_ID: {
      const { id } = action.payload || {};
      if (id == null) return state;

      const nextStoryById = { ...(state.storyById || {}) };
      const nextLoadingItem = { ...(state.loading?.item || {}) };

      delete nextStoryById[id];
      delete nextLoadingItem[id];

      return {
        ...state,
        pinnedContents: {
          ...state.pinnedContents,
          story: removeIdFromRecordLists(state.pinnedContents?.story, id),
        },
        storyList: removeIdFromRecordLists(state.storyList, id),
        contentList: {
          ...state.contentList,
          currentStory: removeIdFromRecordLists(state.contentList?.currentStory, id),
        },
        storyById: nextStoryById,
        loading: {
          ...state.loading,
          item: nextLoadingItem,
        },
      };
    }

    default:
      return state;
  }
};

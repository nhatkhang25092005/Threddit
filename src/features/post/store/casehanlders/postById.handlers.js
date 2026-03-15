import { POST_BY_ID } from "../type"
import { itemModel } from "../models/item.model"

const removeIdFromList = (list = [], id) => (
  Array.isArray(list)
    ? list.filter((itemId) => itemId !== id)
    : []
)

const removeIdFromRecordLists = (record = {}, id) => (
  Object.fromEntries(
    Object.entries(record || {}).map(([key, list]) => [key, removeIdFromList(list, id)])
  )
)

const mergePostChanges = (currentPost, changes = {}) => ({
  ...currentPost,
  ...(changes?.text !== undefined ? { text: changes.text } : {}),
  ...(changes?.type ? { type: changes.type } : {}),
  ...(Array.isArray(changes?.mentionedUsers) ? { mentionedUsers: changes.mentionedUsers } : {}),
  ...(Array.isArray(changes?.mediaFiles) ? { mediaFiles: changes.mediaFiles } : {}),
  ...(changes?.time ? {
    time: {
      ...currentPost.time,
      ...changes.time
    }
  } : {}),
  ...(changes?.author ? {
    author: {
      ...currentPost.author,
      ...changes.author
    }
  } : {}),
  ...(changes?.sharer ? {
    sharer: {
      ...currentPost.sharer,
      ...changes.sharer
    }
  } : {}),
  ...(changes?.stats ? {
    stats: {
      ...currentPost.stats,
      ...changes.stats
    }
  } : {}),
  ...(changes?.viewer ? {
    viewer: {
      ...currentPost.viewer,
      ...changes.viewer
    }
  } : {}),
})

export const postByIdHandlers = (state, action) => {
  switch (action.type){
    case POST_BY_ID.ADD_POSTS_BY_ID:{
      const posts = action.payload || []
      
      const byId = Object.fromEntries(
        posts
          .filter((post) => post?.id != null)
          .map((post) => [post.id, post])
      )

      const loadingItem = Object.fromEntries(
        posts
          .filter(post => post?.id != null)
          .map(post => [post.id, itemModel()])
      )
      
      return {
        ...state,
        postById: {
          ...state.postById,
          ...byId
        },
        loading:{
          ...state.loading,
          item:{
            ...state.loading.item,
            ...loadingItem
          }
        }
      }
    }

    case POST_BY_ID.ADD_POST_BY_ID: {
      const post = action.payload || null
      if (!post || post.id == null) return state

      return {
        ...state,
        postById: {
          ...state.postById,
          [post.id]: post
        }
      }
    }

    case POST_BY_ID.UPDATE_POST_BY_ID: {
      const { id, changes } = action.payload || {}
      if (id == null) return state

      const currentPost = state.postById?.[id]
      if (!currentPost) return state

      return {
        ...state,
        postById: {
          ...state.postById,
          [id]: mergePostChanges(currentPost, changes)
        }
      }
    }

    case POST_BY_ID.SET_POST_SAVED: {
      const { id, isSaved, saveNumber } = action.payload || {}
      if (id == null) return state

      const currentPost = state.postById?.[id]
      if (!currentPost) return state

      const previousIsSaved = Boolean(currentPost.viewer?.isSaved)
      const nextIsSaved = Boolean(isSaved)

      const currentSaveNumber = currentPost.stats?.saveNumber ?? 0
      const saveNumberFromServer = Number.isFinite(saveNumber)
        ? Math.max(0, saveNumber)
        : null

      let nextSaveNumber = currentSaveNumber
      if (saveNumberFromServer != null) {
        nextSaveNumber = saveNumberFromServer
      } else if (previousIsSaved !== nextIsSaved) {
        nextSaveNumber = Math.max(
          0,
          currentSaveNumber + (nextIsSaved ? 1 : -1)
        )
      }

      if (
        previousIsSaved === nextIsSaved &&
        currentSaveNumber === nextSaveNumber
      ) {
        return state
      }

      return {
        ...state,
        postById: {
          ...state.postById,
          [id]: {
            ...currentPost,
            stats: {
              ...currentPost.stats,
              saveNumber: nextSaveNumber
            },
            viewer: {
              ...currentPost.viewer,
              isSaved: nextIsSaved
            }
          }
        }
      }
    }

    case POST_BY_ID.SET_POST_PINNED: {
    const { id, isPinned, username } = action.payload || {};
    if (id == null || !username) return state;

    const currentPost = state.postById?.[id];
    if (!currentPost) return state;

    const nextIsPinned = Boolean(isPinned);
    const currentIsPinned = Boolean(currentPost.isPinned);

    if (currentIsPinned === nextIsPinned) return state;

    const currentPinnedPostIds = state.pinnedContents?.post ?? [];
    const currentUserPostIds = state.contentList?.usersPost?.[username] ?? [];

    const nextPinnedPostIds = nextIsPinned
      ? [id, ...currentPinnedPostIds.filter((postId) => postId !== id)]
      : currentPinnedPostIds.filter((postId) => postId !== id);

    const nextUserPostIds = nextIsPinned
      ? currentUserPostIds.filter((postId) => postId !== id)
      : [id, ...currentUserPostIds.filter((postId) => postId !== id)];

    return {
      ...state,
      pinnedContents: {
        ...state.pinnedContents,
        post: nextPinnedPostIds,
      },
      contentList: {
        ...state.contentList,
        usersPost: {
          ...state.contentList.usersPost,
          [username]: nextUserPostIds,
        },
      },
      postById: {
        ...state.postById,
        [id]: {
          ...currentPost,
          isPinned: nextIsPinned,
        },
      },
    };
  }

    case POST_BY_ID.REMOVE_POST_BY_ID: {
      const { id } = action.payload || {}
      if (id == null) return state

      const nextUsersPost = removeIdFromRecordLists(state.contentList?.usersPost, id)
      const nextSavedPost = removeIdFromList(state.contentList?.savedPost, id)
      const nextPinnedPost = removeIdFromList(state.pinnedContents?.post, id)
      const nextFeeds = removeIdFromList(state.contentList?.home?.feeds, id)
      const nextFollowersPost = removeIdFromList(state.contentList?.home?.followersPost, id)

      const nextPostById = { ...(state.postById || {}) }
      const nextLoadingItem = { ...(state.loading?.item || {}) }

      delete nextPostById[id]
      delete nextLoadingItem[id]

      return {
        ...state,
        pinnedContents: {
          ...state.pinnedContents,
          post: nextPinnedPost
        },
        contentList: {
          ...state.contentList,
          home: {
            ...state.contentList.home,
            feeds: nextFeeds,
            followersPost: nextFollowersPost
          },
          usersPost: nextUsersPost,
          savedPost: nextSavedPost
        },
        postById: nextPostById,
        loading: {
          ...state.loading,
          item: nextLoadingItem
        }
      }
    }

    default:
      return state
  }
}

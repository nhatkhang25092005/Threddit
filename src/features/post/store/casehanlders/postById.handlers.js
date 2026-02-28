import { POST_BY_ID } from "../type"

export const postByIdHandlers = (state, action) => {
  switch (action.type){
    case POST_BY_ID.ADD_POSTS_BY_ID:{
      const posts = action.payload || []

      const byId = Object.fromEntries(
        posts.map(p => [p.contentId, p])
      )

      return {
        ...state,
        postById: {
          ...state.postById,
          ...byId
        }
      }
    }

    case POST_BY_ID.SET_POST_SAVED: {
      const { contentId, isSaved, saveNumber } = action.payload || {}
      if (contentId == null) return state

      const currentPost = state.postById?.[contentId]
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
          [contentId]: {
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

    default:
      return state
  }
}

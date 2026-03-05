import { REACTION } from "../type"

const normalizeReaction = (reaction) => {
  if (!reaction) return null

  return String(reaction).toLowerCase()
}

export const reactionHandlers = (state, action) => {
  switch (action.type) {
    case REACTION.SET_POST_REACTION: {
      const { id, reaction } = action.payload || {}
      if (id == null) return state

      const currentPost = state.postById?.[id]
      if (!currentPost) return state

      const previousReaction = normalizeReaction(currentPost.viewer?.reaction)
      const nextReaction = normalizeReaction(reaction)
      if (previousReaction === nextReaction) return state

      const currentReactionNumber = currentPost.stats?.reactionNumber ?? 0
      let delta = 0

      if (!previousReaction && nextReaction) {
        delta = 1
      } else if (previousReaction && !nextReaction) {
        delta = -1
      }

      const nextReactionNumber = Math.max(0, currentReactionNumber + delta)

      return {
        ...state,
        postById: {
          ...state.postById,
          [id]: {
            ...currentPost,
            stats: {
              ...currentPost.stats,
              reactionNumber: nextReactionNumber
            },
            viewer: {
              ...currentPost.viewer,
              reaction: nextReaction
            }
          }
        }
      }
    }

    default:
      return state
  }
}

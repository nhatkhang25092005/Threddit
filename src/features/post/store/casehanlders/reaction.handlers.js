import { REACTION } from "../type"

const normalizeReaction = (reaction) => {
  if (!reaction) return null

  return String(reaction).toLowerCase()
}

const resolveNextReactionState = (currentReaction, nextReaction, currentReactionNumber = 0) => {
  let delta = 0

  if (!currentReaction && nextReaction) {
    delta = 1
  } else if (currentReaction && !nextReaction) {
    delta = -1
  }

  return {
    reaction: nextReaction,
    reactionNumber: Math.max(0, currentReactionNumber + delta)
  }
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

      const nextReactionState = resolveNextReactionState(
        previousReaction,
        nextReaction,
        currentPost.stats?.reactionNumber ?? 0
      )

      return {
        ...state,
        postById: {
          ...state.postById,
          [id]: {
            ...currentPost,
            stats: {
              ...currentPost.stats,
              reactionNumber: nextReactionState.reactionNumber
            },
            viewer: {
              ...currentPost.viewer,
              reaction: nextReactionState.reaction
            }
          }
        }
      }
    }

    case REACTION.SET_COMMENT_REACTION: {
      const { id, reaction } = action.payload || {}
      if (id == null) return state

      const currentComment = state.commentById?.[id]
      if (!currentComment) return state

      const previousReaction = normalizeReaction(currentComment.reaction)
      const nextReaction = normalizeReaction(reaction)
      if (previousReaction === nextReaction) return state

      const nextReactionState = resolveNextReactionState(
        previousReaction,
        nextReaction,
        currentComment.reactionNumber ?? 0
      )

      return {
        ...state,
        commentById: {
          ...state.commentById,
          [id]: {
            ...currentComment,
            reaction: nextReactionState.reaction,
            reactionNumber: nextReactionState.reactionNumber
          }
        }
      }
    }

    default:
      return state
  }
}

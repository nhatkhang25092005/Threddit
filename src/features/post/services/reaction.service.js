import { handleRequest } from '../../../api/helper'
import { reactionApi } from '../../../api/content/reaction/reaction.api'

export const reactionService = {
  react: async (contentId, payload, signal) =>
    handleRequest(() => reactionApi.react(contentId, payload, signal)),

  updateReaction: async (contentId, payload, signal) =>
    handleRequest(() => reactionApi.updateReaction(contentId, payload, signal)),

  unreact: async (contentId, signal) =>
    handleRequest(() => reactionApi.unreact(contentId, signal)),
}

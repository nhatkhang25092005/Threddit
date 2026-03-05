import { handleRequest } from '../../../api/helper'
import { reactionApi } from '../../../api/content/reaction/reaction.api'

export const reactionService = {
  react: async (id, payload, signal) =>
    handleRequest(() => reactionApi.react(id, payload, signal)),

  updateReaction: async (id, payload, signal) =>
    handleRequest(() => reactionApi.updateReaction(id, payload, signal)),

  unreact: async (id, signal) =>
    handleRequest(() => reactionApi.unreact(id, signal)),
}

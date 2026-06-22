import { handleRequest } from '../../../api/helper'
import { reactionApi } from '../../../api/content/reaction/reaction.api'

export const reactionService = {
  react: async (id, payload) =>
    handleRequest(() => reactionApi.react(id, payload)),

  updateReaction: async (id, payload) =>
    handleRequest(() => reactionApi.updateReaction(id, payload)),

  unreact: async (id) =>
    handleRequest(() => reactionApi.unreact(id)),

  reactComment: async (commentId, payload, signal) =>
    handleRequest(() => reactionApi.reactComment(commentId, payload, signal)),

  updateReactComment: async (commentId, payload, signal) =>
    handleRequest(() => reactionApi.updateReactComment(commentId, payload, signal)),

  unReactComment: async (commentId, signal) =>
    handleRequest(() => reactionApi.unReactComment(commentId, signal)),

  calculateNextReaction: (prev, next) => {
    if(!next){
      return "EMPTY_NEXT_REACTION_UNEXPECT"
    }

    if(!prev && next){
      return "NEW_REACTION"
    }
    else if(prev === next){
      return "UN_REACTION"
    }
    else{
      return "UPDATE_REACTION"
    }
  }
}

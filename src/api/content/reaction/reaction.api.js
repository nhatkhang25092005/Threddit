import axios from "../../axios";

const BASE = import.meta.env.VITE_API_REACTION_BASE;
const REACTION = import.meta.env.VITE_API_REACTION_REACTION;
const COMMENT = import.meta.env.VITE_API_COMMENT_BASE

const buildReactionUrl = (contentId) => `${BASE}/${contentId}${REACTION}`;

export const reactionApi = {
  react(contentId, payload, signal) {
    return axios.post(buildReactionUrl(contentId), payload, { signal });
  },

  updateReaction(contentId, payload, signal) {
    return axios.patch(buildReactionUrl(contentId), payload, { signal });
  },

  unreact(contentId, signal) {
    return axios.delete(buildReactionUrl(contentId), { signal });
  },

  reactComment(commentId, payload, signal){
    const url = `${BASE}${COMMENT}/${commentId}${REACTION}`
    return axios.post(url, payload, {signal})
  },

  updateReactComment(commentId, payload, signal){
    const url = `${BASE}${COMMENT}/${commentId}${REACTION}`
    return axios.patch(url, payload, {signal})
  },

  unReactComment(commentId, signal){
    const url = `${BASE}${COMMENT}/${commentId}${REACTION}`
    return axios.delete(url, {signal})
  }
};

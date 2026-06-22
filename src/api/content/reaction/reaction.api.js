import axios from "../../axios";

const BASE = import.meta.env.VITE_API_REACTION_BASE;
const REACTION = import.meta.env.VITE_API_REACTION_REACTION;
const COMMENT = import.meta.env.VITE_API_COMMENT_BASE

const buildReactionUrl = (contentId) => `${BASE}/${contentId}${REACTION}`;

export const reactionApi = {
  react(contentId, payload) {
    return axios.post(buildReactionUrl(contentId), payload);
  },

  updateReaction(contentId, payload) {
    return axios.patch(buildReactionUrl(contentId), payload);
  },

  unreact(contentId) {
    return axios.delete(buildReactionUrl(contentId));
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

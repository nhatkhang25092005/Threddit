import axios from "../../axios";

const BASE = import.meta.env.VITE_API_REACTION_BASE;
const REACTION = import.meta.env.VITE_API_REACTION_REACTION;

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
};

import axios from "../../axios";
const GET_PINNED = import.meta.env.VITE_API_PINNED_STORY
const CONTENT_BASE = import.meta.env.VITE_API_CONTENT_BASE
const CURRENT_STORY = import.meta.env.VITE_API_CURRENT_STORIES
export const storyApi = {
  getPinnedStory:(username, signal, cursor)=>{
    const url = username === null
    ? CONTENT_BASE + GET_PINNED
    : `${CONTENT_BASE}/${username}${GET_PINNED}`
    return axios.get(url, { params: { cursor }, signal })
  },

  getCurrentStory:(username = null, signal, cursor) => {
    const url = username === null
    ? CONTENT_BASE + CURRENT_STORY
    : `${CONTENT_BASE}/${username}${CURRENT_STORY}`
    return axios.get(url, { params: { cursor }, signal })
  }
}
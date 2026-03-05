import axios from "../../axios";
const GET_PINNED = import.meta.env.VITE_API_PINNED_STORY
const CONTENT_BASE = import.meta.env.VITE_API_CONTENT_BASE
export const storyApi = {
  getPinnedStory:(username, signal, cursor)=>{
    const url = username === null
    ? CONTENT_BASE + GET_PINNED
    : `${CONTENT_BASE}/${username}${GET_PINNED}`
    return axios.get(url, { params: { cursor }, signal })
  }
}
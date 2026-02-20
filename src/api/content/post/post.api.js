import axios from '../../axios'

const BASE = import.meta.env.VITE_API_CONTENT_BASE
const OTHER_TIMELINE = import.meta.env.VITE_API_CONTENT_OTHER_TIMELINE_CONTENT
const MY_TIMELINE = import.meta.env.VITE_API_CONTENT_MY_TIMELINE_CONTENT
const SAVED_CONTENT = import.meta.env.VITE_API_CONTENT_SAVED_CONTENT
const CREATE_POST = import.meta.env.VITE_API_CONTENT_CREATE_POST
const MEDIA_CONFIRM = import.meta.env.VITE_API_CONTENT_MEDIA_CONFIRM

export const postApi = {
  getOtherTimelineContent(username, cursor, signal) {
    const url = `${BASE}/${username}${OTHER_TIMELINE}`
    return axios.get(url, { params: { cursor }, signal })
  },

  getMyTimelineContent(cursor, signal) {
    const url = `${BASE}${MY_TIMELINE}`
    return axios.get(url, { params: { cursor }, signal })
  },

  getSavedContent(cursor, signal) {
    const url = `${BASE}${SAVED_CONTENT}`
    return axios.get(url, { params: { cursor }, signal })
  },

  createPost(payload) {
    const url = `${BASE}${CREATE_POST}`
    return axios.post(url, payload)
  },

  confirmContentUploadedMedia(payload) {
    const url = `${BASE}${MEDIA_CONFIRM}`
    return axios.post(url, payload)
  },
}

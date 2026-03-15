import axios from '../../axios'

const BASE = import.meta.env.VITE_API_CONTENT_BASE
const OTHER_TIMELINE = import.meta.env.VITE_API_CONTENT_OTHER_TIMELINE_CONTENT
const SAVED_CONTENT = import.meta.env.VITE_API_CONTENT_SAVED_CONTENT
const SAVE = import.meta.env.VITE_API_SAVE_SAVE
const UNSAVE = import.meta.env.VITE_API_SAVE_UNSAVE
const PIN = import.meta.env.VITE_API_CONTENT_PIN

const buildSaveUrl = (contentId) => `${BASE}/${contentId}${SAVE}`
const buildUnsaveUrl = (contentId) => `${BASE}/${contentId}${UNSAVE}`

export const postApi = {
  getPostContent(username, cursor, signal) {
    const url = `${BASE}/${username}${OTHER_TIMELINE}`
    return axios.get(url, { params: { cursor }, signal })
  },

  getSavedContent(cursor, signal) {
    const url = `${BASE}${SAVED_CONTENT}`
    return axios.get(url, { params: { cursor }, signal })
  },

  createPost(payload) {
    const url = `${BASE}`
    return axios.post(url, payload)
  },

  savePost(contentId) {
    return axios.post(buildSaveUrl(contentId))
  },

  unsavePost(contentId) {
    return axios.delete(buildUnsaveUrl(contentId))
  },

  pinContent(contentId){
    return axios.post(`${BASE}/${contentId}${PIN}`)
  },

  unPinContent(contentId){
    return axios.delete(`${BASE}/${contentId}${PIN}`)
  },

  deleteContent(contentId){
    return axios.delete(`${BASE}/${contentId}`)
  }
}

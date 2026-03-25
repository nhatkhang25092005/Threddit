import axios from '../../axios'

const BASE = import.meta.env.VITE_API_CONTENT_BASE
const OTHER_TIMELINE = import.meta.env.VITE_API_CONTENT_OTHER_TIMELINE_CONTENT
const SAVED_CONTENT = import.meta.env.VITE_API_CONTENT_SAVED_CONTENT
const SAVE = import.meta.env.VITE_API_SAVE_SAVE
const UNSAVE = import.meta.env.VITE_API_SAVE_UNSAVE
const PIN = import.meta.env.VITE_API_CONTENT_PIN
const SHARE = import.meta.env.VITE_API_SHARE
const FEED = import.meta.env.VITE_API_CONTENT_FEED
const REEL = import.meta.env.VITE_API_CONTENT_REEL

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
  },

  editContent(contentId, payload){
    return axios.patch(`${BASE}/${contentId}`,payload)
  },

  shareContent(contentId, payload){
    const url = `${BASE}/${contentId}${SHARE}`
    return axios.post(url, payload)
  },

  unshareContent(contentId){
    const url = `${BASE}/${contentId}${SHARE}`
    return axios.delete(url)
  },

  updateShareContent(contentId, payload){
    const url = `${BASE}/${contentId}${SHARE}`
    return axios.patch(url, payload)
  },

  getPostDetail(postId){
    const url = `${BASE}/${postId}`
    return axios.get(url)
  },

  getFeed(signal){
    const url = `${BASE}${FEED}`
    return axios.get(url,{signal})
  },

  getReel(signal){
    const url = `${BASE}${REEL}`
    return axios.get(url,{signal})
  },

  searchContent(key, signal, cursor){
    const url = `${BASE}`
    return axios.get(url,{signal, params:{cursor, key}},)
  }
}

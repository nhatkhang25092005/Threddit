// src/api/follow.api.js
import axios from '../axios'

const API = {
  FOLLOW_COUNT: import.meta.env.VITE_API_FOLLOW_COUNT,        // GET  /follow/count
  FOLLOW_USER_PREFIX: import.meta.env.VITE_API_FOLLOW_USER,   // PREFIX /follow/{username}
  FOLLOWERS: import.meta.env.VITE_API_FOLLOW_FOLLOWERS,       // GET  /follow/followers
  FOLLOWINGS: import.meta.env.VITE_API_FOLLOW_FOLLOWINGS,     // GET  /follow/followings
}

export const followApi = {
  /* ================= COUNT ================= */

  getFollowCount() {
    return axios.get(API.FOLLOW_COUNT)
  },

  getUserFollowCount(username) {
    return axios.get(`${API.FOLLOW_USER_PREFIX}${username}/count`)
  },

  /* ================= LIST ================= */

  /**
   * Get followers
   * - username = null  -> current user
   * - username != null -> specific user
   */
  getFollowers(username = null, cursor = null, signal) {
    const url = username
      ? `${API.FOLLOW_USER_PREFIX}${username}/followers`
      : API.FOLLOWERS
    return axios.get(url, {
      params: cursor ? { cursor } : {},
      signal
    })
  },

  /**
   * Get followings
   * - username = null  -> current user
   * - username != null -> specific user
   */
  getFollowings(username = null, cursor = null, signal) {
    const url = username
      ? `${API.FOLLOW_USER_PREFIX}${username}/followings`
      : API.FOLLOWINGS

    return axios.get(url, {
      params: cursor ? { cursor } : {},
      signal
    })
  },

  /* ================= RELATION ================= */

  getFollow(username) {
    return axios.get(`${API.FOLLOW_USER_PREFIX}${username}`)
  },

  getFollowStatus(username) {
    return axios.get(`${API.FOLLOW_USER_PREFIX}${username}/status`)
  },

  follow(username) {
    return axios.post(`${API.FOLLOW_USER_PREFIX}${username}`)
  },

  unfollow(username) {
    return axios.delete(`${API.FOLLOW_USER_PREFIX}${username}`)
  },
}

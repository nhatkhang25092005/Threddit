// src/api/follow.api.js
import axios from '../axios'

const API = {
  FOLLOW_COUNT: import.meta.env.VITE_API_FOLLOW_COUNT,        // /follow/count
  FOLLOW_USER_PREFIX: import.meta.env.VITE_API_FOLLOW_USER,   // /follow/
  FOLLOWERS: import.meta.env.VITE_API_FOLLOW_FOLLOWERS,       // /follow/followers
  FOLLOWINGS: import.meta.env.VITE_API_FOLLOW_FOLLOWINGS,     // /follow/followings
}

export const followApi = {
  // /follow/count
  getFollowCount() {
    return axios.get(API.FOLLOW_COUNT)
  },

  // /follow/{username}/count
  getUserFollowCount(username) {
    return axios.get(API.FOLLOW_USER_PREFIX + username + '/count')
  },

  // /follow/followers?cursor=xxx
  getFollowers(cursor = null, signal) {
    return axios.get(API.FOLLOWERS, {
      params: cursor ? { cursor } : {},
      signal
    })
  },

  // /follow/{username}/followers
  getUserFollowers(username) {
    return axios.get(API.FOLLOW_USER_PREFIX + username + '/followers')
  },

  // /follow/followings
  getFollowings() {
    return axios.get(API.FOLLOWINGS)
  },

  // /follow/{username}/followings
  getUserFollowings(username) {
    return axios.get(API.FOLLOW_USER_PREFIX + username + '/followings')
  },

  // /follow/{username}
  getFollow(username) {
    return axios.get(API.FOLLOW_USER_PREFIX + username)
  },

  // /follow/{username}/status
  getFollowStatus(username) {
    return axios.get(API.FOLLOW_USER_PREFIX + username + '/status')
  },

  // follow
  follow(username) {
    return axios.post(API.FOLLOW_USER_PREFIX + username)
  },

  // unfollow
  unfollow(username) {
    return axios.delete(API.FOLLOW_USER_PREFIX + username)
  },
}

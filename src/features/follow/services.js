import { mapResponse, mapErrResponse } from '../../api/helper'
// import { delay } from '../../utils/delaySimulator'
import { followApi } from '../../api/follow/follow.api'
import { follower } from './actions'

const api = {

  // ===== COUNT =====
  getFollowCount: async () => {
    try {
      const response = mapResponse(await followApi.getFollowCount())
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  getUserFollowCount: async (username) => {
    try {
      const response = mapResponse(await followApi.getUserFollowCount(username))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  // ===== FOLLOWERS =====
  getFollowers: async (username = null, cursor, signal) => {
    try {
      const response = mapResponse(await followApi.getFollowers(username, cursor, signal))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  getUserFollowers: async (username) => {
    try {
      const response = mapResponse(await followApi.getUserFollowers(username))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  // ===== FOLLOWINGS =====
  getFollowings: async (username, cursor, signal) => {
    try {
      const response = mapResponse(await followApi.getFollowings(username, cursor, signal))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  getUserFollowings: async (username) => {
    try {
      const response = mapResponse(await followApi.getUserFollowings(username))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  // ===== SINGLE USER FOLLOW =====
  getFollow: async (username) => {
    try {
      const response = mapResponse(await followApi.getFollow(username))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  getFollowStatus: async (username) => {
    try {
      const response = mapResponse(await followApi.getFollowStatus(username))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  // ===== ACTIONS =====
   // Follower a user
  followUser: async (username) => {
    try {
      const res = mapResponse(await followApi.follow(username))
      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  // Unfollow a user
  unfollowUser: async (username) => {
    try {
      const res = mapResponse(await followApi.unfollow(username))
      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  }
}

const domain = {
  createSyncFollow:(dispatch) => ({
    addFollower: (user) => dispatch(follower.add(user)),
    removeFollower: (user) => dispatch(follower.remove(user)),
  })
}

export const services = {
  ...api,
  ...domain
}
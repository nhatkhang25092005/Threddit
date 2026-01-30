import { mapResponse, mapErrResponse } from '../../api/helper'
// import { delay } from '../../utils/delaySimulator'
import { followApi } from '../../api/follow/follow.api'

export const services = {

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
  getFollowers: async (cursor, signal) => {
    try {
      const response = mapResponse(await followApi.getFollowers(cursor, signal))
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
  getFollowings: async () => {
    try {
      const response = mapResponse(await followApi.getFollowings())
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
  follow: async (username) => {
    try {
      const response = mapResponse(await followApi.follow(username))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },

  unfollow: async (username) => {
    try {
      const response = mapResponse(await followApi.unfollow(username))
      return {
        success: response.is_success,
        message: response.message,
        data: response.data
      }
    } catch (e) {
      return mapErrResponse(e)
    }
  },
}

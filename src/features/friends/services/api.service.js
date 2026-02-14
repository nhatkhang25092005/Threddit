import {mapResponse, mapErrResponse} from '../../../api/helper'
import {friendApi} from '../../../api/friend/friend.api'
import {delay} from "../../../utils/delaySimulator"
export const apiService = {
  getFriendshipStatus: async (username) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.getStatusWith(username)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  getFriendList: async (username = null, cursor, signal) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.getFriendList(username, cursor, signal)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  getRequestList: async (cursor, signal) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.requestsReceived(cursor, signal)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  getSentRequestList: async (cursor, signal) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.getSentRequests(cursor, signal)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  acceptRequest: async (friendshipId) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.acceptRequest(friendshipId)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  rejectRequest: async (friendshipId) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.rejectRequest(friendshipId)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  cancelRequest: async (friendshipId) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.cancelRequest(friendshipId)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  deleteFriend: async (username) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.deleteFriend(username)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  requestFriend: async (username) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.request(username)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  getMutualList: async (username, cursor, signal) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await friendApi.getMutualFriendWith(username, cursor, signal)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  getMutualNumber: async (username) => {
    try {
      const res = mapResponse(
        await friendApi.getNumberOfMutualFriendWith(username)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  getReceivedRequestCount: async () => {
    try {
      await delay(6000)
      const res = mapResponse(await friendApi.getReceivedRequestCount())

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  getSentRequestCount: async () => {
    try {
      await delay(6000)
      const res = mapResponse(await friendApi.getSentRequestCount())

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

}
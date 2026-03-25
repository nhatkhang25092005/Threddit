import { handleRequest } from '../../../api/helper'
import { friendApi } from '../../../api/friend/friend.api'

export const apiService = {
  getFriendshipStatus: async (username) =>
    handleRequest(() => friendApi.getStatusWith(username)),

  getFriendList: async (username = null, cursor, signal) =>
    handleRequest(() => friendApi.getFriendList(username, cursor, signal)),

  getRequestList: async (cursor, signal) =>
    handleRequest(() => friendApi.requestsReceived(cursor, signal)),

  getSentRequestList: async (cursor, signal) =>
    handleRequest(() => friendApi.getSentRequests(cursor, signal)),

  acceptRequest: async (friendshipId) =>
    handleRequest(() => friendApi.acceptRequest(friendshipId)),

  rejectRequest: async (friendshipId) =>
    handleRequest(() => friendApi.rejectRequest(friendshipId)),

  cancelRequest: async (username) =>
    handleRequest(() => friendApi.cancelRequest(username)),

  deleteFriend: async (username) =>
    handleRequest(() => friendApi.deleteFriend(username)),

  requestFriend: async (username) =>
    handleRequest(() => friendApi.request(username)),

  getMutualList: async (username, cursor, signal) =>
    handleRequest(() =>
      friendApi.getMutualFriendWith(username, cursor, signal)
    ),

  getMutualNumber: async (username) =>
    handleRequest(() =>
      friendApi.getNumberOfMutualFriendWith(username)
    ),

  getReceivedRequestCount: async () =>
    handleRequest(() => friendApi.getReceivedRequestCount()),

  getSentRequestCount: async () =>
    handleRequest(() => friendApi.getSentRequestCount()),
}

import { handleRequest } from '../../api/helper'
import { followApi } from '../../api/follow/follow.api'
import { follower } from './actions'

const api = {
  getFollowCount: async () =>
    handleRequest(() => followApi.getFollowCount()),

  getUserFollowCount: async (username) =>
    handleRequest(() => followApi.getUserFollowCount(username)),

  getFollowers: async (username = null, cursor, signal) =>
    handleRequest(() => followApi.getFollowers(username, cursor, signal)),

  getUserFollowers: async (username) =>
    handleRequest(() => followApi.getUserFollowers(username)),

  getFollowings: async (username, cursor, signal) =>
    handleRequest(() => followApi.getFollowings(username, cursor, signal)),

  getUserFollowings: async (username) =>
    handleRequest(() => followApi.getUserFollowings(username)),

  getFollow: async (username) =>
    handleRequest(() => followApi.getFollow(username)),

  getFollowStatus: async (username) =>
    handleRequest(() => followApi.getFollowStatus(username)),

  followUser: async (username) =>
    handleRequest(() => followApi.follow(username)),

  unfollowUser: async (username) =>
    handleRequest(() => followApi.unfollow(username)),
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
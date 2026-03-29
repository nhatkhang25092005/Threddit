import { postByIdModel } from "../models/postById.model"
import { getPostList } from "../../utils/getPostList"

import { postByIdActions } from "./postById.actions"
import { savedPostActions } from "./savedPost.actions"
import { userPostActions } from "./usersPost.actions"
import { feedsActions } from "./feeds.actions"
import { reelActions } from "./reel.actions"
import { searchActions } from "./search.actions"
export const combineActions = {
  getPostListSuccess : (dispatch, username, data) => {
    const timelineItems = Array.isArray(data) ? data : []
    const postByIdList = []

    timelineItems.forEach(item => {
      postByIdList.push(postByIdModel(item))
    })

    dispatch(postByIdActions.addPosts(postByIdList))
    dispatch(userPostActions.addTimelineIndex(username, getPostList(postByIdList)))
  },

  getSavedPostListSuccess: (dispatch, data) => {
    const timelineItems = Array.isArray(data) ? data : []
    const postByIdList = []

    timelineItems.forEach(item => {
      postByIdList.push(postByIdModel(item))
    })

    dispatch(postByIdActions.addPosts(postByIdList))
    dispatch(savedPostActions.addTimelineIndex(getPostList(postByIdList)))
  },

  getFeedSuccess: (dispatch, data) => {
    const feedItems = Array.isArray(data) ? data : []
    const postByIdList = feedItems.map((item) => postByIdModel(item))

    dispatch(postByIdActions.addPosts(postByIdList))
    dispatch(feedsActions.addTimelineIndex(getPostList(postByIdList)))
  },

  getReelSuccess: (dispatch, data) => {
    const reelItems = Array.isArray(data) ? data : []
    const postByIdList = reelItems.map((item) => postByIdModel(item))

    dispatch(postByIdActions.addPosts(postByIdList))
    dispatch(reelActions.addTimelineIndex(getPostList(postByIdList)))
  },

  getSearchSuccess: (dispatch, data, mode = "append") => {
    const searchItems = Array.isArray(data)
      ? data
      : Array.isArray(data?.content)
        ? data.content
        : []
    const searchUsers = Array.isArray(data?.users) ? data.users : []
    const postByIdList = searchItems.map((item) => postByIdModel(item))
    const timelineIndexList = getPostList(postByIdList)

    if (postByIdList.length > 0) {
      dispatch(postByIdActions.addPosts(postByIdList))
    }

    if (mode === "set") {
      dispatch(searchActions.setSearchList(timelineIndexList))
      dispatch(searchActions.setSearchUsers(searchUsers))
      return
    }

    if (timelineIndexList.length > 0) {
      dispatch(searchActions.appendSearchList(timelineIndexList))
    }

    if (searchUsers.length > 0) {
      dispatch(searchActions.appendSearchUsers(searchUsers))
    }
  }
}

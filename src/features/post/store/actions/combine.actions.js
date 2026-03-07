import { postByIdModel } from "../models/postById.model"
import { getPostList } from "../../utils/getPostList"

import { postByIdActions } from "./postById.actions"
import { savedPostActions } from "./savedPost.actions"
import { userPostActions } from "./usersPost.actions"
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
  }
}

import { postByIdModel } from "../models/postById.model"
import { timelineByIdModel } from "../models/timelineById.model"
import { getTimelineList } from "../../utils/getTimelineList"

import { postByIdActions } from "./postById.actions"
import { timelineByIdActions } from "./timelineById.actions"
import { userPostActions } from "./usersPost.actions"
export const combineActions = {
  getPostListSuccess : (dispatch, username, data) => {
    const timelineItems = Array.isArray(data) ? data : []
    let postByIdList = []
    let timeByIdList = []

    timelineItems.forEach(item => {
      postByIdList.push(postByIdModel(item))
      timeByIdList.push(timelineByIdModel(item))
    })

    dispatch(postByIdActions.addPosts(postByIdList))
    dispatch(timelineByIdActions.addTimeline(timeByIdList))
    dispatch(userPostActions.addTimelineIndex(username, getTimelineList(timelineItems)))
  }
}

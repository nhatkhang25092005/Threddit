import { ACTION_CLASS, FRIENDS_LIST_ACTIONS } from "../type"
import { createAction } from "../model/action.model"
const {ADD_FRIENDS, ADD_FRIEND, RESET_FRIEND_LIST,SET_HAS_MORE, REMOVE_FRIEND} = FRIENDS_LIST_ACTIONS

export const friendListActions = {
  addFriends: (friends) => (
    createAction(
      ACTION_CLASS.FRIEND_LIST,
      ADD_FRIENDS,
      friends
    )
  ),

  addFriend: (requester) => (
    createAction(
      ACTION_CLASS.FRIEND_LIST,
      ADD_FRIEND,
      requester
    )
  ),

  removeFriend: (username) => {
    return createAction(
      ACTION_CLASS.FRIEND_LIST,
      REMOVE_FRIEND,
      username
    )
  },

  reset: () => (
    createAction(
      ACTION_CLASS.FRIEND_LIST,
      RESET_FRIEND_LIST
    )
  ),

  setHasMore:(anyMore)=>(
    createAction(
      ACTION_CLASS.FRIEND_LIST,
      SET_HAS_MORE,
      anyMore
    )
  )
}

import { ACTION_CLASS, MUTUAL_LIST_ACTIONS } from "../type"
import { createAction } from "../model/action.model"
const { ADD_MUTUAL_FRIENDS, RESET_MUTUAL_LIST, SET_HAS_MORE } = MUTUAL_LIST_ACTIONS

export const mutualListActions = {
  addMutualFriends: (mutualFriends) => (
    createAction(
      ACTION_CLASS.MUTUAL_LIST,
      ADD_MUTUAL_FRIENDS,
      mutualFriends
    )
  ),

  reset: () => (
    createAction(
      ACTION_CLASS.MUTUAL_LIST,
      RESET_MUTUAL_LIST
    )
  ),

  setHasMore: (anyMore) => (
    createAction(
      ACTION_CLASS.MUTUAL_LIST,
      SET_HAS_MORE,
      anyMore
    )
  )
}

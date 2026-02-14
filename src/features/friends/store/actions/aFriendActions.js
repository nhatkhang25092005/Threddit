import { createAction } from "../model/action.model"
import { ACTION_CLASS, A_FRIEND_ACTIONS } from "../type"
const { REQUEST } = A_FRIEND_ACTIONS
export const aFriendActions = {
  request: (target) =>
    createAction(
      ACTION_CLASS.A_FRIEND,
      REQUEST,
      target
    )
}
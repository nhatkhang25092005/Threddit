import { BLOCK_LIST_TYPES, CLASS_TYPES } from '../type'
import { createAction } from '../../../../model/createAction.model'

export const blockListActions = {
  setBlockList: (users) => (
    createAction(
      CLASS_TYPES.BLOCK_LIST,
      BLOCK_LIST_TYPES.SET_BLOCK_LIST,
      users,
    )
  ),

  removeBlockedUser: (username) => (
    createAction(
      CLASS_TYPES.BLOCK_LIST,
      BLOCK_LIST_TYPES.REMOVE_BLOCKED_USER,
      username,
    )
  ),

  setHasMore: (hasMore) => (
    createAction(
      CLASS_TYPES.BLOCK_LIST,
      BLOCK_LIST_TYPES.SET_HAS_MORE,
      hasMore,
    )
  ),

  addBlockUser : (username) => (
    createAction(
      CLASS_TYPES.BLOCK_LIST,
      BLOCK_LIST_TYPES.ADD_BLOCKED_USER,
      username
    )
  ),

  reset : () => (
    createAction(
      CLASS_TYPES.BLOCK_LIST,
      BLOCK_LIST_TYPES.RESET,
    )
  )
}





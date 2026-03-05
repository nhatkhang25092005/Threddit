import { createAction } from "../models/action.model"
import { CLASS_TYPE, HAS_MORE } from "../type"

export const hasMoreActions = {
  initHasMore: (username, hasMore = true) => (
    createAction(
      CLASS_TYPE.HAS_MORE,
      HAS_MORE.INIT_USERS_POST_HAS_MORE,
      {username, hasMore}
    )
  ),

  setHasMoreFor: (username, hasMore) => (
    createAction(
      CLASS_TYPE.HAS_MORE,
      HAS_MORE.SET_USERS_POST_HAS_MORE,
      {username, hasMore}
    )
  ),

  setSavedHasMore:(hasMore) => (
    createAction(
      CLASS_TYPE.HAS_MORE,
      HAS_MORE.SET_SAVED_HAS_MORE,
      hasMore
    )
  )
}

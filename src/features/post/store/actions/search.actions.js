import { createAction } from "../models/action.model"
import { CLASS_TYPE, SEARCH } from "../type"

export const searchActions = {
  setSearchKeyword: (keyword = "") => (
    createAction(
      CLASS_TYPE.SEARCH,
      SEARCH.SET_SEARCH_KEYWORD,
      { keyword }
    )
  ),

  setSearchList: (timelineIndexList = []) => (
    createAction(
      CLASS_TYPE.SEARCH,
      SEARCH.SET_SEARCH_LIST,
      { timelineIndexList }
    )
  ),

  appendSearchList: (timelineIndexList = []) => (
    createAction(
      CLASS_TYPE.SEARCH,
      SEARCH.APPEND_SEARCH_LIST,
      { timelineIndexList }
    )
  ),

  setSearchUsers: (users = []) => (
    createAction(
      CLASS_TYPE.SEARCH,
      SEARCH.SET_SEARCH_USERS,
      { users }
    )
  ),

  appendSearchUsers: (users = []) => (
    createAction(
      CLASS_TYPE.SEARCH,
      SEARCH.APPEND_SEARCH_USERS,
      { users }
    )
  ),
}

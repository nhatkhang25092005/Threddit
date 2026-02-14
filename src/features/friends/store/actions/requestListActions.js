import { ACTION_CLASS, REQUEST_LIST_ACTIONS } from '../type'
import { createAction } from '../model/action.model'

const {
  ADD_REQUESTS,
  RESET_REQUEST_LIST,
  REMOVE_REQUEST,
  SET_HAS_MORE,
  SET_REQUEST_COUNT,
  DECREASE_REQUEST_COUNT
} = REQUEST_LIST_ACTIONS


export const requestListActions = {
  addRequests: (requests) =>
    createAction(
      ACTION_CLASS.REQUEST_LIST,
      ADD_REQUESTS,
      requests
    ),

  resetRequestList: () =>
    createAction(
      ACTION_CLASS.REQUEST_LIST,
      RESET_REQUEST_LIST
    ),

  removeRequest: (friendshipId) =>
    createAction(
      ACTION_CLASS.REQUEST_LIST,
      REMOVE_REQUEST,
      friendshipId
    ),
  
  setHasMore:(anyMore)=>
    createAction(
      ACTION_CLASS.REQUEST_LIST,
      SET_HAS_MORE,
      anyMore
    ),

  setRequestCount: (count) =>
    createAction(
      ACTION_CLASS.REQUEST_LIST,
      SET_REQUEST_COUNT,
      count
    ),

  decreaseRequestCount: () =>
    createAction(
      ACTION_CLASS.REQUEST_LIST,
      DECREASE_REQUEST_COUNT
    )
}

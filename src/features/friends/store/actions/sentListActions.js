import { ACTION_CLASS, SENT_LIST_ACTIONS } from '../type'
import { createAction } from '../model/action.model'

const {
  ADD_SENT_REQUEST,
  ADD_SENT_REQUESTS,
  RESET_SENT_LIST,
  REMOVE_SENT_REQUEST,
  SET_HAS_MORE,
  SET_SENT_COUNT,
  DECREASE_SENT_COUNT
} = SENT_LIST_ACTIONS


export const sentListActions = {
  addSentRequest: (request) =>
    createAction(
      ACTION_CLASS.SENT_LIST,
      ADD_SENT_REQUEST,
      request
    ),

  addSentRequests: (requests) =>
    createAction(
      ACTION_CLASS.SENT_LIST,
      ADD_SENT_REQUESTS,
      requests
    ),

  resetSentList: () =>
    createAction(
      ACTION_CLASS.SENT_LIST,
      RESET_SENT_LIST
    ),

  removeSentRequest: (friendshipId) =>
    createAction(
      ACTION_CLASS.SENT_LIST,
      REMOVE_SENT_REQUEST,
      friendshipId
    ),
  
  setHasMore:(anyMore)=>
    createAction(
      ACTION_CLASS.SENT_LIST,
      SET_HAS_MORE,
      anyMore
    ),

  setSentCount: (count) =>
    createAction(
      ACTION_CLASS.SENT_LIST,
      SET_SENT_COUNT,
      count
    ),

  decreaseSentCount: () =>
    createAction(
      ACTION_CLASS.SENT_LIST,
      DECREASE_SENT_COUNT
    )
}

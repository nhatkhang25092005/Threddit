import { ACTION_CLASS, LOADING_ACTIONS } from "../type"
import { createAction } from "../model/action.model"

const {
  GET_FRIENDSHIP_STATUS,
  GET_FRIEND_LIST,
  GET_REQUEST_LIST,
  GET_REQUEST_NUMBER,
  GET_SENT_LIST,
  GET_SENT_NUMBER,
  GET_MUTUAL_LIST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  CANCEL_REQUEST,
  DELETE_FRIEND,
  DELETE_FRIEND_GLOBAL,
  REQUEST_FRIEND
} = LOADING_ACTIONS

export const loadingActions = {
  getFriendStatus:(loading)=>(
    createAction(
      ACTION_CLASS.LOADING,
      GET_FRIENDSHIP_STATUS,
      loading
    )),
  
  getFriendList:(loading)=>(
    createAction(
      ACTION_CLASS.LOADING,
      GET_FRIEND_LIST,
      loading
    )
  ),

  getRequestList: (loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      GET_REQUEST_LIST,
      loading
    )
  ),

  getRequestNumber: (loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      GET_REQUEST_NUMBER,
      loading
    )
  ),

  getSentList: (loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      GET_SENT_LIST,
      loading
    )
  ),

  getSentNumber: (loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      GET_SENT_NUMBER,
      loading
    )
  ),

  getMutualList: (loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      GET_MUTUAL_LIST,
      loading
    )
  ),

  acceptRequest: (loading, friendshipId) => (
    createAction(
      ACTION_CLASS.LOADING,
      ACCEPT_REQUEST,
      {loading, friendshipId}
    )
  ),

  rejectRequest: (friendshipId, loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      REJECT_REQUEST,
      {loading, friendshipId}
    )
  ),

  cancelRequest: (loading, friendshipId) => (
    createAction(
      ACTION_CLASS.LOADING,
      CANCEL_REQUEST,
      {loading, friendshipId}
    )
  ),

  deleteFriend: (loading, username) => (
    createAction(
      ACTION_CLASS.LOADING,
      DELETE_FRIEND,
      {username, loading}
    )
  ),

  unfriendGlobal: (loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      DELETE_FRIEND_GLOBAL,
      {loading}
    )
  ),

  requestFriend: (loading) => (
    createAction(
      ACTION_CLASS.LOADING,
      REQUEST_FRIEND,
      loading
    )
  )
}
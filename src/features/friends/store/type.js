export const ACTION_CLASS = {
  LOADING : 'loading',
  FRIEND_LIST :'friend list',
  REQUEST_LIST:'request list',
  SENT_LIST:'sent list',
  MUTUAL_LIST:'mutual list',
  A_FRIEND:'a friend'
}

export const A_FRIEND_ACTIONS = {
  REQUEST:'request',
  SET_PENDING: 'set_pending',
  SET_FRIEND: 'set_friend',
  SET_UN_FRIEND: 'set_un_friend',
}

export const LOADING_ACTIONS = {
  GET_FRIENDSHIP_STATUS:'get friendship status',
  GET_FRIEND_LIST:'get friend list',
  GET_REQUEST_LIST:'get request list',
  GET_REQUEST_NUMBER:'get request number',
  GET_SENT_LIST:'get sent list',
  GET_SENT_NUMBER:'get sent number',
  GET_MUTUAL_LIST:'get mutual list',
  ACCEPT_REQUEST:'accept request',
  REJECT_REQUEST:'reject request',
  CANCEL_REQUEST:'cancel request',
  DELETE_FRIEND:'delete friend',
  REQUEST_FRIEND:'request friend',
  DELETE_FRIEND_GLOBAL:'delete friend global',
}

export const FRIENDS_LIST_ACTIONS = {
  DELETE_MY_FRIEND:'DELETE_MY_FRIEND ',
  ADD_MY_FRIEND:'ADD_MY_FRIEND',
  ADD_MY_FRIENDS:'ADD_MY_FRIENDS',
  ADD_FRIENDS:'ADD_FRIENDS',
  ADD_FRIEND: 'ADD_FRIEND',
  RESET_FRIEND_LIST:'RESET_FRIEND_LIST',
  SET_HAS_MORE:'set friend list has more',
  REMOVE_FRIEND: 'REMOVE_FRIEND',
}

export const REQUEST_LIST_ACTIONS = {
  ADD_REQUESTS: 'ADD_REQUESTS',
  RESET_REQUEST_LIST: 'RESET_REQUEST_LIST',
  REMOVE_REQUEST: 'REMOVE_REQUEST',
  ACCEPT_REQUEST: 'ACCEPT_REQUEST',
  REJECT_REQUEST: 'REJECT_REQUEST',
  SET_HAS_MORE:'set request list has more',
  SET_REQUEST_COUNT: 'SET_REQUEST_COUNT',
  DECREASE_REQUEST_COUNT: 'DECREASE_REQUEST_COUNT'
}

export const SENT_LIST_ACTIONS = {
  ADD_SENT_REQUEST: 'ADD_SENT_REQUEST',
  ADD_SENT_REQUESTS: 'ADD_SENT_REQUESTS',
  RESET_SENT_LIST: 'RESET_SENT_LIST',
  REMOVE_SENT_REQUEST: 'REMOVE_SENT_REQUEST',
  SET_HAS_MORE:'set sent list has more',
  SET_SENT_COUNT: 'SET_SENT_COUNT',
  DECREASE_SENT_COUNT: 'DECREASE_SENT_COUNT'
}

export const MUTUAL_LIST_ACTIONS = {
  ADD_MUTUAL_FRIENDS:'ADD_MUTUAL_FRIENDS',
  RESET_MUTUAL_LIST:'RESET_MUTUAL_LIST',
  SET_HAS_MORE:'set mutual list has more'
}

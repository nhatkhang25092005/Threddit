import { REQUEST_LIST_ACTIONS } from '../type'
import { initState } from '../reducer'

const {
  ADD_REQUESTS,
  RESET_REQUEST_LIST,
  REMOVE_REQUEST,
  SET_HAS_MORE,
  SET_REQUEST_COUNT,
  DECREASE_REQUEST_COUNT
} = REQUEST_LIST_ACTIONS

export const requestListHandler = (state, action) => {
  switch (action.type) {
    case ADD_REQUESTS:
      return {
        ...state,
        requestList: [...action.payload, ...state.requestList]
      }

    case RESET_REQUEST_LIST:
      return {
        ...state,
        requestList: initState.requestList,
      }

    case REMOVE_REQUEST:
      return {
        ...state,
        requestList: state.requestList.filter(
          (item) => item.friendshipId !== action.payload
        ),
      }
    
    case SET_HAS_MORE:
      return{
        ...state,
        hasMore:{
          ...state.hasMore,
          request_list:action.payload
        }
      }

    case SET_REQUEST_COUNT:
      return {
        ...state,
        requestCount: action.payload
      }

    case DECREASE_REQUEST_COUNT:
      return {
        ...state,
        requestCount: Math.max(0, state.requestCount - 1)
      }

    default: return state
  }
}

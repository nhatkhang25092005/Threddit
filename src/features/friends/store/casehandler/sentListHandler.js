import { SENT_LIST_ACTIONS } from '../type'
import { initState } from '../reducer'

const {
  ADD_SENT_REQUEST,
  ADD_SENT_REQUESTS,
  RESET_SENT_LIST,
  REMOVE_SENT_REQUEST,
  SET_HAS_MORE,
  SET_SENT_COUNT,
  DECREASE_SENT_COUNT
} = SENT_LIST_ACTIONS

export const sentListHandler = (state, action) => {
  switch (action.type) {
    case ADD_SENT_REQUEST:
      return {
        ...state,
        sentList: [action.payload, ...state.sentList]
      }

    case ADD_SENT_REQUESTS:
      return {
        ...state,
        sentList: [...action.payload, ...state.sentList]
      }

    case RESET_SENT_LIST:
      return {
        ...state,
        sentList: initState.sentList,
      }

    case REMOVE_SENT_REQUEST:
      return {
        ...state,
        sentList: state.sentList.filter(
          (item) => item.recipient?.username !== action.payload
        ),
      }
    
    case SET_HAS_MORE:
      return{
        ...state,
        hasMore:{
          ...state.hasMore,
          sent_list:action.payload
        }
      }

    case SET_SENT_COUNT:
      return {
        ...state,
        sentCount: action.payload
      }

    case DECREASE_SENT_COUNT:
      return {
        ...state,
        sentCount: Math.max(0, state.sentCount - 1)
      }

    default: return state
  }
}

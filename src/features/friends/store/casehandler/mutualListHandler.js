import { MUTUAL_LIST_ACTIONS } from '../type'

const { ADD_MUTUAL_FRIENDS, SET_HAS_MORE, RESET_MUTUAL_LIST } = MUTUAL_LIST_ACTIONS

export const mutualListHandler = (state, action) => {
  switch (action.type) {
    case ADD_MUTUAL_FRIENDS: {
      return {
        ...state,
        mutualList: [...state.mutualList, ...action.payload]
      }
    }

    case SET_HAS_MORE: {
      return {
        ...state,
        hasMore: {
          ...state.hasMore,
          mutual_list: action.payload
        }
      }
    }

    case RESET_MUTUAL_LIST: {
      return {
        ...state,
        mutualList: []
      }
    }

    default:
      return state
  }
}

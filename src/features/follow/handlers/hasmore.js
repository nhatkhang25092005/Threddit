import { HAS_MORE_TYPES } from '../actions'

export const hasMoreHandler = (state, action) => {
  switch (action.type) {

    case HAS_MORE_TYPES.FOLLOWER:
      return {
        ...state,
        hasMore: {
          ...state.hasMore,
          follower: action.payload
        }
      }

    case HAS_MORE_TYPES.FOLLOWING:
      return {
        ...state,
        hasMore: {
          ...state.hasMore,
          following: action.payload
        }
      }

    default:
      return state
  }
}

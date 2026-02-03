import { initState } from '../reducer'
import { RESET_TYPES } from '../actions'

export const resetHandler = (state, action) => {
  switch (action.type) {

    case RESET_TYPES.ALL:
      return initState

    case RESET_TYPES.FOLLOWER:
      return {
        ...state,
        followerList: initState.followerList
      }

    case RESET_TYPES.FOLLOWING:
      return {
        ...state,
        followingList: initState.followingList
      }

    case RESET_TYPES.HAS_MORE:
      return {
        ...state,
        hasMore: initState.hasMore
      }

    case RESET_TYPES.LOADING:
      return {
        ...state,
        loading: initState.loading
      }

    default:
      return state
  }
}

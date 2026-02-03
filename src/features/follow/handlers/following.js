import { FOLLOWING_TYPES } from '../actions'

export const followingHandler = (state, action) => {
  switch (action.type) {

    case FOLLOWING_TYPES.SET_LIST:
      return {
        ...state,
        followingList: action.payload
      }

    case FOLLOWING_TYPES.ADD:
      return {
        ...state,
        followingList: [action.payload, ...state.followingList]
      }

    case FOLLOWING_TYPES.REMOVE:
      return {
        ...state,
        followingList: state.followingList.filter(
          item => item.followee.username !== action.payload.username
        )
      }

    default:
      return state
  }
}

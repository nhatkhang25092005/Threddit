import { FOLLOWER_TYPES } from '../actions'

export const followerHandler = (state, action) => {
  switch (action.type) {

    case FOLLOWER_TYPES.SET_LIST:
      return {
        ...state,
        followerList: action.payload
      }

    case FOLLOWER_TYPES.ADD:
      return {
        ...state,
        followerList: [action.payload, ...state.followerList]
      }

    case FOLLOWER_TYPES.REMOVE:
      return {
        ...state,
        followerList: state.followerList.filter(
          item => item.follower.username !== action.payload.username
        )
      }

    case FOLLOWER_TYPES.UPDATE_CAN_FOLLOW:
      return {
        ...state,
        followerList: state.followerList.map(item =>
          item.follower.username === action.payload.username
            ? {
                ...item,
                canFollow: action.payload.canFollow
              }
            : item
        )
      }

    default:
      return state
  }
}

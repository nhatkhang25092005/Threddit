import { LOADING_TYPES } from '../actions'

export const loadingHandler = (state, action) => {
  switch (action.type) {

    case LOADING_TYPES.GET_FOLLOWER:
      return {
        ...state,
        loading: {
          ...state.loading,
          get_follower: action.payload
        }
      }

    case LOADING_TYPES.GET_FOLLOWING:
      return {
        ...state,
        loading: {
          ...state.loading,
          get_following: action.payload
        }
      }

    case LOADING_TYPES.FOLLOW:
      return {
        ...state,
        loading: {
          ...state.loading,
          start_follow: action.payload
        }
      }

    case LOADING_TYPES.CANCEL_FOLLOW:
      return {
        ...state,
        loading: {
          ...state.loading,
          cancel_follow: action.payload
        }
      }

    default:
      return state
  }
}

export const initState = {
  followerList: [],
  followingList: [],

  hasMore: {
    follower: true,
    following: true
  },

  loading: {
    get_follower: false,
    get_following: false,
    start_follow: false,
    cancel_follow: false
  }
}

export const reducer = (state, action) => {
  switch(action.type) {

    // ===== SET DATA =====
    case 'SET_FOLLOWERS':
      return {
        ...state,
        followerList: action.payload
      }

    case 'SET_FOLLOWING':
      return {
        ...state,
        followingList: action.payload
      }

    // ===== ADD =====
    case 'ADD_FOLLOWER':
      return {
        ...state,
        followerList: [action.payload, ...state.followerList]
      }

    case 'ADD_FOLLOWING':
      return {
        ...state,
        followingList: [action.payload, ...state.followingList]
      }

    // ===== HAS MORE =====
    case 'SET_HAS_MORE_FOLLOWER':
      return {
        ...state,
        hasMore: {
          ...state.hasMore,
          follower: action.payload
        }
      }

    case 'SET_HAS_MORE_FOLLOWING':
      return {
        ...state,
        hasMore: {
          ...state.hasMore,
          following: action.payload
        }
      }

    // ===== REMOVE =====
    case 'REMOVE_FOLLOWER':
      return {
        ...state,
        followerList: state.followerList.filter(
          item => item.id !== action.payload
        )
      }

    case 'REMOVE_FOLLOWING':
      return {
        ...state,
        followingList: state.followingList.filter(
          item => item.id !== action.payload
        )
      }

    // ===== LOADING =====
    case 'GET_FOLLOWER_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          get_follower: action.payload
        }
      }

    case 'GET_FOLLOWING_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          get_following: action.payload
        }
      }

    case 'START_FOLLOW_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          start_follow: action.payload
        }
      }

    case 'CANCEL_FOLLOW_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          cancel_follow: action.payload
        }
      }

    // ===== RESET =====
    case 'RESET_FOLLOW':
      return initState

    default:
      return state
  }
}

import { HAS_MORE } from "../type"

export const hasMoreHandlers = (state, action) => {
  switch(action.type){
    case HAS_MORE.INIT_USERS_POST_HAS_MORE: {
      const {username} = action.payload || {}
      if (!username) return state

      const existed = Object.prototype.hasOwnProperty.call(state.userPostHasMore, username)
      if (existed) return state

      return {
        ...state,
        userPostHasMore: {
          ...state.userPostHasMore,
          [username]:true
        }
      }
    }

    case HAS_MORE.SET_USERS_POST_HAS_MORE:{
      const {username, hasMore} = action.payload
      return{
        ...state,
        userPostHasMore:{
          ...state.userPostHasMore,
          [username]:hasMore // boolean
        }
      }
    }

    case HAS_MORE.SET_SAVED_HAS_MORE:
      return{
        ...state,
        mySavedHasMore:action.payload
      }

    case HAS_MORE.SET_FEED_HAS_MORE:
      return{
        ...state,
        feedHasMore:action.payload
      }

    case HAS_MORE.SET_REEL_HAS_MORE:
      return{
        ...state,
        reelHasMore:action.payload
      }

    case HAS_MORE.SET_SEARCH_HAS_MORE:
      return{
        ...state,
        searchHasMore:action.payload
      }

    case HAS_MORE.SET_SEARCH_USERS_HAS_MORE:
      return{
        ...state,
        searchUsersHasMore:action.payload
      }
    
    default: return state
  }
}

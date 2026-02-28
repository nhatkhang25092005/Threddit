import { HAS_MORE } from "../type"

export const hasMoreHandlers = (state, action) => {
  switch(action.type){
    case HAS_MORE.INIT_USERS_POST_HAS_MORE: {
      const {username, hasMore} = action.payload || {}
      if (!username) return state

      const existed = Object.prototype.hasOwnProperty.call(state.hasMore, username)
      if (existed) return state

      return {
        ...state,
        hasMore: {
          ...state.hasMore,
          [username]: hasMore ?? true
        }
      }
    }

    case HAS_MORE.SET_USERS_POST_HAS_MORE:{
      const {username, hasMore} = action.payload
      return{
        ...state,
        hasMore:{
          ...state.hasMore,
          [username]:hasMore // boolean
        }
      }
    }
    default: return state
  }
}

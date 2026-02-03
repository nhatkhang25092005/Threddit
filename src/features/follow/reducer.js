import { ACTION_CLASS } from "./actions"

import { followerHandler } from './handlers/follower'
import { followingHandler } from './handlers/following'
import { hasMoreHandler } from './handlers/hasmore'
import { loadingHandler } from './handlers/loading'
import { resetHandler } from './handlers/reset.js'

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
  switch (action.classType) {

    case ACTION_CLASS.FOLLOWER:
      return followerHandler(state, action)

    case ACTION_CLASS.FOLLOWING:
      return followingHandler(state, action)

    case ACTION_CLASS.HAS_MORE:
      return hasMoreHandler(state, action)

    case ACTION_CLASS.LOADING:
      return loadingHandler(state, action)

    case ACTION_CLASS.RESET:
      return resetHandler(state,action)

    default:
      return state
  }
}


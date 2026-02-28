import { CLASS_TYPE } from "../type"
import {
  loadingHandlers,
  hasMoreHandlers,
  feedsHandlers,
  postByIdHandlers,
  reactionHandlers,
  savedPostHandlers,
  timelineByIdHandlers,
  followersPostHandlers,
  usersPostHandlers
} from "../casehanlders"

export const reducer = (state, action) => {
  switch (action.actionClass) {

    case CLASS_TYPE.POST_BY_ID:
      return postByIdHandlers(state, action)

    case CLASS_TYPE.REACTION:
      return reactionHandlers(state, action)

    case CLASS_TYPE.TIMELINE_BY_ID:
      return timelineByIdHandlers(state, action)

    case CLASS_TYPE.FEEDS:
      return feedsHandlers(state, action)

    case CLASS_TYPE.FOLLOWERS_POST:
      return followersPostHandlers(state, action)

    case CLASS_TYPE.USERS_POST:
      return usersPostHandlers(state, action)

    case CLASS_TYPE.SAVED_POST:
      return savedPostHandlers(state, action)

    case CLASS_TYPE.LOADING:
      return loadingHandlers(state, action)

    case CLASS_TYPE.HAS_MORE:
      return hasMoreHandlers(state, action)

    default:
      return state
  }
}

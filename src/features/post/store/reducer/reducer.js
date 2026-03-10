import { CLASS_TYPE } from "../type"
import {
  loadingHandlers,
  hasMoreHandlers,
  feedsHandlers,
  postByIdHandlers,
  storyByIdHandlers,
  storyHandlers,
  reactionHandlers,
  savedPostHandlers,
  followersPostHandlers,
  usersPostHandlers,
  pinHandlers
} from "../casehanlders"

export const reducer = (state, action) => {
  switch (action.actionClass) {

    case CLASS_TYPE.POST_BY_ID:
      return postByIdHandlers(state, action)

    case CLASS_TYPE.STORY_BY_ID:
      return storyByIdHandlers(state, action)

    case CLASS_TYPE.STORY:
      return storyHandlers(state, action)

    case CLASS_TYPE.REACTION:
      return reactionHandlers(state, action)

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

    case CLASS_TYPE.PIN:
      return pinHandlers(state, action)

    default:
      return state
  }
}

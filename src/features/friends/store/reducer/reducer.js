import {ACTION_CLASS} from '../type'
import {
  aFriendHandler,
  loadingHandler,
  friendListHandler,
  requestListHandler,
  sentListHandler,
  mutualListHandler,
} from '../casehandler'

export const reducer = (state, action) => {
  switch(action.actionClass){
    case ACTION_CLASS.A_FRIEND: return aFriendHandler(state, action)
    case ACTION_CLASS.LOADING : return loadingHandler(state, action)
    case ACTION_CLASS.FRIEND_LIST: return friendListHandler(state, action)
    case ACTION_CLASS.REQUEST_LIST: return requestListHandler(state, action)
    case ACTION_CLASS.SENT_LIST: return sentListHandler(state, action)
    case ACTION_CLASS.MUTUAL_LIST: return mutualListHandler(state, action)
  }
}
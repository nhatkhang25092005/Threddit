import { createPerFriendLoading } from '../model/perFriendLoading.model'
import {FRIENDS_LIST_ACTIONS} from '../type'

const {
  ADD_FRIENDS,
  ADD_FRIEND,
  SET_HAS_MORE,
  RESET_FRIEND_LIST,
  REMOVE_FRIEND
} = FRIENDS_LIST_ACTIONS

export const friendListHandler = (state, action) => {
  switch(action.type){
    case ADD_FRIENDS:{
      const newFriends = action.payload
      const newPerFriendLoadingMap = {}
      newFriends.forEach(f => {
        newPerFriendLoadingMap[f.friend.username] = createPerFriendLoading(f.isFriend)
      })
      return{
        ...state,
        friendList: [...action.payload, ...state.friendList],
        loading: {
          ...state.loading,
          perFriend: {
            ...state.loading.perFriend,
            ...newPerFriendLoadingMap
          }
        }
      }
    }

    case ADD_FRIEND:
      return {
        ...state,
        friendList: [action.payload, ...state.friendList],
        loading:{
          ...state.loading,
          perFriend:{
            ...state.loading.perFriend,
            [action.payload.friend.username]: createPerFriendLoading()
          }
        }
      }

    case REMOVE_FRIEND:
      return {
        ...state,
        friendList: state.friendList.filter(
          (item) => item.friend.username !== action.payload
        ),
      }

    case SET_HAS_MORE:
      return {
        ...state,
        hasMore: {
          ...state.hasMore,
          friend_list:action.payload
        }

      }
    case RESET_FRIEND_LIST: return {
      ...state,
      friendList:[]
    }

    default: return state
  }
}
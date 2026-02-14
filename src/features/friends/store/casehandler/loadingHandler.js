import { LOADING_ACTIONS } from "../type"

const {
  GET_FRIENDSHIP_STATUS,
  GET_FRIEND_LIST,
  GET_REQUEST_LIST,
  GET_REQUEST_NUMBER,
  GET_SENT_LIST,
  GET_SENT_NUMBER,
  GET_MUTUAL_LIST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  CANCEL_REQUEST,
  DELETE_FRIEND,
  REQUEST_FRIEND,
  ACTION_ON_FRIEND,
  DELETE_FRIEND_GLOBAL
} = LOADING_ACTIONS

export const loadingHandler = (state, action) => {
  switch(action.type){
    case GET_FRIENDSHIP_STATUS:
      return{
        ...state,
        loading:{
          ...state.loading,
          get_friendship_status:action.payload
        }
      }
    case GET_FRIEND_LIST:
      return{
        ...state,
        loading:{
          ...state.loading,
          global:{
            ...state.loading.global,
            get_friend_list:action.payload
          }
        }
      }
      
    // Global loading flag for fetching request list
    case GET_REQUEST_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global:{
            ...state.loading.global,
            get_request_list: action.payload
          }
        }
      }
    // Global loading flag for fetching sent number
    case GET_SENT_NUMBER:
      return {
        ...state,
        loading: {
          ...state.loading,
          global:{
            ...state.loading.global,
            get_sent_number: action.payload
          }
        }
      }
    // Global loading flag for fetching request number
    case GET_REQUEST_NUMBER:
      return {
        ...state,
        loading: {
          ...state.loading,
          global:{
            ...state.loading.global,
            get_request_number: action.payload
          }
        }
      }

    /**
     * Updates global loading state when fetching sent request list.
     */
    case GET_SENT_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            get_sent_list: action.payload
          }
        }
      }

    /**
     * Updates global loading state when fetching mutual friends list.
     */
    case GET_MUTUAL_LIST:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            get_mutual_list: action.payload
          }
        }
      }
    
    /**
     * Updates per-request loading state when accepting a friend request.
     */
    case ACCEPT_REQUEST:{
      const {loading, friendshipId} = action.payload
      return {
        ...state,
        loading: {
          ...state.loading,
          perRequest:{
            ...state.loading.perRequest,
            [friendshipId]:{
              accept_request: loading
            }
          }
        }
      }
    }
      
    case REJECT_REQUEST:{
      const {loading, friendshipId} = action.payload
      return {
        ...state,
        loading: {
          ...state.loading,
          perRequest:{
            ...state.loading.perRequest,
            [friendshipId]:{
              reject_request: loading
            }
          }
        }
      }
    }

    /**
     * Updates per-request loading state when cancelling a sent friend request.
     */
    case CANCEL_REQUEST:{
      const {loading, friendshipId} = action.payload
      return {
        ...state,
        loading: {
          ...state.loading,
          perRequest:{
            ...state.loading.perRequest,
            [friendshipId]:{
              ...state.loading.perRequest[friendshipId],
              cancel_request:loading
            }
          }
        }
      }
    }
    
    /**
     * Updates per-friend loading state for delete-friend action.
     * Uses `username` as key to isolate loading per friend
     * and avoid conflicts between concurrent actions.
     */
    case DELETE_FRIEND:{
      const {loading, username} = action.payload
      return {
        ...state,
        loading: {
          ...state.loading,
          perFriend:{
            ...state.loading.perFriend,
            [username]:{
              ...state.loading.perFriend[username],
              delete_friend:loading
            }
          }
        }
      }
    }

    // This case handles the unfriend action on another user's profile page (global context).
    // It is separated from the unfriend action in the friend list because they have different UI contexts and loading states.
    case DELETE_FRIEND_GLOBAL:{
      const {loading} = action.payload
      return {
        ...state,
        loading: {
          ...state.loading,
          global:{
            ...state.loading.global,
            unfriend: loading
          }
        }
      }
    }

    /**
     * Updates global loading state when sending a friend request.
     */
    case REQUEST_FRIEND:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            request_friend: action.payload
          }
        }
      }
      
    
    case ACTION_ON_FRIEND:
      return {
        ...state,
        loading: {
          ...state.loading,
          action_on_friend: action.payload
        }
      }

    
    
    
    default: return state
  }
}
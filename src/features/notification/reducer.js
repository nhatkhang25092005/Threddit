import { actions } from "./actions"

export const initState = {
  allNotifications : [],
  allHasMore:true,

  unreadNotifications: [],
  unreadHasMore:true,

  unreadCount : 0,

  loading:{
    all:false,
    unread:false,
    reading:{
      id:null,
      active:false
    },
    delete:{
      id:null,
      active:false
    },
    read_all:false,
    unread_count:false
  }
}


export const reducer = (state, action) => {
  switch(action.type){

    // All Notification list
    case actions.ADD_ALL_NOTIFICATION:
      return{
        ...state,
        allNotifications:[...state.allNotifications, ...action.payload]
      }
    
    case actions.GET_ALL_NOTIFICATION_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          all:action.payload
        }
      }

    case actions.SET_HAS_MORE_ALL_NOTIFICATION:
      return{
        ...state,
        allHasMore:action.payload
      }

    // Unread Notification list
    case actions.ADD_UNREAD_NOTIFICATION:
      return{
        ...state,
        unreadNotifications:[...state.unreadNotifications, ...action.payload]
      }

    case actions.GET_UNREAD_NOTIFICATION_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          unread:action.payload
        }
      }
      
    case actions.SET_HAS_MORE_UNREAD_NOTIFICATION:
      return{
        ...state,
        unreadHasMore:action.payload
      }

    // read a notification
    case actions.READ_A_NOTIFICATION:
      return{
        ...state,
        allNotifications:state.allNotifications.map(item => (
          item.id === action.payload ? {...item, isRead:true} : item
        )),
        unreadNotifications:state.unreadNotifications.filter(n => n.id !== action.payload)
      }

    case actions.READ_A_NOTIFICATION_LOADING:
      return{
        ...state,
        loading:{
          ...state.loading,
          reading:{
            id:action.payload.id,
            active:action.payload.isLoading
          }
        }
      }

    case actions.DELETE_A_NOTIFICATION_LOADING: {
      const { loading, id } = action.payload

      return {
        ...state,
        loading: {
          ...state.loading,
          delete: {
            id: loading ? id : null,
            active: loading
          }
        }
      }
    }

    case actions.DELETE_A_NOTIFICATION: {
      const id = action.payload

      return {
        ...state,
        allNotifications: state.allNotifications.filter(n => n.id !== id),
        unreadNotifications: state.unreadNotifications.filter(n => n.id !== id)
      }
    }

    case actions.READ_ALL_LOADING: {
      const loading = action.payload

      return {
        ...state,
        loading: {
          ...state.loading,
          read_all: loading
        }
      }
    }

    case actions.SET_READ_ALL: {
      return {
        ...state,
        unreadNotifications: [],
        unreadHasMore: false,
        allNotifications: state.allNotifications.map(n => ({
          ...n,
          isRead: true
        }))
      }
    }

    case actions.GET_UNREAD_COUNT_LOADING:{
      return {
        ...state,
        loading:{
          ...state.loading,
          unread_count: action.payload
        }
      }
    }

    case actions.SET_UNREAD_COUNT:{
      return {
        ...state,
        unreadCount: action.payload
      }
    }

    case actions.INCREMENT_UNREAD_COUNT:{
      return {
        ...state,
        unreadCount: state.unreadCount + 1
      }
    }

    case actions.DECREMENT_UNREAD_COUNT:{
      return {
        ...state,
        unreadCount: Math.max(0, state.unreadCount - 1)
      }
    }

    case actions.ADD_REALTIME_NOTIFICATION:{
      return{
        ...state,
        allNotifications:[ action.payload, ...state.allNotifications],
        unreadNotifications:[action.payload, ...state.unreadNotifications ]
      }
    }

    default: return state
  }
}
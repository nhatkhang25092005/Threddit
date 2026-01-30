export const actions = {
  ADD_ALL_NOTIFICATION : "fetch notification from api",
  GET_ALL_NOTIFICATION_LOADING:"get all notification loading",
  SET_HAS_MORE_ALL_NOTIFICATION:'set the boolean value of has more',

  ADD_UNREAD_NOTIFICATION:'fetch unread notification from api',
  GET_UNREAD_NOTIFICATION_LOADING:'get unread notification loading',
  SET_HAS_MORE_UNREAD_NOTIFICATION:'set has more unread notification',

  SET_READ_ALL:'read all notification',
  READ_ALL_LOADING:'read all notification loading',

  READ_A_NOTIFICATION:'read a specific notification',
  READ_A_NOTIFICATION_LOADING:"loading in read a notification",

  DELETE_A_NOTIFICATION:'delete a notification',
  DELETE_A_NOTIFICATION_LOADING:'loading in delete a notification',

  GET_UNREAD_COUNT_LOADING:'get unread count loading',
  SET_UNREAD_COUNT:'set unread count',
  INCREMENT_UNREAD_COUNT:'increment unread count',
  DECREMENT_UNREAD_COUNT:'decrement unread count',

  ADD_REALTIME_NOTIFICATION:'ADD_REALTIME_NOTIFICATION'
}

export const notificationActions = {
  appendAllNotification : (list) => ({
    type:actions.ADD_ALL_NOTIFICATION,
    payload:list
  }),

  setHasMoreNotification : (anymore) => ({
    type:actions.SET_HAS_MORE_ALL_NOTIFICATION,
    payload:anymore
  }),

  getAllNotificationLoading : (isLoading) => ({
    type:actions.GET_ALL_NOTIFICATION_LOADING,
    payload:isLoading
  })
}

export const unreadNotificationActions = {
  appendUnreadNotification : (list) => ({
    type:actions.ADD_UNREAD_NOTIFICATION,
    payload:list
  }),

  getUnreadNotificationLoading : (isLoading) => ({
    type:actions.GET_UNREAD_NOTIFICATION_LOADING,
    payload:isLoading
  }),

  setHasMoreUnreadNotification : (anymore) => ({
    type:actions.SET_HAS_MORE_UNREAD_NOTIFICATION,
    payload:anymore
  }),
}

export const readNotificationActions = {
  setNewReadState: (id) => ({
    type:actions.READ_A_NOTIFICATION,
    payload:id
  }),

  readNotificationLoading: (isLoading, id) => ({
    type:actions.READ_A_NOTIFICATION_LOADING,
    payload:{id, isLoading}
  }),

  readAllNotificationLoading: (loading) => ({
    type: actions.READ_ALL_LOADING,
    payload: loading
  }),

  setAllAsRead: () => ({
    type: actions.SET_READ_ALL
  })
}

export const deleteNotificationActions = {
  deleteNotificationLoading: (loading, id) => ({
    type: actions.DELETE_A_NOTIFICATION_LOADING,
    payload: { loading, id }
  }),

  removeNotification: (id) => ({
    type:actions.DELETE_A_NOTIFICATION,
    payload: id
  })
}

export const unreadCountActions = {
  getUnreadCountLoading: (loading) => ({
    type: actions.GET_UNREAD_COUNT_LOADING,
    payload: loading
  }),

  setUnreadCount: (count) => ({
    type: actions.SET_UNREAD_COUNT,
    payload: count
  }),

  incrementUnreadCount: () => ({
    type: actions.INCREMENT_UNREAD_COUNT
  }),

  decrementUnreadCount: () => ({
    type: actions.DECREMENT_UNREAD_COUNT
  })
}

export const realtimeNotificationsActions = {
  addComeNotification : (notification) => ({
    type:actions.ADD_REALTIME_NOTIFICATION,
    payload:notification
  })
}


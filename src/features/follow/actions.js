// ================= ACTION CLASS =================
export const ACTION_CLASS = {
  FOLLOWER: 'FOLLOWER',
  FOLLOWING: 'FOLLOWING',
  HAS_MORE: 'HAS_MORE',
  LOADING: 'LOADING',
  RESET: 'RESET'
}

// ================= FOLLOWER TYPES =================
export const FOLLOWER_TYPES = {
  SET_LIST: 'SET_LIST',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  UPDATE_CAN_FOLLOW: 'UPDATE_CAN_FOLLOW'
}

// ================= FOLLOWING TYPES =================
export const FOLLOWING_TYPES = {
  SET_LIST: 'SET_LIST',
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}

// ================= HAS MORE TYPES =================
export const HAS_MORE_TYPES = {
  FOLLOWER: 'FOLLOWER',
  FOLLOWING: 'FOLLOWING'
}

// ================= LOADING TYPES =================
export const LOADING_TYPES = {
  GET_FOLLOWER: 'GET_FOLLOWER',
  GET_FOLLOWING: 'GET_FOLLOWING',
  FOLLOW: 'FOLLOW',
  CANCEL_FOLLOW: 'CANCEL_FOLLOW'
}

export const RESET_TYPES = {
  ALL: 'RESET/ALL',

  FOLLOWER: 'RESET/FOLLOWER_LIST',
  FOLLOWING: 'RESET/FOLLOWING_LIST',

  HAS_MORE: 'RESET/HAS_MORE',
  LOADING: 'RESET/LOADING'
}


// ================= FOLLOWER ACTIONS =================
export const follower = {
  setList: (data) => ({
    classType: ACTION_CLASS.FOLLOWER,
    type: FOLLOWER_TYPES.SET_LIST,
    payload: data
  }),

  add: (user) => ({
    classType: ACTION_CLASS.FOLLOWER,
    type: FOLLOWER_TYPES.ADD,
    payload: user
  }),

  remove: (user) => ({
    classType: ACTION_CLASS.FOLLOWER,
    type: FOLLOWER_TYPES.REMOVE,
    payload: user
  }),

  updateCanFollow: (username, canFollow) => ({
    classType:ACTION_CLASS.FOLLOWER,
    type: FOLLOWER_TYPES.UPDATE_CAN_FOLLOW,
    payload: { username, canFollow }
  })
}


// ================= FOLLOWING ACTIONS =================
export const following = {
  setList: (data) => ({
    classType: ACTION_CLASS.FOLLOWING,
    type: FOLLOWING_TYPES.SET_LIST,
    payload: data
  }),

  add: (user) => ({
    classType: ACTION_CLASS.FOLLOWING,
    type: FOLLOWING_TYPES.ADD,
    payload: user
  }),

  remove: (user) => ({
    classType: ACTION_CLASS.FOLLOWING,
    type: FOLLOWING_TYPES.REMOVE,
    payload: user
  })
}

export const hasMore = {
  follower: (bool) => ({
    classType: ACTION_CLASS.HAS_MORE,
    type: HAS_MORE_TYPES.FOLLOWER,
    payload: bool
  }),

  following: (bool) => ({
    classType: ACTION_CLASS.HAS_MORE,
    type: HAS_MORE_TYPES.FOLLOWING,
    payload: bool
  })
}

export const loading = {
  getFollower: (bool) => ({
    classType: ACTION_CLASS.LOADING,
    type: LOADING_TYPES.GET_FOLLOWER,
    payload: bool
  }),

  getFollowing: (bool) => ({
    classType: ACTION_CLASS.LOADING,
    type: LOADING_TYPES.GET_FOLLOWING,
    payload: bool
  }),

  follow: (bool) => ({
    classType: ACTION_CLASS.LOADING,
    type: LOADING_TYPES.FOLLOW,
    payload: bool
  }),

  cancelFollow: (bool) => ({
    classType: ACTION_CLASS.LOADING,
    type: LOADING_TYPES.CANCEL_FOLLOW,
    payload: bool
  })
}

export const resetFollow = {
  // ===== reset all =====
  all: () => ({
    classType: ACTION_CLASS.RESET,
    type: RESET_TYPES.ALL
  }),

  // ===== reset lists =====
  followerList: () => ({
    classType: ACTION_CLASS.RESET,
    type: RESET_TYPES.FOLLOWER
  }),

  followingList: () => ({
    classType: ACTION_CLASS.RESET,
    type: RESET_TYPES.FOLLOWING
  }),

  // ===== reset flags =====
  hasMore: () => ({
    classType: ACTION_CLASS.RESET,
    type: RESET_TYPES.HAS_MORE
  }),

  loading: () => ({
    classType: ACTION_CLASS.RESET,
    type: RESET_TYPES.LOADING
  })
}

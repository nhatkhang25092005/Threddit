// ================= TYPES =================
export const FOLLOW_TYPES = {
  // ===== DATA =====
  SET_FOLLOWERS: 'SET_FOLLOWERS',
  SET_FOLLOWING: 'SET_FOLLOWING',
  ADD_FOLLOWER: 'ADD_FOLLOWER',
  ADD_FOLLOWING: 'ADD_FOLLOWING',
  REMOVE_FOLLOWER: 'REMOVE_FOLLOWER',
  REMOVE_FOLLOWING: 'REMOVE_FOLLOWING',

  // ===== LOADING =====
  GET_FOLLOWER_LOADING: 'GET_FOLLOWER_LOADING',
  GET_FOLLOWING_LOADING: 'GET_FOLLOWING_LOADING',
  START_FOLLOW_LOADING: 'START_FOLLOW_LOADING',
  CANCEL_FOLLOW_LOADING: 'CANCEL_FOLLOW_LOADING',

  // ===== HAS MORE =====
  SET_HAS_MORE_FOLLOWER:'SET_HAS_MORE_FOLLOWER',
  SET_HAS_MORE_FOLLOWING:'SET_HAS_MORE_FOLLOWING',

  // ===== RESET =====
  RESET_FOLLOW: 'RESET_FOLLOW',
}


// ================= FOLLOWER ACTIONS =================
export const follower = {
  // ---- data ----
  setList: (data) => ({
    type: FOLLOW_TYPES.SET_FOLLOWERS,
    payload: data
  }),

  add: (user) => ({
    type: FOLLOW_TYPES.ADD_FOLLOWER,
    payload: user
  }),

  remove: (id) => ({
    type: FOLLOW_TYPES.REMOVE_FOLLOWER,
    payload: id
  }),

  // ---- loading ----
  setLoadingGet: (bool) => ({
    type: FOLLOW_TYPES.GET_FOLLOWER_LOADING,
    payload: bool
  }),

  // ---- reset ----
  reset: () => ({
    type: FOLLOW_TYPES.RESET_FOLLOW
  }),

  setHasMoreFollower: (bool)=>({ type:FOLLOW_TYPES.SET_HAS_MORE_FOLLOWER, payload:bool })
}


// ================= FOLLOWING ACTIONS =================
export const following = {
  // ---- data ----
  setList: (data) => ({
    type: FOLLOW_TYPES.SET_FOLLOWING,
    payload: data
  }),

  add: (user) => ({
    type: FOLLOW_TYPES.ADD_FOLLOWING,
    payload: user
  }),

  remove: (id) => ({
    type: FOLLOW_TYPES.REMOVE_FOLLOWING,
    payload: id
  }),

  // ---- loading ----
  setLoadingGet: (bool) => ({
    type: FOLLOW_TYPES.GET_FOLLOWING_LOADING,
    payload: bool
  }),

  // ---- reset ----
  reset: () => ({
    type: FOLLOW_TYPES.RESET_FOLLOW
  }),
  setHasMoreFollowing: (bool)=>({ type:FOLLOW_TYPES.SET_HAS_MORE_FOLLOWING, payload:bool })

}


// ================= FOLLOW ACTIONS =================
export const followAction = {
  // ---- loading ----
  startLoading: (bool) => ({
    type: FOLLOW_TYPES.START_FOLLOW_LOADING,
    payload: bool
  }),

  cancelLoading: (bool) => ({
    type: FOLLOW_TYPES.CANCEL_FOLLOW_LOADING,
    payload: bool
  }),
}

import axios from '../axios'

const BASE = import.meta.env.VITE_API_FRIENDSHIP_BASE

const REQUEST = import.meta.env.VITE_API_FRIENDSHIP_REQUEST
const RECEIVED = import.meta.env.VITE_API_FRIENDSHIP_REQUEST_RECEIVED
const SENT = import.meta.env.VITE_API_FRIENDSHIP_REQUEST_SENT
const ACCEPT = import.meta.env.VITE_API_FRIENDSHIP_ACCEPT
const REJECT = import.meta.env.VITE_API_FRIENDSHIP_REJECT
const CANCEL = import.meta.env.VITE_API_FRIENDSHIP_CANCEL

const LIST = import.meta.env.VITE_API_GET_FRIEND_LIST
const MANUAL = import.meta.env.VITE_API_FRIEND_MANUAL
const COUNT = import.meta.env.VITE_API_FRIEND_COUNT
const STATUS = import.meta.env.VITE_API_FRIEND_STATUS

export const friendApi = {
  request: (username) => {
    return axios.post(`${BASE}${REQUEST}/${username}`)
  },

  requestsReceived: (cursor, signal) => {
    return axios.get(`${BASE}${REQUEST}${RECEIVED}`,{params:{cursor}, signal})
  },

  getReceivedRequestCount: () => {
    return axios.get(`${BASE}${REQUEST}${RECEIVED}${COUNT}`)
  },

  getSentRequests: (cursor, signal) => {
    return axios.get(`${BASE}${REQUEST}${SENT}`,{params:{cursor}, signal})
  },

  getSentRequestCount: () => {
    const url = `${BASE}${REQUEST}${SENT}${COUNT}`
    return axios.get(url)
  },

  acceptRequest: (friendshipId) => {
    return axios.post(`${BASE}${REQUEST}/${friendshipId}${ACCEPT}`)
  },

  rejectRequest: (friendshipId) => {
    return axios.post(`${BASE}${REQUEST}/${friendshipId}${REJECT}`)
  },

  cancelRequest: (friendshipId) => {
    return axios.post(`${BASE}${REQUEST}/${friendshipId}${CANCEL}`)
  },

  getFriendList: (username = null, cursor, signal) => {
    const url = username
      ? `${BASE}/${username}${LIST}`
      : `${BASE}${LIST}`

    return axios.get(url,{params:{cursor},signal})
  },

  getStatusWith: (username) => {
    return axios.get(`${BASE}/${username}${STATUS}`)
  },

  deleteFriend: (username) => {
    return axios.delete(`${BASE}/${username}`)
  },

  getMutualFriendWith: (username, cursor, signal) => {
    return axios.get(`${BASE}/${username}${LIST}${MANUAL}`, { params: { cursor }, signal })
  },

  getNumberOfMutualFriendWith: (username) => {
    return axios.get(`${BASE}/${username}${LIST}${MANUAL}${COUNT}`)
  },

  getFriendNumber: (username = null) => {
    const url = username
      ? `${BASE}/${username}${LIST}${COUNT}`
      : `${BASE}${LIST}${COUNT}`

    return axios.get(url)
  }
}

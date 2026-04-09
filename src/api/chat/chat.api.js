import axios from '../axios'

const API = {
  CHAT_BASE: import.meta.env.VITE_API_CHAT_BASE,
  CHAT_ROOM: import.meta.env.VITE_API_CHAT_ROOM,
  CHAT_DIRECT: import.meta.env.VITE_API_CHAT_DIRECT
}

export const chatApi = {
  getDirectChatRoom(username){
    const url = `${API.CHAT_BASE}${API.CHAT_ROOM}${API.CHAT_DIRECT}`
    return axios.get(url, {params:{username}})
  },

  getChatRooms(signal, cursor){
    const url = `${API.CHAT_BASE}${API.CHAT_ROOM}`
    return axios.get(url, {params:{cursor}, signal})
  }
}
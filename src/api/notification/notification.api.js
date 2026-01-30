import axios from '../axios'
export const notificationApi = {
  getNotification(cursor, signal){
    return axios.get(import.meta.env.VITE_API_NOTIFICATION_GET,{
      params:{cursor},
      signal
    })
  },
  
  getUnreadNotification(cursor, signal){
    return axios.get(import.meta.env.VITE_API_NOTIFICATION_GET_UNREAD, {
      params:{cursor},
      signal
    })
  },
  
  readNotification(notificationId){
    const url = `${import.meta.env.VITE_API_NOTIFICATION_BASE}/${notificationId}${import.meta.env.VITE_API_READ_NOTIFICATION}`
    return axios.post(url)
  },

  deleteNotification(notificationId){
    const url = `${import.meta.env.VITE_API_NOTIFICATION_BASE}/${notificationId}`
    return axios.delete(url)
  },

  readAllNotification(){
    const url = `${import.meta.env.VITE_API_NOTIFICATION_READALL}`
    return axios.post(url)
  },

  getUnreadCount(){
    return axios.get(import.meta.env.VITE_API_COUNT_UNREAD_NOTIFICATION)
  },
}
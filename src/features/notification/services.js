import {mapResponse, mapErrResponse} from '../../api/helper'
// import {delay} from '../../utils/delaySimulator'
import { notificationApi } from '../../api/notification/notification.api'
export const services = {
  getNotification : async (cursor, signal) => {

    try{
      const response = mapResponse(await notificationApi.getNotification(cursor, signal))
      return{
        success:response.is_success,
        message:response.message,
        data:response.data
      }
    }
    catch(e){
      return mapErrResponse(e)
    }
  },

  getUnreadNotification: async (cursor, signal) => {
    try{
      const r = mapResponse(await notificationApi.getUnreadNotification(cursor, signal))
      return{
        success:r.is_success,
        message:r.message,
        data:r.data
      }
    }
    catch(e){
      return mapErrResponse(e)
    }
  },

  readNotification: async (id) => {
    try{
      const r = mapResponse(await notificationApi.readNotification(id))
      return{
        success:r.is_success,
        message:r.message,
        data:r.data
      }
    }
    catch(e){
      return mapErrResponse(e)
    }
  },

  deleteNotification: async (id) => {
    try {
      const r = mapResponse(await notificationApi.deleteNotification(id))
      return {
        success: r.is_success,
        message: r.message,
        data: r.data
      }
    }
    catch (e) {
      return mapErrResponse(e)
    }
  },

  readAllNotification: async () => {
    try {
      const r = mapResponse( await notificationApi.readAllNotification() )
      return {
        success: r.is_success,
        message: r.message,
        data: r.data
      }
    }
    catch (e) {
      return mapErrResponse(e)
    }
  },

  getUnreadCount: async () => {
    try {
      const r = mapResponse(await notificationApi.getUnreadCount())
      return {
        success: r.is_success,
        message: r.message,
        data: r.data
      }
    }
    catch (e) {
      return mapErrResponse(e)
    }
  }

}
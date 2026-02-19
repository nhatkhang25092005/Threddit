import { handleRequest } from '../../api/helper'
import { notificationApi } from '../../api/notification/notification.api'

export const services = {
  getNotification: async (cursor, signal) =>
    handleRequest(() => notificationApi.getNotification(cursor, signal)),

  getUnreadNotification: async (cursor, signal) =>
    handleRequest(() => notificationApi.getUnreadNotification(cursor, signal)),

  readNotification: async (id) =>
    handleRequest(() => notificationApi.readNotification(id)),

  deleteNotification: async (id) =>
    handleRequest(() => notificationApi.deleteNotification(id)),

  readAllNotification: async () =>
    handleRequest(() => notificationApi.readAllNotification()),

  getUnreadCount: async () =>
    handleRequest(() => notificationApi.getUnreadCount()),
}
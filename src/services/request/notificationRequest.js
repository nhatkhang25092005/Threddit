import { ApiResponse } from "../../class";
import { DISPLAY } from "../../constant";
import { classifyError } from "../../utils/classifyError";
import notificationApi from "../api/notificationApi"

// Get notifications
export async function handleGetNotificationsRequest(cursor = null){
    return notificationApi.getNotifications(cursor)
    .then((res) => {
        return new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data || res.data)})
    .catch((err)=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })  
}

// Mark notification as read
export async function handleMarkReadNotificationRequest(notificationId){
    return notificationApi.markReadNotification(notificationId)
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data || res.data))
    .catch((err)=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// Get unread notification
export async function handleGetUnreadNotification(){
    return notificationApi.getUnreadNotification()
    .then((res) => {
        return new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data)})
    .catch((err)=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}
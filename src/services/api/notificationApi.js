import axiosClient from "../axiosClient";

const notificationApi = {
    getNotifications: (cursor) => {
        const url = import.meta.env.VITE_API_NOTIFICATION
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    },

    markReadNotification: (notificationId) => axiosClient.post(`${import.meta.env.VITE_API_NOTIFICATION}/${notificationId}/read`),

    getUnreadNotification : () => axiosClient.get(import.meta.env.VITE_API_NOTIFICATION_UNREAD)
}

export default notificationApi
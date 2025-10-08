import axiosClient from "../axiosClient"
const userApi = {
    getUserInfo : () => axiosClient.get(import.meta.env.VITE_API_GET_USER_INFO),
    
    updateUsername : (username) => axiosClient.post(import.meta.env.VITE_API_UPDATE_USERNAME,{username}),

    changePassword : (oldPassword, newPassword, confirmedNewPassword) => axiosClient.post(import.meta.env.VITE_API_CHANGE_PASSWORD,{oldPassword, newPassword, confirmedNewPassword})
}

export default userApi
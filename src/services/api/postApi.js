import axiosClient from "../axiosClient";
const postApi = {
    // Get client post
    getClientPost : (username, cursor) => {
        const url = import.meta.env.VITE_API_POST + `/${username}` + import.meta.env.VITE_API_GET_CLIENT_POST
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    },

    // Get user' created posts
    getUserCreatedPost : (cursor) => {
        const url = import.meta.env.VITE_API_POST + import.meta.env.VITE_API_GET_MY_POST
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    },

    // get user's saved posts
    getUserSavedPost : (cursor) => {
        const url = import.meta.env.VITE_API_POST + import.meta.env.VITE_API_GET_SAVED_POST
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    },

    // save a post
    savePost : (postId) => axiosClient.post(import.meta.env.VITE_API_POST + `/${postId}` + import.meta.env.VITE_API_SAVE_POST),
    
    // unsave a post
    unSavePost : (postId) => axiosClient.delete(import.meta.env.VITE_API_POST + `/${postId}` + import.meta.env.VITE_API_SAVE_POST)
}

export default postApi
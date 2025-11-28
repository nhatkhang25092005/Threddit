import axiosClient from "../axiosClient";
const postApi = {
    // Get client post
    getClientPost : (username, cursor) => {
        const url = import.meta.env.VITE_API_POST + `/${username}` + import.meta.env.VITE_API_GET_CLIENT_POST
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    },

    searchPosts: (key) => {
        const url = import.meta.env.VITE_API_POST + `/search?key=${encodeURIComponent(key)}`;
        return axiosClient.get(url);
    },

    //Vote bài viết 
    Vote: (postId, isUpVote) => {
        const url = import.meta.env.VITE_API_POST + `/${postId}/vote/${isUpVote ? 'true' : 'false'}`;
        return axiosClient.post(url);
    },

    // Hủy vote bài viết
    cancel: (postId) => {
        const url = import.meta.env.VITE_API_POST + `/${postId}/vote`;
        return axiosClient.delete(url);
    },

    // Lấy chi tiết 1 bài viết
    getPostById: (id) => {
        const url = import.meta.env.VITE_API_POST + `/detail/${id}`;
        return axiosClient.get(url);
    },

    //Create post
    createPost: (content, mentionedUser = []) => {
        const url = import.meta.env.VITE_API_POST; 
        const body = { content };
        if (mentionedUser.length > 0) { body.mentionedUser = mentionedUser;}
        return axiosClient.post(url, body);
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
    unSavePost : (postId) => axiosClient.delete(import.meta.env.VITE_API_POST + `/${postId}` + import.meta.env.VITE_API_SAVE_POST),

    // Pin my post
    pinMyPost : (postId) => axiosClient.post(import.meta.env.VITE_API_POST + `/${postId}` + import.meta.env.VITE_API_PIN_POST),

    //unPinMyPost
    unPinMyPost : (postId) => axiosClient.delete(import.meta.env.VITE_API_POST + `/${postId}` + import.meta.env.VITE_API_PIN_POST),

    // Delete my post
    deleteMyPost : (postId) => axiosClient.delete(import.meta.env.VITE_API_POST + `/${postId}`),

    // Edit my post
    editMyPost : (postId, content, mentionedUser) => axiosClient.patch(import.meta.env.VITE_API_POST + `/${postId}`, {content, ...mentionedUser.length !==0 ? mentionedUser : null}),

    // Get feed
    getFeed : () => axiosClient.get(import.meta.env.VITE_API_POST + import.meta.env.VITE_API_GET_FEED),

    // Get following post
    getFollowingPost : (cursor) => {
        const url = import.meta.env.VITE_API_POST + import.meta.env.VITE_API_FOLLOWING
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    }
}

export default postApi
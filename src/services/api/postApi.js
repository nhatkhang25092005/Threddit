import axiosClient from "../axiosClient";
const postApi = {
    // Get client post
    getClientPost : (username, cursor) => {
        const url = import.meta.env.VITE_API_POST + `/${username}` + import.meta.env.VITE_API_GET_CLIENT_POST
        const finalUrl = cursor ? `${url}?cursor=${cursor}` : url
        return axiosClient.get(finalUrl)
    }
}

export default postApi
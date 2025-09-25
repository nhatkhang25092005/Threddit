import axiosClient from "../axiosClient";

const authApi = {
    login : () => axiosClient.post('url') // this is example
}

export default authApi
import axios from "axios"

const axiosClient = axios.create({
    baseURL:"BaseUrl", //re-config this 
    headers:{"Content-Type":"application/json"},
    withCredentials:true
})

export default axiosClient
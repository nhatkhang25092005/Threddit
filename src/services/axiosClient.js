import axios from "axios"

const axiosClient = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers:{"Content-Type":"application/json"},
    withCredentials:true
})

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
       if(error?.response?.status === 401){
         console.warn("Session expired (401), redirecting to login...");
         window.location.href = '/auth/login'
       }
       return  Promise.reject(error)
    }
)

export default axiosClient
import axios from "axios"

const axiosClient = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers:{"Content-Type":"application/json"},
    withCredentials:true
})

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        if(error?.response?.status === 401){
            console.warn("Session expired, redirecting to login...")
            alert("Bạn chưa đăng nhập? Vui lòng quay trở lại trang đăng nhập =D")
            window.dispatchEvent(new Event("unauthorized"));
        }
        return Promise.reject(error)
    }
)

export default axiosClient
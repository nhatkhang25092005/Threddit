import axios from '../axios'
export const authApi = {
  login(payload){
    return axios.post(import.meta.env.VITE_API_LOGIN,payload)
  },
  register(payload){
    return axios.post(import.meta.env.VITE_API_REGISTER,payload)
  },
  verify_account(payload){
    return axios.post(import.meta.env.VITE_API_VERIFYACCOUNT,payload)
  },
  forgot(payload){
    return axios.post(import.meta.env.VITE_API_RESET_PASSWORD, payload)
  },
  verify_reset(payload){
    return axios.post(import.meta.env.VITE_API_VERIFY_RESET_PASSWORD, payload)
  },
  google(payload){
    return axios.post(import.meta.env.VITE_API_GOOGLE, payload)
  },
  resend_code(payload){
    return axios.post(import.meta.env.VITE_API_RESEND, payload)
  }
}
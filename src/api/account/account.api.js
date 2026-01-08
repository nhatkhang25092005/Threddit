import axios from "../axios";
export const accountApi = {
  get_user_info(){
    return axios.get(import.meta.env.VITE_API_GET_USER_INFO)
  },
  signout(){
    return axios.post(import.meta.env.VITE_API_SIGNOUT)
  },
  update_username(payload){
    return axios.post(import.meta.env.VITE_API_UPDATE_USERNAME, payload)
  },
  update_password(payload){
    return axios.post(import.meta.env.VITE_API_UPDATE_PASSWORD, payload)
  },
  delete_account_request(){
    return axios.post(import.meta.env.VITE_API_DELETE_ACCOUNT_REQUEST)
  },
  delete_account_verify(payload){
    return axios.post(import.meta.env.VITE_API_DELETE_ACCOUNT_VERIFY, payload)
  }
}
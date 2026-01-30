import axios from '../axios'
export const profileApi = {
  presign_background_image(payload){
    return axios.post(import.meta.env.VITE_API_BACKGROUND_IMAGE_PRESIGN, payload)
  },
  confirm_background_image(payload){
    return axios.post(import.meta.env.VITE_API_BACKGROUND_IMAGE_CONFIRM, payload)
  },
  get_profile(username = null){
    const url = username
    ? `${import.meta.env.VITE_API_GET_PROFILE}/${username}`
    : import.meta.env.VITE_API_GET_PROFILE
    return axios.get(url)
  },
  presign_avatar_image(payload){
    return axios.post(import.meta.env.VITE_API_AVATAR_IMAGE_PRESIGN, payload)
  },
  confirm_avatar_image(payload){
    return axios.post(import.meta.env.VITE_API_AVATAR_IMAGE_CONFIRM, payload)
  },
  update_profile(payload){
    return axios.patch(import.meta.env.VITE_API_UPDATE_PROFILE, payload)
  },
  s3_aws(url, payload){
    return axios.put(url, payload.file,{
      baseURL:'',
      headers:{'Content-Type': payload.type},
      withCredentials:false
    })
  }
}
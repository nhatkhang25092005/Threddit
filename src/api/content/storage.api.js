import axios from "../axios";

const STORAGE_REQUEST_UPLOAD = import.meta.env.VITE_API_STORAGE;

export const storageApi = {
  requestMediaUpload(mediaFileNumber) {
    return axios.post(STORAGE_REQUEST_UPLOAD,{mediaFileNumber})
  },
  s3_aws(url, payload){
    return axios.put(url, payload.file,{
      baseURL:'',
      headers:{'Content-Type': payload.type},
      withCredentials:false
    })
  },
  
  updateMediaUpload(contentId, payload){
    const url = `${STORAGE_REQUEST_UPLOAD}/${contentId}`
    return axios.patch(url, payload)
  }
};

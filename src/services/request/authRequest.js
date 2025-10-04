import {DISPLAY} from "../../constant"
import authApi from "../api/authApi";
//API Response Format
class ApiResponse {

  //constructor to create a response object
  constructor(status, message, data = null, displayType = null) {
    console.log(message)
    this.status = status ?? 404;
    this.message = message ?? "Unknown Error";
    this.data = data;
    this.displayType = displayType;
  }

  //get the message from api response if success
  static getMessageFromApi(res) {
    return res?.data?.message ?? "Can not get message response";
  }

  //get the message from api error response if error
  static getMessageError(err) {
    if (!err?.response) return "Network error or no response from server";
    return err.response.data?.message ?? "Unknown error from server";
  }
  
  //check if the response is success
  isOk() {
    return this.status >= 200 && this.status < 300;
  }
}
//classifier module
function classifyError(err) {
  const message = ApiResponse.getMessageError(err);
  const status = err?.response?.status ?? 400;
  const data = err?.response?.data ?? null;
  const displayType = Array.isArray(message) ? DISPLAY.MAGIC : DISPLAY.POPUP
  return { status, displayType, message, data };
}

// Register
export async function handleRegisterRequest(email,username, password,confirmedPassword){
  return authApi.register(email, username, password, confirmedPassword)
  .then((res)=> new ApiResponse(res.status,ApiResponse.getMessageFromApi(res),res.data))
  .catch((err)=>{
      const {status,displayType,message,data} = classifyError(err)
      return new ApiResponse(status, message, data, displayType)
  })
}   

//Verify
export async function handleVerifyRequest(email, otp){
  if(!email){
    console.error("Email is null in handleVerify")
    return
  }

  if(!otp){
    console.error("Otp is null in handleVerify")
    return
  }
  return authApi.verify(email, otp)
  .then((res)=> new ApiResponse(res.status,ApiResponse.getMessageFromApi(res),res.data))
  .catch((err)=>{
      const {status,displayType,message,data} = classifyError(err)
      return new ApiResponse(status, message, data, displayType)
  })
}

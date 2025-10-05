import {DISPLAY} from "../../constant"
import authApi from "../api/authApi";
//API Response Format
class ApiResponse {

  //constructor to create a response object
  constructor(status, message, data = null, displayType = null) {
    this.status = status ?? 404;
    this.message = message ?? "Unknown Error";
    this.data = data;
    this.displayType = displayType;
    console.log("API Response:",this)
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
  if(!email){
    console.error("email can not be null in handleLoginRequest()")
    return
  }
  if(!username){
    console.error("username can not be null in handleLoginRequest()")
    return
  }
  if(!password){
    console.error("password cant not be null in handleLoginRequest()")
    return
  }
  if(!confirmedPassword){
    console.error("confirmedPassword can not be null in handleLoginRequest()")
    return
  }
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

//Login
export async function handleLoginRequest(email, password){
  if(!email){
    console.error("email can not be null in request")
    return
  }

  if(!password){
    console.error("password can not be null in request")
    return
  }

  return authApi.login(email,password)
  .then((res)=>new ApiResponse(res.status, ApiResponse.getMessageFromApi(res),res.data))
  .catch((err)=>{
    const {status, displayType, message, data} = classifyError(err)
    return new ApiResponse(status, message, data, displayType)
  })
}

//Reset Request
export async function handleResetPasswordRequest(email){
  if(!email){
    console.error("Email cant not be null in `handleResetPasswordRequest()`")
    return
  }

  return authApi.resetRequest(email)
    .then((res)=>new ApiResponse(res.status, ApiResponse.getMessageFromApi(res),res.data))
    .catch((err)=>{
      const {status, displayType, message, data} = classifyError(err)
      return new ApiResponse(status, message, data, displayType)
    })
}

//Verify reset Password
export async function handleResetPasswordVerify(email, code, newPass, confirmNewPass){
  if(!email){
    console.error("Email can not be null in `handleResetPasswordVerify()`")
    return
  }
  if(!code){
    console.error("Verify code can not be null in `handleResetPasswordVerify()`")
    return
  }
  if(!newPass){
    console.error("New password can not be null in `handleResetPasswordVerify()`")
    return
  }
  if(!confirmNewPass){
    console.error("Confirm new password can not be null in `handleResetPasswordVerify()`")
    return
  }
  return authApi.verifyResetPassword(email, code, newPass, confirmNewPass)
  .then((res)=> new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data, DISPLAY.POPUP))
  .catch((err)=>{
    const {status, displayType, message, data} = classifyError(err)
    return new ApiResponse(status, message, data, displayType)
  })
}
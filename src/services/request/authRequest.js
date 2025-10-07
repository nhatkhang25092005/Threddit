import {DISPLAY} from "../../constant"
import authApi from "../api/authApi";
import { ApiResponse } from "../../class";
import { classifyError } from "../../utils/classifyError";

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

// signout
export function handleSignoutRequest(){
  return authApi.signout()
  .then((res)=> {
    localStorage.removeItem("accessToken")
    return new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data)})
  .catch((err)=>{
    const {status, displayType, message, data} = classifyError(err)
    return new ApiResponse(status, message, data, displayType)
  })
}
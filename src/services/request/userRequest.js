import { ApiResponse } from "../../class";
import { DISPLAY } from "../../constant";
import { classifyError } from "../../utils/classifyError";
import userApi from "../api/userApi"

// Get user information
export async function handleGetUserInfoRequest(){
    return userApi.getUserInfo()
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data))
    .catch((err)=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// Update username
export async function handleUpdateUsernameRequest(username){
    return userApi.updateUsername(username)
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data, DISPLAY.POPUP))
    .catch((err)=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}
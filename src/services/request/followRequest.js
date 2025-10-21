import {DISPLAY} from "../../constant"
import followApi from "../api/followApi";
import { ApiResponse } from "../../class";
import { classifyError } from "../../utils/classifyError";

// get the follow number of another client
export async function handleGetFollowNumberOfClient(username){
    if(!username){
        console.error("username in handleGetFollowNumberOfClient can not be null!")
        return
    }
    return followApi.getFollowNumberOfClient(username)
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch((err) => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// follow a client
export async function handleFollowRequest(username){
    if(!username){
        console.error("username can not be null in handleFollowRequest")
        return
    }
    return followApi.followClient(username)
    .then((res)=> new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch((err)=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// get follow state 
export async function handleGetFollowState(username){
    if(!username){
        console.error("username can not be null in handleGetFollowState")
        return
    }
    return followApi.getFollowState(username)
    .then((res)=> new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch(err=> {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// Unfollow client
export async function handleUnFollow(username){
    if(!username){
        console.error("username can not be null in handleUnFollow")
        return
    }
    return followApi.unfollowClient(username)
    .then(res => {
        console.log("Response from unfollow")
        return new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data)})
    .catch(err=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}
import postApi from "../api/postApi";
import { ApiResponse } from "../../class";
import { classifyError } from "../../utils/classifyError";

// handle get client post request
export async function handleGetClientPost(username, cursor){
    if(!username){
        console.error("username can not be null in getClientPost")
        return
    } 
    return postApi.getClientPost(username, cursor)
    .then(res=>new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch(err=>{
         const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// handle get user's created post request
export async function handleGetUserCreatedPost(cursor){ 
    return postApi.getUserCreatedPost(cursor)
    .then(res=> new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch(err=>{
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// handle get user's saved post request
export async function handleGetUserSavedPost(cursor){
    return postApi.getUserSavedPost(cursor)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// save post
export async function handleSavePost(postId){
    if(!postId){
        console.error("Post ID can not be null in handleSavePost!")
        return
    }
    return postApi.savePost(postId)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// unsave post
export async function handleUnSavePost(postId){
    if(!postId){
        console.error("Post ID can not be null in handleUnSavePost!")
        return
    }
    return postApi.unSavePost(postId)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// create post
export async function handleCreatePost(content, mentionedUser){
    if(!content){
        console.error("Content can not be null in handleCreatePost!")
        return
    }
    return postApi.createPost(content, mentionedUser)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}


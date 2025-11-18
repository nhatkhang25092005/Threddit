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

// pin my post
export async function handlePinMyPost(postId){
    if(!postId){
        console.error("Post ID can not be null in handlePinMyPost!")
        return
    }
    return postApi.pinMyPost(postId)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })  
}

// unpin my post
export async function handleUnPinMyPost(postId){
    if(!postId){
        console.error("Post ID can not be null in handleUnPinMyPost!")
        return
    }
    return postApi.unPinMyPost(postId)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// delete my post
export async function handleDeleteMyPost(postId){
    if(!postId){
        console.error("Post ID can not be null in handleDeleteMyPost!")
        return
    }
    return postApi.deleteMyPost(postId)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })  
}

// edit my post
export async function handleEditMyPost(postId, newContent, mentionedUser){
    if(!postId){
        console.error("Post ID can not be null in handleEditMyPost!")
        return
    }
    return postApi.editMyPost(postId, newContent, mentionedUser)
    .then(res => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// get feed
export async function handleGetFeed(){
    return postApi.getFeed()
    .then(res => new ApiResponse(res.data.statusCode, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// handle get following posts
export async function handleGetFollowingPost(cursor) {
    return postApi.getFollowingPost(cursor)
    .then(res => new ApiResponse(res.data.statusCode, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// handle get detail post
export async function handleGetDetailPost(id){
    if(!id){
        console.error("Id can not be null in handleGetDetailPost method!")
        return
    }
    return postApi.getPostById(id)
    .then(res => new ApiResponse(res.data.statusCode, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch( err => {
        const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}


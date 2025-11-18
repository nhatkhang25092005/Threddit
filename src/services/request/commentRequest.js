import commentApi from "../api/commentApi"
import { ApiResponse } from "../../class";
import { classifyError } from "../../utils/classifyError";

// handle get comment list of a post
export async function handleGetComments(id, cursor){
    if(!id){
        console.error("Id can not be null in handleGetComments")
        return
    }
    return commentApi.getComments(id, cursor)
    .then(res=>new ApiResponse(res.data.statusCode, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch(err=>{
         const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// handle post a comment to a post
export async function handlePostComment(id, commentContent, mentionUser){
    if(!id){
        console.error("Id can not be null in handlePostComment")
        return
    }
    return commentApi.postComment(id, commentContent, mentionUser)
    .then(res=>new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch(err=>{
         const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// handle delete comment
export async function handleDeleteComment(postId, commentId){
    if(!postId){
        console.error("PostId can not be null in handleDeleteComment method!")
        return
    }
    if(!commentId){
        console.error("CommentId can not be null in handleDeleteComment method!")
    }
    return commentApi.deleteComment(postId, commentId)
    .then(res=>new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch(err=>{
         const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}

// Handle Edit comment
export async function handleEditComment(postId, commentId, content, mentionedUser){
    if(!postId){
        console.error("PostId can not be null in handleEditComment method!")
        return
    }
    if(!commentId){
        console.error("CommentId can not be null in handleEditComment method!")
    }
    if(!content){
        console.error("content can not be null in handleEditComment method!")
        return
    }
    return commentApi.editComment(postId, commentId, content, mentionedUser)
    .then(res=>new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data))
    .catch(err=>{
         const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}
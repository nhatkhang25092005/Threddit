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
    .then(res=>{
        console.log(res)
        return new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data)
    })
    .catch(err=>{
         const {status, message, data, displayType} = classifyError(err)
        return new ApiResponse(status, message, data, displayType)
    })
}
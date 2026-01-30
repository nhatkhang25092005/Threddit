import { useEffect, useReducer } from "react";
import { handleGetDetailPost } from "../../../services/request/postRequest";
import {convertTime} from "../../../utils/formatDate";

const initState = {
    post:null,
    loading:true,
    error:null
}

const START = 'FETCH_START'
const SUCCESS = 'FETCH_SUCCESS'
const ERROR = 'FETCH_ERROR'

function postReducer(state, action){
    switch (action.type){
        case START: return {...state, loading:true, error:null}
        case SUCCESS: return {...state, post:action.payload, loading:false, error:null}
        case ERROR: return {...state, error:action.payload, loading:false}
        default: return state
    }
}

export default function usePostData(postId){
    const [state, dispatch] = useReducer(postReducer,initState)
    
    useEffect(()=>{
        if(!postId) return
        async function fetchPost() {
            dispatch({type:START})
            try{
                const response = await handleGetDetailPost(postId)
                if(response.isOk()){
                    dispatch({
                        type:SUCCESS,
                        payload:{
                            ...response.data,
                            createdAt: convertTime(response.data.createdAt),
                            updatedAt: convertTime(response.data.updatedAt),
                        }
                    })
                }
                else{
                    dispatch({type:ERROR, payload:response.message})
                }
            }
            catch(error){
                dispatch({type:ERROR, payload:error.message})
            }
        }
        fetchPost()
    }, [postId])
    return state
}
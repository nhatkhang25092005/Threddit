import { useReducer, useRef } from "react";
import { handleGetFollowersListRequest } from "../services/request/followRequest";
const initState = {
    list : [],
    loading : false,
    anyMore : true,
    error : null
}

function reducer(state, action){
    switch(action.type){
        case 'start' : return {...state, loading:true}
        case 'success' : return{...state, loading:false, list : [...state, action.payload]}
        case 'error' : return {...state, loading:false, error:action.payload}
        case 'no_more' : return {...state, loading:false, anyMore:false}
    }
}

export default function useFollower(){
    const [state, dispatch] = useReducer(reducer, initState)
    const cursor = useRef(null)
    const fetchFollowers = async () => {
        if(!state.anyMore) return
        dispatch({type:'start'})
        try{
            const response = await handleGetFollowersListRequest('me', cursor.current)
            if(response.status === 204) dispatch({type:'no_more'})
            else if(response.isOk()){
                dispatch({type:'success', payload:response.data.followerList})
                cursor.current = response.data.cursor
            }   
            else dispatch({type:"error", payload:response.message})   
        }
        catch(e){
            console.error("Error occurs in fetchFollowings at usePostDetail:", e)
            dispatch({type:'error', payload:e.message})
        }
    }
    return {state, fetchFollowers}
}
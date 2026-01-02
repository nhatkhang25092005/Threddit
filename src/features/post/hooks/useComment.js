import { useCallback, useEffect, useReducer, useRef } from "react";
import { handleGetComments, handlePostComment } from "../../../services/request/commentRequest";
import convertTime from "../../../utils/convertTime";
import { extractUsernames } from "../../../utils/extractUsernames";

const initState = {
    // for comments list
    comments : [],
    getMoreCommentLoading : true,
    getCommentError : null,
    hasMoreComment : true,

    // for post comment
    postCmtLoading : false,
    postCmtError : null
}

const START = "start"
const SUCCESS = "success"
const ERROR = "error"
const NO_MORE = 'do not has more'
const UPDATE = 'update comments'
const EDIT = 'edit a comment'
const DELETE = 'delete a comment'
const START_POST = 'start post a comment'
const END_POST = 'end post a comment'
const ERROR_POST = 'error in post a comment'

function commentReducer(state, action){
    switch(action.type){
        case START : return {...state, getMoreCommentLoading : true}
        case SUCCESS : return {...state, comments: [...state.comments, ...action.payload.comments], getMoreCommentLoading:false }
        case ERROR : return {...state, getCommentError:action.payload, getMoreCommentLoading:false}
        case NO_MORE : return {...state, hasMoreComment:false, getMoreCommentLoading:false}
        case UPDATE : return {...state, comments : [action.payload.newComment, ...state.comments ]}
        case EDIT : return {...state, comments : action.payload.changedComments}
        case DELETE : return {...state, comments : action.payload.changedComments}
        case START_POST : return {...state, postCmtLoading : true}
        case END_POST : return {...state, postCmtLoading:false}
        case ERROR_POST : return {...state, postCmtLoading:false, postCmtError:action.payload}
        default: return state
    }
}

export default function useComment(postId){
    const [commentsState, dispatch] = useReducer(commentReducer, initState)
    const cursor = useRef(null)
    const didFetch = useRef(false)

    // Get comments
    const fetchComment = useCallback( async () => {
        dispatch({type:START})
        try{
            const response = await handleGetComments(postId, cursor.current)
            if(response.status === 204) dispatch({type:NO_MORE})
            else if(response.isOk()){
                cursor.current = response.data.cursor
                const convertedTimeList = response.data.comments.map(comment => ({
                    ...comment,
                    createdAt: convertTime(comment.createdAt),
                    updatedAt: convertTime(comment.updatedAt),
                }))
                dispatch({
                    type:SUCCESS,
                    payload:{comments:convertedTimeList}
                })
            }
            else dispatch({type:ERROR,payload:response.message})
        }
        catch(err){
            console.error(err)
            dispatch({type:ERROR, payload:err.message})
        }
    },[postId])

    // Update Comments
    const updateComment = (newComment) => dispatch({type:UPDATE, payload:{newComment}})

    // Edit a comment
    const editComment = (commentId, content) => {
        const changedComments = commentsState.comments.map(item => item.id === commentId? {...item, content : content} : item) 
        dispatch({type:EDIT, payload:{changedComments}})
    }

    // Delete a comment
    const deleteComment = (commentId) => {
        const changedComments = commentsState.comments.filter(item => item.id !== commentId)
        dispatch({type:DELETE, payload:{changedComments}})
    }

    // Create a comment
    const postComment = useCallback(async (commentInput) => {
        dispatch({type:START_POST})
        try{
            const response = await handlePostComment(postId, commentInput, extractUsernames(commentInput))
            if(!response.isOk()) {
                dispatch({type:ERROR_POST, payload:response.data.message})
                return false
            }
            else {
                dispatch({type:END_POST})
                return true
            }
        }
        catch(err){
            console.error(err)
            dispatch({type:ERROR_POST, payload:err.message})
            return false
        }
    },[postId])

    // Initialize
    useEffect(()=>{
        if(!postId || didFetch.current) return
        didFetch.current = true
        fetchComment()
    },[postId, fetchComment])

    return {commentsState, postComment, fetchComment, updateComment, editComment, deleteComment}
}
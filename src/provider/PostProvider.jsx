import { createContext, useCallback, useMemo, useState } from "react";
const PostSyncContext = createContext()
function PostProvider({children}){
    const [postsState, setPostsState] = useState({})

    const updateVote = useCallback((postId, voteData)=>{
        setPostsState(prev=>({
            ...prev,
            [postId]: {
                ...prev[postId],
                vote:{
                    isUpvote : voteData.isUpvote,
                    up:voteData.up,
                    down:voteData.down,
                    updatedAt:Date.now()
                }
            }
        }))
    },[])

    const updateSave = useCallback((postId, isSaved, saveNumber)=>{
        console.log(`updateSave: postId:${postId}, isSave:${isSaved}, saveNumber:${saveNumber}`)
        setPostsState(prev=>({
            ...prev, 
            [postId]:{
                ...prev[postId],
                save:{
                    isSaved,
                    saveNumber,
                    updatedAt:Date.now()
                }
            }
        }))
    },[])

    const updateCommentCount = useCallback((postId, commentNumber)=>{
        console.log("The comment number in provider:", commentNumber) // wrong number from the start
        setPostsState(prev=>({
            ...prev,
            [postId]:{
                ...prev[postId],
                comment:{
                    commentNumber,
                    updatedAt:Date.now()
                }
            }
        }))
    },[])

    const getPostState = useCallback((postId)=>{
        return postsState[postId] || null
    },[postsState])

    const subscribeToPost = useCallback((postId, callback)=>{
        const checkUpdate = () => {
            const state = postsState[postId]
            if(state){
                callback(state)
            }
        }
        return checkUpdate
    },[postsState])

    const value = useMemo(()=>({
        postsState,
        updateVote,
        updateSave,
        updateCommentCount,
        getPostState,
        subscribeToPost
    }),[postsState, updateVote, updateSave, updateCommentCount, getPostState, subscribeToPost])

    return(
        <PostSyncContext.Provider value={value}>
            {children}
        </PostSyncContext.Provider>
    )
}

export {PostSyncContext, PostProvider}

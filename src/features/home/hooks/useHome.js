import {useState, useEffect, useCallback, useRef} from "react"
import { handleGetFeed, handleGetFollowingPost } from "../../../services/request/postRequest"
import { Result } from "../../../class"
import { DISPLAY, ERRORS, TITLE } from "../../../constant"
import { useNotify } from "../../../hooks/useNotify"
export default function useHome(){
    const username = localStorage.getItem("username")
    const [posts, setPosts] = useState([])
    const [followingPosts, setFollowingPosts] = useState([])
    const [loadingForFeed, setLoadingForFeed] = useState(false)
    const [loadingForFollow, setLoadingForFollow] = useState(false)
    const [result, setResult] = useState(null)
    const [feedHasMore, setFeedHasMore] = useState(true)
    const [followingHasMore, setFollowingHasMore] = useState(true)
    const cursor = useRef(null)
    const notify = useNotify()
    
    const [tag, setTag] = useState(0)
    
    useEffect(()=>{
        //call to cache
        if(tag === 0) {
            setFeedHasMore(true)
            setPosts([])    
            getFeed()
        }
        if(tag === 1){ 
            cursor.current = null
            setFollowingHasMore(true)
            setFollowingPosts([])
            getFollowingPosts()}
    },[tag])

    // Get feed
    const getFeed = useCallback(async () => {
        if(loadingForFeed) return

        setLoadingForFeed(true)
        try{
            const response = await handleGetFeed()
            if(response.status === 200){
                const posts = Array.isArray(response.data) ? response.data : []
                const convertedTimeList = posts.map(post=>({
                    ...post,
                }))
                setPosts(prev=>[...prev,...convertedTimeList])
            }
            else if( response.status === 204){ 
                setFeedHasMore(false)
                setResult(new Result(DISPLAY.NOTICE, null, response.message, null))}
            else{ 
                setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))}
            }
        catch(error){
            const errorMessage =  error?.message || String(error)
            notify.popup( TITLE.ERROR, errorMessage, null)}
        finally{setLoadingForFeed(false)}
    },[loadingForFeed, notify])

    // Get following posts
    const getFollowingPosts = useCallback(async ()=>{
        if(loadingForFollow || !followingHasMore ) return
        setLoadingForFollow(true)
        try{
            const response = await handleGetFollowingPost(cursor.current)
            if(response.status === 200){
                const posts = Array.isArray(response.data.posts) ? response.data.posts : []
                const convertedTimeList = posts.map(post=>({
                    ...post,
                }))
                setFollowingPosts(prev => [...prev, ...convertedTimeList])
                cursor.current = response.data.cursor
            }
            else if (response.status === 204){setFollowingHasMore(false)}
            else{notify.popup(TITLE.ERROR, response.message)}
        }
        catch (error){
            const errorMessage =  error?.message || String(error)
            setResult(notify.popup(TITLE.ERROR, errorMessage))}
        finally{setLoadingForFollow(false)}
    },[loadingForFollow, followingHasMore, notify])

    return{
        getFollowingPosts,
        setTag,
        getFeed,
        followingPosts, 
        followingHasMore,
        posts,
        result,
        username,
        loadingForFeed,
        loadingForFollow,
        feedHasMore
    }
}
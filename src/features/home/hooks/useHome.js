import {useState, useEffect, useCallback, useRef} from "react"
import convertTime from "../../../utils/convertTime" // dung de set "n thời gian trước"
// convertTime(createAt) (createAt là dữ liệu thô trả về từ api)

//api
import { handleGetFeed, handleGetFollowingPost } from "../../../services/request/postRequest"
import { Result } from "../../../class"
import { DISPLAY, ERRORS, TITLE } from "../../../constant"
/**
 * Xử lý các login của trang home có thể bao gồm:
 * - lấy danh sách các bài viết
 * - bình luận
 * - up/down vote
 * - (mở rộng thêm tùy nhu cầu)
 */
export default function useHome(){
    const username = localStorage.getItem("username")
    const [posts, setPosts] = useState([])
    const [followingPosts, setFollowingPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [feedHasMore, setFeedHasMore] = useState(true)
    const [followingHasMore, setFollowingHasMore] = useState(true)
    const cursor = useRef(null)
    
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
        if(loading) return
        setLoading(true)
        try{
            const response = await handleGetFeed()
            if(response.status === 200){
                const convertedTimeList = response.data.map(post=>({
                    ...post,
                    createdAt : convertTime(post.createdAt),
                    updatedAt : convertTime(post.updatedAt)
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
             setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, error, null))}
        finally{setLoading(false)}
    },[loading])

    // Get following posts
    const getFollowingPosts = useCallback(async ()=>{
        if(loading || !followingHasMore ) return
        setLoading(true)
        try{
            const response = await handleGetFollowingPost(cursor.current)
            console.log(response)
            if(response.isOk()){
                const convertedTimeList = response.data.posts.map(post=>({
                    ...post,
                    createdAt : convertTime(post.createdAt),
                    updatedAt : convertTime(post.updatedAt)
                }))
                setFollowingPosts(prev => [...prev, ...convertedTimeList])
                cursor.current = response.data.cursor
            }
            else if (response.statusCode === 204){setFollowingHasMore(false)}
            else{setResult( new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))}
        }
        catch (error){setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, error))}
        finally{setLoading(false)}
    },[loading, followingHasMore])

    return{
        getFollowingPosts,
        setTag,
        getFeed,
        followingPosts, 
        followingHasMore,
        posts,
        result,
        username,
        loading,
        feedHasMore
    }
}
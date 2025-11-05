import { useLocation } from "react-router-dom"
import { 
    handleGetFollowersListRequest, 
    handleGetFollowingListRequest, 
    handleFollowRequest, 
    handleUnFollow } from "../../../services/request/followRequest"
import { useCallback, useEffect, useRef, useState } from "react"
import { Result } from "../../../class"
import { DISPLAY, TITLE } from "../../../constant"
export default function useFollowList(){
    // Actor : List owner 
    const actor = useLocation().state.target
    
    // elements of followers
    const [followers, setFollowers] = useState([])
    const [followerCursor, setFollowerCursor] = useState(null)
    const firstLoadOfFollowers = useRef(false)
    const [followersHasMore, setFollowersHasMore] = useState(true)
    
    // elements of following
    const [followings, setFollowings] = useState([])
    const [followingCursor, setFollowingCursor] = useState(null)
    const firstLoadOfFollowing = useRef(false)
    const [followingHasMore, setFollowingHasMore] =useState(true)

    // loading
    const loadingRef = useRef(false)
    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState({})

    // error display
    const [error, setError] = useState(null)

    // control state
    const [tag, setTag]=  useState(0)
    
    // get followers list
    const getFollowerList = useCallback(async () => {
        // Check loading and hasMore state before call api
        if(loadingRef.current || !followersHasMore) return

        loadingRef.current = true
        try{
            //call
            setLoading(true)
            const response = await handleGetFollowersListRequest(actor, followerCursor)
            // check if followers has more
            if(response.data === null){
                setFollowersHasMore(false)
            }

            // response is ok
            else if(response.isOk()){
                setFollowers((prev)=>[...prev, ...response.data.followerList])
                setFollowerCursor(response.data.cursor)
            }
            else setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))       
        }
        catch(err){setError(new Result(DISPLAY.POPUP, TITLE.ERROR, err, null))}
        finally{
            setLoading(false)
            loadingRef.current = false
        }
    },[actor, followerCursor, followersHasMore ])


    // get following list
    const getFollowingList = useCallback(async ()=> {
        if(loadingRef.current || !followingHasMore) return

        loadingRef.current = true
        try{
            setLoading(true)
            // call api
            const response = await handleGetFollowingListRequest(actor, followingCursor) 

             // check if followers has more
            if(response.data === null){
                setLoading(false)
                setFollowingHasMore(false)
            }

            // response is ok
            else if(response.isOk()){
                setFollowings((prev)=>[...prev, ...response.data.followingList])
                setFollowingCursor(response.data.cursor)
            }
            else setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))
        }
        catch(err){setError(new Result(DISPLAY.POPUP, TITLE.ERROR, err, null))}
        finally{
            setLoading(false)
            loadingRef.current = false
        }
    },[actor, followingCursor, followingHasMore])

    // handle follow request on follow button
    async function handleFollow(username){
        setBtnLoading(prev=>({...prev, [username]:true}))
        // call api
        const response = await handleFollowRequest(username)

        // logic for follow
        if(response.isOk()) {
            let followerData = null

            // set canFollow in followers to false
            setFollowers(prev=>{
                followerData = prev.find(item => item.follower.username === username) 
                return prev.map(item => 
                    item.follower.username === username
                    ? {...item, canFollow:false}
                    : item
                )}
            )
            if(actor === "me"){
                setFollowings(prev=>{
                    const isExisted = prev.findIndex(item=>item.followee.username===username)
                    // If this item is existed, update
                    if(isExisted !== -1){
                        return prev.map(item=>
                            item.followee.username === username
                            ? {...item, canFollow:false}
                            : item
                        )
                    }
                    // if not, append
                    else{
                        
                        if(followerData){
                            const {follower, ...restData} = followerData
                            return[
                                {
                                    ...restData,
                                    followee : follower,
                                    canFollow:false
                                },
                                ...prev
                            ]
                        }
                        return prev
                    }
                })
            }
            else{
                setFollowings(prev=>prev.map(item => 
                    item.followee.username === username
                    ? {...item, canFollow:false}
                    : item
                ))
            }
        }
        else{
            setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))
        }
        setBtnLoading(prev=>({...prev, [username]:false}))
    }

    // handle unfollow request on unfollow button
    async function UnFollow(username){
        setBtnLoading(prev=>({...prev, [username]:true}))
        const response = await handleUnFollow(username)

        if(response.isOk()){
            setFollowers(prev => prev.map(
                item => item.follower.username === username
                ? {...item, canFollow:true}
                : item      
            ))

            if (actor==="me") setFollowings(prev=>prev.filter(item => item.followee.username !== username))
            else setFollowings(prev=>prev.map(
                    item=>item.followee.username === username
                    ? {...item, canFollow:true}
                    : item
                )
            )
        }
        else{
            setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null))
        }
        setBtnLoading(prev=>({...prev, [username]:false})) 
    }

    // load data handler
    useEffect(()=>{ 
        // load followers list
        if(!firstLoadOfFollowers.current && tag === 0){
            firstLoadOfFollowers.current = true
            getFollowerList()
        }

        // load following list
        if(!firstLoadOfFollowing.current && tag === 1){
            firstLoadOfFollowing.current = true
            getFollowingList()
        }
    },[tag, getFollowerList, getFollowingList])


    return {
        actor,
        followers, 
        followings, 
        error, 
        loading,
        btnLoading,
        followersHasMore,
        followingHasMore,
        setTag, 
        handleFollow, 
        UnFollow,
        getFollowerList,
        getFollowingList
    }
}
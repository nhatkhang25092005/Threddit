import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { 
    handleGetFollowNumberOfClient, 
    handleFollowRequest,
    handleGetFollowState, 
    handleUnFollow} 
    from "../../../services/request/followRequest"

import {
    handleGetClientPost
    } from "../../../services/request/postRequest"
import { Result } from "../../../class"
import { DISPLAY, TITLE } from "../../../constant"

export default function useClientPage(){
    const clientName = useLocation().state?.clientName
    const [follower, setFollower] = useState(0)
    const [following, setFollowing] = useState(0)
    const [follow, setFollow] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cursor, setCursor] = useState(null)
   

    // first execute after rendering for basic information
    useEffect(()=>{
        getFollow()
        getFollowState()
        getCreatedPost()
    },[])

    //get user follows
    async function getFollow(){
        const response = await handleGetFollowNumberOfClient("Murad2509")
        setFollower(response.data.followerNumber)
        setFollowing(response.data.followingNumber)
        console.log(response)
    }

    // handle post follow
    async function postFollow(){
        setLoading(true)
        const response = await handleFollowRequest(clientName)
        if(response.isOk()){ setFollow(true) } 
        if(response.status === 429){ setError(new Result(DISPLAY.DISABLE))}
        else{ setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message ))}
        setLoading(false)
        return
    }

    // Unfollow this client
    async function postUnFollow(){
        setLoading(true)
        const response = await handleUnFollow(clientName)
        if(response.isOk()){ setFollow(false) }
        if(response.status === 429){ setError(new Result(DISPLAY.DISABLE))}
        else{ setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message ))}
        setLoading(false)
        return
    }

    // get the follow state of this client
    async function getFollowState(){
        const response = await handleGetFollowState(clientName)
        console.log(response)
        if(response.isOk()){
            setFollow(response.data.isFollow)
        }
    }

    async function getCreatedPost(){
        const response = await handleGetClientPost(clientName, cursor)
        console.log(response)
    }

    // Hard code for testing
    const posts = [
        {
            content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            createdAt:"now"
        }
    ]
    return {loading, clientName, follower, following, posts, postFollow, error, follow, postUnFollow}
}
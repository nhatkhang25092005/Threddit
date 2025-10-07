import { useState } from "react"
import { DISPLAY, ROUTES, TITLE } from "../../../constant"
import { handleSignoutRequest } from "../../../services/request/authRequest"
import { replace, useNavigate } from "react-router-dom"
import { handleGetUserInfoRequest, handleUpdateUsernameRequest } from "../../../services/request/userRequest"
import {validChangeUsername} from "../../../utils/validation"
import { Result } from "../../../class"

export default function useProfile(){
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({email:"", username:""})
    const [result, setResult] = useState(null)
    const navigate = useNavigate()

    //sign out
    const signout = async () => {
        setLoading(true)
        const response = await handleSignoutRequest()
        if(response.isOk) navigate(ROUTES.LOGIN, replace)
        setLoading(false)
    }

    //get user information
    const getUserInfo = async () => {
        setLoading(true)
        const response = await handleGetUserInfoRequest()
        console.log(response)
        if(response.isOk()) {
            const {email, username} = response.data.data
            setUserInfo({email, username})
        }
        setLoading(false)
    }

    // change username
    const saveChange = async (oldUsername, newUsername) => {
        console.log("save change")
        console.log(oldUsername, newUsername)
        setResult(null)
        // no change if old username equals new username
        if(oldUsername === newUsername) return
        console.log("changed")

        //validate
        const validResult = validChangeUsername(newUsername)
        if(typeof validResult === "object" && validResult !== null){
            setResult(new Result(DISPLAY.POPUP, TITLE.CHANGE_NAME_FAIL, validResult.username))
            return
        }

        console.log("validated")

        //call api to change username
        setLoading(true)
        const response = await handleUpdateUsernameRequest(newUsername)
        if(response.isOk()) {
            setResult(new Result(DISPLAY.POPUP, TITLE.CHANGE_NAME_SUCCESS, response.message))
            getUserInfo()
        }
        else setResult(new Result(DISPLAY.POPUP, TITLE.CHANGE_NAME_FAIL, response.message) )
        setLoading(false)
    }

    return{signout, getUserInfo, saveChange ,result, userInfo, loading}
}
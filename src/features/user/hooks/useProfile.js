import { useState } from "react"
import { DISPLAY, ROUTES, TEXT, TITLE } from "../../../constant"
import { handleGetUserInfoRequest, handleUpdateUsernameRequest } from "../../../services/request/userRequest"
import {validChangeUsername} from "../../../utils/validation"
import { Result } from "../../../class"
import { handleSignoutRequest } from '../../../services/request/authRequest';  
import { useNavigate } from "react-router-dom"

export default function useProfile(){
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({email:"", username:""})
    const [result, setResult] = useState(null) 
    const navigate = useNavigate()

    //get user information
    const getUserInfo = async () => {
        setLoading(true)
        const response = await handleGetUserInfoRequest()
        if(response.isOk()) {
            const {email, username} = response.data.data
            setUserInfo({email, username})
        }
        setLoading(false)
    }

    const logout = async () => {
        const response =await handleSignoutRequest()
        if(response.isOk()){
            localStorage.clear()
            navigate(ROUTES.LOGIN) 
        }
    }

    // change username
    const saveChange = async (oldUsername, newUsername) => {
        setResult(null)
        // no change if old username equals new username
        if(oldUsername === newUsername) return

        //validate
        const validResult = validChangeUsername(newUsername)
        if(typeof validResult === "object" && validResult !== null){
            setResult(new Result(DISPLAY.POPUP, TITLE.CHANGE_NAME_FAIL, validResult.username))
            return
        }

        //call api to change username
        setLoading(true)
        const response = await handleUpdateUsernameRequest(newUsername)
        if(response.isOk()) {
            setResult(new Result(DISPLAY.POPUP, TITLE.CHANGE_NAME_SUCCESS, TEXT.CHANGE_NAME_SUCCESS, () => logout()))
        }
        else setResult(new Result(DISPLAY.POPUP, TITLE.CHANGE_NAME_FAIL, response.message) )
        setLoading(false)
    }

    return{getUserInfo, saveChange ,result, userInfo, loading}
}
import { useState } from "react"
import { DISPLAY, ROUTES, TEXT, TITLE } from "../../../constant"
import { handleGetUserInfoRequest, handleUpdateUsernameRequest } from "../../../services/request/userRequest"
import {validChangeUsername} from "../../../utils/validation"
import { handleSignoutRequest } from '../../../services/request/authRequest';  
import { useNavigate } from "react-router-dom"
import { useNotify } from "../../../hooks/useNotify"

export default function useProfile(){
    const [userInfo, setUserInfo] = useState({email:"", username:""})
    const [result, setResult] = useState(null) 
    const navigate = useNavigate()
    const notify = useNotify()

    //get user information
    const getUserInfo = async () => {
        notify.loading(true)
        const response = await handleGetUserInfoRequest()
        if(response.isOk()) {
            const {email, username} = response.data.data
            setUserInfo({email, username})
        }
        notify.loading(false)
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
            notify.popup(TITLE.CHANGE_NAME_FAIL, validResult.username)
            return
        }

        //call api to change username
        notify.loading(true)
        const response = await handleUpdateUsernameRequest(newUsername)
        if(response.isOk()) {
            notify.popup(TITLE.CHANGE_NAME_SUCCESS, TEXT.CHANGE_NAME_SUCCESS, () => logout())
        }
        else notify.popup(TITLE.CHANGE_NAME_FAIL, response.message)
        notify.loading(false)
    }

    return{getUserInfo, saveChange ,result, userInfo}
}
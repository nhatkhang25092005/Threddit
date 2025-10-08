import {validChangePassword} from "../../../utils/validation";
import { useState } from "react";
import {handleChangePasswordRequest} from "../../../services/request/userRequest"
import { Result } from "../../../class";
import { DISPLAY, ROUTES, TEXT, TITLE } from "../../../constant";
import { replace, useNavigate } from "react-router-dom";
export default function useChangePassword(){
    const navigate = useNavigate()
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleLogout =async () => {
        localStorage.removeItem("accessToken")
        navigate(ROUTES.LOGIN, replace) 
    }

    const changePassword = async  (data) => {
        const validResult = validChangePassword(data)
        if(typeof validResult === "object" && validResult !== null){
            setResult(validResult)
            return
        }
        else{
            setLoading(true)
            const res = await handleChangePasswordRequest(data.oldPassword, data.newPassword, data.confirmPass)
            setResult(res.isOk()
                ? new Result(DISPLAY.POPUP, TITLE.CHANGE_PASSWORD_SUCCESS, TEXT.CHANGE_PASSWORD_SUCCESSFULLY, () => handleLogout())
                : new Result(DISPLAY.POPUP, TITLE.CHANGE_PASSWORD_FAIL, res.message)
            )
            setLoading(false)
        }
    }
    return {changePassword, result, loading}
}
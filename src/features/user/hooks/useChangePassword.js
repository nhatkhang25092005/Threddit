import {validChangePassword} from "../../../utils/validation";
import { useState } from "react";
import {handleChangePasswordRequest} from "../../../services/request/userRequest"
import { ROUTES, TEXT, TITLE } from "../../../constant";
import { replace, useNavigate } from "react-router-dom";
import { handleSignoutRequest } from '../../../services/request/authRequest';
import { useNotify } from "../../../hooks/useNotify";
export default function useChangePassword(){
    const navigate = useNavigate()
    const [result, setResult] = useState(null);
    const notify = useNotify()

    const handleLogout = async () => {
        const response = await handleSignoutRequest()
        if(response.isOk()){
            localStorage.clear()
            navigate(ROUTES.LOGIN, replace)
        }
    }

    const changePassword = async  (data) => {
        const validResult = validChangePassword(data)
        if(typeof validResult === "object" && validResult !== null){
            setResult(validResult)
            return
        }
        else{
            notify.loading(true)
            const res = await handleChangePasswordRequest(data.oldPassword, data.newPassword, data.confirmPass)
            res.isOk()
                ? notify.popup(TITLE.CHANGE_PASSWORD_SUCCESS, TEXT.CHANGE_PASSWORD_SUCCESSFULLY,null, () => handleLogout())
                : notify.popup(TITLE.CHANGE_PASSWORD_FAIL, res.message)
            notify.loading(false)
        }
    }
    return {changePassword, result}
}
import { useState } from "react"
import { handleResetPasswordRequest } from "../../../services/request/authRequest"
import { validResetRequest } from "../../../utils/validation"
import { replace, useNavigate } from "react-router-dom"
import { Result } from "../../../class"
import { DISPLAY, ROUTES, TITLE } from "../../../constant"
import { useNotify } from "../../../hooks/useNotify"
export default function useForgot(){
    const navigate = useNavigate()
    const [result, setResult] = useState(null)
    const notify = useNotify()

    const forgot = async (email) => {
        setResult(null)
        const validResult = validResetRequest(email)
        if(typeof validResult === "object" && validResult !== null){
            setResult(validResult)
            return
        }
        else{
            notify.loading(true)
            const res = await handleResetPasswordRequest(email)
            setResult(res.isOk() ? navigate(ROUTES.RESET_PASSWORD_VERIFY,{state:{forgotEmail : email}, replace}) : notify.popup(TITLE.RESET_PASSWORD_REQUEST,res.message))
            notify.loading(false)
        }
    }
    
    return{result, forgot}
}
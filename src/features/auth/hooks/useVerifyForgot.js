import { replace, useLocation, useNavigate } from "react-router-dom"
import { ERRORS, DISPLAY, TITLE, TEXT, ROUTES } from "../../../constant"
import { Result } from "../../../class"
import { useState, useEffect } from "react"
import { validVerifyReset } from "../../../utils/validation"
import { handleResetPasswordVerify } from "../../../services/request/authRequest"
export default function useVerifyForgot(){
    const email = useLocation()?.state?.forgotEmail
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //Check email is existed, if not, redirect to forgot page =)
    useEffect(()=>{
        if(!email){
        console.error("Email for verify reset password is null!")
        setResult(new Result(DISPLAY.POPUP, TITLE.ERROR, ERRORS.EMAIL_NULL +" "+TEXT.RECOMMEND_TO_BACK_TO_FORGOT_PAGE,()=>navigate(ROUTES.FORGOT,replace)))
        return
    }
    },[email,navigate])

    const verifyReset = async (formData) => {
        setResult(null)
        const validResult = validVerifyReset({...formData, email})
        if(typeof validResult === "object" && validResult !== null){
            setResult(validResult)
            return
        }
        else{
            setLoading(true)
            const response = await handleResetPasswordVerify(email, formData.code, formData.newPassword,formData.confirmPassword)
            setResult(
                response.isOk() 
                ? new Result(DISPLAY.POPUP,TITLE.RESET_PASSWORD_SUCCESSFULLY,TEXT.RESET_PASSWORD_SUCCESSFULLY,()=>navigate(ROUTES.LOGIN,replace)) 
                : new Result(DISPLAY.POPUP,TITLE.RESET_PASSWORD_FAIL,response.message))
            setLoading(false)
        }
        
    }
    return{verifyReset, result, loading}
}
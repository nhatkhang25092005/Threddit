import { replace, useLocation, useNavigate } from "react-router-dom"
import { ERRORS, DISPLAY, TITLE, TEXT, ROUTES } from "../../../constant"
import { useState, useEffect } from "react"
import { validVerifyReset } from "../../../utils/validation"
import { handleResetPasswordVerify } from "../../../services/request/authRequest"
import { useNotify } from "../../../hooks/useNotify"
export default function useVerifyForgot(){
    const email = useLocation()?.state?.forgotEmail
    const [result, setResult] = useState(null)
    const navigate = useNavigate()
    const notify = useNotify()

    //Check email is existed, if not, redirect to forgot page =)
    useEffect(()=>{
        if(!email){
        console.error("Email for verify reset password is null!")
        notify.popup(TITLE.ERROR, ERRORS.EMAIL_NULL +" "+TEXT.RECOMMEND_TO_BACK_TO_FORGOT_PAGE, 'Back to forgot password page',()=>navigate(ROUTES.FORGOT,replace))
        return
    }
    },[email, navigate, notify])

    const verifyReset = async (formData) => {
        setResult(null)
        const validResult = validVerifyReset({...formData, email})
        if(typeof validResult === "object" && validResult !== null){
            setResult(validResult)
            return
        }
        else{
            notify.loading(true)
            const response = await handleResetPasswordVerify(email, formData.code, formData.newPassword,formData.confirmPassword)
            response.isOk()
                ? notify.popup(TITLE.RESET_PASSWORD_SUCCESSFULLY,TEXT.RESET_PASSWORD_SUCCESSFULLY, "Đi tới trang đăng nhập",()=>navigate(ROUTES.LOGIN,replace)) 
                : notify.popup(TITLE.RESET_PASSWORD_FAIL,response.message)
            notify.loading(false)
        }
        
    }
    return{verifyReset, result}
}
import { useInput} from "../../../hooks/useInput"
import { useState } from "react"
import { modal } from "../../../constant/text/vi/modal"
import { useNotify } from "../../../hooks/useNotify"
import { verifyAccountService } from "./verifyAccount.service"
export default function useVerifyAccount(email, onNavigate){
  const notify = useNotify()
  const [otp, onChange] = useInput({otp:''})
  const [loading, setLoading] = useState(false)
  const submit = async () => {
    const response = await notify.withLoading(
      () => verifyAccountService({otp:otp.otp, email}),
      setLoading)
    console.log(response)
    if(!response.success){
      if(response.invalids){
        onNavigate('register')
        console.error('email is expected in useVerifyAccount!')
        return
      }
      notify.popup(modal.title.error, response.message)
    }
    else{
      notify.popup(modal.title.success.verify, response.message, modal.button.back_to_login, () => onNavigate('login'))
    }
  }
  return {otp, onChange, submit, loading}
}
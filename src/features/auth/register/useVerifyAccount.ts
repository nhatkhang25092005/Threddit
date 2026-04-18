import { useInput} from "../../../hooks/useInput"
import { useEffect, useState } from "react"
import { modal } from "../../../constant/text/vi/modal"
import { useNotify } from "../../../hooks/useNotify"
import { verifyAccountService } from "./verifyAccount.service"
import {useCountdown} from '../../../hooks/useCountdown'
import type { UseVerifyAccountReturn, VerifyAccountProps } from "./types/ui"

export default function useVerifyAccount(
  email: VerifyAccountProps["email"],
  onNavigate: VerifyAccountProps["onNavigate"]
):UseVerifyAccountReturn{
  const notify = useNotify()
  const [otp, onChange] = useInput({otp:''})
  const [loading, setLoading] = useState<{submit:boolean, resend:boolean}>({
    submit:false,
    resend:false
  })

  const {countdown, startCountdown} = useCountdown()

  useEffect(() => {
    if(email){
      startCountdown(60)
    }
  }, [email, startCountdown])

  const submit = async () => {
    const response = await notify.withLoading(
      () => verifyAccountService.submit({otp:otp.otp, email}),
      (bool) => setLoading(prev=>({...prev,submit:bool})))

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

  const resend = async () => {
    const response = await notify.withLoading(
      () => verifyAccountService.resend(email),
      (bool) => setLoading(prev=>({...prev, resend:bool}))
    )

    if(!response.success){
      notify.popup(modal.title.error, response.message)
    }
    else{
      startCountdown(60)
    }
  }
  return {
    otp,
    onChange,
    submit,
    countdown,
    loading,
    resend}
}

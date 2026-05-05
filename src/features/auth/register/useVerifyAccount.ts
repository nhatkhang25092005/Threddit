import { useInput} from "../../../hooks/useInput"
import { useEffect, useState } from "react"
import { modal } from "../../../constant/text/vi/modal"
import { useNotify } from "../../../hooks/useNotify"
import { verifyAccountService } from "./verifyAccount.service"
import {useCountdown} from '../../../hooks/useCountdown'
import type { UseVerifyAccountReturn, VerifyAccountProps } from "./types/ui"
import { createVerifyAccountHandlers } from "./verifyAccount.handlers"

export default function useVerifyAccount(
  email: VerifyAccountProps["email"],
  onNavigate: VerifyAccountProps["onNavigate"]
):UseVerifyAccountReturn {
  const notify = useNotify()
  const [otp, onChange] = useInput({otp:''})
  const [loading, setLoading] = useState<{submit:boolean, resend:boolean}>({
    submit:false,
    resend:false
  })
  const {countdown, startCountdown} = useCountdown()
  const handlers = createVerifyAccountHandlers({notify, onNavigate})
  
  useEffect(() => {
    if(email){
      startCountdown(60)
    }
  }, [email, startCountdown])

  const setSubmitLoading = (isLoading: boolean) =>
    setLoading((prev) => ({...prev, submit: isLoading}))

  const setResendLoading = (isLoading: boolean) =>
    setLoading((prev) => ({...prev, resend: isLoading}))


  const submit = async () => {
    const response = await notify.withLoading(
      () => verifyAccountService.submit({otp:otp.otp, email}),
      setSubmitLoading
    )

    if(!response.is_success) return handlers.handleSubmitError(response)
    
    else notify.popup(
      modal.title.success.verify,
      response.message,
      modal.button.back_to_login,
      () => onNavigate('login')
    )
  }

  const resend = async () => {
    const response = await notify.withLoading(
      () => verifyAccountService.resend(email),
      setResendLoading
    )

    if(!response.is_success)
      handlers.handleInvalidOtp(response)

    else startCountdown(60)
  }
  return {
    otp,
    onChange,
    submit,
    countdown,
    loading,
    resend
  }
}

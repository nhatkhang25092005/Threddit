import { VerifyAccountHandlers } from "./types/models";
import { modal } from "@/constant/text/vi/modal";
import type { ResentServiceResult, VerifyAccountServiceResult } from "./types/result";

export function createVerifyAccountHandlers({
  notify,
  onNavigate
}: VerifyAccountHandlers){

  const handleInvalidEmail = (message: string) => {
    notify.popup(modal.title.error, message)
    onNavigate('register')
  }

  const handleInvalidOtp = (response: ResentServiceResult): void => {
    if(response.kind === 'validation_error'){
      notify.popup(modal.title.error, response.invalids.email)
      onNavigate('register')
      console.error('email is expected to resent Otp!')
      return
    }
    notify.popup(modal.title.error, response.message)
  }

  const handleSubmitError = (response: VerifyAccountServiceResult): void => {
    if (response.kind === 'validation_error'){
      if (response.invalids.email) return handleInvalidEmail(response.invalids.email)
      if (response.invalids.otp){
        notify.popup(modal.title.error, response.invalids.otp)
        return
      }
    }
    notify.popup(modal.title.error, response.message)
  }
  
  return{
    handleInvalidOtp,
    handleSubmitError
  }
}
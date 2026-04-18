import { AUTH_TEXT } from "../../../constant/text/vi/auth"
import { pattern } from "../../../constant/pattern"
import type {
  RegisterValidation,
  RegisterForm,
  RegisterInvalids,
  VerifyAccountForm,
  VerifyAccountInvalids,
  VerifyAccountValidation,
  ResentValidation
} from "./types/models"
export const validateRegister = (form: RegisterForm): RegisterValidation => {
  const error = AUTH_TEXT.register.error
  const {username, email, password, repass} = form
  let status = true
  const invalids: RegisterInvalids = {}
  if(!(password.trim() === repass.trim())){
    status = false
    invalids.repass = error.not_match
  }

  if(!pattern.email.test(email)){
    status = false
    invalids.email = error.pattern_email
  }

  if(username.includes(' ')){
    status = false
    invalids.username = error.username_space
  }

  if(!pattern.password.test(password)){
    status=false
    invalids.password = error.pattern_password
  }

  if(!status){
    return {success: false, invalids}
  }
  return {success: true}
}

export const validateVerifyAccount = (form: VerifyAccountForm): VerifyAccountValidation => {
    const {email, otp} = form
    const error = AUTH_TEXT.verify_account.error
    let status = true
    const invalids : VerifyAccountInvalids = {}
    if(!pattern.email.test(email)){
      status = false
      invalids.email =  error.pattern_email
    }
    if(otp.length !== 6){
      status = false
      invalids.otp = error.pattern_otp
    }
    if(!status){
      return{
        success:false,
        invalids
      }
    }

    return{ success:true }
}

export const validateResent = (email: string): ResentValidation => {
  const error:string = AUTH_TEXT.resent.error.pattern_email
  if(!pattern.email.test(email)){
    return{
      success:false,
      invalids:{email:error}
    }
  }
  return {success:true}
}
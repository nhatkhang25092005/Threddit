import { AUTH_TEXT } from "../../../constant/text/vi/auth"
import { pattern } from "../../../constant/pattern"
import type {
  RegisterValidation,
  RegisterForm,
  RegisterInvalids
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
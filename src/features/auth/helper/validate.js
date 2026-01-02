import { AUTH_TEXT } from "../../../constant/text/vi/auth"
import { pattern } from "../../../constant/pattern"
export const validate = {
  
  register : (form) => {
    const error = AUTH_TEXT.register.error
    const {username, email, password, repass} = form
    let status = true
    const invalids = {}
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
    return {
      success:status,
      ...(Object.keys(invalids).length > 0 && {invalids})
    }
  },

  login: (form)=>{
    const error = AUTH_TEXT.login.error
    const {email, password} = form
    const invalids = {}
    let status = true
    if(!pattern.email.test(email)){
      status = false,
      invalids.email = error.pattern_email
    }
    if(!pattern.password.test(password)){
      status = false,
      invalids.password = error.pattern_password
    }
    return{
      success:status,
      ...(Object.keys(invalids).length > 0 && {invalids})
    }
  },

  verify_account: (email)=>{
    const error = AUTH_TEXT.verify_account.error
    let status = true
    const invalids = {}
    if(!pattern.email.test(email)){
      status = false
      invalids.email =  error.pattern_email
    }

    return{
      success:status,
      ...(Object.keys(invalids).length > 0 && {invalids})
    }
  },

  forgot:(email)=>{
    let status = true
    const invalids = {}
    if(!pattern.email.test(email)){
      status = false
      invalids.email = AUTH_TEXT.forgot.error.pattern_email
    }
    return{
      success:status,
      ...(Object.keys(invalids).length > 0 && {invalids})
    }
  },

  verify_reset_password : (form) => {
    const {newPassword, confirmPassword} = form
    const error = AUTH_TEXT.verify.error
    let status = true
    let invalids = {}

    if(!pattern.password.test(newPassword)){
      status = false
      invalids.new_pass = error.pattern_password
    }

    if(!(newPassword.trim() === confirmPassword.trim())){
      status = false
      invalids.confirm = error.not_match
    }

    return {
      success:status,
      ...(Object.keys(invalids).length > 0 && {invalids})
    }
  }
}
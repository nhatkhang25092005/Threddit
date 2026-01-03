import { validate } from "../helper/validate"
import { authApi } from "../../../api/auth/auth.api"
import { mapResponse, mapErrResponse } from "../../../api/helper"
import { mapResendVerifyCode, mapVerifyAccountPayload } from "../../../api/auth/auth.mapper"
export const verifyAccountService = {
  submit:async (data) => {
    const validation = validate.verify_account(data.email)
    if(!validation.success){
      return validation
    }

    const payload = mapVerifyAccountPayload(data)
    try{
      const res = mapResponse(await authApi.verify_account(payload))
      return{
        success:res.is_success,
        message:res.message
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return{
        success:err.is_success,
        message:err.message
      }
    }
  },
  resend: async (email) => {
    const payload = mapResendVerifyCode(email)
    
    try{
      const response = mapResponse(await authApi.resend_code(payload))
      console.log(response)
      return {
        success:response.is_success,
        message:response.message
      }
    }
    catch(e){
      const err = mapErrResponse(e)
      return{
        success:err.is_success,
        message:err.message
      }
    }
  }
}
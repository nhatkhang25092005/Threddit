import { validate } from "../helper/validate"
import { authApi } from "../../../api/auth/auth.api"
import { mapResponse, mapErrResponse } from "../../../api/helper"
import { mapVerifyResetPassword } from "../../../api/auth/auth.mapper"

export const verifyService = async (form)=>{
  const validation = validate.verify_reset_password(form)
  if(!validation.success){
    return validation
  }

  const payload = mapVerifyResetPassword(form)

  try{
    const res = mapResponse(await authApi.verify_reset(payload))
    return {
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
}
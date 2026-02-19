import { handleRequest } from "../../../api/helper"
import { validate } from "../helper/validate"
import { authApi } from "../../../api/auth/auth.api"
import { mapVerifyResetPassword } from "../../../api/auth/auth.mapper"

export const verifyService = async (form)=>{
  const validation = validate.verify_reset_password(form)
  if(!validation.success){
    return validation
  }

  const payload = mapVerifyResetPassword(form)
  return handleRequest(() => authApi.verify_reset(payload))
}
import { handleRequest } from "../../../api/helper"
import { validate } from "../helper/validate"
import { authApi } from "../../../api/auth/auth.api"
import { mapResendVerifyCode, mapVerifyAccountPayload } from "../../../api/auth/auth.mapper"

export const verifyAccountService = {
  submit: async (data) => {
    const validation = validate.verify_account(data.email)
    if(!validation.success){
      return validation
    }

    const payload = mapVerifyAccountPayload(data)
    return handleRequest(() => authApi.verify_account(payload))
  },

  resend: async (email) => {
    const payload = mapResendVerifyCode(email)
    return handleRequest(() => authApi.resend_code(payload))
  }
}
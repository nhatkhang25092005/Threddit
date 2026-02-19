import { handleRequest } from "../../../api/helper"
import { authApi } from "../../../api/auth/auth.api"
import { mapRegisterPayload } from "../../../api/auth/auth.mapper"
import { validate } from "../helper/validate"

export const registerService = async (form) => {
  const validation = validate.register(form)
  if(!validation.success){
    return validation
  }

  const payload = mapRegisterPayload(form)
  return handleRequest(() => authApi.register(payload))
}
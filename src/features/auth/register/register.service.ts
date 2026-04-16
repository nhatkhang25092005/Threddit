import { handleRequest } from "../../../api/helper"
import { authApi } from "../../../api/auth/auth.api"
import { mapRegisterPayload } from "../../../api/auth/auth.mapper"
import { validateRegister } from "./validate"
import type { RegisterServiceResult } from "./types/result"
import { registerResult } from "./types/result"

export const registerService = async (form): Promise<RegisterServiceResult> => {
  const validation = validateRegister(form)
  if(!validation.success){
    return registerResult.validationError('Validation error', validation.invalids)
  }

  const payload = mapRegisterPayload(form)
  const response = await handleRequest(() => authApi.register(payload))

  if(!response.success){
    return registerResult.requestError(response.message)
  }

  return registerResult.success(response.message)
}
import { handleRequest } from "../../../api/helper";
import { authApi } from "../../../api/auth/auth.api";
import { mapResetPassword } from "../../../api/auth/auth.mapper";
import type { ForgotServiceResult } from "./types/result";
import { validateForgot } from "./validate";

export const forgotService = async (email: string): Promise<ForgotServiceResult> => {
  const validation = validateForgot(email)
  if(!validation.success){
    return validation
  }

  const payload = mapResetPassword(email)
  const result = await handleRequest(() => authApi.forgot(payload))

  if(!result.success){
    return {
      success: false,
      message: result.message,
    }
  }

  return {
    success: true,
    message: result.message,
    data: result.data,
  }
}

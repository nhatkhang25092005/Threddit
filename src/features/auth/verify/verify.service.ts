import { handleRequest } from "../../../api/helper";
import { authApi } from "../../../api/auth/auth.api";
import { mapVerifyResetPassword } from "../../../api/auth/auth.mapper";
import type { VerifyForm } from "./types/models";
import type { VerifyServiceResult } from "./types/result";
import { validateVerifyResetPassword } from "./validate";

export const verifyService = async (
  form: VerifyForm
): Promise<VerifyServiceResult> => {
  const validation = validateVerifyResetPassword(form)
  if(!validation.success){
    return validation
  }

  const payload = mapVerifyResetPassword(form)
  const result = await handleRequest(() => authApi.verify_reset(payload))

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

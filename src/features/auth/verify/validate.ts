import { AUTH_TEXT } from "../../../constant/text/vi/auth";
import { pattern } from "../../../constant/pattern";
import type { VerifyForm, VerifyInvalids, VerifyValidation } from "./types/models";

export const validateVerifyResetPassword = (
  form: VerifyForm
): VerifyValidation => {
  const { newPassword, confirmPassword } = form
  const error = AUTH_TEXT.verify.error
  const invalids: VerifyInvalids = {}
  let status = true

  if(!pattern.password.test(newPassword)){
    status = false
    invalids.new_pass = error.pattern_password
  }

  if(newPassword.trim() !== confirmPassword.trim()){
    status = false
    invalids.confirm = error.not_match
  }

  if(!status){
    return {
      success: false,
      invalids,
    }
  }

  return { success: true }
}

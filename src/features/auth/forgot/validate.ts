import { AUTH_TEXT } from "../../../constant/text/vi/auth";
import { pattern } from "../../../constant/pattern";
import type { ForgotValidation } from "./types/models";

export const validateForgot = (email: string): ForgotValidation => {
  if(!pattern.email.test(email)){
    return {
      success: false,
      invalids: {
        email: AUTH_TEXT.forgot.error.pattern_email,
      },
    }
  }

  return { success: true }
}

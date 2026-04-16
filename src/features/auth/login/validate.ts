import { AUTH_TEXT } from "../../../constant/text/vi/auth"
import { pattern } from "../../../constant/pattern"
import type { LoginForm, LoginInvalids, LoginValidation } from "./types/login.model"

export const validateLogin = (form: LoginForm): LoginValidation => {
  const error = AUTH_TEXT.login.error
  const { email, password } = form
  const invalids: LoginInvalids = {}
  let status = true

  if (!pattern.email.test(email)) {
    status = false
    invalids.email = error.pattern_email
  }
  if (!pattern.password.test(password)) {
    status = false
    invalids.password = error.pattern_password
  }

  if (!status) {
    return { success: false, invalids }
  }
  return { success: true }
}

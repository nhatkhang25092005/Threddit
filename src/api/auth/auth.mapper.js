export const mapRegisterPayload = (form) => ({
  email:form.email,
  username:form.username,
  displayName:form.display_name,
  gender:form.gender,
  dateOfBirth:form.date_of_birth,
  password:form.password,
  confirmedPassword:form.repass
})

export const mapLoginPayload = (form) => ({
  email:form.email,
  password:form.password
})

export const mapVerifyAccountPayload = (payload) => ({
  email:payload.email,
  verificationCode:String(payload.otp)
})

export const mapResetPassword = (email) => ({
  email:email
})

export const mapVerifyResetPassword = (payload) => ({
  email:payload.email,
  verificationCode:payload.otp,
  newPassword:payload.newPassword,
  confirmedNewPassword:payload.confirmPassword
})

export const mapResendVerifyCode = (email) => ({
  email:email
})

export const mapGooglePayload = (code) => ({
  googleCode:code
})


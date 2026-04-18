type RegisterPayload = Partial<
  Record<
    'email' |
    'username' |
    'password' |
    'repass' |
    'display_name' |
    'date_of_birth'|
    'gender'
  ,string>
>
export const mapRegisterPayload = (form: RegisterPayload) => ({
  email:form.email,
  username:form.username,
  displayName:form.display_name,
  gender:form.gender,
  dateOfBirth:form.date_of_birth,
  password:form.password,
  confirmedPassword:form.repass
})

type LoginPayload = {
  email:string,
  password:string
}
export const mapLoginPayload = (form:LoginPayload) => ({
  email:form.email,
  password:form.password
})

type VerifyAccountPayload = {
  email:string
  otp:string
}
export const mapVerifyAccountPayload = (payload: VerifyAccountPayload) => ({
  email:payload.email,
  verificationCode:String(payload.otp)
})

export const mapResetPassword = (email:string) => ({
  email:email
})

export const mapVerifyResetPassword = (payload) => ({
  email:payload.email,
  verificationCode:payload.otp,
  newPassword:payload.newPassword,
  confirmedNewPassword:payload.confirmPassword
})

export const mapResendVerifyCode = (email:string) => ({
  email:email
})

export const mapGooglePayload = (code) => ({
  googleCode:code
})


import type { RegisterForm, RegisterInvalids } from "./models"
import type { AuthNavigate } from "../../types/ui"
type RegisterTarget = 'login' | 'verify_account'
type VerifyTarget = 'register' | 'login'

export type RegisterProps = {
  onNavigate: AuthNavigate<RegisterTarget>
}
export type UseRegisterReturn = {
  validate: RegisterInvalids | null
  form: RegisterForm
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => Promise<void>
}

export type VerifyAccountProps = {
  onNavigate: AuthNavigate<VerifyTarget>
  email:string
}
export type UseVerifyAccountReturn = {
  otp:{
    otp:string
  }
  onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
  submit: () => Promise<void>
  resend: () => Promise<void>
  loading:{
    submit:boolean
    resend:boolean
  }
  countdown:number
}

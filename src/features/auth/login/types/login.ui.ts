import type { LoginForm, LoginInvalids } from "./login.model"
import type { AuthNavigate } from "../../types/ui"
export type LoginTarget = 'forgot' | 'register'
export type LoginProps = {onNavigate: AuthNavigate<LoginTarget>}
export type UseLoginResult = {
  submit: () => Promise<void>
  form: LoginForm
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  helperText: LoginInvalids | null
}

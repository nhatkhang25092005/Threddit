import type { LoginForm, LoginInvalids } from "./login.model"
export type LoginTarget = 'forgot' | 'register'
export type LoginProps = {onNavigate: (target:LoginTarget) => void}
export type UseLoginResult = {
  submit: () => Promise<void>
  form: LoginForm
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  helperText: LoginInvalids | null
}

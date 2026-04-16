import type { RegisterForm, RegisterInvalids } from "./models"
type RegisterTarget = 'login' | 'verify_account'
export type RegisterProps = {
  onNavigate: (target:RegisterTarget) => void
}
export type UseRegisterReturn = {
  validate: RegisterInvalids | null
  form: RegisterForm
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

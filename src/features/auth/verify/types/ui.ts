import type { AuthNavigate } from "../../types/ui";
import type { VerifyForm, VerifyInvalids } from "./models";

export type VerifyProps = {
  onNavigate: AuthNavigate<"login">
  email: string
}

export type UseVerifyResult = {
  form: VerifyForm
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  submit: () => Promise<void>
  helperText: VerifyInvalids | null
  loading: boolean
}

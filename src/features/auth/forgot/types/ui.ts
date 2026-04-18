import type { AuthNavigate } from "../../types/ui";
import type { ForgotForm } from "./models";

export type ForgotTarget = "login" | "verify"

export type ForgotProps = {
  onNavigate: AuthNavigate<ForgotTarget>
}

export type UseForgotResult = {
  form: ForgotForm
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  loading: boolean
  helperText: string | null
  onSubmit: () => Promise<void>
}

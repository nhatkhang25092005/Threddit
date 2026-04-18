export type VerifyForm = {
  email: string
  otp: string
  newPassword: string
  confirmPassword: string
}

export type VerifyInvalids = Partial<Record<"new_pass" | "confirm", string>>

export type VerifyValidation =
  | { success: true; invalids?: never }
  | { success: false; invalids: VerifyInvalids }

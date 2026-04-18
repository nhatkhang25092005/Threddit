export type ForgotForm = {
  email: string
}

export type ForgotInvalids = {
  email: string
}

export type ForgotValidation =
  | { success: true; invalids?: never }
  | { success: false; invalids: ForgotInvalids }

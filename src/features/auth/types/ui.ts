export type AuthTarget =
  | "login"
  | "register"
  | "verify_account"
  | "forgot"
  | "verify"

export type AuthPayload = string | null

export type AuthNavigate<T extends AuthTarget = AuthTarget> = (
  target: T,
  payload?: AuthPayload
) => void

export type AuthState = {
  target: AuthTarget
  payload: AuthPayload
}

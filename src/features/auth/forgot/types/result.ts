import type { ForgotInvalids } from "./models";

export type ForgotServiceResult =
  | { success: false; invalids: ForgotInvalids; message?: never }
  | { success: false; message: string; invalids?: never }
  | { success: true; message?: string; data?: unknown; invalids?: never }

import type { VerifyInvalids } from "./models";

export type VerifyServiceResult =
  | { success: false; invalids: VerifyInvalids; message?: never }
  | { success: false; message: string; invalids?: never }
  | { success: true; message?: string; data?: unknown; invalids?: never }

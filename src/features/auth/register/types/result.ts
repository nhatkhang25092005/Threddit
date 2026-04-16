import type { RegisterInvalids } from "./models";
export type RegisterServiceResult =
  | {kind:'success', is_success: true; message?: string }
  | {kind:'validation_error', is_success: false; message: string, invalids: RegisterInvalids }
  | {kind:'request_error', is_success: false; message: string}

export const registerResult = {
  success: (message?: string): RegisterServiceResult => ({
    kind: 'success',
    is_success: true,
    message,
  }),
  validationError: (message: string, invalids: RegisterInvalids): RegisterServiceResult => ({
    kind: 'validation_error',
    is_success: false,
    message,
    invalids,
  }),
  requestError: (message: string): RegisterServiceResult => ({
    kind: 'request_error',
    is_success: false,
    message,
  }),
}
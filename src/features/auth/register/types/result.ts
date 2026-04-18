import type { RegisterInvalids, VerifyAccountInvalids } from "./models";
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

export type VerifyAccountServiceResult =
| {kind:'success', is_success:true, message?:string}
| {kind:'validation_error',is_success:false, message:string, invalids:VerifyAccountInvalids}
| {kind:'request_error', is_success:false, message:string}

export const verifyAccountResult = {
  success: (message?: string): VerifyAccountServiceResult => ({
    kind:'success',
    is_success:true,
    message
  }),
  validationError: (message:string, invalids: VerifyAccountInvalids): VerifyAccountServiceResult => ({
    kind:'validation_error',
    is_success:false,
    message,
    invalids
  }),
  requestError: (message:string): VerifyAccountServiceResult => ({
    kind:'request_error',
    is_success:false,
    message
  })
}

export type ResentServiceResult =
| {kind:'success', is_success:true, message?:string}
| {kind:'validation_error', is_success:false, message:string, invalids:{email:string} }
| {kind:'request_error',is_success:false, message:string}

export const resentResult = {
  success: (message?:string):ResentServiceResult => ({
    kind:'success',
    is_success:true,
    message
  }),
  validationError: (message:string, invalids):ResentServiceResult => ({
    kind:'validation_error',
    is_success:false,
    message,
    invalids
  }),
  requestError: (message:string): ResentServiceResult => ({
    kind:'request_error',
    is_success:false,
    message
  })
}

import type { BaseInfoData, LoginInvalids } from "./login.model"

export type LoginServiceResult =
  | { kind: "validation_error"; success: false; invalids: LoginInvalids }
  | { kind: "request_error"; success: false; message: string }
  | { kind: "success"; success: true; data: BaseInfoData; message?: string }

export const loginResult = {
  validationError: (invalids: LoginInvalids): LoginServiceResult => ({
    kind: "validation_error",
    success: false,
    invalids,
  }),
  requestError: (message: string): LoginServiceResult => ({
    kind: "request_error",
    success: false,
    message,
  }),
  success: (data: BaseInfoData, message?: string): LoginServiceResult => ({
    kind: "success",
    success: true,
    data,
    message,
  }),
}

import { handleRequest } from "../../../api/helper"
import { validateVerifyAccount, validateResent } from "./validate"
import { authApi } from "../../../api/auth/auth.api"
import { mapResendVerifyCode, mapVerifyAccountPayload } from "../../../api/auth/auth.mapper"
import type {
  ResentServiceResult,
  VerifyAccountServiceResult,
} from "./types/result"

import type {VerifyAccountForm} from './types/models'
import {resentResult, verifyAccountResult} from './types/result'


export const verifyAccountService = {
  submit: async (data:VerifyAccountForm): Promise<VerifyAccountServiceResult> => {
    const validation = validateVerifyAccount(data)
    if(!validation.success){
      return verifyAccountResult.validationError('Validation Error',validation.invalids)
    }

    const payload = mapVerifyAccountPayload(data)
    const result = await handleRequest(() => authApi.verify_account(payload))
    if(!result.success)
      return verifyAccountResult.requestError(result.message)
    return verifyAccountResult.success(result.message)
  },

  resend: async (email: string): Promise<ResentServiceResult> => {
    const validation = validateResent(email)
    if(!validation.success)
      return resentResult.validationError('Validation Error', validation.invalids)
    const payload = mapResendVerifyCode(email)
    const result =await handleRequest(() => authApi.resend_code(payload))
    if(!result.success)
      return resentResult.requestError(result.message)
    return resentResult.success(result.message)
  }
}
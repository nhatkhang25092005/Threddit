import { handleRequest } from '../../../api/helper'
import {validate} from '../helper/validate'
import {authApi} from '../../../api/auth/auth.api'
import {mapResetPassword} from '../../../api/auth/auth.mapper'

export const forgotService = async (email) => {
  const validation = validate.forgot(email)
  if(!validation.success){
    return validation
  }

  const payload = mapResetPassword(email)
  return handleRequest(() => authApi.forgot(payload))
}
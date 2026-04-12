import {authApi} from "../../../api/auth/auth.api"
import { mapResponse, mapErrResponse } from "../../../api/helper"
import { mapLoginPayload } from "../../../api/auth/auth.mapper"
import {getbaseinfo} from './getbaseinfo.service'
import { validate } from "../helper/validate"

const PROFILE_BOOTSTRAP_RETRY_DELAYS_MS = [0, 300, 900]
const PROFILE_BOOTSTRAP_ERROR_MESSAGE =
  "Dang nhap thanh cong nhung chua tai duoc thong tin tai khoan. Vui long thu lai sau vai giay."

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getbaseinfoAfterLogin = async () => {
  let lastResponse = null

  for (const delay of PROFILE_BOOTSTRAP_RETRY_DELAYS_MS) {
    if (delay > 0) await wait(delay)

    const response = await getbaseinfo({ skipUnauthorizedRedirect: true })
    if (response?.is_success) return response

    lastResponse = response
    if (response?.status !== 401) break
  }

  return lastResponse
}

export const loginService = async (form) => {
  const validation = validate.login(form)
  if(!validation.success){
    return validation
  }

  const payload = mapLoginPayload(form)

  try{
    const loginRes = mapResponse(await authApi.login(payload))
    if(!loginRes.is_success){
      return {
        success:false,
        message:loginRes.message
      }
    }

    const res = await getbaseinfoAfterLogin()
    if(!res?.is_success){
      return {
        success:false,
        message:
          res?.status === 401
            ? PROFILE_BOOTSTRAP_ERROR_MESSAGE
            : res?.message || PROFILE_BOOTSTRAP_ERROR_MESSAGE
      }
    }

    return {
      success:true,
      data:res.data,
      message:res.message || loginRes.message
    }
  }
  catch(e){
    const err = mapErrResponse(e)
    return {
      success:err.is_success,
      message:err.message
    }
  }
}

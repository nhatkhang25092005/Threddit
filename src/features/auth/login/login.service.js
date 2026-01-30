import {authApi} from "../../../api/auth/auth.api"
import { mapResponse, mapErrResponse } from "../../../api/helper"
import { mapLoginPayload } from "../../../api/auth/auth.mapper"
import {getusernameService} from './getusername.service'
import { validate } from "../helper/validate"
export const loginService = async (form) => {
  const validation = validate.login(form)
  if(!validation.success){
    return validation
  }

  const payload = mapLoginPayload(form)

  try{
    // Login, then get the username
    let res = {}
    const loginRes = mapResponse(await authApi.login(payload))
    if(loginRes.is_success) res = await getusernameService()
    return {
      success:res.is_success,
      data:res.data,
      message:res.message
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
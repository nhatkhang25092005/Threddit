import {authApi} from "../../../api/auth/auth.api"
import { mapResponse, mapErrResponse } from "../../../api/helper"
import { mapLoginPayload } from "../../../api/auth/auth.mapper"
import { validate } from "../helper/validate"
export const loginService = async (form) => {
  const validation = validate.login(form)
  if(!validation.success){
    return validation
  }

  const payload = mapLoginPayload(form)
  console.log(payload)

  try{
    const res = mapResponse(await authApi.login(payload))
    console.log(res)
    return {
      success:res.is_success,
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
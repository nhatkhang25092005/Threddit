import {validate} from '../helper/validate'
import {authApi} from '../../../api/auth/auth.api'
import {mapResponse, mapErrResponse} from '../../../api/helper'
import {mapResetPassword} from '../../../api/auth/auth.mapper'
export const forgotService = async (email) => {
  const validation = validate.forgot(email)
  if(!validation.success){
    return validation
  }

  const payload = mapResetPassword(email)
  
  try{
    const res = mapResponse(await authApi.forgot(payload))
    return{
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
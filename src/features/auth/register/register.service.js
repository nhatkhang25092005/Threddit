import { authApi } from "../../../api/auth/auth.api";
import { mapRegisterPayload } from "../../../api/auth/auth.mapper";
import { mapResponse, mapErrResponse } from "../../../api/helper";
import { validate } from "../helper/validate";

export const registerService = async (form) => {

  const validation = validate.register(form)
  if(!validation.success){
    return validation
  }

  const payload = mapRegisterPayload(form)
  
  try{
    const res = mapResponse(await authApi.register(payload))
    return {
      success:res.is_success,
      message:res.message
    }
  }
  catch(e){
    const err = mapErrResponse(e)
    return{
      success:err.is_success,
      message:err.message
    }
  }
}
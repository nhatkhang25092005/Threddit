import {authApi} from "../../../api/auth/auth.api"
import {
  mapResponse,
  mapErrResponse,
} from "../../../api/helper"
import { mapLoginPayload } from "../../../api/auth/auth.mapper"
import { validateLogin } from "./validate"
import {
  getbaseinfo,
} from './getbaseinfo.service'
import {
  type LoginForm,
} from "./types/login.model"
import {
  loginResult,
  type LoginServiceResult,
  
} from "./types/login.result"


export const loginService = async (form:LoginForm): Promise<LoginServiceResult> => {
  const validation = validateLogin(form)
  if(!validation.success)
    return loginResult.validationError(validation.invalids)

  const payload = mapLoginPayload(form)

  try{
    const loginRes = mapResponse(await authApi.login(payload))
    if(!loginRes.is_success)
      return loginResult.requestError(loginRes.message || 'Login failed')

    const baseInfoRes = await getbaseinfo()
    if(!baseInfoRes.is_success)
      return loginResult.requestError(baseInfoRes.message || 'Login failed')
    
    return loginResult.success(baseInfoRes.data)
  }
  catch(err){
    const errorRes = mapErrResponse(err)
    return loginResult.requestError(errorRes.message || 'Login failed')
  }
}

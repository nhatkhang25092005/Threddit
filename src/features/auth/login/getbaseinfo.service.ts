import { profileApi } from "../../../api/profile/profile.api"
import {
  mapErrResponse,
  mapResponse,
  type ApiResponse
} from "../../../api/helper"

import {
  type BaseInfoData,
  type BaseInfoResult
} from "./types/login.model"

export const getbaseinfo = async ():Promise<BaseInfoResult> => {
  try{
    const r: ApiResponse<BaseInfoData> = mapResponse<BaseInfoData>(await profileApi.get_profile())
    return {
      is_success: r.is_success,
      data:r.data,
      message: r.message
    }
  }
  catch(e){
    return mapErrResponse(e)
  }
}

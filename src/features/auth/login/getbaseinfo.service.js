import { profileApi } from "../../../api/profile/profile.api"
import { mapErrResponse, mapResponse } from "../../../api/helper"
export const getbaseinfo = async (config = {}) => {
  try{
    return mapResponse(await profileApi.get_profile(null, config))
  }
  catch(e){
    return mapErrResponse(e)
  }
}

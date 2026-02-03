import { profileApi } from "../../../api/profile/profile.api"
import { mapErrResponse, mapResponse } from "../../../api/helper"
export const getbaseinfo = async  () => {
  try{
    return mapResponse(await profileApi.get_profile())
  }
  catch(e){
    return mapErrResponse(e)
  }
}
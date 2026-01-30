import { accountApi } from "../../../api/account/account.api"
import { mapErrResponse, mapResponse } from "../../../api/helper"
export const getusernameService = async  () => {
  try{
    return mapResponse(await accountApi.get_user_info())
  }
  catch(e){
    return mapErrResponse(e)
  }
}
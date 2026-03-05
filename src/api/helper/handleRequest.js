import { mapErrResponse } from "./mapErrResponse"
import { mapResponse } from "./mapResponse"
export const handleRequest = async (apiCall) => {
  try {
    const res = mapResponse(await apiCall())
    return {
      success: res?.is_success,
      message: res?.message,
      data: res?.data
    }
  } catch (err) {
    return mapErrResponse(err)
  }
}

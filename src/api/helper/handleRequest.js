import { mapErrResponse } from "./mapErrResponse"
import { mapResponse } from "./mapResponse"
import { delay } from "../../utils/delaySimulator"
export const handleRequest = async (apiCall, config = {}) => {
  const {
    isDelay = false,
    delayTime = 3000,
    shouldFail = false
  } = config
  try {
    isDelay ? await delay(delayTime, shouldFail) : undefined
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

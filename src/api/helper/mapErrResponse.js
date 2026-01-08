import { getErrMessage } from "./getErrMessage";

export const mapErrResponse = (res) =>({
  code:res?.code,
  message:res.response?.data?.message ||  getErrMessage(res?.code),
  status:res.response?.data?.statusCode,
  is_success:false
})
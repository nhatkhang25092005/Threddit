import { getErrMessage } from "./getErrMessage";

export type ApiErrResponse = {
  code:string,
  status:number|null,
  message:string,
  success:false,
  is_success:false,
  isAbort:boolean,
  isNetwork:boolean,
  isServerError:boolean,
  isClientError:boolean
}

export const mapErrResponse = (err): ApiErrResponse => {
  const status =
    err?.response?.status || // axios
    err?.status ||           // simulated
    null

  const code =
    err?.code ||
    (status ? `HTTP_${status}` : 'UNKNOWN_ERROR')

  const message =
    err?.response?.data?.message ||
    err?.message ||
    getErrMessage(code)

  return {
    code,
    status,
    message,
    success: false,
    is_success: false,
    isAbort: code === 'ERR_CANCELED',
    isNetwork: !status,
    isServerError: status >= 500,
    isClientError: status >= 400 && status < 500,
  }
}

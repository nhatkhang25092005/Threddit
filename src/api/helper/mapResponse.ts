export type ApiResponse<T = unknown> = {
  method?:string,
  message?:string,
  status_code?:number,
  status_text?:string,
  is_success:boolean,
  data?: T | null,
  success:boolean
}

export const mapResponse = <T = unknown>(res): ApiResponse<T> => ({
  method: res?.config?.method,
  message: res?.data?.message,
  status_code: res?.status,
  status_text: res?.statusText,
  is_success: res?.status >= 200 && res?.status < 300,
  data: res?.data?.data,
  success: res?.status >= 200 && res?.status < 300
})
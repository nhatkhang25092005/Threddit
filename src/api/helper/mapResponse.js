export const mapResponse = (res) => ({
  method: res?.config?.method,
  message: res?.data?.message,
  status_code: res?.status,
  status_text: res?.statusText,
  is_success: res?.status >= 200 && res?.status < 300,
  data: res?.data
})
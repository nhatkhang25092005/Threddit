import { errorText } from "../../constant/text/vi/error.text"

export const getErrMessage = (code) => {
  return errorText.api[code] || errorText.fallback
}

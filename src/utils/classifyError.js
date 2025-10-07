import { ApiResponse } from "../class";
import { DISPLAY } from "../constant";

//classifier module
export function classifyError(err) {
  const message = ApiResponse.getMessageError(err);
  const status = err?.response?.status ?? 400;
  const data = err?.response?.data ?? null;
  const displayType = Array.isArray(message) ? DISPLAY.MAGIC : DISPLAY.POPUP
  return { status, displayType, message, data };
}
import { useCallback, useRef } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { shouldRetry } from "../../../utils/shouldRetry"
import { modal } from "../../../constant/text/vi/modal"

export function useGetBlockStatus() {
  const notify = useNotify()
  const retryRef = useRef(0)
  const abortRef = useRef(null)
  const REFETCH_LIMIT = 3

  const getBlockStatus = useCallback(async (username) => {

    abortRef.current?.abort()
    abortRef.current = new AbortController()
    
    const response = await notify.withLoading(
      () => apiService.getBlockStatus(username, abortRef.current.signal),
      (bool) => notify.loading(bool)
    )
    console.log(response)
    if (response.success) {
      retryRef.current = 0
      return response.data.isBlocked
    }

    // Backoff retry
    if (shouldRetry(response) && retryRef.current < REFETCH_LIMIT) {
      retryRef.current += 1
      setTimeout(() => getBlockStatus(username), 300 * retryRef.current)
      return
    }

    notify.popup(modal.title.error , response.message)
    return -1
  }, [notify])

  return getBlockStatus
}

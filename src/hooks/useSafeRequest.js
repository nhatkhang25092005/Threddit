import { useCallback, useEffect, useRef } from "react"
import { shouldRetry } from "../utils/shouldRetry"

const CANCELED_CODE = "ERR_CANCELED"

function isAbortError(error) {
  return error?.name === "AbortError" || error?.code === CANCELED_CODE
}

export function useSafeRequest() {
  const abortRef = useRef(null)
  const requestIdRef = useRef(0)
  

  const runRequest = useCallback(async (requestFn, refetchLimit = 3, refetchMessage = 'Fetch Fail, Retry', failMessage='Retry Fail') => {
    if (typeof requestFn !== "function") {
      throw new Error("requestFn must be a function")
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const requestId = ++requestIdRef.current
    let retryCount = 0
    const executedFunc = () => requestFn(controller.signal)

    while(true){
      const result = await executedFunc()

      if(requestId !== requestIdRef.current) return null

      if (isAbortError(result)) return null

      if(result.success) return result

      const canRetry = shouldRetry(result) && retryCount < refetchLimit
      if(!canRetry){
        console.log(failMessage)
        return result
      }

      console.log(refetchMessage)
      retryCount++
    }
  }, [])

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  return  runRequest
}

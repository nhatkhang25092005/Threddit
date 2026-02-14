import { useEffect } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { orchestrate } from "../../../utils/orchestrate"
import { loadingActions, requestListActions } from "../store/actions"

export function useGetRequestNumber(dispatch) {
  const notify = useNotify()

  useEffect(() => {
    const fetch = async () => {
      const response = await orchestrate({
        service: async () => await notify.withLoading(
          () => apiService.getReceivedRequestCount(),
          (bool) => dispatch(loadingActions.getRequestNumber(bool))
        ),
        onSuccess: [
          (res) => {
            if (res.success) {
              dispatch(requestListActions.setRequestCount(res.data?.receivedCount ?? 0))
            }
          }
        ],
      })

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
      }
    }

    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

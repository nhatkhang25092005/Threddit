import { useEffect } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { orchestrate } from "../../../utils/orchestrate"
import { loadingActions, sentListActions } from "../store/actions"
export function useGetSentNumber(dispatch, isOwner) {
  const notify = useNotify()

  useEffect(() => {
    if (!isOwner) return

    const fetch = async () => {
      const response = await orchestrate({
        service: async () => await notify.withLoading(
          () => apiService.getSentRequestCount(),
          (bool) => dispatch(loadingActions.getSentNumber(bool))
        ),
        onSuccess: [
          (res) => {
            if (res.success) {dispatch(sentListActions.setSentCount(res.data.sentCount))}
          }
        ],
      })

      if (!response.success) {
        notify.popup(modal.title.error, response.message)
      }
    }

    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner])
}

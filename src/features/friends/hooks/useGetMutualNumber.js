import { useEffect } from "react"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"
import { orchestrate } from "../../../utils/orchestrate"
import { useProfileContext } from "../../profile/hooks/useProfileContext"

export function useGetMutualNumber() {
  const notify = useNotify()
  const {
    actions:{friendSync:{setMutualNumber, setMutualNumberLoading}},
    state: { username },
    isOwner
  } = useProfileContext()

  useEffect(() => {
    if (!username || isOwner) return

    const fetch = async () => {
      const r = await orchestrate({
        service: async () => await notify.withLoading(
          () => apiService.getMutualNumber(username),
          setMutualNumberLoading
        ),
        onSuccess: [
          (res) => setMutualNumber(res.data?.mutualCount ?? 0)
        ],
      })
      if(!r.success) notify.popup(modal.title.error, r.message)
    }

    fetch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])
}


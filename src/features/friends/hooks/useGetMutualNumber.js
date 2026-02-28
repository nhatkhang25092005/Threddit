import { useEffect } from "react"
import useAuth from "../../../core/auth/useAuth"
import { useOrchestrate } from "../../../core/orchestrate/useOrchestrate"
import { useNotify } from "../../../hooks/useNotify"
import { apiService } from "../services/api.service"
import { modal } from "../../../constant/text/vi/modal"

export function useGetMutualNumber() {
  const notify = useNotify()
  const { profileUsername: username, isOwner } = useAuth()
  const { sync } = useOrchestrate()

  useEffect(() => {
    if (!username || isOwner) return

    const fetch = async () => {
      const r = await notify.withLoading(
        () => apiService.getMutualNumber(username),
        sync.profile.getMutualNumberLoading
      )
      if (r.success) {
        sync.profile.getMutualNumberSuccess(r.data?.mutualCount ?? 0)
        return
      }
      if(!r.success) notify.popup(modal.title.error, r.message)
    }

    fetch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, isOwner])
}

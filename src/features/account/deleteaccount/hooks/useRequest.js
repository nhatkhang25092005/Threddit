import { useState } from "react"
import { useNotify } from "../../../../hooks/useNotify"
import { services } from "../../account.service"
import {modal} from "../../../../constant/text/vi/modal"
export default function useRequest(onTab){
  const [loading, setLoading] = useState(false)
  const notify = useNotify()

  const request = async () => {
    const res = await notify.withLoading(
      ()=>services.deleteAccountRequest(),
      (bool)=>setLoading(bool),
    )
    if(res.success) onTab('verify')
    else notify.popup(modal.title.error, res.message)
  }

  return{
    loading,
    request
  }
}
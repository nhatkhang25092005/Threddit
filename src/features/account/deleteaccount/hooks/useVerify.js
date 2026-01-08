import {useInput} from '../../../../hooks/useInput'
import { useState } from "react"
import { useNotify } from "../../../../hooks/useNotify"
import { services } from "../../account.service"
import {modal} from "../../../../constant/text/vi/modal"
import {routes} from "../../../../constant/routes"
import { useNavigate } from 'react-router-dom'
export function useVerify(onClose){
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const notify = useNotify()

  const [otp, onChange] = useInput({otp:''})

  const submit = async () => {
    const res = await notify.withLoading(
      ()=>services.deleteAccountVerify(otp.otp),
      (bool)=>setLoading(bool),
    )
    console.log(res)
    if(res.success){
      onClose()
      notify.popup(modal.title.success.delete_account, res.message, modal.button.back_to_login, ()=>navigate(routes.auth,{replace:true}))
    }
    else{
      notify.popup(modal.title.error, res.message)
    }
  }

  return{
    loading,
    otp: otp.otp,
    onChange,
    submit
  }
}
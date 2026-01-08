import { useState } from "react"
import { useInput } from "../../../hooks/useInput"
import {useNotify} from '../../../hooks/useNotify'
import {modal} from '../../../constant/text/vi/modal'
import {routes} from '../../../constant/routes'
import { services } from "../account.service"
import { useNavigate } from "react-router-dom"
export function useUpdatePassword(){
  const notify = useNotify()
  const navigate = useNavigate()
  const [form, onChange] = useInput({
    old:'',
    new:'',
    confirm:''
  })

  const [loading, setLoading] = useState(false)
  const [helperText, setHelperText] = useState(null)

  const submit = async () => {
    setHelperText(null)
    const response = await notify.withLoading(
      ()=>services.updatePassword(form),
      (bool)=>setLoading(bool)
    )
    if(!response.success){
      if(response.invalids){
        setHelperText(response.invalids)
        return
      }
      notify.popup(modal.title.error, response.message)
    }
    notify.popup(
      modal.title.success.update_password,
      response.message,
      modal.button.back_to_login,
      ()=>navigate(routes.auth,{replace:true})
    )
  }
  
  return{
    helperText,
    form,
    onChange,
    loading,
    submit
  }
}
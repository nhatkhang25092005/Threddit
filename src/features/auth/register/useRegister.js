import { useState } from "react";
import {modal} from "../../../constant/text/vi/modal"
import {useInput} from '../../../hooks/useInput'
import { useNotify } from "../../../hooks/useNotify";
import { registerService } from "./register.service";

export default function useRegister(onNavigate) {
  const [validate, setValidate] = useState(null);
  const notify = useNotify()
  const [form, onChange] = useInput({
    username:'',
    display_name: '',
    email: '',
    password: '',
    repass: '',
    gender: '',
    date_of_birth:''
  })

  const handleSubmit = async () => {
    setValidate(null)
    const response = await notify.withLoading(()=>registerService(form))
    if(!response.success){
      if(response.invalids){
        setValidate(response.invalids)
        return
      }
      notify.popup(modal.title.error, response.message)
      return
    }
    else onNavigate('verify_account', form.email)
  }

  return {
    validate,
    form,
    onChange,
    handleSubmit,
    };
}

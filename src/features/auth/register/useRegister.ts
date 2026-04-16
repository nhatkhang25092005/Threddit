import { useState } from "react";
import {modal} from "../../../constant/text/vi/modal"
import {useInput} from '../../../hooks/useInput'
import { useNotify } from "../../../hooks/useNotify";
import { registerService } from "./register.service";
import {isFormFilled} from '../helper/isFormFilled'
import {
  type RegisterInvalids,
} from "./types/models";
import type { UseRegisterReturn } from "./types/ui";


export default function useRegister(onNavigate): UseRegisterReturn {
  const [validate, setValidate] = useState<RegisterInvalids | null>(null);
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
    if(!isFormFilled(form)) return
    setValidate(null)
    const response = await notify.withLoading(()=>registerService(form))
    if(response.kind !== 'success'){
      if(response.kind === 'validation_error'){
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

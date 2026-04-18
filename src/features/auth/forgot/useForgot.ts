import { useState } from "react";
import { modal } from "../../../constant/text/vi/modal";
import { useInput } from "../../../hooks/useInput";
import { useNotify } from "../../../hooks/useNotify";
import { forgotService } from "./forgot.service";
import type { ForgotForm } from "./types/models";
import type { ForgotProps, UseForgotResult } from "./types/ui";

export function useForgot(onNavigate: ForgotProps["onNavigate"]): UseForgotResult {
  const [form, onChange] = useInput({ email: "" }) as [
    ForgotForm,
    UseForgotResult["onChange"],
  ]
  const [loading, setLoading] = useState<boolean>(false)
  const [helperText, setHelperText] = useState<string | null>(null)
  const notify = useNotify()

  const onSubmit = async (): Promise<void> => {
    setHelperText(null)
    const response = await notify.withLoading(
      () => forgotService(form.email),
      setLoading
    )

    if(!response.success){
      if("invalids" in response){
        setHelperText(response.invalids.email)
        return
      }
      notify.popup(modal.title.error, response.message)
      return
    }

    onNavigate("verify", form.email)
  }

  return {
    onSubmit,
    form,
    loading,
    onChange,
    helperText,
  }
}

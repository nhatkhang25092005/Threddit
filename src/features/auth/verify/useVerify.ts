import { useState } from "react";
import { modal } from "../../../constant/text/vi/modal";
import { useInput } from "../../../hooks/useInput";
import { useNotify } from "../../../hooks/useNotify";
import { verifyService } from "./verify.service";
import type { VerifyForm } from "./types/models";
import type { UseVerifyResult, VerifyProps } from "./types/ui";

export default function useVerify(
  onNavigate: VerifyProps["onNavigate"],
  email: VerifyProps["email"]
): UseVerifyResult {
  const [form, onChange] = useInput({
    email,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  }) as [VerifyForm, UseVerifyResult["onChange"]]
  const [helperText, setHelperText] = useState<UseVerifyResult["helperText"]>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const notify = useNotify()

  const submit = async (): Promise<void> => {
    setHelperText(null)
    const response = await notify.withLoading(
      () => verifyService(form),
      setLoading
    )

    if(!response.success){
      if("invalids" in response){
        setHelperText(response.invalids)
        return
      }
      notify.popup(modal.title.error, response.message)
      return
    }

    notify.popup(
      modal.title.success.verify,
      response.message,
      modal.button.back_to_login,
      () => onNavigate("login")
    )
  }

  return { form, onChange, submit, helperText, loading }
}

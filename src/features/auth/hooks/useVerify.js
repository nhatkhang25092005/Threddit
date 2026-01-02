import { useLocation, useNavigate,replace } from "react-router-dom";
import { handleVerifyRequest } from "../../../services/request/authRequest";
import { useState } from "react";
import { Result } from "../../../class";
import { ERRORS, DISPLAY, LABEL, TITLE, TEXT,ROUTES } from "../../../constant";
import { useNotify } from "../../../hooks/useNotify";

export default function useVerify() {
  const email = useLocation().state?.email;
  const [result, setResult] = useState(null);
  const navigate = useNavigate()
  const notify = useNotify()

  const verify = async (otp) => {
    if (otp.length < 6) {
      setResult(new Result(DISPLAY.MAGIC ,null , ERRORS.OTP))
      return
    }
    notify.loading(true)
    const response = await handleVerifyRequest(email, String(otp));
    
    setResult(response.isOk() ? new Result(DISPLAY.POPUP ,TITLE.VALIDATION_SUCCESS, TEXT.VALIDATION_SUCCESS,() => navigate(ROUTES.LOGIN,replace)) : notify.popup(LABEL.ERROR,response.message)) 
    notify.loading(false)
  };

  return { verify, result };
}

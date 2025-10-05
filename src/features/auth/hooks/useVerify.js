import { useLocation, useNavigate,replace } from "react-router-dom";
import { handleVerifyRequest } from "../../../services/request/authRequest";
import { useState } from "react";
import { Result } from "../../../class";
import { ERRORS, DISPLAY, LABEL, TITLE, TEXT,ROUTES } from "../../../constant";

export default function useVerify() {
  const email = useLocation().state?.email;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate()

  const verify = async (otp) => {
    if (otp.length < 6) {
      setResult(new Result(DISPLAY.MAGIC ,null , ERRORS.OTP))
      return
    }
    setLoading(true)
    const response = await handleVerifyRequest(email, String(otp));
   
    setResult(response.isOk() ? new Result(DISPLAY.POPUP ,TITLE.VALIDATION_SUCCESS, TEXT.VALIDATION_SUCCESS,() => navigate(ROUTES.LOGIN,replace)) : new Result(DISPLAY.POPUP,LABEL.ERROR,response.message)) 
    setLoading(false)
  };

  return { verify, result, loading };
}

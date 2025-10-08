import FadeSlideInVertical from "../../../components/animation/FadeSlideInVertical";
import SmallForm from "../../../components/layout/SmallForm";
import { Button, Typography } from "@mui/material";
import { ROUTES, TEXT, TITLE, LABEL, DISPLAY } from "../../../constant";
import NavButton from "../../../components/common/NavButton";
import Column from "../../../components/layout/Column";
import InputField  from "../../../components/common/InputField";
import useForgot from "../hooks/useForgot";
import LoadingScreen from "../../../components/common/LoadingScreen"
import PopupNotification from "../../../components/common/PopupNotification";
import { useState, useEffect } from "react";

export default function Forgot() {
  const {forgot, result, loading} = useForgot()
  const [email, setEmail] = useState("")

  const [popup, setPopup] = useState(false)
  useEffect(()=>{if(result?.type === DISPLAY.POPUP) setPopup(true)},[result])

  return (
    <>
      <PopupNotification open={popup} onClose={()=>{setPopup(false)}} title={result?.title} content={result?.message}  />
      <LoadingScreen control={loading}/>
      <NavButton subTitle={TEXT.BACK_TO_LOGIN} btnText={TEXT.LOGIN} destination={ROUTES.LOGIN}/>
      <FadeSlideInVertical distance={30} duration={1000}>
        <Column>
          <Typography variant="title">{TITLE.FORGOT}</Typography>
          <SmallForm>
            <InputField setError={result?.email} helperText={result?.email} setName={"email"} setValue={email} setOnChange={(e)=>{setEmail(e.target.value)}} type={"email"} label={LABEL.EMAIL} isRequired={true}/>
            <Button onClick={()=>forgot(email)} variant="contained">{TEXT.REQUEST_FORGOT}</Button>
          </SmallForm>
        </Column>
      </FadeSlideInVertical>
    </>
  );
}

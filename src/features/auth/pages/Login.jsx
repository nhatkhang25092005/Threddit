import { Typography, Button } from "@mui/material";
import InputField  from "../../../components/common/InputField";
import Column from "../../../components/layout/Column";
import NavButton from "../../../components/common/NavButton";
import SmallForm from "../../../components/layout/SmallForm";
import { TITLE, TEXT, ROUTES,LABEL,DISPLAY } from "../../../constant";
import FadeSlideInVertical from "../../../components/animation/FadeSlideInVertical";
import useLogin from "../hooks/useLogin";
import { useState, useEffect } from "react";
import LoadingScreen from "../../../components/common/LoadingScreen"
import PopupNotification from "../../../components/common/PopupNotification"
export default function Login() {
  const {login, result, loading} = useLogin()
  const [form, setForm] = useState({email:"", password:""})
  const [popup, setPopup] = useState(false)

  function handleChange(e){
    const {value, name} = e.target
    setForm((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  useEffect(()=>{ if(result?.type === DISPLAY.POPUP) setPopup(true)},[result])

  return (
    <>
      <LoadingScreen control={loading}/>
      <PopupNotification 
        open={popup} 
        onClose={()=>setPopup(false)} 
        title={result?.title}
        content={result?.message} 
        />
      <NavButton
        subTitle={TEXT.REDIRECT_REGISTER}
        btnText={TEXT.REGISTER}
        destination={ROUTES.REGISTER}
      />
      <FadeSlideInVertical duration={1000} distance={30}>
        <Column>
          <Typography variant="title">{TITLE.LOGIN_TITLE}</Typography>
          <SmallForm>
            <InputField setError={result?.email} helperText={result?.email} type={"email"} setName={"email"} setValue={form.email} setOnChange={(e)=>handleChange(e)} label={LABEL.EMAIL} isRequired={true} />
            <InputField
              setError = {result?.password}
              helperText= {result?.password}
              type={"password"}
              label={LABEL.PASSWORD}
              isRequired={true}
              setName={"password"}
              setValue={form.password}
              setOnChange={(e)=>handleChange(e)}
            />
            <Button variant="contained" onClick={()=>{login(form)}}>{TEXT.LOGIN}</Button>
            <Button variant="text" disableRipple href={ROUTES.FORGOT}>
              {TEXT.FORGOT}
            </Button>
          </SmallForm>
        </Column>
      </FadeSlideInVertical>
    </>
  );
}

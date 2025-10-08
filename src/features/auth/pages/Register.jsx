import Column from "../../../components/layout/Column";
import { Button, Typography } from "@mui/material";
import NavButton from "../../../components/common/NavButton";
import SmallForm from "../../../components/layout/SmallForm";
import InputField  from "../../../components/common/InputField";
import { TITLE, TEXT, ROUTES, LABEL, DISPLAY } from "../../../constant";
import FadeSlideInVertical from "../../../components/animation/FadeSlideInVertical";
import useRegister from "../hooks/useRegister";
import { useState, useEffect } from "react";
import PopupNotification from "../../../components/common/PopupNotification";
import LoadingScreen from "../../../components/common/LoadingScreen";

export default function Register() {
  const { register, loading, result } = useRegister();
  const [form, setForm] = useState({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  const [popup, setPopup] = useState(false);


  useEffect(()=>{if(result?.type === DISPLAY.POPUP) setPopup(true)},[result])

  return (
    <>
      <LoadingScreen control={loading} />
        <PopupNotification
          open = {popup}
          onClose = {()=>{setPopup(false)}}
          title={result?.title}
          content={result?.message}
        />
      <NavButton
        subTitle={TEXT.REDIRECT_LOGIN}
        btnText={TEXT.LOGIN}
        destination={ROUTES.LOGIN}
      />
      <FadeSlideInVertical distance={30} duration={1000}>
        <Column customStyle={{ pt: "5rem" }}>
          <Typography variant="title">{TITLE.REGISTER_TITLE}</Typography>
          <SmallForm>
            <InputField
              setError={Boolean(result?.displayName)}
              helperText={result?.displayName || ""}
              type={"text"}
              label={LABEL.DISPLAY_NAME}
              setName={"displayName"}
              setValue={form.displayName}
              setOnChange={(e) => {
                handleForm(e);
              }}
              isRequired={true}
            />
            <InputField
              setError={Boolean(result?.email)}
              helperText={result?.email || ""}
              type={"email"}
              label={LABEL.EMAIL}
              setName={"email"}
              setValue={form.email}
              setOnChange={(e) => {
                handleForm(e);
              }}
              isRequired={true}
            />
            <InputField
              setError={Boolean(result?.password)}
              helperText={result?.password || ""}
              type={"password"}
              label={LABEL.CREATE_PASS}
              setName={"password"}
              setValue={form.password}
              setOnChange={(e) => {
                handleForm(e);
              }}
              isRequired={true}
            />
            <InputField
              setError={Boolean(result?.confirmPassword)}
              helperText={result?.confirmPassword || ""}
              type={"password"}
              label={LABEL.CONFIRM_PASS}
              setName={"confirmPassword"}
              setValue={form.confirmPassword}
              setOnChange={(e) => {
                handleForm(e);
              }}
              isRequired={true}
            />
            <Button onClick={() => register(form)} variant="contained">
              {TEXT.REGISTER}
            </Button>
          </SmallForm>
        </Column>
      </FadeSlideInVertical>
    </>
  );
}

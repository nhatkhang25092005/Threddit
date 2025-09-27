import { Typography, Button } from "@mui/material";
import InputField from "../components/InputField";
import Column from "../../../components/layout/Column";
import NavButton from "../components/NavButton";
import SmallForm from "../../../components/layout/SmallForm";
import { TITLE, TEXT, ROUTES } from "../../../constant";
import FadeSlideInVertical from "../../../components/animation/FadeSlideInVertical";
export default function Login() {
  return (
    <>
      <NavButton
        subTitle={TEXT.REDIRECT_REGISTER}
        btnText={TEXT.REGISTER}
        destination={ROUTES.REGISTER}
      />
      <FadeSlideInVertical duration={1000} distance={30}>
        <Column>
          <Typography variant="title">{TITLE.LOGIN_TITLE}</Typography>
          <SmallForm>
            <InputField type={"email"} label={"email"} isRequired={true} />
            <InputField
              type={"password"}
              label={"password"}
              isRequired={true}
            />
            <Button variant="contained">{TEXT.LOGIN}</Button>
            <Button variant="text" disableRipple>
              {TEXT.FORGOT}
            </Button>
          </SmallForm>
        </Column>
      </FadeSlideInVertical>
    </>
  );
}

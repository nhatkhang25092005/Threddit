import Column from "../../../components/layout/Column";
import { Button, Typography } from "@mui/material";
import NavButton from "../components/NavButton";
import SmallForm from "../../../components/layout/SmallForm";
import { InputField } from "../components/";
import { TITLE, TEXT, ROUTES,LABEL } from "../../../constant";
import FadeSlideInVertical from "../../../components/animation/FadeSlideInVertical";
export default function Register() {

  return (
    <>
      <NavButton
        subTitle={TEXT.REDIRECT_LOGIN}
        btnText={TEXT.LOGIN}
        destination={ROUTES.LOGIN}
      />
      <FadeSlideInVertical distance={30} duration={1000}>
        <Column>
          <Typography variant="title">{TITLE.REGISTER_TITLE}</Typography>
          <SmallForm>
            <InputField type={"text"} label={LABEL.DISPLAY_NAME} isRequired={true} />
            <InputField type={"email"} label={LABEL.EMAIL} isRequired={true} />
            <InputField type={"password"} label={LABEL.CREATE_PASS} isRequired={true} />
            <Button variant="contained">{TEXT.REGISTER}</Button>
          </SmallForm>
        </Column>
      </FadeSlideInVertical>
    </>
  );
}

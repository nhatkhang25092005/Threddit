import FadeSlideInVertical from "../../../components/animation/FadeSlideInVertical";
import SmallForm from "../../../components/layout/SmallForm";
import { Button, Typography } from "@mui/material";
import { ROUTES, TEXT, TITLE, LABEL } from "../../../constant";
import NavButton from "../components/NavButton";
import Column from "../../../components/layout/Column";
import { InputField } from "../components";

export default function Forgot() {
  return (
    <>
      <NavButton
        subTitle={TEXT.BACK_TO_LOGIN}
        btnText={TEXT.LOGIN}
        destination={ROUTES.LOGIN}
      />
      <FadeSlideInVertical distance={30} duration={1000}>
        <Column>
          <Typography variant="title">{TITLE.FORGOT}</Typography>
          <SmallForm>
            <InputField type={"email"} label={LABEL.EMAIL} isRequired={true}/>
            <Button variant="contained">{TEXT.REQUEST_FORGOT}</Button>
          </SmallForm>
        </Column>
      </FadeSlideInVertical>
    </>
  );
}

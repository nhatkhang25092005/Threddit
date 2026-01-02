import Column from "../../../components/layout/Column";
import SmallForm from "../../../components/layout/SmallForm";
import {Typography,Button} from "@mui/material"
import { TITLE, LABEL, DISPLAY } from "../../../constant";
import InputField  from "../../../components/common/InputField";
import { useState } from "react";
import useChangePassword from "../hooks/useChangePassword";

export default function ChangePassword(){
    const {changePassword, result} = useChangePassword()
    const [form, setForm] = useState({oldPassword: "", newPassword: "", confirmPass: ""})

    function handleChange(e){
        const {name, value} = e.target;
        setForm((prev)=>({...prev, [name]: value}))
    }
    

    return (<>
    <Column customStyle={{pt:"8rem"}}>
        <Typography variant="title">{TITLE.CHANGE_PASSWORD}</Typography>
        <SmallForm>
            <InputField setError = {result?.oldPassword} helperText={result?.oldPassword} setOnChange={(e)=>handleChange(e)} isRequired setName={"oldPassword"} type={"password"} setValue={form.oldPassword} label={LABEL.OLD_PASSWORD}/>
            <InputField setError = {result?.newPassword} helperText={result?.newPassword} setOnChange={(e)=>handleChange(e)} isRequired setName={"newPassword"} type={"password"} setValue={form.newPassword} label={LABEL.NEW_PASSWORD}/>
            <InputField setError = {result?.confirmPass} helperText={result?.confirmPassword} setOnChange={(e)=>handleChange(e)} isRequired setName={"confirmPass"} type={"password"} setValue={form.confirmPass} label={LABEL.CONFIRM_PASS}/>
            <Button onClick={()=>changePassword(form)} variant="contained">{TITLE.OK}</Button>
        </SmallForm>
    </Column>
    </>)
}
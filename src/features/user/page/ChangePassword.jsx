import Column from "../../../components/layout/Column";
import SmallForm from "../../../components/layout/SmallForm";
import {Typography,Button} from "@mui/material"
import { TITLE, LABEL, DISPLAY } from "../../../constant";
import InputField  from "../../../components/common/InputField";
import { useEffect, useState } from "react";
import useChangePassword from "../hooks/useChangePassword";
import LoadingScreen from "../../../components/common/LoadingScreen";
import PopupNotification from "../../../components/common/PopupNotification";
export default function ChangePassword(){
    const {changePassword, result, loading} = useChangePassword()
    const [form, setForm] = useState({oldPassword: "", newPassword: "", confirmPass: ""})
    const [popup, setPopup] = useState(false) 

    function handleChange(e){
        const {name, value} = e.target;
        setForm((prev)=>({...prev, [name]: value}))
    }   

    useEffect(()=>{if(result?.type === DISPLAY.POPUP) setPopup(true)},[result])
    

    return (<>
    <LoadingScreen control={loading}/>
    <PopupNotification onClose={() => {result?.fallback ? result.fallback() : setPopup(false)}} open={popup} title={result?.title} content={result?.message}/>
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